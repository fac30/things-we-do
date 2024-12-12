"use client";

import { useState, useEffect, useCallback } from "react";
import { useDatabase } from "@/context/DatabaseContext";
import Display, { Base } from "./Display";
import NeedsModal from "./NeedsModal";
import { RxDocumentData } from "rxdb";
import Button from "@/ui/shared/Button";
import { useRouter } from "next/navigation";

type Category = RxDocumentData<Base>;
interface Need extends RxDocumentData<Base> {
  category: string;
}

export default function NeedsDisplay() {
  const router = useRouter();
  const database = useDatabase();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState<Need | null>(null);
  const [needsStep, setNeedsStep] = useState(1);
  const [urgent, setUrgent] = useState(0);
  const [effortful, setEffortful] = useState(0);
  const [worthDoing, setWorthDoing] = useState(0);
  const [chainEnd, setChainEnd] = useState(0);

  const [positiveLabel, setPositiveLabel] = useState("urgent");
  const [negativeLabel, setNegativeLabel] = useState("not urgent");

  const handleItemClick = (item: Need) => {
    setSelectedNeed(item);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedNeed(null);
    setNeedsStep(1);
    resetNeuros();
  };

  const handleStepIncrease = () => {
    setNeedsStep((prev) => prev + 1);
  };

  const handleBackClick = () => {
    setNeedsStep((prev) => Math.max(1, prev - 1));
    if (needsStep === 2) adjustUrgency();
    if (needsStep === 3) adjustEffort();
  };

  const adjustUrgency = () => {
    if (urgent > 0) {
      handleDecrease(setUrgent);
    } else {
      handleIncrease(setUrgent);
    }
  };

  const adjustEffort = () => {
    if (effortful > 0) {
      handleDecrease(setEffortful);
    } else {
      handleIncrease(setEffortful);
    }
  };

  const handleIncrease = (
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => setter((prev) => prev + 1);

  const handleDecrease = (
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => setter((prev) => prev - 1);

  const handlePositiveClick = () => {
    if (needsStep === 1) handleIncrease(setUrgent);
    else if (needsStep === 2) handleIncrease(setEffortful);
    else if (needsStep === 3) handleIncrease(setWorthDoing);

    if (needsStep === 3) setModalOpen(false);
    else handleStepIncrease();
  };

  const handleNegativeClick = () => {
    if (needsStep === 1) handleDecrease(setUrgent);
    else if (needsStep === 2) handleDecrease(setEffortful);
    else if (needsStep === 3) handleDecrease(setWorthDoing);

    if (needsStep === 3) setModalOpen(false);
    else handleStepIncrease();
  };

  const determineAction = useCallback((): string => {
    switch (true) {
      case urgent === 1 && effortful === 1 && worthDoing === 1:
        return "interest";
      case urgent === -1 && effortful === -1 && worthDoing === -1:
        return "guilt";
      case urgent === 1 && effortful === -1 && worthDoing === -1:
        return "freeze";
      case urgent === 1 && effortful === 1 && worthDoing === -1:
        return "fight/flight";
      case urgent === 1 && effortful === -1 && worthDoing === 1:
        return "joy";
      case urgent === -1 && effortful === -1 && worthDoing === 1:
        return "content";
      case urgent === -1 && effortful === 1 && worthDoing === 1:
        return "relief";
      case urgent === -1 && effortful === 1 && worthDoing === -1:
        return "distress";
      default:
        return "Invalid input";
    }
  }, [urgent, effortful, worthDoing]);

  const updateNeedWithAction = useCallback(
    async (action: string) => {
      if (!selectedNeed) return;
      try {
        await database.updateDocument("needs", selectedNeed.id, "mood", action);
        await database.updateDocument(
          "needs",
          selectedNeed.id,
          "selectedExpiry",
          new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString()
        );
        console.log(`Updated ${selectedNeed.name} with action: ${action}`);
      } catch (error) {
        console.error(`Failed to update need: ${selectedNeed.name}`, error);
      }
    },
    [selectedNeed, database]
  );

  const handleLabelChange = useCallback(() => {
    switch (needsStep) {
      case 1:
        setPositiveLabel("urgent");
        setNegativeLabel("not urgent");
        break;
      case 2:
        setPositiveLabel("A lot of effort");
        setNegativeLabel("A little effort");
        break;
      case 3:
        setPositiveLabel("worth doing");
        setNegativeLabel("not worth doing");
        break;
    }
  }, [needsStep]);

  const resetNeuros = () => {
    setUrgent(0);
    setEffortful(0);
    setWorthDoing(0);
  };

  const openInfo = () => {
    const basePath = window.location.pathname.endsWith("/")
      ? window.location.pathname.slice(0, -1)
      : window.location.pathname;
    router.push(`${basePath}/next-actions`);
  };

  useEffect(() => {
    switch (needsStep) {
      case 1:
        setPositiveLabel("urgent");
        setNegativeLabel("not urgent");
        break;
      case 2:
        setPositiveLabel("A lot of effort");
        setNegativeLabel("A little effort");
        break;
      case 3:
        setPositiveLabel("worth doing");
        setNegativeLabel("not worth doing");
        break;
    }
  }, [needsStep]);

  useEffect(() => {
    if (urgent !== 0 && effortful !== 0 && worthDoing !== 0 && selectedNeed) {
      const action = determineAction();
      updateNeedWithAction(action).then(() => {
        resetNeuros();
        setChainEnd((prevChainEnd) => prevChainEnd + 1);
        setNeedsStep(1);
      });
    }
  }, [
    determineAction,
    updateNeedWithAction,
    urgent,
    effortful,
    worthDoing,
    selectedNeed,
  ]);

  useEffect(() => {
    handleLabelChange();
    console.log(`selected need: ${selectedNeed}`);
    console.log(`urgency: ${urgent}`);
    console.log(`effort: ${effortful}`);
    console.log(`worthDoing: ${worthDoing}`);
  }, [
    effortful,
    handleLabelChange,
    needsStep,
    selectedNeed,
    urgent,
    worthDoing,
  ]);

  return (
    <>
      <div className="flex">
        <Button
          onClick={openInfo}
          label="Next actions"
          className="bg-twd-primary-purple text-white rounded flex justify-end items-end"
        />
      </div>
      <h2 className="text-2xl w-11/12 mb-6 mt-4 m-auto">
        What do you need right now?
      </h2>
      <p className="w-11/12 m-auto mb-5">
        Select what you need from the list below
      </p>
      <Display<Category, Need>
        mainKey="id"
        relatedKey="category"
        mainTable="needs_categories"
        relatedTable="needs"
        filterKey={"selectedExpiry" as keyof RxDocumentData<Base>}
        highlight={true}
        onItemClick={handleItemClick}
        chainEnd={chainEnd}
      />
      <NeedsModal
        modalOpen={modalOpen}
        title={`You have selected ~${selectedNeed?.name}~`}
        needsStep={needsStep}
        positiveLabel={positiveLabel}
        negativeLabel={negativeLabel}
        urgent={urgent}
        effortful={effortful}
        worthDoing={worthDoing}
        handlePositiveClick={handlePositiveClick}
        handleNegativeClick={handleNegativeClick}
        handleBackClick={handleBackClick}
        handleCloseClick={handleCloseModal}
      />
    </>
  );
}
