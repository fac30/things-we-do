/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useDatabase } from "@/context/DatabaseContext";
import LineGraph from "./LineGraph";
import MoodAreaChart from "./AreaChart";
import retrieveDataObject from "@/lib/utils/retrieveDataObject";
import { useState, useEffect } from "react";

import Button from "@/ui/shared/Button";
import clsx from "clsx";
import MoodStreamGraph from "./StreamGraph";

export interface Insight {
  neurotransmitters: {
    dopamine: number;
    serotonin: number;
    adrenaline: number;
  };
  moodName: string;
  timestamp: string;
  id: string;
  createdAt: string;
}

export default function InsightsDisplay() {
  const database = useDatabase();
  const [insights, setInsights] = useState<Insight[] | null>(null);

  const dateOptions = ["day", "week", "month", "year"];

  const handleDateChange = (dateChoice: keyof typeof dateOffsets) => {
    setSelectedButton(dateChoice);
  };

  const [selectedButton, setSelectedButton] = useState<keyof typeof dateOffsets>("day");

  /* Handler & State for Currently Unused "To Now" Button
    const [useNow, setUseNow] = useState(true);

    const handleUseNowClick = () => {
      setUseNow((prevUseNow) => !prevUseNow);
    }; */
  
  const [now, setNow] = useState<Date | null>(null);

  const getDateRange = (selected: keyof typeof dateOffsets) => {
    if (!now) return { start: new Date(), end: new Date() };
    const offset = dateOffsets[selected];
    const start = new Date(now.getTime() - offset);
    const end = now;
    return { start, end };
  };
  
  const dateOffsets = {
    day: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    year: 365 * 24 * 60 * 60 * 1000
  } as const;

  const [startOfRange, setStartOfRange] = useState<Date>(new Date());
  const [endOfRange, setEndOfRange] = useState<Date>(new Date());

  useEffect(() => {
    if (!now) return;
    const { start, end } = getDateRange(selectedButton);
    setStartOfRange(start);
    setEndOfRange(end);
  }, [/* useNow, */ selectedButton, now]);
  

  const getInsights = async () => {
    const myInsights = await database.getFromDb("mood_records");

    if (!myInsights) {
      console.log("No insights found.");
      setInsights([]);
      return;
    }
    const goodInsights = retrieveDataObject(myInsights);

    setInsights(goodInsights);

    if (goodInsights.length > 0) {
      const latestInsight = goodInsights.reduce((acc, curr) => {
        return new Date(curr.timestamp) > new Date(acc.timestamp) ? curr : acc;
      });
      setNow(new Date(latestInsight.timestamp));
    } else {
      setNow(new Date());
    }
  };

  useEffect(() => { 
    getInsights(); 
  }, []);

  return (
    <>
      <div className="flex text-center w-full m-auto justify-between bg-twd-navbar-background py-2 px-4 sticky top-0 z-50">
        {dateOptions.map((dateOption, index) => {
          const isActive = selectedButton === dateOption;
          return (
            <Button
              key={index}
              label={dateOption}
              onClick={() => handleDateChange(dateOption as keyof typeof dateOffsets)}
              className={clsx("font-normal", isActive && "bg-twd-primary-purple text-white")}
            />
          );
        })}

        {/* DO NOT DELETE THIS COMMENTED BUTTON - UNCOMMENT IT WHEN CUSTOM DATE RANGE IS IMPLEMENTED <Button
          label="To Date"
          className={clsx(useNow && "bg-white text-black")}
          onClick={handleUseNowClick}
        /> */}
      </div>

      {insights ? ( // Line Graph
        <LineGraph
            dataArray={insights}
            startOfRange={startOfRange}
            endOfRange={endOfRange}
            selectedButton={selectedButton}
          />
        ) : (
          <div>Loading Line Graph...</div>
      )}

      {insights ? ( // Area Chart
        <>
          <MoodAreaChart
            dataArray={insights}
            startOfRange={startOfRange}
            endOfRange={endOfRange}
            selectedButton={selectedButton}
          />
        </>
      ) : (
        <div>Loading Area Chart...</div>
      )}

      {insights ? ( // Stream Graph
        <>
          <MoodStreamGraph
            dataArray={insights}
            startOfRange={startOfRange}
            endOfRange={endOfRange}
            selectedButton={selectedButton}
          />
        </>
      ) : (
        <div>Loading Stream Graph...</div>
      )}
    </>
  );
}