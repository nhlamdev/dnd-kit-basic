import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Manager } from "../mock";

interface SessionLayoutComponentProps {
  item: Manager;
}

export const SessionLayoutComponent = (props: SessionLayoutComponentProps) => {
  const { item } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item._id, data: { ...item } });

  const dndKitSesstionStyles = {
    touchAction: "none",
    transform: CSS.Translate.toString(transform),
    transition,
  };
  return (
    <div
      className="bg-slate-400 px-4 py-2 rounded-md"
      ref={setNodeRef}
      style={dndKitSesstionStyles}
      {...attributes}
      {...listeners}
    >
      <span className="text-slate-200 select-none">{item.name}</span>
      {/* {renderItem(item)} */}
    </div>
  );
};
