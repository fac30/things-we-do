import { useToolkitForm } from "@/context/ToolkitFormContext";

export default function AddDescription() {
  const { formState, setFormState } = useToolkitForm();

  return (
    <div>
      <p className="text-white">Description</p>
      <input 
        type="text" 
        value={formState.name}
        onChange={(e) => setFormState(prev => ({
          ...prev,
          description: e.target.value
        }))}
        className="w-full p-2 rounded bg-twd-background text-white border border-gray-700"
      />
    </div>
  );
}