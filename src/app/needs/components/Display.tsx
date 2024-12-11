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
  items: U[];
}

interface DisplayProps<
  T extends RxDocumentData<Base>,
  U extends RxDocumentData<Base & Record<string, any>>
> {
  mainKey: keyof T;
  relatedKey: keyof U;
  mainTable: string;
  relatedTable: string;
}

export default function Display<
  T extends RxDocumentData<Base>,
  U extends RxDocumentData<Base>
>({ mainKey, relatedKey, mainTable, relatedTable }: DisplayProps<T, U>) {
  const database = useDatabase();
  const [mainData, setMainData] = useState<RxDocumentData<T>[]>([]);
  const [relatedData, setRelatedData] = useState<RxDocumentData<U>[]>([]);

  const fetchMainData = async () => {
    const response = await database.getFromDb<T>(mainTable);
    setMainData(response);
  };

  const fetchRelatedData = async () => {
    const response = await database.getFromDb<U>(relatedTable);
    setRelatedData(response);
  };

  useEffect(() => {
    fetchMainData();
    fetchRelatedData();
  }, []);

  const filteredData: FilteredData<U & { label: string }>[] = mainData.map(
    (mainItem) => {
      const filteredItems = relatedData
        .filter(
          (relatedItem) =>
            (relatedItem[relatedKey] as unknown as string) ===
            (mainItem[mainKey] as unknown as string)
        )
        .map((item) => ({
          ...item,
          label: item.name, // Add label here
        })) as (U & { label: string })[]; // Explicit type assertion
      return { key: mainItem.name, items: filteredItems };
    }
  );

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);

  return (
    <>
      <div className="w-11/12 m-auto">
        {filteredData.map((data, index) => (
          <Section
            key={index}
            categoryData={{
              key: data.key, // Precomputed key
              items: data.items, // Items already include precomputed label
            }}
            handleOpen={handleOpen}
          />
        ))}
      </div>
      <Modal modalOpen={modalOpen} />
    </>
  );
}
