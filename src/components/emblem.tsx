import { getTranslator, type Locale } from "@/i18n/locale";
import Image from "next/image";

export function Emblem({
  placement,
  locale = "en",
}: {
  placement: "header" | "footer";
  locale?: Locale;
}) {
  const header = placement === "header";
  return (
    <Image
      src="/images/vfn-emblem-transparent.png"
      alt={getTranslator(locale)("VFN silver V-and-panther emblem")}
      width={header ? 72 : 56}
      height={header ? 72 : 56}
      sizes={header ? "(max-width: 700px) 64px, 72px" : "56px"}
      loading={header ? "eager" : "lazy"}
      className={header ? "header-emblem" : "footer-emblem"}
    />
  );
}
