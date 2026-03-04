import { TaskStatus } from "../../constants"

export const groupTasksByUserAndStatus = (tasks, userId) => {
  const groups = {
    createdByYou: [],
    pending: [],
    inprogress: [],
    completed: [],
  }

  for (const task of tasks) {
    const isAssignedToUser = task.assignedTo?._id === userId
    const isCreatedByUser = task.createdBy._id === userId

    if (isCreatedByUser && !isAssignedToUser) {
      groups.createdByYou.push(task)
      continue
    }

    if (!isAssignedToUser) continue

    switch (task.status) {
      case TaskStatus.PENDING:
        groups.pending.push(task)
        break
      case TaskStatus.INPROGRESS:
        groups.inprogress.push(task)
        break
      case TaskStatus.COMPLETED:
        groups.completed.push(task)
        break
    }
  }

  return groups
}
