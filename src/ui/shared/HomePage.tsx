import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function HomePage() {
  // const objects: ObjectType[] = [
  //   {
  //     title: "Decision maker",
  //     text: "Work out how your decision might affect how you feel, find out if its important, and what you can do about it.",
  //     images: "/images/decisionMaker.png",
  //     svg: "/drawings/maker_drawing.svg",
  //     buttonText: "Decision maker ->",
  //     variant: "default",
  //   },
  //   {
  //     title: "Toolkit",
  //     text: "Create a Toolkit of what helps when you are overwhelmed:",
  //     images: "https://via.placeholder.com/200x200",
  //     svg: "",
  //     buttonText: "Go to Toolkit",
  //     variant: "dualImage",
  //   },
  //   {
  //     title: "Needs",
  //     text: "Improve your mood by identifying what you need and how to get it:",
  //     images: "https://via.placeholder.com/400x200",
  //     svg: "",
  //     buttonText: "Go to Needs ->",
  //     variant: "default",
  //   },
  //   {
  //     title: "Insights",
  //     text: "Use the data you collect to explore patterns and trends:",
  //     images: "https://via.placeholder.com/400x200",
  //     svg: "",
  //     buttonText: "Go to Insights ->",
  //     variant: "default",
  //   },
  // ];

  return (
   <div className="bg-twd-background text-white min-h-screen px-10 py-6">
    <h1>Hello There!</h1>
    <p>Gain awareness and autonomy over what you are feeling and doing:</p>
    
    <div className="">
      <h2>Decision maker</h2>
      <p>Work out how your decision might affect how you feel, find out if its important, and what you can do about it.</p>
      <div className="flex justify-center p-1">
        <img src="/drawings/maker_drawing.svg" alt="Decision maker drawing" className="w-12 h-12" />
      </div>
      <div>
        <img src="/images/decisionMaker.png" alt="Decision maker cube" className="w-full object-cover h-48" />
      </div>
      <button className="bg-twd-primary-purple text-white py-2 px-4 rounded-lg mt-4">
        <span>Decision maker</span>
        <ArrowRightIcon className="w-5 h-5" />
      </button>
    </div>
    

   </div>
  )
};