"use client";

import {
  Active,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { SessionLayoutComponent } from "./section";
import { managers } from "./mock";
import { SortableOverlay } from "../SortableList/components";

export const MainAction = () => {
  const [active, setActive] = useState<Active | null>(null);
  const [data, setData] = useState(managers);
  const activeItem = useMemo(
    () => data.find((item) => item._id === active?.id),
    [active?.id, data]
  );

  const sensors = useSensors(
    // useSensor(PointerSensor, {
    //   activationConstraint: {
    //     distance: 10,
    //   },
    // }),
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
    // useSensor(KeyboardSensor, {
    //   coordinateGetter: sortableKeyboardCoordinates,
    // })
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active);
      }}
      onDragEnd={(event) => {
        const { active, over } = event;

        if (!over) return;

        if (over && active.id !== over.id) {
          const activeIndex = data.findIndex(({ _id }) => _id === active.id);
          const overIndex = data.findIndex(({ _id }) => _id === over.id);

          setData(arrayMove(data, activeIndex, overIndex));
        }

        setActive(null);
      }}
      onDragCancel={() => {
        setActive(null);
      }}
    >
      <SortableContext
        items={data.map((v) => ({ id: v._id }))}
        strategy={verticalListSortingStrategy}
      >
        <section className="w-3/5 flex flex-col gap-2" role="application">
          {data.map((item) => (
            <SessionLayoutComponent key={item._id} item={item} />
          ))}
        </section>
      </SortableContext>
      {/* <SortableOverlay>
        {activeItem ? <div>{activeItem.name}</div> : null}
      </SortableOverlay> */}
    </DndContext>
  );
};
