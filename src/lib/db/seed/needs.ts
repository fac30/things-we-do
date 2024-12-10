import { v4 as uuidv4 } from "uuid";

const categories = {
  physicalNurturance: [
    "Air",
    "Food",
    "Water",
    "Movement",
    "Exercise",
    "Protection (insects, bacteria, virus, predators)",
    "Rest",
    "Sexual expression",
    "Shelter",
    "Touch",
  ],
  play: ["Play", "Laughter"],
  interdependence: [
    "Acceptance",
    "Appreciation",
    "Closeness",
    "Community",
    "Consideration",
    "Contribution to the enrichment of life",
    "Emotional safety",
    "Empathy",
    "Honesty",
    "Love",
    "Reassurance",
    "Respect",
    "Support",
    "Trust",
    "Understanding",
    "Warmth",
  ],
  celebration: [
    "Celebration of life fulfilled",
    "Celebration of dreams fulfilled",
    "Mourning of dreams unfulfilled",
    "Mourning losses of loved ones",
  ],
  harmony: ["Peace", "Order", "Harmony", "Beauty", "Inspiration"],
  integrity: ["Authenticity", "Creativity", "Meaning", "Self worth"],
  autonomy: [
    "Choose dreams",
    "Choose goals",
    "Choose values",
    "Choose plan to fulfil dreams",
    "Choose plan to fulfil goals",
    "Choose plan to fulfil values",
  ],
};

const normalize = (str: string) =>
  str
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/gi, "");

const capitalizeWords = (str: string) =>
  str.replace(/\b\w/g, (char) => char.toUpperCase());

const needsCategories = Object.keys(categories).map((key) => ({
  id: uuidv4(),
  name: capitalizeWords(key.replace(/([A-Z])/g, " $1").trim()),
  timestamp: new Date().toISOString(),
}));

const needs = Object.entries(categories).flatMap(([categoryKey, items]) => {
  const category = needsCategories.find(
    (c) => normalize(c.name) === normalize(categoryKey)
  );
  if (!category) throw new Error(`Category '${categoryKey}' not found`);

  return items.map((item) => ({
    id: uuidv4(),
    name: item,
    selectedTimestamps: [],
    selectedExpiry: new Date().toISOString(),
    category: category.id,
    timestamp: new Date().toISOString(),
  }));
});

const nextActions = needs.map((need) => {
  const actionName = suggestAction(need.name);
  return {
    id: uuidv4(),
    name: actionName,
    need: need.id,
    selectedTimestamps: [],
    selectedExpiry: new Date().toISOString(),
    timestamp: new Date().toISOString(),
  };
});

function suggestAction(needName: string): string {
  const suggestions: Record<string, string> = {
    Air: "Find fresh air to breathe deeply.",
    Food: "Prepare or purchase a nutritious meal.",
    Water: "Drink a glass of water.",
    Movement: "Stretch or take a short walk.",
    Exercise: "Schedule time for a workout.",
    "Protection (insects, bacteria, virus, predators)":
      "Secure a safe environment.",
    Rest: "Take a moment to relax and recharge.",
    "Sexual expression": "Communicate openly about your needs.",
    Shelter: "Ensure your space is clean and welcoming.",
    Touch: "Reach out for a hug or comforting touch.",
    Play: "Engage in a favorite game or activity.",
    Laughter: "Watch something funny or joke with friends.",
    Acceptance: "Practice self-acceptance through affirmations.",
    Appreciation: "Express gratitude to someone you care about.",
    Closeness: "Reach out to connect with a loved one.",
    Community: "Participate in a group or social event.",
    Consideration: "Take a moment to listen actively.",
    "Contribution to the enrichment of life":
      "Volunteer or offer help to someone in need.",
    "Emotional safety": "Talk to a trusted friend about your feelings.",
    Empathy: "Put yourself in someone else's shoes.",
    Honesty: "Share your thoughts transparently.",
    Love: "Spend quality time with someone close to you.",
    Reassurance: "Ask for or provide encouragement.",
    Respect: "Acknowledge someone's boundaries or contributions.",
    Support: "Offer or ask for support from friends or family.",
    Trust: "Engage in a trust-building activity.",
    Understanding: "Seek to understand another's perspective.",
    Warmth: "Create a cozy environment for yourself.",
    "Celebration of life fulfilled": "Plan a small celebration.",
    "Celebration of dreams fulfilled":
      "Acknowledge and celebrate achievements.",
    "Mourning of dreams unfulfilled":
      "Reflect and journal about your emotions.",
    "Mourning losses of loved ones": "Honor their memory in a meaningful way.",
    Peace: "Meditate or spend time in a calm space.",
    Order: "Organize your workspace or schedule.",
    Harmony: "Seek resolution in lingering conflicts.",
    Beauty: "Visit a place or object that inspires beauty.",
    Inspiration: "Explore art or literature for new ideas.",
    Authenticity: "Take a step that reflects your true self.",
    Creativity: "Work on a creative project.",
    Meaning: "Reflect on what gives you purpose.",
    "Self worth": "Write a list of your positive attributes.",
    "Choose dreams": "Visualize your ideal future.",
    "Choose goals": "Set clear, actionable goals.",
    "Choose values": "Identify your core values.",
    "Choose plan to fulfil dreams": "Create a roadmap to achieve your dreams.",
    "Choose plan to fulfil goals": "Break down your goals into steps.",
    "Choose plan to fulfil values": "Act in alignment with your values.",
  };

  return suggestions[needName] || "Take a small step toward meeting this need.";
}

export { needsCategories, needs, nextActions };
