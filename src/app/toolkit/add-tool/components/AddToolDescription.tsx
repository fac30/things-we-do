import { useAddToolForm } from "@/context/AddToolContext";

export default function AddDescription() {
  const { formState, setFormState } = useAddToolForm();

  return (
    <div>
      <label className="text-white block mb-1">Description</label>
      <input
        type="text"
        value={formState.description}
        onChange={(e) =>
          setFormState((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
        className="w-full p-2 rounded bg-twd-background text-white border-b border-gray-700"
        placeholder="E.g. long, slow breaths and count to 10"
      />
    </div>
  );
}
