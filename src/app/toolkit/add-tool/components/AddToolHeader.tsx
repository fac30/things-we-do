"use client";

import Button from "@/ui/shared/Button";
import Modal from "@/ui/shared/Modal";
import Spacer from "./Spacer";
import { useAddToolForm } from "@/context/AddToolContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const { formState } = useAddToolForm();

  const hasFormValues = () => {
    return (
      formState.name !== "" ||
      formState.description !== "" ||
      formState.imageUrl !== "" ||
      formState.infoUrl !== "" ||
      formState.categories.length > 0
    );
  };

  const handleNavigation = () => {
    if (hasFormValues()) {
      setModalOpen(true);
    } else {
      router.push("/toolkit");
    }
  };

  const modalForwardButton = {
    label: "Yes, leave",
    action: () => {
      setModalOpen(false);
      router.push("/toolkit");
    },
  };

  const modalBackButton = {
    label: "No, stay",
    action: () => setModalOpen(false),
  };

  return (
    <>
      <div className="flex justify-around">
        <Button
          label="< Go Back"
          onClick={handleNavigation}
          className="bg-twd-secondary-purple text-white"
        />

        <h2 className="text-white text-2xl font-bold">Add Tool</h2>
        
        <Spacer />
      </div>

      <Modal
        title="Are you sure you want to leave? All your changes will be lost."
        modalOpen={modalOpen}
        forwardButton={modalForwardButton}
        backButton={modalBackButton}
      />
    </>
  );
}
