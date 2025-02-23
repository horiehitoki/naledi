import React from "react";

export default function ColumnContainer({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-96 flex-col border border-skin-base bg-skin-base shadow-lg md:rounded-2xl">
      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-skin-base px-4 py-3">
        <h2 className="text-lg font-semibold text-skin-base">{title}</h2>
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
