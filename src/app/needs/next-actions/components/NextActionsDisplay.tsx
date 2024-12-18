"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useDatabase } from "@/context/DatabaseContext";
import clsx from "clsx";
import changeCase from "@/lib/utils/changeCase";
import NextActionsSection from "./NextActionsSection";
import Modal from "@/ui/shared/Modal";
import { TrashIcon } from "@heroicons/react/24/outline";

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
  const [relatedNextActions, setRelatedNextActions] = useState<
    NextActionDocument[]
  >([]);
  const [chainEnd, setChainEnd] = useState(0);
  const [actionState, setActionState] = useState(0);
  const [mode, setMode] = useState<"create" | "destroy">("create");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [choppingBlock, setChoppingBlock] = useState<NextActionDocument | null>(
    null
  );

  useEffect(() => {
    /* Fetch Data */
    async function fetchData() {
      const needsDocs = await database.getFromDb("needs");
      const allNeeds = needsDocs.map((doc) => doc.toJSON() as NeedDocument);
      const now = new Date();

      const filteredNeeds = allNeeds.filter((need) => {
        const expiry = new Date(need.selectedExpiry);
        return expiry > now && need.priority && need.priority.order > 0;
      });

      setHighlightedNeeds(filteredNeeds);

      const nextActionsDocs = await database.getFromDb("next_actions");

      const allNextActions = nextActionsDocs.map(
        (doc) => doc.toJSON() as NextActionDocument
      );

      const highlightedNeedIds = new Set(filteredNeeds.map((need) => need.id));

      const filteredNextActions = allNextActions.filter((action) =>
        highlightedNeedIds.has(action.need)
      );

      setRelatedNextActions(filteredNextActions);
    }

    fetchData();
  }, [database, chainEnd, actionState]);

  useEffect(() => {
    /* Log Mode Change */
    console.log(`...to ${mode}.`);
  }, [mode]);

  const priorityGroups = useMemo(() => {
    if (highlightedNeeds.length === 0) return [];

    const needsWithPriority = highlightedNeeds.filter(
      (need) => need.priority && need.priority.order
    );

    const sortedNeeds = needsWithPriority.sort(
      (a, b) => a.priority!.order - b.priority!.order
    );

    const groupsMap: Record<
      number,
      {
        priority: {
          order: number;
          name: string;
        };
        needs: NeedDocument[];
      }
    > = {};

    for (const need of sortedNeeds) {
      const order = need.priority!.order;

      if (!groupsMap[order]) {
        groupsMap[order] = {
          priority: need.priority!,
          needs: [],
        };
      }

      groupsMap[order].needs.push(need);
    }

    return Object.values(groupsMap);
  }, [highlightedNeeds]);

  const getActionsForNeed = (needId: string) => {
    return relatedNextActions.filter((action) => action.need === needId);
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
      const updatedTimestamps = [
        ...action.selectedTimestamps,
        new Date().toISOString(),
      ];

      const parentNeed = highlightedNeeds.find(
        (need) => need.id === action.need
      );
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

    setChainEnd((prev) => prev + 1);
  };

  const onDeleteAction = async (action: NextActionDocument) => {
    setChoppingBlock(action);
    setIsDeleteModalOpen(true);
  };

  const onReallyDeleteAction = async (action: NextActionDocument) => {
    await database.deleteFromDb("next_actions", action.id);

    setChoppingBlock(null);
    setChainEnd((prev) => prev + 1);
  };

  const onToggleMode = () => {
    switch (mode) {
      case "create":
        setMode("destroy");
        break;
      case "destroy":
        setMode("create");
        break;
    }
  };

  const handleAddAction = async (newAction: string, need: NeedDocument) => {
    if (newAction.trim()) {
      const newActionDocument = {
        id: crypto.randomUUID(),
        name: newAction.trim(),
        need: need.id,
        selectedTimestamps: [],
        selectedExpiry: new Date().toISOString(),
        timestamp: new Date().toISOString(),
      };
      try {
        await database.addToDb("next_actions", newActionDocument);
        console.log(`Action Created: ${newActionDocument.name}`);
      } catch (error) {
        console.error("Error creating Action:", error);
      }

      setActionState((prev) => prev + 1);
      console.log(`Action State: ${actionState}`);
    }
  };

  return (
    <div className="w-11/12 m-auto">
      {priorityGroups.length === 0 ? (
        <p className="mb-5">
          You have no unmet needs selected. Review which needs might be unmet
          before we can recommend next actions to meet them.
        </p>
      ) : (
        priorityGroups.map((group, i) => (
          <div key={i} className="mb-6">
            <h3
              className={clsx(
                "text-xl font-bold mb-2",
                { "text-twd-cube-red": group.priority.order === 1 },
                { "text-twd-cube-yellow": group.priority.order === 2 },
                { "text-twd-cube-blue": group.priority.order === 3 },
                { "text-twd-cube-green": group.priority.order === 4 }
              )}
            >
              {changeCase(group.priority.name, "sentence")}
            </h3>

            {group.needs.map((need) => {
              const actions = getActionsForNeed(need.id);

              return (
                <div key={need.id}>
                  <h4 className="font-normal mb-4">
                    To meet a need for {changeCase(need.name, "lower")}, which
                    actions can you take next?
                  </h4>

                  <NextActionsSection
                    need={need}
                    actions={actions}
                    onToggleAction={onToggleAction}
                    onDeleteAction={onDeleteAction}
                    mode={mode}
                    handleAddAction={handleAddAction}
                  />
                </div>
              );
            })}
          </div>
        ))
      )}

      <button aria-label="Delete next actions">
        <TrashIcon
          className={clsx(
            "w-16 h-16 fixed bottom-20 right-5 shadow-lg text-white  p-4 rounded-full transform transition-all duration-200 ease-in-out",
            {
              "bg-gray-600": mode !== "destroy", // Add this class when mode is "destroy"
              "bg-gradient-to-r from-twd-primary-purple to-purple-600":
                mode === "destroy", // Add this class when mode is "destroy"
            }
          )}
          onClick={() => {
            console.log(`Toggling mode from ${mode}...`);
            onToggleMode();
          }}
        />
      </button>

      <Modal
        title="Delete this action?"
        modalOpen={isDeleteModalOpen}
        forwardButton={{
          action: () => {
            if (choppingBlock) {
              onReallyDeleteAction(choppingBlock);
            }
            setIsDeleteModalOpen(false);
          },
          label: "Yes",
        }}
        backButton={{
          action: () => {
            setIsDeleteModalOpen(false);
          },
          label: "No",
        }}
      />
    </div>
  );
}
