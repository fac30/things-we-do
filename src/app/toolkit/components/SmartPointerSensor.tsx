import type { PointerEvent } from "react";
import { PointerSensor } from "@dnd-kit/core";


/**
 * A custom PointerSensor that prevents drag interactions
 * on interactive elements (button, input, textarea, etc.).
 */
export class SmartPointerSensor extends PointerSensor {
  static activators = [
    {
      eventName: "onPointerDown" as any,
      handler: ({ nativeEvent: event }: PointerEvent) => {
        console.log("Pointer down event:", event.target, isInteractiveElement(event.target as Element));
        // Check if the target is an interactive element
        if (
          !event.isPrimary || // Ignore secondary or non-primary pointer events
          event.button !== 0 || // Only allow left-click to trigger drag
          isInteractiveElement(event.target as Element) // Block interactive elements
        ) {
          return false; // Prevent drag
        }

        return true; // Allow drag for non-interactive elements
      },
    },
  ];
}

/**
 * Determines if the given element is interactive
 * and should block drag actions.
 */
function isInteractiveElement(element: Element | null): boolean {
  const interactiveElements = ["button", "input"];
  return element?.tagName
    ? interactiveElements.includes(element.tagName.toLowerCase())
    : false;
}
