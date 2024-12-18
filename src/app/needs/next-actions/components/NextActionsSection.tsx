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
  onDeleteAction: (action: NextActionDocument) => Promise<void>;
  mode: "create" | "destroy";
}

export default function NextActionsSection({
  need,
  actions,
  onToggleAction,
  handleAddAction,
  onDeleteAction,
  mode,
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
      {actions.length > 0 ? (
        <div className="mb-6 flex gap-5 flex-wrap">
          {actions.map((action) => {
            const highlighted = new Date(action.selectedExpiry) > new Date();

            return (
              <Button
                label={action.name}
                key={action.id}
                className={
                  mode === "destroy"
                    ? "bg-twd-cube-red font-normal"
                    : highlighted
                    ? "bg-twd-primary-purple font-normal"
                    : "bg-gray-600 text-white font-normal"
                }
                onClick={() =>
                  mode === "destroy"
                    ? onDeleteAction(action)
                    : onToggleAction(action)
                }
              />
            );
          })}

          <button
            aria-label="Add Action"
            onClick={() => setModalOpen(true)}
            className="flex justify-center items-center"
          >
            <PlusCircleIcon className="w-7 m-auto" />
          </button>
        </div>
      ) : (
        <div className="flex gap-5 flex-wrap items-center mb-5">
          <p className="text-sm text-gray-500 ml-6">
            No next actions available for this need.
          </p>

          <button
            aria-label="Add Action"
            onClick={() => setModalOpen(true)}
            className="flex justify-center items-center"
          >
            <PlusCircleIcon className="w-7 m-auto" />
          </button>
        </div>
      )}

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
