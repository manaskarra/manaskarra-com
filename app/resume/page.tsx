import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "resume",
};

export default async function ResumePage() {
  const headersList = await headers();
  const ua = headersList.get("user-agent") ?? "";
  const isMobile = /mobile|android|iphone|ipad|ipod/i.test(ua);

  if (isMobile) {
    redirect("/resume.pdf");
  }

  return (
    <div className="-mt-16 -mx-10 h-[calc(100vh-60px)]">
      <iframe
        src="/resume.pdf"
        className="w-full h-full"
        title="Manas Karra — Resume"
      />
    </div>
  );
}
