import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";

// Only the exact founder-supplied files belong here. Never substitute stock imagery.
const photographs = {
  kettlebells: {
    file: "sebastian-kettlebells.jpg",
    alt: "Sebastian Velasquez carrying kettlebells during training",
    label: "Founder carrying kettlebells",
  },
  portrait: {
    file: "sebastian-portrait.jpg",
    alt: "Sebastian Velasquez smiling with his arms crossed",
    label: "Sebastian’s smiling portrait",
  },
  panther: {
    file: "panther.jpg",
    alt: "Black panther with golden eyes in a dark architectural interior",
    label: "The founder’s golden-eyed panther image",
  },
};
export function BrandPhoto({
  kind,
  className = "",
  priority = false,
  sizes = "(max-width: 700px) 100vw, 50vw",
}: {
  kind: keyof typeof photographs;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const photo = photographs[kind];
  const available = existsSync(
    path.join(process.cwd(), "public", "brand", photo.file),
  );
  return (
    <div className={`brand-photo photo-${kind} ${className}`}>
      {available ? (
        <Image
          src={`/brand/${photo.file}`}
          alt={photo.alt}
          fill
          sizes={sizes}
          preload={priority}
          className="photograph"
        />
      ) : (
        <div
          className="asset-placeholder"
          role="img"
          aria-label={`${photo.label} — original file pending`}
        >
          <span className="asset-index">
            VFN / IMAGE{" "}
            {kind === "kettlebells" ? "01" : kind === "panther" ? "02" : "03"}
          </span>
          <p>{photo.label}</p>
          <span>
            Original image file pending
            <br />
            No substitute imagery used
          </span>
        </div>
      )}
    </div>
  );
}
