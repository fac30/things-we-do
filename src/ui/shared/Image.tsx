import Image from "next/image";

function ImageComponent({
  src,
  alt,
  rounded = false,
  sizes,
  className = "",
}: {
  src: string;
  alt: string;
  rounded?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    // <div className={`${className}`}>
    <div
      className={`relative ${className} ${
        rounded ? "rounded-full overflow-hidden" : ""
      }`}
      style={{
        position: "relative", // Ensure valid position
        width: "100%", // Ensure the parent container has width
        height: "100%", // Ensure the parent container has height
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        style={{ objectFit: "cover" }}
        className={`${rounded ? "rounded-full" : ""}`}
      />
    </div>
  );
}

export default ImageComponent;
