"use client";

import { useState, useEffect } from "react";
import { useDatabase } from "@/context/DatabaseContext";
import retrieveDataObject from "@/lib/utils/retrieveDataObject";
import { RxDocumentData } from "rxdb";
import NeedsSection from "./NeedsSection";
import NeedsModal from "./NeedsModal";

export interface Category {
  id: string;
  name: string;
}

export interface Need {
  id: string;
  name: string;
  category: string;
}

interface CategorizedNeed {
  category: string;
  needs: Need[];
}

export default function NeedsDisplay() {
  const database = useDatabase();
  const [categories, setCategories] = useState<RxDocumentData<Category>[]>([]);
  const [needs, setNeeds] = useState<RxDocumentData<Need>[]>([]);
  const [urgent, setUrgent] = useState<number>(0);
  const [effortful, setEffortful] = useState<number>(0);
  const [worthDoing, setWorthDoing] = useState<number>(0);
  const [positiveLabel, setPositiveLabel] = useState<string>("urgent");
  const [negativeLabel, setNegativeLabel] = useState<string>("not urgent");
  const [isModalCompleted, setIsModalCompleted] = useState(false);

  const fetchCategories = async () => {
    const response = await database.getFromDb("needs_categories");
    const categories = retrieveDataObject(response);

    setCategories(categories);
  };

  const fetchNeeds = async () => {
    const response = await database.getFromDb("needs");
    const needs = retrieveDataObject(response);
    setNeeds(needs);
  };

  useEffect(() => {
    fetchCategories();
    fetchNeeds();
  }, []);

  const categorisedNeeds: CategorizedNeed[] = categories.map((category) => {
    const categoryNeeds = needs.filter((need) => need.category === category.id);
    return { category: category.name, needs: categoryNeeds };
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState("");
  const [needsStep, setNeedsStep] = useState(1);

  const handleOpen = (need: string) => {
    setModalOpen(true);
    setSelectedNeed(need);
  };

  const handleStepIncrease = () => {
    setNeedsStep((prevStep) => prevStep + 1);
  };
  const handleBackClick = () => {
    setNeedsStep((prevStep) => prevStep - 1);
    {
      if (needsStep === 2 && urgent > 0) {
        handleDecrease(setUrgent);
      } else if (needsStep === 2 && urgent < 0) {
        handleIncrease(setUrgent);
      } else if (needsStep === 3 && effortful > 0) {
        handleDecrease(setEffortful);
      } else if (needsStep === 3 && effortful < 0) {
        handleIncrease(setEffortful);
      }
    }
  };

  const handleIncrease = (
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    setter((prev) => prev + 1);
  };
  const handleDecrease = (
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    setter((prev) => prev - 1);
  };

  const updateNeedWithAction = async (needName: string, action: string) => {
    try {
      const selectedNeed = needs.find((need) => need.name === needName);

      if (selectedNeed) {
        const docId = selectedNeed.id;

        await database.updateDocument("needs", docId, "mood", action);
        console.log(`Updated ${needName} with action: ${action}`);
      } else {
        console.log(`Need ${needName} not found`);
      }
    } catch (error) {
      console.error(`Failed to update need: ${needName}`, error);
    }
  };

  const handlePositiveClick = () => {
    if (needsStep === 1) {
      handleIncrease(setUrgent);
    } else if (needsStep === 2) {
      handleIncrease(setEffortful);
    } else if (needsStep === 3) {
      handleIncrease(setWorthDoing);
      setIsModalCompleted(true);

      setModalOpen(false);
      setNeedsStep(1);
      setIsModalCompleted(false);
    }
  };

  const handleNegativeClick = () => {
    if (needsStep === 1) {
      handleDecrease(setUrgent);
    } else if (needsStep === 2) {
      handleDecrease(setEffortful);
    } else if (needsStep === 3) {
      handleDecrease(setWorthDoing);
      setIsModalCompleted(true);

      setModalOpen(false);
      setNeedsStep(1);

      setIsModalCompleted(false);
    }
  };

  const resetNeuros = () => {
    setUrgent(0);
    setEffortful(0);
    setWorthDoing(0);
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

  const handleStepAction = () => {
    handleStepIncrease();
  };

  useEffect(() => {
    handleLabelChange();
    console.log(`selected need: ${selectedNeed}`);
    console.log(`urgency: ${urgent}`);
    console.log(`effort: ${effortful}`);
    console.log(`worthDoing: ${worthDoing}`);
  }, [needsStep]);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalOpen]);

  useEffect(() => {
    if (urgent !== 0 && effortful !== 0 && worthDoing !== 0) {
      const action = determineAction(urgent, effortful, worthDoing);
      updateNeedWithAction(selectedNeed, action);
    }
    resetNeuros();
  }, [worthDoing]);

  function determineAction(
    urgent: number,
    effortful: number,
    worthDoing: number
  ): string {
    switch (true) {
      case urgent === 1 && effortful === 1 && worthDoing === 1:
        console.log("interest");
        return "interest";
      case urgent === -1 && effortful === -1 && worthDoing === -1:
        console.log("guilt");
        return "guilt";
      case urgent === 1 && effortful === -1 && worthDoing === -1:
        console.log("freeze");
        return "freeze";
      case urgent === 1 && effortful === 1 && worthDoing === -1:
        console.log("fight/flight");
        return "fight/flight";
      case urgent === 1 && effortful === -1 && worthDoing === 1:
        console.log("joy");
        return "joy";
      case urgent === -1 && effortful === -1 && worthDoing === 1:
        console.log("content");
        return "content";
      case urgent === -1 && effortful === 1 && worthDoing === 1:
        console.log("relief");
        return "relief";
      case urgent === -1 && effortful === 1 && worthDoing === -1:
        console.log("distress");
        return "distress";
      default:
        return "Invalid input";
    }
  }

  const handleCloseClick = () => {
    resetNeuros();
    setModalOpen(false);
    setNeedsStep(1);
  };

  return (
    <>
      <div className="w-11/12 m-auto">
        {categorisedNeeds.map((categoryData, index) => {
          return (
            <NeedsSection
              key={index}
              categoryData={categoryData}
              handleOpen={handleOpen}
            />
          );
        })}
      </div>
      <NeedsModal
        modalOpen={modalOpen}
        forwardButton={{
          label: positiveLabel,
          action: () => {
            handleStepAction();
            handlePositiveClick();
          },
        }}
        backButton={{
          label: negativeLabel,
          action: () => {
            handleStepAction();
            handleNegativeClick();
          },
        }}
        title={`You have selected ~${selectedNeed}~`}
        needsStep={needsStep}
        handleBackClick={handleBackClick}
        handleCloseClick={handleCloseClick}
      />
    </>
  );
}
