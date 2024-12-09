"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AddDescription from "./AddToolDescription";
import AddImageUrl from "./AddToolImageUrl";
import AddInfoUrl from "./AddToolInfoUrl";
import AddName from "./AddToolName";
import AddTags from "./AddToolTags";
import Modal from "@/ui/shared/Modal";
import Button from "@/ui/shared/Button";
import DatabaseManager from "@/lib/db/DatabaseManager";
import { validateUrl } from "@/lib/utils/validateUrl";
import {
  AddToolProvider,
  useAddToolForm,
} from "@/context/AddToolContext";

export default function Inputs() {
  const router = useRouter();
  const { formState } = useAddToolForm();

  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const confirmationForwardButton = {
    label: "Continue",
    action: () => {
      setConfirmationModalOpen(false);
      router.push("/toolkit");
    }
  };

  function SubmitButton() {
    const handleSubmit = async () => {
      console.log(`Validating form with state: ${JSON.stringify(formState)}`);
  
      if (formState.categories.length === 0) {
        alert("Please select at least one category");
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
        // First, add any pending categories to the database
        for (const category of formState.pendingCategories) {
          if (formState.categories.includes(category)) {
            await DatabaseManager.addCategories(category);
          } else {
            const shouldSave = window.confirm(
              `You created the category "${category}" but didn't use it. Would you like to save it anyway?`
            );
            if (shouldSave) {
              await DatabaseManager.addCategories(category);
            }
          }
        }
  
        // Then add the tool
        await DatabaseManager.addToDb("toolkit_items", {
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
  
        setConfirmationModalOpen(true);
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

  return (
    <div className="space-y-4 p-4">
      <AddName />
      <AddTags />
      <AddDescription />
      <AddImageUrl />
      <AddInfoUrl />
      <SubmitButton />

      <Modal
        title="Tool Added"
        modalOpen={confirmationModalOpen}
        forwardButton={confirmationForwardButton}
      />
    </div>
  );
}
