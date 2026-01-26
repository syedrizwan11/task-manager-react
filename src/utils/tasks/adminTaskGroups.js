export const adminTaskGroups = (tasks) => ({
  unassigned: tasks.filter((t) => !t.assignedTo && !t.completedAt),
  assigned: tasks.filter((t) => t.assignedTo && !t.completedAt),
  completed: tasks.filter((t) => t.completedAt),
})
