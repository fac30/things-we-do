import Image from "next/image";
import Link from "next/link";
import { Header } from "@/ui/shared/Header";

export default function MoodsInfoPage() {
  return (
    <>
      <Header title="Learn More" />
      <div className="w-10/12 m-auto">
        <h1>Learn More</h1>
        <div className="">toggle</div>
        <h2>
          Seeing how urgent vs how important tasks are can help you prioritise
          them
        </h2>
        <Image
          src="/images/cubeImage.png"
          width={600}
          height={600}
          alt="Image of an Eisenhower Matrix"
          layout="responsive"
        />
        <h2>The Eisenhower Matrix</h2>
        <p>
          1. Urgent & Important: Do these tasks immediately (e.g., deadlines,
          emergencies).
        </p>
        <p>
          2. Not Urgent but Important: Schedule these tasks (e.g., planning,
          exercise).
        </p>
        <p>
          3. Urgent but Not Important: Delegate these tasks if possible (e.g.,
          interruptions).
        </p>
        <p>
          4. Not Urgent & Not Important: Eliminate or minimize these tasks
          (e.g., distractions).
        </p>
        <h2>Breaking Tasks Down</h2>
        <p>
          Dealing with tasks them little by little, as they come up, especially
          those in Quadrants I and II, helps you reduce overwhelm, and ensure
          you’re making continuous, meaningful progress towards what truly
          matters.
        </p>
        <Image
          src="/images/simpleEisenhower.png"
          width={600}
          height={600}
          alt="Image of an Eisenhower Matrix"
          layout="responsive"
        />

        <Link href="/https://www.eisenhower.me/eisenhower-matrix/#:~:text=What%20is%20the%20Eisenhower%20Matrix,or%20not%20do%20at%20all.">
          Learn More Here
        </Link>
      </div>
    </>
  );
}
