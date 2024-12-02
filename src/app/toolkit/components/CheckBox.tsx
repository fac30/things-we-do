"use client";
import { useState, useEffect } from "react";

interface CheckBoxComponentData {
  id: number;
  checked?: boolean;
  name: string;
  infoUrl?: string;
  icon: string;
  category: string[];
}

export default function CheckBox() {
  const [data, setData] = useState<CheckBoxComponentData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const dummyData: CheckBoxComponentData[] = [
        {
          id: 1,
          name: "Listen to my favourite music",
          infoUrl: "https://example.com/music",
          icon: "🎵",
          category: ["Category 2", "Category 3"],
        },
        {
          id: 2,
          name: "Watch TV",
          infoUrl: "https://example.com/tv",
          icon: "📺",
          category: ["Category 4"],
        },
        {
          id: 3,
          name: "Call a friend",
          infoUrl: "https://example.com/call",
          icon: "📞",
          category: ["Category 1", "Category 5", "Category 6"],
        },
        {
          id: 4,
          name: "Drink water",
          infoUrl: "https://example.com/water",
          icon: "💧",
          category: ["Category 2"],
        },
        {
          id: 5,
          name: "Sing a song",
          infoUrl: "https://example.com/song",
          icon: "🎤",
          category: ["Category 7"],
        },
      ];
      setData(dummyData);
    };
    fetchData();
  }, []);

  const handleToggle = (id: number) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col space-y-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-start p-4 rounded-lg shadow-lg bg-twd-background"
        >
          {/* First Row: Checkbox and Name */}
          <div className="flex items-center space-x-3 w-full">
            <input
              type="checkbox"
              onChange={() => handleToggle(item.id)}
              className="h-5 w-5 border-white bg-twd-background text-twd-background rounded focus:ring focus:ring-blue-300"
            />
            <p className="text-lg text-white">{item.name}</p>
          </div>

          {/* Second Row: Icon and Link */}
          <div className="flex items-center justify-between mt-2 pl-8 w-full">
            <span className="text-2xl">{item.icon}</span>
            <a
              href={item.infoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-twd-text-link hover:underline"
            >
              Go to resource
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
