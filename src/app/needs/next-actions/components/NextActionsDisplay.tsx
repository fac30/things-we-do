"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useDatabase } from "@/context/DatabaseContext";
import clsx from "clsx";
import changeCase from "@/lib/utils/changeCase";
import NextActionsSection from "./NextActionsSection";

export interface NeedDocument {
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
}

export interface NextActionDocument {
  id: string;
  name: string;
  need: string;
  selectedTimestamps: string[];
  selectedExpiry: string;
  timestamp: string;
}

export default function NextActionsDisplay() {
  const database = useDatabase();
  const [highlightedNeeds, setHighlightedNeeds] = useState<NeedDocument[]>([]);
  const [relatedNextActions, setRelatedNextActions] = useState<NextActionDocument[]>([]);
  const [chainEnd, setChainEnd] = useState(0);

  useEffect(() => { /* Fetch Data */
    async function fetchData() {
      const needsDocs = await database.getFromDb("needs");
      const allNeeds = needsDocs.map(doc => doc.toJSON() as NeedDocument);
      const now = new Date();

      const filteredNeeds = allNeeds.filter(need => {
        const expiry = new Date(need.selectedExpiry);
        return expiry > now && need.priority && need.priority.order > 0;
      });

      setHighlightedNeeds(filteredNeeds);

      const nextActionsDocs = await database.getFromDb("next_actions");

      const allNextActions = nextActionsDocs.map(
        doc => doc.toJSON() as NextActionDocument
      );

      const highlightedNeedIds = new Set(filteredNeeds.map(
        need => need.id
      ));

      const filteredNextActions = allNextActions.filter(
        action => highlightedNeedIds.has(action.need)
      );

      setRelatedNextActions(filteredNextActions);
    }

    fetchData();
  }, [database, chainEnd]);

  const priorityGroups = useMemo(() => {
    if (highlightedNeeds.length === 0) return [];

    const needsWithPriority = highlightedNeeds.filter(
      need => need.priority && need.priority.order
    );

    const sortedNeeds = needsWithPriority.sort((a, b) =>
      a.priority!.order - b.priority!.order
    );

    const groupsMap: Record<number, { 
      priority: { 
        order: number;
        name: string;
      };
      needs: NeedDocument[]
    }> = {};

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

  const getActionsForNeed = (needId: string) => {
    return relatedNextActions.filter(action => action.need === needId);
  };

  const onToggleAction = async (action: NextActionDocument) => {
    const highlighted = new Date(action.selectedExpiry) > new Date();
    const collectionName = "next_actions";

    if (highlighted) {
      const updatedTimestamps = [...action.selectedTimestamps];
      updatedTimestamps.pop();
      
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

    setChainEnd(prev => prev + 1);
  };
 
  return (
    <div className="w-11/12 m-auto">
      { priorityGroups.length === 0 ?
        (<p className="mb-5">
          You have no unmet needs selected. Review which needs might be unmet before we can recommend next actions to meet them.
        </p>) :
        (priorityGroups.map((group, i) => (
          <div key={i} className="mb-6">
            <h3
              className={clsx(
                "text-xl font-bold mb-2",
                {"text-twd-cube-red" : group.priority.order === 1 },
                {"text-twd-cube-yellow" : group.priority.order === 2},
                {"text-twd-cube-blue" : group.priority.order === 3},
                {"text-twd-cube-green" : group.priority.order === 4}
              )}
            >
              {changeCase(group.priority.name, "sentence")}
            </h3>
            
            {group.needs.map((need) => {
              const actions = getActionsForNeed(need.id);

              return (
                <div key={need.id} className="ml-4 mb-4">
                  <h4 className="font-semibold">
                    To meet a need for {changeCase(need.name, "lower")}, which actions can you take next?
                  </h4>

                  { actions.length > 0 ? (
                    <NextActionsSection
                      need={need}
                      actions={actions}
                      onToggleAction={onToggleAction}
                    />
                  ) : (
                    <p className="text-sm text-gray-500 ml-6">
                      No next actions available for this need.
                    </p>
                  )
                  }
                  </div>
              );
            })}
          </div>
        )))
      }
    </div>
  );
}