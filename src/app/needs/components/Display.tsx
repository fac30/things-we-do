"use client";

import { useState, useEffect } from "react";
import { useDatabase } from "@/context/DatabaseContext";
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
  onItemClick?: (item: U & { label: string }) => void;
  modalComponent?: React.ElementType<any>; // Accepts a custom modal component
  modalProps?: Record<string, any>; // Additional props for the modal
}

type ExtendedRelatedData<U> = U & { highlighted?: boolean };

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
  onItemClick,
  modalComponent: CustomModal,
  modalProps = {},
}: DisplayProps<T, U>) {
  const database = useDatabase();
  const [mainData, setMainData] = useState<RxDocumentData<T>[]>([]);
  const [relatedData, setRelatedData] = useState<ExtendedRelatedData<U>[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<U | null>(null);

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

    setRelatedData(data);
  };

  useEffect(() => {
    fetchMainData();
    fetchRelatedData();
  }, []);

  const filteredData: FilteredData<
    ExtendedRelatedData<U> & { label: string }
  >[] = mainData.map((mainItem) => {
    const filteredItems = relatedData
      .filter(
        (relatedItem) =>
          (relatedItem[relatedKey] as unknown as string) ===
          (mainItem[mainKey] as unknown as string)
      )
      .map((item) => ({
        ...item,
        label: item.name,
      })) as (ExtendedRelatedData<U> & { label: string })[];
    return { key: mainItem.name, items: filteredItems };
  });

  const handleItemClick = (item: U & { label: string }) => {
    setSelectedItem(item);
    setModalOpen(true);
    if (onItemClick) onItemClick(item);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
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
      {CustomModal && (
        <CustomModal
          modalOpen={modalOpen}
          onClose={handleCloseModal}
          selectedItem={selectedItem}
          {...modalProps}
        />
      )}
    </>
  );
}
