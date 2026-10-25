import Image from "next/image";

export function Emblem({ placement }: { placement: "header" | "footer" }) {
  const header = placement === "header";
  return (
    <Image
      src="/images/vfn-emblem-transparent.png"
      alt="VFN silver V-and-panther emblem"
      width={header ? 72 : 56}
      height={header ? 72 : 56}
      sizes={header ? "(max-width: 700px) 64px, 72px" : "56px"}
      loading={header ? "eager" : "lazy"}
      className={header ? "header-emblem" : "footer-emblem"}
    />
  );
}
