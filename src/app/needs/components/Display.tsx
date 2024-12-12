"use client";

import { useState, useEffect, useCallback } from "react";
import { useDatabase } from "@/context/DatabaseContext";
import Section from "./Section";
import { RxDocument, RxDocumentData } from "rxdb";

export interface Base {
  id: string;
  name: string;
}

interface ModalProps<U> {
  modalOpen: boolean;
  onClose: () => void;
  selectedItem: U | null;
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
  modalComponent?: React.ComponentType<ModalProps<U>>;
  modalProps?: Partial<ModalProps<U>>;
  chainEnd: number;
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
  chainEnd,
}: DisplayProps<T, U>) {
  const database = useDatabase();
  const [mainData, setMainData] = useState<RxDocumentData<T>[]>([]);
  const [relatedData, setRelatedData] = useState<ExtendedRelatedData<U>[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<U | null>(null);

  const fetchMainData = useCallback(async () => {
    const response = await database.getFromDb<RxDocument<T>>(mainTable);
    let data = response.map((doc) => doc.toJSON() as RxDocumentData<T>);

    if (filterKey && !highlight) {
      const now = new Date();
      data = data.filter(
        (item) =>
          new Date(item[filterKey as keyof T] as unknown as string) > now
      );
    }

    setMainData(data);
  }, [database, mainTable, filterKey, highlight]);

  const fetchRelatedData = useCallback(async () => {
    const response = await database.getFromDb<RxDocument<U>>(relatedTable);
    let data = response.map((doc) => doc.toJSON() as RxDocumentData<U>);

    if (filterKey && highlight) {
      const now = new Date();
      data = data.map((item) => ({
        ...item,
        highlighted:
          new Date(item[filterKey as keyof U] as unknown as string) > now,
      })) as ExtendedRelatedData<U>[];
    }

    setRelatedData(data);
  }, [database, relatedTable, filterKey, highlight]);

  useEffect(() => {
    fetchMainData();
    fetchRelatedData();
  }, [fetchMainData, fetchRelatedData, chainEnd]);

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
