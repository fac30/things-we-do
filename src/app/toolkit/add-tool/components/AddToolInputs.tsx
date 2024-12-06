"use client";

import { useRouter } from "next/navigation";
import AddDescription from "./AddToolDescription";
import AddImageUrl from "./AddToolImageUrl";
import AddInfoUrl from "./AddToolInfoUrl";
import AddName from "./AddToolName";
import AddTags from "./AddToolTags";
import {
  AddToolProvider,
  useAddToolForm,
} from "@/context/AddToolContext";
import Button from "@/ui/shared/Button";
import DatabaseManager from "@/lib/db/DatabaseManager";
import { validateUrl } from "@/lib/utils/validateUrl";

function SubmitButton() {
  const router = useRouter();
  const { formState /* setFormState */ } = useAddToolForm();

  const handleSubmit = async () => {
    console.log(`Validating form with state: ${JSON.stringify(formState)}`);

    if (formState.categories.length === 0) {
      alert("Please select at least one categories");
      return;
    }

    if (formState.infoUrl) {
      const infoUrlValidation = validateUrl(formState.infoUrl, "Info URL");
      if (!infoUrlValidation.isValid) {
        console.error(`Info URL validation failed: ${infoUrlValidation.error}`);
        alert(infoUrlValidation.error);
        return;
      }
      console.log(`Info URL validated successfully: ${infoUrlValidation.url}`);
    }

    if (formState.imageUrl) {
      const imageUrlValidation = validateUrl(formState.imageUrl, "Image URL");
      if (!imageUrlValidation.isValid) {
        console.error(
          `Image URL validation failed: ${imageUrlValidation.error}`
        );
        alert(imageUrlValidation.error);
        return;
      }
      console.log(
        `Image URL validated successfully: ${imageUrlValidation.url}`
      );
    }

    try {
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

      // Show success message and wait for user acknowledgment
      const userAcknowledged = window.confirm(
        `Successfully added ${formState.name} to your toolkit!\n\nClick OK to return to the toolkit.`
      );

      if (userAcknowledged) {
        router.push("/toolkit");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        `Failed to save tool: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  return (
    <Button
      label="Add Tool"
      onClick={handleSubmit}
      className="w-full mt-4 bg-twd-primary-purple "
    />
  );
}

export default function Inputs() {
  return (
    <AddToolProvider>
      <div className="space-y-4 p-4">
        <AddName />
        <AddTags />
        <AddDescription />
        <AddImageUrl />
        <AddInfoUrl />
        <SubmitButton />
      </div>
    </AddToolProvider>
  );
}
