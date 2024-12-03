"use client";

import { useRouter } from "next/navigation";
import AddDescription from "./AddToolDescription";
import AddImageUrl from "./AddToolImageUrl";
import AddInfoUrl from "./AddToolInfoUrl";
import AddName from "./AddToolName";
import AddTags from "./AddToolTags";
import { ToolkitFormProvider, useToolkitForm } from "@/context/ToolkitFormContext";
import rxdbInit from "@/lib/db/rxdbInit";
import Button from "@/ui/shared/Button";
import { validateUrl } from "@/lib/utils/validateUrl";

function SubmitButton() {
  const router = useRouter();
  const { formState, /* setFormState */ } = useToolkitForm();

  const handleSubmit = async () => {
    try {
      console.log(`Submitting form with state: ${JSON.stringify(formState)}`);

      // Validate URL before proceeding
      if (formState.infoUrl) {
        const { isValid, url, error } = validateUrl(formState.infoUrl);

        if (!isValid) {
          alert(`Invalid URL: ${error}`);
          return;
        }
        
        // Create a new form state with the validated URL
        const updatedFormState = {
          ...formState,
          infoUrl: url!
        };

        console.log(`Calling rxdbInit`);
        const db = await rxdbInit();
        
        console.log(`Inserting into database`);
        await db.toolkit_items.insert({
          id: crypto.randomUUID(),
          name: updatedFormState.name,
          categories: updatedFormState.categories,
          description: updatedFormState.description,
          checked: false,
          infoUrl: updatedFormState.infoUrl,
          imageUrl: updatedFormState.imageUrl,
          timestamp: new Date().toISOString()
        });

        console.log(`Created ${updatedFormState.name} in the database`);

        router.push("/toolkit");
      } else {
        // If no URL provided, proceed with current form state
        console.log(`Calling rxdbInit`);
        const db = await rxdbInit();
        
        console.log(`Inserting into database`);
        await db.toolkit_items.insert({
          id: crypto.randomUUID(),
          name: formState.name,
          categories: formState.categories,
          description: formState.description,
          checked: false,
          infoUrl: formState.infoUrl,
          imageUrl: formState.imageUrl,
          timestamp: new Date().toISOString()
        });

        console.log(`Created ${formState.name} in the database`);

        router.push("/toolkit");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Button 
      label="Add Tool"
      onClick={handleSubmit}
      className="w-full mt-4 bg-twd-primary-purple hover:bg-twd-secondary-purple"
    />
  );
}

export default function Inputs() {
  return (
    <ToolkitFormProvider>
      <div className="space-y-4 p-4">
        <AddName />
        <AddTags />
        <AddDescription />
        <AddImageUrl />
        <AddInfoUrl />
        <SubmitButton />
      </div>
    </ToolkitFormProvider>
  );
}
