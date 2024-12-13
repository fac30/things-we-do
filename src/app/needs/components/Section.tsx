import Button from "@/ui/shared/Button";
import clsx from "clsx";

interface SectionProps<U> {
  categoryData: {
    key: string;
    items: (U & { label: string; highlighted?: boolean; mood?: string })[];
  };
  handleOpen: (
    item: U & { label: string; highlighted?: boolean; mood?: string }
  ) => void;
}

const moodColors: Record<string, string> = {
  interest: "bg-twd-mood-interest-yellow",
  guilt: "bg-twd-mood-guilt-blue",
  freeze: "bg-twd-mood-freeze-red",
  "fight/flight": "bg-twd-mood-fight-red",
  joy: "bg-twd-mood-joy-yellow",
  content: "bg-twd-mood-content-green",
  relief: "bg-twd-mood-relief-green",
  distress: "bg-twd-mood-distress-blue",
};

export default function Section<U>({
  categoryData,
  handleOpen,
}: SectionProps<U>) {
  return (
    <div>
      <h2 className="text-xl mb-5 font-semibold">{categoryData.key}</h2>
      <div className="flex gap-5 flex-wrap mb-10">
        {categoryData.items.map((item, index) => (
          <Button
            key={index}
            label={item.label}
            className={clsx(
              "font-normal text-nowrap",
              item.highlighted
                ? "text-black " + moodColors[item.mood || ""] ||
                    "bg-twd-primary-purple"
                : "bg-gray-600"
            )}
            onClick={() => handleOpen(item)}
          />
        ))}
      </div>
    </div>
  );
}
