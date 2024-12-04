import PlotlyChart from "@/ui/shared/PlotlyChart";
import { useState, useEffect } from "react";
// import { start } from "repl";
import Button from "@/ui/shared/Button";
import clsx from "clsx"; // Make sure to import clsx

export default function LineGraph({ dataArray }) {
  const [startOfRange, setStartOfRange] = useState<Date>();
  const [endOfRange, setEndOfRange] = useState<Date>();
  const [selectedButton, setSelectedButton] = useState("day");
  const [useNow, setUseNow] = useState(true);

  const handleUseNowClick = () => {
    setUseNow((prevUseNow) => !prevUseNow);
  };
  const now = new Date();

  const dateParams = {
    day: {
      start: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        6,
        0,
        0,
        0
      ),
      end: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        24,
        0,
        0,
        0
      ),
    },
    // Monday to Sunday
    week: {
      start: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - now.getDay() + 1
      ),
      end: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - now.getDay() + 7
      ),
    },
    month: {
      start: new Date(now.getFullYear(), now.getMonth(), 1),
      end: new Date(now.getFullYear(), now.getMonth() + 1, 0),
    },
    year: {
      start: new Date(now.getFullYear(), 0, 1),
      end: new Date(now.getFullYear(), 11, 31),
    },
  };

  useEffect(() => {
    const { start, end } = dateParams[selectedButton];
    setStartOfRange(start);
    setEndOfRange(useNow ? now : end);
  }, [useNow, selectedButton]);

  if (!dataArray || dataArray.length === 0) {
    return <div>No data available for the graph.</div>;
  }

  const sortedData = [...dataArray].sort(
    (a, b) => new Date(a._data.timestamp) - new Date(b._data.timestamp)
  );

  const xAxis = sortedData.map((entry) =>
    new Date(entry._data.timestamp).toISOString()
  );
  const dopamineValues = sortedData.map(
    (entry) => entry._data.neurotransmitters.dopamine
  );

  const serotoninValues = sortedData.map(
    (entry) => entry._data.neurotransmitters.serotonin
  );

  const adrenalineValues = sortedData.map(
    (entry) => entry._data.neurotransmitters.adrenaline
  );

  const dateOptions = ["day", "week", "month", "year"];

  const handleDateChange = (dateChoice) => {
    setSelectedButton(dateChoice);
  };

  return (
    <>
      <div className="flex text-center w-full m-auto justify-between bg-twd-navbar-background py-2 px-4">
        {dateOptions.map((dateOption, index) => {
          const isActive = selectedButton === dateOption;
          return (
            <Button
              key={index}
              label={dateOption}
              onClick={() => handleDateChange(dateOption)}
              className={clsx(
                "font-normal", // base classes
                isActive && "bg-twd-primary-purple text-white" // add active class when selected
              )}
            />
          );
        })}
        <Button
          label="To Date"
          className={clsx(useNow && "bg-white text-black")}
          onClick={handleUseNowClick}
        />
      </div>
      <div className="w-11/12 m-auto flex justify-center text-center mb-10 mt-10">
        <PlotlyChart
          data={[
            {
              x: xAxis,
              y: dopamineValues,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "green" },
              line: { shape: "linear" },
              name: "Urgent",
            },
            {
              x: xAxis,
              y: serotoninValues,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "blue" },
              line: { shape: "linear" },
              name: "Effortful",
            },
            {
              x: xAxis,
              y: adrenalineValues,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "red" },
              line: { shape: "linear" },
              name: "Worthwile",
            },
          ]}
          layout={{
            width: 350,
            height: 350,
            margin: {
              l: 10,
              r: 10,
              t: 5,

              pad: 50,
            },
            paper_bgcolor: "#262538",
            plot_bgcolor: "#262538",
            xaxis: {
              title: "",
              tickformat: "%H:%M:%S",
              showgrid: false,
              titlefont: {
                color: "white",
              },
              showticklabels: true,
              tickfont: {
                color: "white",
              },
              range: [startOfRange.toISOString(), endOfRange.toISOString()],
            },
            yaxis: {
              title: "",
              range: [0, 10],
              showgrid: false,
              titlefont: {
                color: "white",
              },

              tickfont: {
                color: "white",
              },
            },
            legend: {
              font: {
                color: "white",
              },
            },
            hidesources: true,
          }}
          config={{ displayModeBar: false }}
        />
      </div>
    </>
  );
}
