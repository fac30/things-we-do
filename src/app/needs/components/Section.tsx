import Button from "@/ui/shared/Button";
import clsx from "clsx";

interface SectionProps<U> {
  categoryData: {
    key: string;
    items: (U & { label: string; highlighted?: boolean })[];
  };
  handleOpen: () => void;
}

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
              item.highlighted ? "bg-twd-primary-purple" : "bg-gray-600"
            )}
            onClick={handleOpen}
          />
        ))}
      </div>
    </div>
  );
}
