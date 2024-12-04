interface MatrixToggleProps {
  isPriorityMatrix: boolean;
  setIsPriorityMatrix: (value: boolean) => void;
}

export default function MatrixToggle({
  isPriorityMatrix,
  setIsPriorityMatrix,
}: MatrixToggleProps) {
  const handleMatrixToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPriorityMatrix(e.target.checked);
    console.log("Matrix toggled:", e.target.checked ? "Priority" : "Mood");
  };

  return (
    <label
      htmlFor="matrix"
      className="flex justify-center items-center cursor-pointer"
    >
      <span
        className={`mr-3 text-lg font-medium font-blanch ${
          !isPriorityMatrix ? "text-purple-500" : ""
        }`}
      >
        Mood
      </span>
      <input
        id="matrix"
        type="checkbox"
        checked={isPriorityMatrix}
        value={isPriorityMatrix ? "priority" : "mood"}
        onChange={handleMatrixToggle}
        className="sr-only peer"
      />
      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-twd-primary-purple rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
      <span
        className={`ms-3 text-lg font-medium font-blanch ${
          isPriorityMatrix ? "text-purple-500" : ""
        }`}
      >
        Priority
      </span>
    </label>
  );
}
