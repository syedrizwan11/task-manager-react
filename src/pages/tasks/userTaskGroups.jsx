export const userTaskGroups = (tasks, userId) => ({
  createdByYou: tasks.filter(
    (t) => t.createdBy._id === userId && !t.completedAt,
  ),
  assignedToYou: tasks.filter(
    (t) => t.assignedTo?._id === userId && !t.completedAt,
  ),
  completed: tasks.filter((t) => t.completedAt),
})
