import Image from 'next/image';

function ImageComponent({
  src,
  alt,
  rounded = false,
  sizes,
  className = '',
}: {
  src: string;
  alt: string;
  rounded?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill // Makes the image responsive
        sizes={sizes}
        style={{ objectFit: 'cover' }} // Ensures proper scaling
        className={`${rounded ? 'rounded-full' : ''}`}
      />
    </div>
  );
}

export default ImageComponent;