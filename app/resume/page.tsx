import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "resume",
};

export default function ResumePage() {
  return (
    <div className="-mt-10 sm:-mt-16 -mx-6 sm:-mx-10 h-[calc(100vh-60px)]">
      <iframe
        src="/resume.pdf"
        className="w-full h-full"
        title="Manas Karra — Resume"
      />
    </div>
  );
}
