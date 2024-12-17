import Link from "next/link";
import { Header } from "@/ui/shared/Header";

const steps = [
  {
    title: "Observation",
    description: "Describe a situation without judgment.",
  },
  {
    title: "Feelings",
    description: "Express how you feel about it.",
  },
  {
    title: "Needs",
    description: "Identify the needs behind your feelings.",
  },
  {
    title: "Request",
    description: "Make a clear, respectful request for action.",
  },
];

export default function NeedsInfoPage() {
  return (
    <>
      <Header title="Learn More" isInfoPage={true} />
      <div className="w-10/12 m-auto flex flex-col gap-10 mt-8">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">
            Nonviolent Communication (NVC)
          </h2>
          <p>
            NVC is a communication method, developed by Marshall B Rosenberg,
            designed to foster empathy, reduce conflict, and improve
            connections.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p>It focuses on four key steps:</p>
          {steps.map((step, index) => (
            <p key={index}>
              <span className="font-bold">
                {index + 1}. {step.title}:
              </span>{" "}
              {step.description}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <p>
            NVC encourages empathetic listening and honest self-expression to
            create understanding and compassion in conversations. It&apos;s
            designed to help reduce misunderstandings and build positive,
            peaceful interactions.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p>
            The universal list of needs is based on Marshal Rosenburg&apos;s
            theory of Non Violent Communication (NVC) which aims to improve
            communication and connection through empathy.
          </p>
        </div>
        <Link
          className="text-twd-text-link"
          href="https://journals.sagepub.com/doi/10.1177/21582440221096139"
        >
          See paper on effects of Non Viilent Communicat Program on Nursing Students
        </Link>
        <div className="flex flex-col gap-3 bg-twd-primary-purple p-4 rounded-lg">
          <p>
            Note that unmet needs are automatically reset after 6 hours, even if
            you do not explicitly unselect a need once it is met, it will be
            unselected for you.
          </p>
        </div>
      </div>
    </>
  );
}
