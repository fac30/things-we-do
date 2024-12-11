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

  const fetchCategories = async () => {
    const response = await database.getFromDb("needs_categories");
    const categories = retrieveDataObject(response);
    console.log(categories);
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
  const handleStepDecrease = () => {
    setNeedsStep((prevStep) => prevStep - 1);
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

  const handleNeuroIncrease = () => {
    if (needsStep === 1) {
      handleIncrease(setUrgent);
    } else if (needsStep === 2) {
      handleIncrease(setEffortful);
    } else if (needsStep === 3) {
      handleIncrease(setWorthDoing);
      setModalOpen(false);
      setNeedsStep(1);
    }
    console.log(urgent);
    console.log(effortful);
    console.log(worthDoing);
  };

  const handleNeuroDecrease = () => {
    if (needsStep === 1) {
      handleDecrease(setUrgent);
    } else if (needsStep === 2) {
      handleDecrease(setEffortful);
    } else if (needsStep === 3) {
      handleDecrease(setWorthDoing);
      setModalOpen(false);
      setNeedsStep(1);
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

  const handleStepAction = () => {
    handleStepIncrease();
  };

  useEffect(() => {
    handleLabelChange();
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
            handleNeuroIncrease();
          },
        }}
        backButton={{
          label: negativeLabel,
          action: () => {
            handleStepAction();
            handleNeuroDecrease();
          },
        }}
        title={`You have selected ~${selectedNeed}~`}
        needsStep={needsStep}
        setModalOpen={setModalOpen}
        handleStepDecrease={handleStepDecrease}
      />
    </>
  );
}
