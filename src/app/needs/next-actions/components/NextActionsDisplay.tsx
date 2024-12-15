"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useDatabase } from "@/context/DatabaseContext";
import { RxDocumentData } from "rxdb";
import toTitleCase from "@/lib/utils/toTitleCase";
import NextActionsSection from "./NextActionsSection";
import Button from "@/ui/shared/Button";
import clsx from "clsx";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [highlightedNeeds, setHighlightedNeeds] = useState<NeedDocument[]>([]);
  const [relatedNextActions, setRelatedNextActions] = useState<NextActionDocument[]>([]);
  const [chainEnd, setChainEnd] = useState(0); 
  // chainEnd increments after toggling actions to refetch and update UI

  useEffect(() => {
    async function fetchData() {
      // 1. Fetch all needs (as RxDocuments), then to JSON
      const needsDocs = await database.getFromDb("needs");
      const allNeeds = needsDocs.map(doc => doc.toJSON() as NeedDocument);

      // 2. Highlighted needs check: selectedExpiry in the future means highlighted
      const now = new Date();
      const filteredNeeds = allNeeds.filter(need => {
        const expiry = new Date(need.selectedExpiry);
        return expiry > now && need.priority && need.priority.order > 0;
      });

      setHighlightedNeeds(filteredNeeds);

      // 3. Fetch all next actions (as RxDocuments), then to JSON
      const nextActionsDocs = await database.getFromDb("next_actions");
      const allNextActions = nextActionsDocs.map(doc => doc.toJSON() as NextActionDocument);

      // 4. Filter next actions to only those related to highlighted needs
      const highlightedNeedIds = new Set(filteredNeeds.map(need => need.id));
      const filteredNextActions = allNextActions.filter(na => highlightedNeedIds.has(na.need));

      setRelatedNextActions(filteredNextActions);
    }

    fetchData();
  }, [database, chainEnd]);

  // Group and sort highlighted needs by priority
  const priorityGroups = useMemo(() => {
    if (highlightedNeeds.length === 0) return [];

    const needsWithPriority = highlightedNeeds.filter(
      need => need.priority && need.priority.order
    );

    const sortedNeeds = needsWithPriority.sort((a, b) =>
      a.priority!.order - b.priority!.order
    );

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

    return Object.values(groupsMap);
  }, [highlightedNeeds]);

  // Helper to get next actions for a given need
  const getActionsForNeed = (needId: string) => {
    return relatedNextActions.filter(action => action.need === needId);
  };

  // onToggleAction logic
  const onToggleAction = async (action: NextActionDocument) => {
    const highlighted = new Date(action.selectedExpiry) > new Date(action.timestamp);
    const collectionName = "next_actions";

    if (highlighted) {
      // Un-highlight action:
      // Remove last selectedTimestamp
      const updatedTimestamps = [...action.selectedTimestamps];
      updatedTimestamps.pop();
      
      // Set selectedExpiry back to the original timestamp
      await database.updateDocument(
        collectionName,
        action.id,
        "selectedTimestamps",
        updatedTimestamps
      );

      await database.updateDocument(
        collectionName,
        action.id,
        "selectedExpiry",
        action.timestamp
      );
    } else {
      // Highlight action:
      // Add new selectedTimestamp
      const updatedTimestamps = [...action.selectedTimestamps, new Date().toISOString()];

      // Find the parent need to copy its selectedExpiry
      const parentNeed = highlightedNeeds.find((need) => need.id === action.need);
      if (!parentNeed) {
        console.error("Parent need not found for action:", action);
        return;
      }

      await database.updateDocument(
        collectionName,
        action.id,
        "selectedTimestamps",
        updatedTimestamps
      );

      await database.updateDocument(
        collectionName,
        action.id,
        "selectedExpiry",
        parentNeed.selectedExpiry
      );
    }

    // After toggling, increment chainEnd to re-fetch and update UI
    setChainEnd(prev => prev + 1);
  };

  const saveAndExit = () => {
    // All changes are saved on toggle, so just navigate back
    router.push("/needs");
  };

  return (
    <div className="w-11/12 m-auto">
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
            
            {group.needs.map((need) => {
              const actions = getActionsForNeed(need.id);

              return (
                <>
                  <div key={need.id} className="ml-4 mb-4">
                    <h4 className="font-semibold">{need.name}</h4>

                    {actions.length > 0 ? (
                      <NextActionsSection
                        need={need}
                        actions={actions}
                        onToggleAction={onToggleAction}
                      />
                    ) : (
                      <p className="text-sm text-gray-500 ml-6">No next actions available for this need.</p>
                    )}
                  </div>
        
                  <Button
                    onClick={saveAndExit}
                    label="Save & Exit"
                    className={clsx(
                      "fixed right-4 bottom-24 text-white rounded",
                      "bg-twd-primary-purple shadow-twd-primary-purple"
                    )}
                  />
                </>
              );
            })}
          </div>
        ))
      )}
    </div>
  );
}