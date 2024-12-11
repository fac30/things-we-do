interface CardProps {
  title: string;
  text: string;
  images: string; // Array to support one or multiple images
  svg: string;
  extraText: string;
  buttonText: string;
  variant?: "default" | "dualImage"; // Define layout variants
}

export default function Card({
  title,
  text,
  images,
  svg,
  extraText,
  buttonText,
  variant = "default",
}: CardProps) {
  return (
    <div className="relative bg-twd-background shadow-lg rounded-lg overflow-hidden max-w-sm mx-auto">
      {/* Title and Text */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
        <p className="text-white mb-4">{text}</p>
      </div>

      {/* SVG */}
      <div className="flex justify-center p-1">
        <img src={svg} alt={`${title} icon`} className="w-12 h-12" />
      </div>

      {/* Image */}
        <div>
          <img src={images[0]} alt={title} className="w-full object-cover h-48" />
        </div>

      {/* Dual Image Variant */}
      {variant === "dualImage" && (
        <div className="flex">
          <img
            src={images[0]}
            alt={`${title} - Image 1`}
            className="w-1/2 object-cover h-32"
          />
          <img
            src={images[1]}
            alt={`${title} - Image 2`}
            className="w-1/2 object-cover h-32"
          />
        </div>
      )}

      {/* Button */}
      <div className="p-4">
        <button className="bg-twd-primary-purple text-white py-2 px-4 rounded-lg">
          {buttonText}
        </button>
      </div>
    </div>
  );
}
