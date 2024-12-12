import { useAddToolForm } from "@/context/AddToolContext";
// import * as Icons from "@heroicons/react/24/outline";

export default function AddImageUrl() {
  const { formState, setFormState } = useAddToolForm();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      imageUrl: e.target.value,
    }));
  };

  return (
    <div>
      <label htmlFor="imageUrl" className="text-white block mb-1">
        Image URL
      </label>

      <input
        type="url"
        id="imageUrl"
        value={formState.imageUrl}
        onChange={handleUrlChange}
        className="addToolInput"
        placeholder="E.g. https://freepik.com/peaceful-countryside-with-green-fields-cl_1177965-116395.jpg"
      />
    </div>
  );
}
