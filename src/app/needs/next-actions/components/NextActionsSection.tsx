"use client";

import React from "react";
import Button from "@/ui/shared/Button";

type Need = {
  id: string;
  name: string;
  selectedExpiry: string;
  timestamp: string;
};

type NextAction = {
  id: string;
  name: string;
  need: string;
  selectedTimestamps: string[];
  selectedExpiry: string;
  timestamp: string;
};

interface NextActionsSectionProps {
  need: Need;
  actions: NextAction[];
  onToggleAction: (action: NextAction) => void;
}

export default function NextActionsSection({
  actions,
  onToggleAction,
}: NextActionsSectionProps) {
  return (
    <div className="ml-4 mb-6">
      {actions.map((action) => {
        const highlighted = new Date(action.selectedExpiry) > new Date(action.timestamp);

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