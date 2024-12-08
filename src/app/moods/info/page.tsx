"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/ui/shared/Header";
import Toggle from "@/ui/shared/Toggle";
import { useState } from "react";

const tasks = [
  {
    title: "Urgent & Important",
    description: "Do these tasks immediately (e.g., deadlines, emergencies).",
  },
  {
    title: "Not Urgent but Important",
    description: "Schedule these tasks (e.g., planning, exercise).",
  },
  {
    title: "Urgent but Not Important",
    description: "Delegate these tasks if possible (e.g., interruptions).",
  },
  {
    title: "Not Urgent & Not Important",
    description: "Eliminate or minimize these tasks (e.g., distractions).",
  },
];

const neuroInfo = [
  {
    title: "Dopamine",
    description: "(Motivation)",
  },
  {
    title: "Norepinephrine",
    description: "(Intensity)",
  },
  {
    title: "Serotonin",
    description: "Emotional stability",
  },
];

export default function MoodsInfoPage() {
  const [isPriority, setIsPriority] = useState(false);

  return (
    <>
      <Header title="Learn More" isInfoPage={true} />
      <Toggle
        isToggled={isPriority}
        setIsToggled={setIsPriority}
        toggledOff={"Mood"}
        toggledOn={"Priority"}
        showLabels={true}
      />
      <div className="w-10/12 m-auto flex flex-col gap-10 mt-8">
        {isPriority ? (
          <>
            <Image
              src="/images/priorityCubeImage.png"
              width={600}
              height={600}
              alt="Image of an Eisenhower Matrix"
              layout="responsive"
            />
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold">The Eisenhower Matrix</h2>
              <p>
                The Eisenhower Matrix helps you prioritize tasks based on
                urgency and importance. It divides tasks into four quadrants:
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {tasks.map((task, index) => (
                <p key={index}>
                  <span className="font-bold">
                    {index + 1}. {task.title}:
                  </span>{" "}
                  {task.description}
                </p>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold">Breaking Tasks Down</h2>
              <p>
                Dealing with tasks little by little, as they come up, especially
                those in Quadrants I and II, helps you reduce overwhelm and
                ensure you&apos;re making continuous, meaningful progress
                towards what truly matters.
              </p>
            </div>
            <Image
              src="/images/simpleEisenhower.png"
              width={600}
              height={600}
              alt="Image of an Eisenhower Matrix"
              layout="responsive"
            />
            <Link href="https://www.eisenhower.me/eisenhower-matrix/#:~:text=What%20is%20the%20Eisenhower%20Matrix,or%20not%20do%20at%20all.">
              Learn More Here
            </Link>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold">
                Three Dimensional Model of Emotions
              </h2>
              <p>
                Hugo Lövheim (2011) links emotions to the balance of three key
                neurotransmitters:
              </p>
            </div>
            <Image
              src="/images/emotionCubeImage.png"
              width={600}
              height={600}
              alt="Image of an Eisenhower Matrix"
              layout="responsive"
            />
            <div className="flex flex-col gap-3">
              {neuroInfo.map((task, index) => (
                <p key={index}>
                  <span className="font-bold">
                    {index + 1}. {task.title}:
                  </span>{" "}
                  {task.description}
                </p>
              ))}
            </div>
            <p>
              Emotions arise from the interaction of these neurotransmitters,
              shaping how we feel and respond to the world. This model helps
              explain{" "}
              <span className="font-bold">
                the biological basis of mood and emotion.
              </span>
            </p>
            <Image
              src="/images/lovheimEmotions.png"
              width={600}
              height={600}
              alt="Image of an Eisenhower Matrix"
              layout="responsive"
            />
            <div className="flex flex-col gap-3">
              <p>Three-Dimensional Model of Emotions (Lovheim, 2011)</p>
              <p>
                Eight basic emotions are ordered into each corner of a cube.
              </p>
              <p className="pb-8">
                *(Surprise has been relabelled as relief, and shame as guilt.
                Anger refers to the emotional state of fight / flight and fear
                refers to freeze state so to avoid confusion these have been
                relabelled as their emotional state. Disgust refers to the
                feeling of having had enough, and has been relabelled content.)
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
