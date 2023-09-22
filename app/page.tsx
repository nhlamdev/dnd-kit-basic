"use client";
import React, { useState } from "react";

import { createRange } from "@/utilities";
import { DndContext } from "@dnd-kit/core";
import dynamic from "next/dynamic";
import { DragHandle, SortableItem } from "@/components/SortableList/components";

// const SortableList = dynamic(() => import("@/components/SortableList"), {
//   ssr: false,
// });

const SortableList = dynamic(
  () => import("@/components/SortableList").then((mod) => mod.SortableList),
  {
    ssr: false,
  }
);

function getMockItems() {
  return createRange(50, (index) => ({ id: index + 1 }));
}

export default function Home() {
  const [items, setItems] = useState(getMockItems);
  return (
    <main className="w-screen flex flex-col items-center p-4">
      <SortableList
        items={items}
        onChange={(items: any[]) => setItems(items)}
        renderItem={(item) => (
          <SortableItem id={item.id}>
            {item.id}
            <DragHandle />
          </SortableItem>
        )}
      />
    </main>
  );
}
