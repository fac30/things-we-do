import Button from "@/ui/shared/Button";
import { Need } from "./NeedsDisplay";

interface NeedsSectionProps {
  categoryData: {
    category: string;
    needs: Need[];
  };
  handleOpen: (needName: string) => void;
}

export default function NeedsSection({
  categoryData,
  handleOpen,
}: NeedsSectionProps) {
  console.log(categoryData);
  return (
    <div>
      <h2 className="text-xl mb-5 font-semibold">{categoryData.category}</h2>
      <div className="flex gap-5 flex-wrap mb-10">
        {categoryData.needs.map((need: Need, needIndex: number) => {
          return (
            <Button
              key={needIndex}
              label={need.name}
              className="bg-gray-600 font-normal text-nowrap"
              onClick={() => handleOpen(need.name)}
            />
          );
        })}
      </div>
    </div>
  );
}
