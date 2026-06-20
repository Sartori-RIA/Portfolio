import Image from "next/image";

export function Avatar({src, alt, size = 112}: { src: string; alt: string; size?: number }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="rounded-full object-cover border border-gray-700 shrink-0"
      priority={size >= 112}
    />
  );
}
