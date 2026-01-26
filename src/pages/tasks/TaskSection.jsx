import { TaskCard } from "./TaskCard"

export const TaskSection = ({ title, tasks, onDelete, onUpdate }) => {
  return (
    <div className="lg:not-first:border-l-4 border-dashed border-gray-400 pl-4">
      <h3 className="bg-blue-900 rounded p-4 text-white w-full text-xl font-semibold mb-3 text-center">
        {title}
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
