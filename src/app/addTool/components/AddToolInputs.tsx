"use client";

import { useRouter } from "next/navigation";
import AddDescription from "./AddToolDescription";
import AddImageUrl from "./AddToolImageUrl";
import AddInfoUrl from "./AddToolInfoUrl";
import AddName from "./AddToolName";
// import AddTags from "./AddToolTags";
import {
  ToolkitFormProvider,
  useToolkitForm,
} from "@/context/ToolkitFormContext";

import Button from "@/ui/shared/Button";
import DatabaseManager from "@/lib/db/databaseManager";

function SubmitButton() {
  const router = useRouter();
  const { formState } = useToolkitForm();

  const handleSubmit = async () => {
    try {
      console.log(`Submitting form with state: ${JSON.stringify(formState)}`);

      console.log(`Inserting into database`);

      DatabaseManager.addToDb("toolkit_items", {
        id: crypto.randomUUID(),
        name: formState.name,
        categories: formState.categories,
        description: formState.description,
        checked: false,
        infoUrl: formState.infoUrl,
        imageUrl: formState.imageUrl,
        timestamp: new Date().toISOString(),
      });

      console.log(`Created ${formState.name} in the database`);

      router.push("/toolkit");
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
        {/* <AddTags /> */}
        <AddDescription />
        <AddImageUrl />
        <AddInfoUrl />
        <SubmitButton />
      </div>
    </ToolkitFormProvider>
  );
}
