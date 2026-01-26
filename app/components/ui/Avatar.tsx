export function Avatar({src, alt}: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="h-28 w-28 rounded-full object-cover border border-gray-700"
    />
  );
}