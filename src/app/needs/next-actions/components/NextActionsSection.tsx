"use client";

import React from "react";
import Button from "@/ui/shared/Button";
import { NeedDocument } from "./NextActionsDisplay";
import { NextActionDocument } from "./NextActionsDisplay";

interface NextActionsSectionProps {
  need: NeedDocument;
  actions: NextActionDocument[];
  onToggleAction: (action: NextActionDocument) => Promise<void>;
}

export default function NextActionsSection({
  actions,
  onToggleAction,
}: NextActionsSectionProps) {
  return (
    <div className="ml-4 mb-6">
      {actions.map((action) => {
        const highlighted = new Date(action.selectedExpiry) > new Date();

        return (
          <Button
            key={action.id}
            label={action.name}
            className={
              highlighted
                ? "bg-twd-primary-purple text-black"
                : "bg-gray-600 text-white"
            }
            onClick={() => onToggleAction(action)}
          />
        );
      })}
    </div>
  );
}