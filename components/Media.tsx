// components/Media.tsx
import Image from "next/image";
import type { MediaItem } from "@/lib/types";

export default function Media({
  media,
  className,
}: {
  media: MediaItem;
  className?: string;
}) {
  if (media.type === "video") {
    return (
      <video
        className={className}
        src={media.src}
        poster={media.poster}
        autoPlay
        muted
        loop
        playsInline
        aria-label={media.alt}
      />
    );
  }

  return (
    <Image
      className={className}
      src={media.src}
      alt={media.alt}
      fill
      style={{ objectFit: "cover" }}
    />
  );
}
