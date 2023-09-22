"use client";
import dynamic from "next/dynamic";

const LayoutList = dynamic(
  () => import("@/components/main").then((mod) => mod.MainAction),
  {
    ssr: false,
  }
);

export default function TextPage() {
  return (
    <main className="w-screen flex flex-col items-center p-4">
      <LayoutList />
    </main>
  );
}
