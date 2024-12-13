"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useDatabase } from "@/context/DatabaseContext";
import Section from "./Section";
import NeedsModal from "./NeedsModal";
import Modal from "@/ui/shared/Modal";
import Button from "@/ui/shared/Button";
import clsx from "clsx";
import { RxDocument, RxDocumentData } from "rxdb";
import { useRouter } from "next/navigation";

type Category = RxDocumentData<{ id: string; name: string }>;
type Need = RxDocumentData<{
  id: string;
  name: string;
  category: string;
  selectedExpiry?: string;
  mood?: string;
  highlighted?: boolean;
}>;

interface Priority {
  order: number;
  name: string;
}

export default function NeedsDisplay() {
  const database = useDatabase();
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [needs, setNeeds] = useState<Need[]>([]);
  const [needsModalOpen, setNeedsModalOpen] = useState(false);
  const [deselectModalOpen, setDeselectModalOpen] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState<Need | null>(null);
  const [needsStep, setNeedsStep] = useState(1);
  const [chainEnd, setChainEnd] = useState(0);
  const [urgent, setUrgent] = useState(0);
  const [effortful, setEffortful] = useState(0);
  const [worthDoing, setWorthDoing] = useState(0);
  const [positiveLabel, setPositiveLabel] = useState("urgent");
  const [negativeLabel, setNegativeLabel] = useState("not urgent");

  const fetchCategoriesAndNeeds = useCallback(async () => {
    const categoriesResponse = await database.getFromDb<RxDocument<Category>>(
      "needs_categories"
    );
    const needsResponse = await database.getFromDb<RxDocument<Need>>("needs");
    setCategories(categoriesResponse.map((doc) => doc.toJSON() as Category));
    setNeeds(needsResponse.map((doc) => doc.toJSON() as Need));
  }, [database]);

  useEffect(() => {
    fetchCategoriesAndNeeds();
  }, [fetchCategoriesAndNeeds, chainEnd]);

  const categorizedNeeds = useMemo(() => {
    return categories.map((category) => ({
      key: category.name,
      items: needs
        .filter((need) => need.category === category.id)
        .map((need) => ({
          ...need,
          highlighted: need.selectedExpiry
            ? new Date(need.selectedExpiry) > new Date()
            : false,
          label: need.name,
        })),
    }));
  }, [categories, needs]);

  const handleItemClick = (item: Need) => {
    setSelectedNeed(item);
    if (item.highlighted) {
      setDeselectModalOpen(true);
    } else {
      setNeedsModalOpen(true);
      setNeedsStep(1);
    }
  };

  const handleCloseNeedsModal = () => {
    setNeedsModalOpen(false);
    setSelectedNeed(null);
    setNeedsStep(1);
    resetNeuros();
  };

  const handleCloseDeselectModal = () => {
    setDeselectModalOpen(false);
    setSelectedNeed(null);
  };

  const handleDeselectNeed = async () => {
    if (selectedNeed) {
      await database.updateDocument(
        "needs",
        selectedNeed.id,
        "selectedExpiry",
        new Date().toISOString()
      );
      setChainEnd((prev) => prev + 1);
      handleCloseDeselectModal();
    }
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

    if (needsStep === 3) setNeedsModalOpen(false);
    else handleStepIncrease();
  };

  const handleNegativeClick = () => {
    if (needsStep === 1) handleDecrease(setUrgent);
    else if (needsStep === 2) handleDecrease(setEffortful);
    else if (needsStep === 3) handleDecrease(setWorthDoing);

    if (needsStep === 3) setNeedsModalOpen(false);
    else handleStepIncrease();
  };

  const determineMood = useCallback((): string => {
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

  const determinePriority = useCallback((): Priority => {
    switch (true) {
      case urgent === 1 && worthDoing === 1:
        return { order: 1, name: "do it first" };
      case urgent === -1 && worthDoing === 1:
        return { order: 2, name: "schedule it" };
      case urgent === 1 && worthDoing === -1:
        return { order: 3, name: "delegate it" };
      case urgent === -1 && worthDoing === -1:
        return { order: 4, name: "delete it" };
      default:
        return { order: 0, name: "Invalid input" };
    }
  }, [urgent, worthDoing]);

  const updateNeedWithMood = useCallback(
    async (mood: string, priority: Priority) => {
      if (!selectedNeed) return;
      try {
        await database.updateDocument(
          "needs",
          selectedNeed.id,
          "priority",
          priority
        );
        await database.updateDocument("needs", selectedNeed.id, "mood", mood);
        await database.updateDocument(
          "needs",
          selectedNeed.id,
          "selectedExpiry",
          new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString()
        );
        console.log(`Updated ${selectedNeed.name} with mood: ${mood}`);
      } catch (error) {
        console.error(`Failed to update need: ${selectedNeed.name}`, error);
      }
    },
    [selectedNeed, database]
  );

  const resetNeuros = () => {
    setUrgent(0);
    setEffortful(0);
    setWorthDoing(0);
  };

  const openNextActions = () => {
    router.push("/next-actions");
  };

  const hasHighlightedNeeds = categorizedNeeds.some((category) =>
    category.items.some((need) => need.highlighted)
  );

  useEffect(() => {
    if (urgent !== 0 && effortful !== 0 && worthDoing !== 0 && selectedNeed) {
      const mood = determineMood();
      const priority = determinePriority();
      updateNeedWithMood(mood, priority).then(() => {
        resetNeuros();
        setChainEnd((prevChainEnd) => prevChainEnd + 1);
        setNeedsStep(1);
      });
    }
  }, [
    determineMood,
    updateNeedWithMood,
    urgent,
    effortful,
    worthDoing,
    selectedNeed,
    determinePriority,
  ]);

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

  return (
    <>
      <h2 className="text-2xl w-11/12 mb-6 mt-4 m-auto">
        What do you need right now?
      </h2>
      <div className="w-11/12 m-auto">
        {categorizedNeeds.map((category, index) => (
          <Section
            key={index}
            categoryData={category}
            handleOpen={handleItemClick}
          />
        ))}
      </div>
      <Button
        onClick={openNextActions}
        label="Next Actions"
        disabled={!hasHighlightedNeeds}
        className={clsx(
          "fixed right-4 bottom-24 text-white rounded",
          hasHighlightedNeeds
            ? "bg-twd-primary-purple shadow-twd-primary-purple shadow-glow"
            : "bg-gray-400 cursor-not-allowed"
        )}
      />
      <NeedsModal
        modalOpen={needsModalOpen}
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
        handleCloseClick={handleCloseNeedsModal}
      />
      <Modal
        modalOpen={deselectModalOpen}
        title="Has this need now been met?"
        forwardButton={{
          label: "Yes",
          action: handleDeselectNeed,
        }}
        backButton={{
          label: "No",
          action: handleCloseDeselectModal,
        }}
      />
    </>
  );
}
