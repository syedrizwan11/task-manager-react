import { useDroppable } from "@dnd-kit/core"
import { TaskCard } from "./TaskCard"
import { FaCircleInfo } from "react-icons/fa6"
import PopupButton from "../../components/PopupButton"

export const TaskSection = ({
  title,
  type,
  tasks,
  onDelete,
  onUpdate,
  infoMessage,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: title,
    data: {
      type,
    },
  })
  const style = {
    backgroundColor: isOver ? "oklch(51.1% 0.096 186.391)" : undefined,
  }
  return (
    <div
      ref={setNodeRef}
      className="not-first:border-l-4 border-blue-900/40 px-4"
    >
      <h3
        style={style}
        className="bg-blue-900 rounded p-4 text-white w-full text-xl font-semibold mb-3 text-center flex justify-around"
      >
        <div className="grow">{title}</div>
        {infoMessage && (
          <PopupButton
            icon={<FaCircleInfo aria-label="Info" />}
            message={infoMessage}
          />
        )}
      </h3>
      <div className="space-y-4">
        {tasks.length === 0 && (
          <div className="text-center">No tasks available</div>
        )}
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </div>
  )
}
