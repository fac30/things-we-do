import { useToolkitForm } from "@/context/ToolkitFormContext";

export default function AddName() {
  const { formState, setFormState } = useToolkitForm();

  return (
    <div>
      <p className="text-white">Name</p>
      <input 
        type="text" 
        value={formState.name}
        onChange={(e) => setFormState(prev => ({
          ...prev,
          name: e.target.value
        }))}
        className="w-full p-2 rounded bg-twd-background text-white border border-gray-700"
      />
    </div>
  );
}