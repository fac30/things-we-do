import { useToolkitForm } from "@/context/ToolkitFormContext";
import * as Icons from "@heroicons/react/24/outline";

export default function AddImageUrl() {
  const { setFormState } = useToolkitForm();

  const iconList = Object.entries(Icons).map(([name]) => name);

  const selectIcon = (iconName: string) => {
    setFormState((prev) => ({
      ...prev,
      imageUrl: iconName,
    }));
  };

  return (
    <div>
      <p className="text-white">Icon</p>
      <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto">
        {iconList.map((iconName) => {
          const IconComponent = Icons[iconName as keyof typeof Icons];
          return (
            <button
              key={iconName}
              onClick={() => selectIcon(iconName)}
              className="p-2 hover:bg-twd-secondary-purple rounded"
            >
              <IconComponent className="h-6 w-6 text-white" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
