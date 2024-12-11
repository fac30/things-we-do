import { Header } from "@/ui/shared/Header";
import { useState } from "react";

export default function page() {
  return (
    <div className="bg-twd-background text-white min-h-screen px-10 py-6">
      <Header title="Learn More" isInfoPage={true}/>

      <div className="mt-6">
        <h1 className="text-2xl font-bold text-white mb-5">
          What is Insights Tab About?
        </h1>
        <p className="text-gray-400 leading-relaxed">
          The Insights tab is designed to help you make the most out of your data by providing <strong className="font-bold text-white">personalized insights, trends, and summaries</strong>. Whether you’re tracking your mood, monitoring patterns over time, or discovering which tools work best for you, this feature ensures you gain valuable insights without needing to engage with the app every single day.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-white mb-5">
          How Can This Tab Help?
        </h2>
        <ul className="list-disc list-inside space-y-4 text-gray-400">
          <li>
            <span className="font-semibold text-white">Time-Based Filtering:</span>{" "}
            This helps you visualize how urgency, effort, and mood vary over specific periods—whether mornings are more stressful, weekends feel more rewarding, or winters bring unique challenges.
          </li>
          <li>
            <span className="font-semibold text-white">
            Summarized Insights:
            </span>{" "}
            Overall Mood Trends, Frequently Unmet Needs, Most-Used Tools: These summaries give you a clear picture of your behavior and what supports you best.
          </li>
          <li>
            <span className="font-semibold text-white">Insights Without Consistency:</span>{" "}
            Even if you don’t use the app daily, you’ll still get meaningful insights. This feature analyzes the data you’ve entered to create trends and summaries, so there’s no pressure to engage frequently.
          </li>
        </ul>

          <div className="mt-6">
            <h1 className="text-2xl font-bold text-white mb-5">
              What Makes This Feature Special?
            </h1>
            <p className="text-gray-400 leading-relaxed">
              This feature isn’t just about collecting data—it’s about helping you see the bigger picture. It empowers you to:
            </p>
            <ul className="list-disc list-inside space-y-4 text-gray-400">
              <li>
                Understand patterns in your behavior and emotions.
              </li>
              <li>
                Discover what tools and approaches work best for you.
              </li>
              <li>
                Take control of your well-being by gaining actionable insights.
              </li>
            </ul>
            <p className="text-white leading-relaxed my-3">
              Whether you’re a casual user or someone who loves diving into details, this feature adapts to your needs and makes your data meaningful.
            </p>
          </div>



     </div>
    </div>
     
  )
}

