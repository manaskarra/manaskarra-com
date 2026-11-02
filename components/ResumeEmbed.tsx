import Image from "next/image";

export function ResumeEmbed() {
  return <div className="mt-9 overflow-hidden rounded-lg border border-rule bg-bg-elevated p-3 sm:p-5">
    <Image src="/resume-preview.png" width={1391} height={1800} alt="Manas Karra’s one-page résumé. Open or download the PDF above for the original document." className="h-auto w-full" unoptimized />
  </div>;
}
