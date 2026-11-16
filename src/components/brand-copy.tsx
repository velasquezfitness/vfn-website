import { getTranslator, type Locale } from "@/i18n/locale";

// Preserve the English site verbatim; Spanish uses the approved brand spelling.
export function BrandCopy({
  locale,
  source,
}: {
  locale: Locale;
  source: string;
}) {
  if (locale === "en") return source;
  const parts = getTranslator(locale)(source).split(
    /(The 1% Method™|1% Better Everyday)/g,
  );
  return (
    <span>
      {parts.map((part, index) =>
        part === "The 1% Method™" || part === "1% Better Everyday" ? (
          <span
            key={index}
            lang="en"
            translate="no"
            style={{ textTransform: "none" }}
          >
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </span>
  );
}
