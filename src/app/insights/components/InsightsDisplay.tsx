"use client";

import DatabaseManager from "@/lib/db/DatabaseManager";

import LineGraph from "./LineGraph";
import retrieveDataObject from "@/lib/utils/retrieveDataObject";
import { useState, useEffect, useMemo } from "react";

import Button from "@/ui/shared/Button";
import clsx from "clsx";

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
  const [insights, setInsights] = useState<Insight[] | null>(null);

  const dateOptions = ["day", "week", "month", "year"];

  const handleDateChange = (dateChoice: keyof typeof dateParams) => {
    setSelectedButton(dateChoice);
  };

  const [selectedButton, setSelectedButton] =
    useState<keyof typeof dateParams>("day");
  const [useNow, setUseNow] = useState(true);

  const handleUseNowClick = () => {
    setUseNow((prevUseNow) => !prevUseNow);
  };
  const now = useMemo(() => new Date(), []);

  const dateParams = useMemo(
    () => ({
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

      // This is from Monday to Sunday
      week: {
        start: new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - (now.getDay() === 0 ? 6 : now.getDay() - 1) // Adjust for Sunday
        ),
        end: new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + (now.getDay() === 0 ? 0 : 7 - now.getDay()) // Adjust for Sunday
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
    }),
    [now]
  );

  const [startOfRange, setStartOfRange] = useState<Date>(dateParams.day.start);
  const [endOfRange, setEndOfRange] = useState<Date>(dateParams.day.end);

  useEffect(() => {
    const { start, end } = dateParams[selectedButton];
    console.log(start, end);
    setStartOfRange(start);
    setEndOfRange(useNow ? now : end);
  }, [useNow, selectedButton, dateParams, now]);

  const getInsights = async () => {
    const myInsights = await DatabaseManager.getFromDb("mood_records");

    if (!myInsights) {
      console.log("No insights found.");
      setInsights([]);
      return;
    }
    const goodInsights = retrieveDataObject(myInsights);

    setInsights(goodInsights);
  };

  useEffect(() => {
    getInsights();
  }, []);

  return (
    <>
      <div className="flex text-center w-full m-auto justify-between bg-twd-navbar-background py-2 px-4">
        {dateOptions.map((dateOption, index) => {
          const isActive = selectedButton === dateOption;
          return (
            <Button
              key={index}
              label={dateOption}
              onClick={() =>
                handleDateChange(dateOption as keyof typeof dateParams)
              }
              className={clsx(
                "font-normal",
                isActive && "bg-twd-primary-purple text-white"
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

      {insights ? (
        <LineGraph
          dataArray={insights}
          startOfRange={startOfRange}
          endOfRange={endOfRange}
          selectedButton={selectedButton}
        />
      ) : (
        <div>Loading insights...</div>
      )}
    </>
  );
}
