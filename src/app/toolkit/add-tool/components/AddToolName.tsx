import { useAddToolForm } from "@/context/AddToolContext";

export default function AddName() {
  const { formState, setFormState } = useAddToolForm();

  return (
    <div>
      <label className="text-white block mb-1">Name</label>
      <input
        type="text"
        value={formState.name}
        onChange={(e) =>
          setFormState((prev) => ({
            ...prev,
            name: e.target.value,
          }))
        }
        className="addToolInput"
        placeholder="E.g. breathing exercises"
        required
      />
    </div>
  );
}
