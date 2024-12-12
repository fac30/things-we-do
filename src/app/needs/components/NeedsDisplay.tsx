"use client";

import { useState, useEffect } from "react";
import { useDatabase } from "@/context/DatabaseContext";
import Display, { Base } from "./Display";
import NeedsModal from "./NeedsModal";
import { RxDocumentData } from "rxdb";

interface Category extends RxDocumentData<Base> {}
interface Need extends RxDocumentData<Base> {
  category: string;
}

export default function NeedsDisplay() {
  const database = useDatabase();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState<Need | null>(null);
  const [needsStep, setNeedsStep] = useState(1);
  const [urgent, setUrgent] = useState(0);
  const [effortful, setEffortful] = useState(0);
  const [worthDoing, setWorthDoing] = useState(0);

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
    urgent > 0 ? handleDecrease(setUrgent) : handleIncrease(setUrgent);
  };

  const adjustEffort = () => {
    effortful > 0 ? handleDecrease(setEffortful) : handleIncrease(setEffortful);
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
    else if (needsStep === 3) {
      handleIncrease(setWorthDoing);
      setModalOpen(false);
    }
    handleStepIncrease();
  };

  const handleNegativeClick = () => {
    if (needsStep === 1) handleDecrease(setUrgent);
    else if (needsStep === 2) handleDecrease(setEffortful);
    else if (needsStep === 3) {
      handleDecrease(setWorthDoing);
      setModalOpen(false);
    }
    handleStepIncrease();
  };

  const determineAction = (): string => {
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
  };

  const updateNeedWithAction = async (action: string) => {
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
  };

  const handleLabelChange = () => {
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
  };

  const resetNeuros = () => {
    setUrgent(0);
    setEffortful(0);
    setWorthDoing(0);
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
    if (urgent !== 0 && effortful !== 0 && worthDoing !== 0) {
      const action = determineAction();
      updateNeedWithAction(action);
    }
    resetNeuros();
  }, [worthDoing]);

  useEffect(() => {
    handleLabelChange();
    console.log(`selected need: ${selectedNeed}`);
    console.log(`urgency: ${urgent}`);
    console.log(`effort: ${effortful}`);
    console.log(`worthDoing: ${worthDoing}`);
  }, [needsStep]);

  return (
    <>
      <Display<Category, Need>
        mainKey="id"
        relatedKey="category"
        mainTable="needs_categories"
        relatedTable="needs"
        filterKey={"selectedExpiry" as keyof RxDocumentData<Base>}
        highlight={true}
        onItemClick={handleItemClick}
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
