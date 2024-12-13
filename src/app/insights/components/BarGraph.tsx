

interface BarGraphProps {
    data: { name: string; value: number }[];
  }


export default function BarGraph({ data }: BarGraphProps) {
  return (
    <div className="bg-twd-graph-background mt-10 w-11/12 m-auto rounded-lg">
      <div className="w-10/12 m-auto pt-5">
        <h2 className="text-xl text-white">Unmet Needs</h2>
        <p className="text-gray-400">Summary of needs selected as unmet</p>
      </div>
      <div className="bg-twd-graph-background justify-center text-center px-6 pb-3 mb-10 mt-5">
        {data.map((need, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between text-sm text-white">
              <span>{need.name}</span>
              <span>{need.value}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-md h-3 mt-1">
              <div
                className="bg-twd-primary-purple h-3 rounded-sm"
                style={{ width: `${Math.min(need.value, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}