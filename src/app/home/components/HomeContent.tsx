import { ArrowRightIcon, WrenchIcon } from "@heroicons/react/24/solid";
import {
  PresentationChartLineIcon,
  PuzzlePieceIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function HomeContent() {
  return (
    <div className=" text-white min-h-screen px-8 py-4 flex flex-col justify-center text-center">
      <h2 className="text-2xl text-center font-semibold mb-4">Hello There!</h2>
      <p className="text-lg font-light mb-1">
        Gain awareness and autonomy over what you are feeling and doing:
      </p>

      {/* Decision maker block */}
      <div className="mt-6">
        <div className="pt-2">
          <div className="flex items-center justify-center space-x-2 mb-4 text-center w-full">
            <PresentationChartLineIcon className="w-5 h-5" />
            <h2 className="text-xl mb-0">Decision maker</h2>
          </div>

          <p className="text-base mb-1">
            Work out how your decision might affect how you feel, find out if
            it&apos;s important, and what you can do about it.
          </p>
        </div>

        <>
          <div className="flex justify-center relative">
            <Image
              src="/images/decisionMaker.png"
              alt="Decision maker cube"
              width={360}
              height={360}
              priority
            />
            <Link
              href="/moods"
              className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-nowrap"
            >
              <button
                className="absolute bg-twd-primary-purple top-1/2 left-5 rounded-full text-white py-2 px-4 flex items-center gap-2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  top: "70%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <span className="text-base font-medium">Decision maker</span>
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </>
      </div>

      {/* Toolkit block */}
      <section className="mt-6">
        {/* <div className="pt-2">
          <h2 className="text-xl mb-4">Toolkit</h2>
          <p className="text-base mb-1">
            Create a Toolkit of what helps when you are overwhelmed:
          </p>
        </div> */}

        <div
          id="column-container-toolkit"
          className="flex gap-8 max-w-6xl w-full justify-center items-center m-auto"
        >
          <div className="flex flex-1 flex-col h-full justify-center relative w-full items-center gap-5">
            <WrenchIcon className="w-10 h-10" />

            <p className="text-base text-center">
              Create a <span className="font-bold">Toolkit</span> of things that
              help
            </p>

            <div className=" flex items-start">
              <Link href="/toolkit">
                <button className="bg-twd-primary-purple text-white py-2 px-4 rounded-full flex items-center gap-2">
                  <span className="text-base font-medium text-center">
                    Go to Toolkit
                  </span>
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center flex-1">
            <Image
              src="/images/toolkit_screen.png"
              alt="Toolkit screenshot"
              className="rounded-lg shadow-md"
              width={213}
              height={320}
              priority
            />
          </div>
        </div>
      </section>

      {/* Needs block */}
      <section className="mt-6">
        <div className="pt-2 flex gap-8 m-auto w-full">
          <div className="flex flex-1 justify-center flex-shrink bg-transparent">
            <Image
              src="/images/needsImage.png"
              alt="Needs screenshot"
              className="rounded-lg object-contain flex-shrink"
              width={213}
              height={320}
              priority
            />
          </div>
          <div className=" mx-auto mt-4 mb-4 py-4 w-1/2 flex flex-col gap-8 items-center justify-center rounded-lg flex-1">
            <PuzzlePieceIcon className="w-8 h-8 mb-4" />
            <p className="text-base mb-1 text-center">
              Improve your mood by identifying what you need and how to get it:
            </p>

            <Link href="/needs">
              <button className="bg-twd-primary-purple text-white py-2 px-6 rounded-full flex items-center gap-2">
                <span className="text-sm font-medium text-center text-nowrap">
                  Go to Needs
                </span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Insights block */}
      <section className="mt-6">
        <div className="pt-2">
          <div className="flex text-center justify-center gap-2">
            <ChartBarIcon className=" w-6 h-6 text-white" />
            <h2 className="text-xl mb-4 text-center">Insights</h2>
          </div>
          <p className="text-base mb-1 text-center">
            Use the data you collect to explore patterns and trends:
          </p>
        </div>
        <div className="relative">
          <div className="w-full flex justify-center">
            <Image
              src="/images/insights_screen.png"
              alt="Insights line graph"
              width={350}
              height={350}
              priority
            />
          </div>

          <Link href="/insights">
            <button
              className="absolute bg-twd-primary-purple rounded-full text-white py-2 px-4 flex items-center gap-2"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <span className="text-base font-medium">Go to Insights</span>
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
