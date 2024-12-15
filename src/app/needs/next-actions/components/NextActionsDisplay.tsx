"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useDatabase } from "@/context/DatabaseContext";
import { RxDocumentData } from "rxdb";
import toTitleCase from "@/lib/utils/toTitleCase";

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
      const needsDocs = await database.getFromDb("needs");
      const allNeeds = needsDocs.map(doc => doc.toJSON() as NeedDocument);
      
      // 2. Highlighted needs check
      const now = new Date();
      const filteredNeeds = allNeeds.filter(need => {
        const expiry = new Date(need.selectedExpiry);
        return expiry > now;
      });

      setHighlightedNeeds(filteredNeeds);

      // 3. Fetch all next actions
      const nextActionsDocs = await database.getFromDb("next_actions");
      const allNextActions = nextActionsDocs.map(doc => doc.toJSON() as NextActionDocument);

      // 4. Filter next actions
      const highlightedNeedIds = new Set(filteredNeeds.map(need => need.id));
      const filteredNextActions = allNextActions.filter(na => highlightedNeedIds.has(na.need));

      setRelatedNextActions(filteredNextActions);
    }

    fetchData();
  }, [database]);

  // Group and sort highlighted needs by priority
  const priorityGroups = useMemo(() => {
    // If no needs, return empty
    if (highlightedNeeds.length === 0) return [];

    // Filter out any that don't have a priority (just in case)
    const needsWithPriority = highlightedNeeds.filter(need => need.priority && need.priority.order);

    // Sort by priority order (ascending)
    const sortedNeeds = needsWithPriority.sort((a, b) =>
      a.priority!.order - b.priority!.order
    );

    // Group by priority order
    const groupsMap: Record<number, { priority: { order: number; name: string}; needs: NeedDocument[] }> = {};
    for (const need of sortedNeeds) {
      const order = need.priority!.order;
      if (!groupsMap[order]) {
        groupsMap[order] = {
          priority: need.priority!,
          needs: []
        };
      }
      groupsMap[order].needs.push(need);
    }

    // Convert to array for rendering
    const groupArray = Object.values(groupsMap);

    return groupArray;
  }, [highlightedNeeds]);

  return (
    <div className="w-11/12 m-auto">
      <h2 className="text-2xl mb-6 mt-4">
        Next Actions Display
      </h2>
      {priorityGroups.length === 0 ? (
        <p className="mb-5">
          No highlighted needs found. Highlight some needs first, then come back here.
        </p>
      ) : (
        priorityGroups.map((group, i) => (
          <div key={i} className="mb-6">
            <h3 className="text-xl font-bold mb-2">
              {toTitleCase(group.needs[0].mood ?? "No mood")}: {toTitleCase(group.priority.name)}
            </h3>
            {group.needs.map((need) => (
              <div key={need.id} className="ml-4 mb-4">
                <h4 className="font-semibold">{need.name}</h4>
                <p className="text-sm text-gray-600">Need ID: {need.id}</p>
                {/* In a future step, we will render NextActionsSection here */}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}