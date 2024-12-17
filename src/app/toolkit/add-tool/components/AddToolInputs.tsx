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
import { useDatabase } from "@/context/DatabaseContext";
import { validateUrl } from "@/lib/utils/validateUrl";
import { useAddToolForm } from "@/context/AddToolContext";

export default function Inputs() {
  const router = useRouter();
  const database = useDatabase();

  const { formState } = useAddToolForm();

  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [unusedCategoryModalOpen, setUnusedCategoryModalOpen] = useState(false);
  const [unusedCategory, setUnusedCategory] = useState([""]);
  const [saveUnusedCategory, setSaveUnusedCategory] = useState(false);
  const [categoryErrorModal, setCategoryErrorModal] = useState(false);
  const [infoUrlErrorModal, setInfoUrlErrorModal] = useState(false);
  const [imageUrlErrorModal, setImageUrlErrorModal] = useState(false);
  const [nameErrorModalOpen, setNameErrorModalOpen] = useState(false);
  const [submitErrorModal, setSubmitErrorModal] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");

  function SubmitButton() {
    const handleSubmit = async () => {
      console.log(`Validating form with state: ${JSON.stringify(formState)}`);
     
      if (!formState.name || formState.name.trim() === "") {
        setNameErrorModalOpen(true);
        return;
      }

      if (formState.categories.length === 0) {
        setCategoryErrorModal(true);
        return;
      }

      if (formState.infoUrl) {
        const infoUrlValidation = validateUrl(formState.infoUrl, "Info URL");
        if (!infoUrlValidation.isValid) {
          console.error(
            `Info URL validation failed: ${infoUrlValidation.error}`
          );
          setSubmitErrorMessage(infoUrlValidation.error || "");
          setInfoUrlErrorModal(true);
          return;
        }
        console.log(
          `Info URL validated successfully: ${infoUrlValidation.url}`
        );
      }

      if (formState.imageUrl) {
        const imageUrlValidation = validateUrl(formState.imageUrl, "Image URL");
        if (!imageUrlValidation.isValid) {
          console.error(
            `Image URL validation failed: ${imageUrlValidation.error}`
          );
          setSubmitErrorMessage(imageUrlValidation.error || "");
          setImageUrlErrorModal(true);
          return;
        }
        console.log(
          `Image URL validated successfully: ${imageUrlValidation.url}`
        );
      }

      try {
        for (const category of formState.pendingCategories) {
          if (formState.categories.includes(category)) {
            await database.addCategories(category);
          } else {
            await setUnusedCategoryModalOpen(true);
            if (saveUnusedCategory) {
              setUnusedCategory(unusedCategory.concat(category));
              await database.addCategories(category);
            }
          }
        }

        await database.addToDb("toolkit_items", {
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
        setSubmitErrorMessage(
          error instanceof Error ? error.message : "Unknown error"
        );
        setSubmitErrorModal(true);
      }
    };

    return (
      <Button label="Add Tool"
        onClick={handleSubmit}
        className="w-full mt-3 bg-twd-primary-purple"
      />
    );
  }

  return (
    <div className="flex-col flex gap-6 p-4">
      <AddName />
      <AddTags />
      <AddDescription />
      <AddImageUrl />
      <AddInfoUrl />
      <SubmitButton />

      <Modal
        title="Tool Added"
        modalOpen={confirmationModalOpen}
        forwardButton={{
          label: "Continue",
          action: () => {
            setConfirmationModalOpen(false);
            router.push("/toolkit");
          },
        }}
      />

      {/* Modal for missing name */}
      <Modal
        title="Name is required"
        modalOpen={nameErrorModalOpen}
        forwardButton={{
          label: "OK",
          action: () => setNameErrorModalOpen(false),
        }}
      />

      <Modal
        title="You created an unused tag. What would you like to save?"
        modalOpen={unusedCategoryModalOpen}
        forwardButton={{
          label: "Tool & Tag",
          action: () => {
            setSaveUnusedCategory(true);
            setUnusedCategoryModalOpen(false);
          },
        }}
        backButton={{
          label: "Tool",
          action: () => {
            setSaveUnusedCategory(false);
            setUnusedCategoryModalOpen(false);
          },
        }}
      />

      <Modal
        title="Please select at least one tag"
        modalOpen={categoryErrorModal}
        forwardButton={{
          label: "OK",
          action: () => setCategoryErrorModal(false),
        }}
      />

      <Modal
        title={submitErrorMessage}
        modalOpen={infoUrlErrorModal}
        forwardButton={{
          label: "OK",
          action: () => setInfoUrlErrorModal(false),
        }}
      />

      <Modal
        title={submitErrorMessage}
        modalOpen={imageUrlErrorModal}
        forwardButton={{
          label: "OK",
          action: () => setImageUrlErrorModal(false),
        }}
      />

      <Modal
        title={`Failed to save tool: ${submitErrorMessage}`}
        modalOpen={submitErrorModal}
        forwardButton={{
          label: "OK",
          action: () => setSubmitErrorModal(false),
        }}
      />
    </div>
  );
}
