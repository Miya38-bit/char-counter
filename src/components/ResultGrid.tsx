import type React from "react";

export default function ResultGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]">
      {children}
    </div>
  );
}
