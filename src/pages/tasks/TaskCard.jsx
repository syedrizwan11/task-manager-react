import { MdDelete } from "react-icons/md"
import { ActionButton } from "../../components/ActionButton"
import { TaskStatus, UserRole } from "../../constants"
import { FiEdit } from "react-icons/fi"
import { AssignTask } from "./AssignTask"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router"
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"

export const TaskCard = ({ task, onDelete, onUpdate }) => {
  const { user } = useAuth()
  const isAssignedToUser = task.assignedTo?._id === user?.id
  const isOwner = task.createdBy._id === user?.id
  const isAdmin = user?.role === UserRole.ADMIN
  const isDraggable = isAssignedToUser || isAdmin

  const { setNodeRef, listeners, attributes, transform } = useDraggable({
    id: task._id,
    data: { type: task.status },
    disabled: !isDraggable,
  })
  const navigate = useNavigate()
  const canDelete =
    isAdmin || (isOwner && (!task.assignedTo || isAssignedToUser))

  const style = { transform: CSS.Translate.toString(transform) }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={`bg-white p-5 rounded-lg ${isDraggable ? "border-l-4 border-blue-500 cursor-grabbing" : "border-4 border-dashed border-gray-400"} shadow-sm ${task.completed ? "opacity-60" : ""}`}
    >
      <div className="flex justify-between items-center py-2">
        <h1 className="text-lg font-semibold text-gray-800">
          {task.title.toUpperCase()}
        </h1>
        <div className="flex gap-2">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full uppercase ${task.status === TaskStatus.COMPLETED ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}
          >
            {task.status}
          </span>
        </div>
      </div>

      <p className="text-gray-600 mt-1 text-base">{task.description}</p>

      <div className="mt-3 space-y-1 text-sm text-gray-600">
        <p>
          <span className="font-medium text-gray-700">Due Date:</span>{" "}
          {new Date(task.dueDate).toLocaleString()}
        </p>
        <p>
          <span className="font-medium text-gray-700">Created By:</span>{" "}
          {task.createdBy.email}
        </p>

        {task.completedAt && (
          <p>
            <span className="font-medium text-gray-700">Completed At:</span>{" "}
            {new Date(task.completedAt).toLocaleString()}
          </p>
        )}
        {task.assignedTo?.email && (
          <p>
            <span className="font-medium text-gray-700">Assigned To:</span>{" "}
            {task.assignedTo.email}
          </p>
        )}
      </div>
      <div className="mt-4 flex items-center gap-2 justify-end">
        {!task.completedAt && isAdmin && (
          <AssignTask
            assignedTo={task.assignedTo?.email}
            taskId={task._id}
            userId={user.id}
            getUpdatedTaskData={onUpdate}
          />
        )}
        <ActionButton
          onClick={() => navigate(`/tasks/form?taskId=${task._id}`)}
          disabled={!isOwner || task.completedAt}
          icon={FiEdit}
        />
        <ActionButton
          onClick={() => onDelete(task._id)}
          disabled={!canDelete}
          icon={MdDelete}
          bgColor="bg-gray-200"
          textColor="text-red-500"
          border="border-none"
        />{" "}
      </div>
    </div>
  )
}
