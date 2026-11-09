import { getTranslator, type Locale } from "@/i18n/locale";
import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";

// Only the exact founder-supplied files belong here. Never substitute stock imagery.
const photographs = {
  kettlebells: {
    file: "VFN-Kettlebell-Hero (1).jpg",
    alt: "Sebastian Velasquez carrying kettlebells during training",
    label: "Founder carrying kettlebells",
  },
  portrait: {
    file: "Arise Professional -65.JPG",
    alt: "Sebastian Velasquez smiling with his arms crossed",
    label: "Sebastian’s smiling portrait",
  },
  panther: {
    file: "IMG_0825.JPG",
    alt: "Black panther with golden eyes against a black background",
    label: "The founder’s golden-eyed panther image",
  },
};
export function BrandPhoto({
  kind,
  locale = "en",
  className = "",
  priority = false,
  sizes = "(max-width: 700px) 100vw, 50vw",
}: {
  kind: keyof typeof photographs;
  locale?: Locale;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const photo = photographs[kind];
  const t = getTranslator(locale);
  const available = existsSync(
    path.join(process.cwd(), "public", "images", photo.file),
  );
  return (
    <div className={`brand-photo photo-${kind} ${className}`}>
      {available ? (
        <Image
          src={`/images/${encodeURIComponent(photo.file)}`}
          alt={t(photo.alt)}
          fill
          sizes={sizes}
          preload={priority}
          className="photograph"
        />
      ) : (
        <div
          className="asset-placeholder"
          role="img"
          aria-label={`${t(photo.label)} — ${t("Original image file pending")}`}
        >
          <span className="asset-index">
            VFN / IMAGE{" "}
            {kind === "kettlebells" ? "01" : kind === "panther" ? "02" : "03"}
          </span>
          <p>{t(photo.label)}</p>
          <span>
            {t("Original image file pending")}
            <br />
            {t("No substitute imagery used")}
          </span>
        </div>
      )}
    </div>
  );
}
