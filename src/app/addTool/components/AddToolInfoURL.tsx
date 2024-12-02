import { useToolkitForm } from "@/context/ToolkitFormContext";

export default function AddInfoURL() {
  const { formState, setFormState } = useToolkitForm();

  return (
    <div>
      <p className="text-white">Link</p>
      <input 
        type="url"
        value={formState.infoUrl}
        onChange={(e) => setFormState(prev => ({
          ...prev,
          infoUrl: e.target.value
        }))}
        className="w-full p-2 rounded bg-twd-background text-white border border-gray-700"
      />
    </div>
  );
}