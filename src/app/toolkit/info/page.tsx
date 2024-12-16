
import Link from "next/link";
import { Header } from "@/ui/shared/Header";


export default function ToolkitInfoPage() {

  return (
    <>
      {/* Header */}
      <Header title="Learn More" isInfoPage={true} />
      <div className="bg-twd-background text-white min-h-screen px-10 py-6">
        {/* Introduction Section */}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-white mb-5">
            What is this Tab About?
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Toolkit tab is your personal space to create, organize, and manage a
            toolkit that’s tailored to your unique needs and experiences. It’s
            designed to help you quickly access the tools and resources that
            work best for you, especially during moments when you feel uneasy,
            impulsive, or overwhelmed. By customizing this toolkit, you can rely
            on your own expertise about what helps you the most, making it a
            powerful support system at your fingertips.
          </p>
        </div>

        {/* How It Helps Section */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-white mb-5">
            How Can This Tab Help?
          </h2>
          <ul className="list-disc list-inside space-y-4 text-gray-400">
            <li>
              <span className="font-semibold text-white">
                Personalized Tools:
              </span>{" "}
              Add descriptions, images, and links to create tools that resonate
              with you. These visual and textual cues are designed to help you
              act quickly when decision-making feels harder than usual.
            </li>
            <li>
              <span className="font-semibold text-white">Adaptability:</span>{" "}
              Update your toolkit as your needs change. Add new tools, remove
              what no longer works, and even create your own categories to
              reflect your unique experience.
            </li>
            <li>
              <span className="font-semibold text-white">
                Easy Organization:
              </span>{" "}
              Categorize your tools in a way that makes sense to you. Use
              filters to find what you need and prioritize your most-used tools
              for quick access.
            </li>
            <div className="mt-10">
              <Link href="/toolkit/info/categories-info" 
                className="bg-twd-primary-purple text-white text-base px-6 py-3 rounded-full font-semibold">
                Go to Categories
              </Link>
            </div>

            <li>
              <span className="font-semibold text-white">
                Guidance and Inspiration (Coming soon):
              </span>{" "}
              Explore suggestions and discover tools that have helped others.
              This can give you fresh ideas and reassurance that you’re not
              alone in your journey.
            </li>
            <li>
              <span className="font-semibold text-white">
                Reflection and Growth (Coming soon):
              </span>{" "}
              Rate how helpful each tool is so you can refine your toolkit over
              time, ensuring it stays effective and relevant.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
