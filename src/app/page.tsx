import { Header } from "@/ui/shared/Header";
import Card from "@/ui/shared/CardForHomePage";

type ObjectType = {
  title: string;
  text: string;
  images: string; // Array of images
  svg: string;
  buttonText: string;
  variant?: "default" | "dualImage"; // Optional layout variant
};

export default function HomePage() {
  const objects: ObjectType[] = [
    {
      title: "Decision maker",
      text: "Work out how your decision might affect how you feel, find out if its important, and what you can do about it.",
      images: "/images/decisionMaker.png",
      svg: "/drawings/maker_drawing.svg",
      buttonText: "Decision maker ->",
      variant: "default",
    },
    {
      title: "Toolkit",
      text: "Create a Toolkit of what helps when you are overwhelmed:",
      images: "https://via.placeholder.com/200x200",
      svg: "",
      buttonText: "Go to Toolkit",
      variant: "dualImage",
    },
    {
      title: "Needs",
      text: "Improve your mood by identifying what you need and how to get it:",
      images: "https://via.placeholder.com/400x200",
      svg: "",
      buttonText: "Go to Needs ->",
      variant: "default",
    },
    {
      title: "Insights",
      text: "Use the data you collect to explore patterns and trends:",
      images: "https://via.placeholder.com/400x200",
      svg: "",
      buttonText: "Go to Insights ->",
      variant: "default",
    },
  ];

  return (
    <>
      <Header title="Home" description="" hasInfoButton={false} />
      <h1>Hello There!</h1>
      <p>Gain awareness and autonomy over what you are feeling and doing:</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-8">
        {objects.map((obj, index) => (
          <Card
            key={index}
            title={obj.title}
            text={obj.text}
            images={obj.images}
            svg={obj.svg}
            buttonText={obj.buttonText}
            variant={obj.variant}
          />
        ))}
    </div>
    </>
  );
}
