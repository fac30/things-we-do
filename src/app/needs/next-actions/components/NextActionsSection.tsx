"use client";

import React, { useState } from "react";
import Button from "@/ui/shared/Button";
import Modal from "@/ui/shared/Modal";
import { NeedDocument } from "./NextActionsDisplay";
import { NextActionDocument } from "./NextActionsDisplay";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

interface SectionProps {
  need: NeedDocument;
  actions: NextActionDocument[];
  onToggleAction: (action: NextActionDocument) => Promise<void>;
  handleAddAction: (newAction: string, need: NeedDocument) => Promise<void>;
}

export default function NextActionsSection({
  need,
  actions,
  onToggleAction,
  handleAddAction,
}: SectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [newAction, setNewAction] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAction(e.target.value);
  };

  const handleSubmitAction = async () => {
    await handleAddAction(newAction, need);
    setModalOpen(false);
  };

  return (
    <>
      <div className="mb-6 flex gap-5 flex-wrap">
        {actions.map((action) => {
          const highlighted = new Date(action.selectedExpiry) > new Date();

          return (
            <Button
              key={action.id}
              label={action.name}
              className={
                highlighted
                  ? "bg-twd-primary-purple text-black font-normal"
                  : "bg-gray-600 text-white font-normal"
              }
              onClick={() => onToggleAction(action)}
            />
          );
        })}

        <button
          onClick={() => setModalOpen(true)}
          className="flex justify-center items-center"
          aria-label="Add Action"
        >
          <PlusCircleIcon className="w-7 m-auto" />
        </button>
      </div>

      <Modal
        title="Add a New Action"
        inputModal={true}
        modalOpen={modalOpen}
        placeholder="What action might help meet this need?"
        handleInputChange={handleInputChange}
        forwardButton={{ label: "Add", action: handleSubmitAction }}
        backButton={{
          label: "Cancel",
          action: () => {
            setNewAction("");
            setModalOpen(false);
          },
        }}
      />
    </>
  );
}
