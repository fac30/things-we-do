import Button from "@/ui/shared/Button";

export default function NeedsSection({ categoryData, handleOpen }) {
  return (
    <div>
      <h2 className="text-xl mb-5 font-semibold">{categoryData.category}</h2>
      <div className="flex gap-5 flex-wrap mb-10">
        {categoryData.needs.map((need, needIndex) => {
          return (
            <Button
              key={needIndex}
              label={need.name}
              className="bg-gray-600 font-normal text-nowrap"
              onClick={handleOpen}
            />
          );
        })}
      </div>
    </div>
  );
}
