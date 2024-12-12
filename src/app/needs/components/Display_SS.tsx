"use client";

import { useState, useEffect } from "react";
import { useDatabase } from "@/context/DatabaseContext";
import Modal from "@/ui/shared/Modal";
import Section from "./Section";
import { RxDocumentData } from "rxdb";

export interface Base {
  id: string;
  name: string;
}

interface FilteredData<U> {
  key: string;
  items: (U & { label: string; highlighted?: boolean })[];
}

interface DisplayProps<
  T extends RxDocumentData<Base>,
  U extends RxDocumentData<Base>
> {
  mainKey: keyof T;
  relatedKey: keyof U;
  mainTable: string;
  relatedTable: string;
  filterKey?: keyof T | keyof U;
  highlight?: boolean;
  modalComponent?: React.ElementType;
  modalProps?: Record<string, any>;
  onItemClick?: (item: U & { label: string }) => void;
}

type ExtendedRelatedData<U> = U & { highlighted?: boolean; label: string };

export default function Display<
  T extends RxDocumentData<Base>,
  U extends RxDocumentData<Base>
>({
  mainKey,
  relatedKey,
  mainTable,
  relatedTable,
  filterKey,
  highlight = false,
  modalComponent: CustomModal = Modal,
  modalProps = {},
  onItemClick,
}: DisplayProps<T, U>) {
  const database = useDatabase();
  const [mainData, setMainData] = useState<RxDocumentData<T>[]>([]);
  const [relatedData, setRelatedData] = useState<ExtendedRelatedData<U>[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] =
    useState<ExtendedRelatedData<U> | null>(null);
  const [needsStep, setNeedsStep] = useState(1);

  const fetchMainData = async () => {
    const response = await database.getFromDb<T>(mainTable);
    let data = response;

    if (filterKey && !highlight) {
      const now = new Date();
      data = data.filter(
        (item) =>
          new Date(item[filterKey as keyof T] as unknown as string) > now
      );
    }

    setMainData(data);
  };

  const fetchRelatedData = async () => {
    const response = await database.getFromDb<U>(relatedTable);
    let data = response;

    if (filterKey && highlight) {
      const now = new Date();
      data = data.map((item) => ({
        ...item,
        highlighted:
          new Date(item[filterKey as keyof U] as unknown as string) > now,
      })) as ExtendedRelatedData<U>[];
    }

    setRelatedData(data as ExtendedRelatedData<U>[]);
  };

  useEffect(() => {
    fetchMainData();
    fetchRelatedData();
  }, []);

  const filteredData: FilteredData<ExtendedRelatedData<U>>[] = mainData.map(
    (mainItem) => {
      const filteredItems = relatedData
        .filter(
          (relatedItem) =>
            (relatedItem[relatedKey] as unknown as string) ===
            (mainItem[mainKey] as unknown as string)
        )
        .map((item) => ({
          ...item,
          label: item.name, // Explicitly add the `label` property here
        }));
      return { key: mainItem.name, items: filteredItems };
    }
  );

  const handleItemClick = (item: ExtendedRelatedData<U>) => {
    setSelectedItem(item);
    setModalOpen(true);
    if (onItemClick) onItemClick(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setModalOpen(false);
  };

  const handleAction = (actionType: string) => {
    console.log(`Action triggered: ${actionType}`);
    setModalOpen(false);
  };

  const handleStepDecrease = () => {
    setNeedsStep((prev) => Math.max(1, prev - 1));
  };

  return (
    <>
      <div className="w-11/12 m-auto">
        {filteredData.map((data, index) => (
          <Section
            key={index}
            categoryData={{
              key: data.key,
              items: data.items,
            }}
            handleOpen={(item) => handleItemClick(item)}
          />
        ))}
      </div>
      <CustomModal
        modalOpen={modalOpen}
        title={`You have selected ~${selectedItem?.label}~`}
        forwardButton={{
          label: "Confirm",
          action: () => handleAction("confirm"),
        }}
        backButton={{
          label: "Cancel",
          action: () => handleAction("cancel"),
        }}
        onClose={handleCloseModal}
        needsStep={needsStep}
        onBackClick={handleStepDecrease}
      />
    </>
  );
}
