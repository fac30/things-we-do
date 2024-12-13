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
import BarGraph from "./BarGraph";

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

interface Need {
  id: string;
  name: string;
  category: string;
  selectedTimestamps: string[]; 
  timestamp: string; 
  selectedExpiry?: string; 
}

interface Category {
  id: string; 
  name: string; 
  timestamp: string; 
}

export default function InsightsDisplay() {
  const database = useDatabase();
  const [insights, setInsights] = useState<Insight[] | null>(null);
  const [needsData, setNeedsData] = useState<{ name: string; value: number }[] | null>(null);

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

  const getNeedsData = async () => {
    try {
      const needsResponse = await database.getFromDb("needs");
      const categoriesResponse = await database.getFromDb("needs_categories");

      const needs: Need[] = retrieveDataObject<Need>(needsResponse);
      const categories: Category[] = retrieveDataObject<Category>(categoriesResponse);
      console.log("Needs Data:", needs);
      console.log("Categories Data:", categories);

      // Aggregate `selectedTimestamps` counts by category
      const categoryCounts = needs.reduce((acc: Record<string, number>, need: Need) => {
        const { category, selectedTimestamps } = need;

        if (!acc[category]) {
          acc[category] = 0;
        }

        acc[category] += selectedTimestamps ? selectedTimestamps.length : 0;
        return acc;
      }, {});
      console.log("Category Counts:", categoryCounts);

      // Map categories to their names with counts
      const needsData = categories.map((category: Category) => ({
        name: category.name,
        value: categoryCounts[category.id] || 0,
      }));
      
      console.log("Final Needs Data for BarGraph:", needsData);
      setNeedsData(needsData);
    } catch (error) {
      console.error("Error fetching needs data:", error);
    }
  };

  useEffect(() => { 
    getInsights(); 
    getNeedsData();
  }, []);

  const dummyNeedsData = [
    { name: "Physical Nurturance", value: 12 },
    { name: "Integrity", value: 8 },
    { name: "Interdependence", value: 15 },
    { name: "Harmony", value: 71 },
    { name: "Autonomy", value: 10 },
    { name: "Play", value: 54 },
    { name: "Celebration", value: 35 },
  ];

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
      {needsData ? (
        <BarGraph data={dummyNeedsData} />
      ) : (
        <div>Loading Needs Data...</div>
      )};
    </>
  );
}