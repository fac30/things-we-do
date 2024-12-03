import cubeImage from "../../../assets/images/cubeImage.png";
import Image from "next/image";

export default function LearnMorePageMoods() {
  return (
    <>
      <h1>Learn More</h1>
      <div className="">toggle</div>
      <h2>
        Seeing how urgent vs how important tasks are can help you prioritise
        them
      </h2>
      <div className="w-11/12 m-auto flex justify-center mt-10">
        <Image
          src={cubeImage}
          width={250}
          height={250}
          alt="Picture of the author"
        />
      </div>
    </>
  );
}
