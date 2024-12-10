import Button from "@/ui/shared/Button";

export default function NeedsDisplay() {
  const needsData = [
    {
      needName: "Physical Nurturance",
      needsArr: [
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
    },
    {
      needName: "Play",
      needsArr: ["Play", "Laughter"],
    },
    {
      needName: "Interdependence",
      needsArr: [
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
    },
    {
      needName: "Celebration",
      needsArr: [
        "Celebration of life fulfilled",
        "Celebration of dreams fulfilled",
        "Mourning of dreams unfulfilled",
        "Mourning losses of loved ones",
      ],
    },
    {
      needName: "Harmony",
      needsArr: ["Peace", "Order", "Harmony", "Beauty", "Inspiration"],
    },
    {
      needName: "Integrity",
      needsArr: ["Authenticity", "Creativity", "Meaning", "Self worth"],
    },
    {
      needName: "Autonomy",
      needsArr: [
        "Choose dreams",
        "Choose goals",
        "Choose values",
        "Choose plan to fulfil dreams",
        "Choose plan to fulfil goals",
        "Choose plan to fulfil values",
      ],
    },
  ];

  return (
    <>
      <div className="w-11/12 m-auto">
        {needsData.map((need, index) => {
          return (
            <div key={index} className="">
              <h2 className="text-xl mb-5 font-semibold">{need.needName}</h2>
              <div className="flex gap-5 flex-wrap mb-10">
                {need.needsArr.map((arrItem, index) => {
                  return (
                    <Button
                      key={index}
                      label={arrItem}
                      className="bg-gray-600 font-normal text-nowrap"
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
