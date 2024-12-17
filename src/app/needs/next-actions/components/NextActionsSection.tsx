"use client";

import React from "react";
import Button from "@/ui/shared/Button";
import { NeedDocument } from "./NextActionsDisplay";
import { NextActionDocument } from "./NextActionsDisplay";

interface NextActionsSectionProps {
  need: NeedDocument;
  actions: NextActionDocument[];
  onToggleAction: (action: NextActionDocument) => Promise<void>;
  onDeleteAction: (action: NextActionDocument) => Promise<void>;
  mode: "create" | "destroy";
}

export default function NextActionsSection({
  actions,
  onToggleAction,
  onDeleteAction,
  mode
}: NextActionsSectionProps) {
  return (
    <div className="ml-4 mb-6">
      {actions.map((action) => {
        const highlighted = new Date(action.selectedExpiry) > new Date();

        return (
          <Button label={action.name}
            key={action.id}
            className={ mode === "destroy"
              ? "bg-twd-cube-red text-black"
              : highlighted
                ? "bg-twd-primary-purple text-black"
                : "bg-gray-600 text-white"
            }
            onClick={() => (mode === "destroy"
              ? onDeleteAction(action)
              : onToggleAction(action)
            )}
          />
        );
      })}
    </div>
  );
}