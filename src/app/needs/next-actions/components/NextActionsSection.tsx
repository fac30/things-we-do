"use client";

import React, { useState } from "react";
import Button from "@/ui/shared/Button";
import Modal from "@/ui/shared/Modal";
import { useDatabase } from "@/context/DatabaseContext";
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
  const database = useDatabase();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAction(e.target.value)
  };

  const handleSubmitAction = async () => {
    await handleAddAction(newAction, need);
    setModalOpen(false);
  }

  /* const handleAddAction = async () => {
    if (newAction.trim()) {
      const newActionDocument = {
        id: crypto.randomUUID(),
        name: newAction.trim(),
        need: need.id,
        selectedTimestamps: [],
        selectedExpiry: new Date().toISOString(),
        timestamp: new Date().toISOString(),
      }

      try {
        await database.addToDb("next_actions", newActionDocument);

        console.groupCollapsed("Action Created");
        console.log(`Name: ${newActionDocument.name}`);
        console.log(`Need: ${newActionDocument.need}`);
        console.groupEnd();

        setTriggerRerender(triggerRerender + 1);
      } catch (error) {
        console.error("Error creating Action:", error);
      }
      
      setModalOpen(false);
    }
  }; */

  return ( <>
    <div className="ml-4 mb-6">
      {actions.map((action) => {
        const highlighted = new Date(action.selectedExpiry) > new Date();

        return (<Button key={action.id}
          label={action.name}
          className={ highlighted ? 
            "bg-twd-primary-purple text-black" :
            "bg-gray-600 text-white"
          }
          onClick={() => onToggleAction(action)}
        />);
      })}

      <button onClick={() => setModalOpen(true)}
        className="flex justify-center items-center"
        aria-label="Add Action"
      >
        <PlusCircleIcon className="w-7 m-auto" />
      </button>
    </div>

    <Modal title="Add a New Action"
      inputModal={true}
      modalOpen={modalOpen}
      placeholder="What action might help meet this need?"
      handleInputChange={handleInputChange}
      forwardButton={{ label: "Add",
        action: handleSubmitAction,
      }}
      backButton={{ label: "Cancel",
        action: () => {
          setNewAction("");
          setModalOpen(false);
        },
      }}
    />
  </> );
}