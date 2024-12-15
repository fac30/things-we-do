"use client";

import React, { useEffect, useState } from "react";
import { useDatabase } from "@/context/DatabaseContext";
import { RxDocumentData } from "rxdb";

type NeedDocument = RxDocumentData<{
  id: string;
  name: string;
  category: string;
  selectedTimestamps: string[];
  selectedExpiry: string;
  mood?: string;
  priority?: {
    order: number;
    name: string;
  };
  timestamp: string;
}>;

type NextActionDocument = RxDocumentData<{
  id: string;
  name: string;
  need: string;
  selectedTimestamps: string[];
  selectedExpiry: string;
  timestamp: string;
}>;

export default function NextActionsDisplay() {
  const database = useDatabase();

  const [highlightedNeeds, setHighlightedNeeds] = useState<NeedDocument[]>([]);
  const [relatedNextActions, setRelatedNextActions] = useState<NextActionDocument[]>([]);

  useEffect(() => {
    async function fetchData() {
      // 1. Fetch all needs
      const allNeeds = await database.getFromDb<NeedDocument>("needs");
      
      // 2. Filter highlighted needs: 
      //    A need is highlighted if selectedExpiry > current time (assumes future expiry means highlighted)
      const now = new Date();
      const filteredNeeds = allNeeds.filter(need => {
        const expiry = new Date(need.selectedExpiry);
        return expiry > now;
      });

      setHighlightedNeeds(filteredNeeds);

      // 3. Fetch all next actions
      const allNextActions = await database.getFromDb<NextActionDocument>("next_actions");

      // 4. Filter next actions to only those related to the highlighted needs
      const highlightedNeedIds = new Set(filteredNeeds.map(need => need.id));
      const filteredNextActions = allNextActions.filter(na => highlightedNeedIds.has(na.need));

      setRelatedNextActions(filteredNextActions);
    }

    fetchData();
  }, [database]);

  useEffect(() => {
    if (highlightedNeeds.length > 0 || relatedNextActions.length > 0) {
      console.log("Highlighted Needs:", highlightedNeeds);
      console.log("Related Next Actions:", relatedNextActions);
    }
  }, [highlightedNeeds, relatedNextActions]);

  return (
    <div>
      <h2 className="text-2xl w-11/12 mb-6 mt-4 m-auto">
        Next Actions Display
      </h2>
      <p className="w-11/12 m-auto mb-5">
        Fetching highlighted needs and their related next actions…
      </p>
    </div>
  );
}