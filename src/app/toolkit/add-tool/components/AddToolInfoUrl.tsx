import { useAddToolForm } from "@/context/AddToolContext";

export default function AddInfoUrl() {
  const { formState, setFormState } = useAddToolForm();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      infoUrl: e.target.value,
    }));
  };

  return (
    <div>
      <label htmlFor="infoUrl" className="text-white block mb-1">
        Link
      </label>

      <input
        type="url"
        id="infoUrl"
        value={formState.infoUrl}
        onChange={handleUrlChange}
        className="addToolInput"
        placeholder="E.g. https://www.verywellmind.com/breathing-2584115"
      />
    </div>
  );
}
