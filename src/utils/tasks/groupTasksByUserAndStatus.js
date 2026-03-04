import { TaskStatus, UserRole } from "../../constants"

export const groupTasksByUserAndStatus = (tasks, userId, role) => {
  const groups = {
    unassigned: [],
    createdByYou: [],
    pending: [],
    inprogress: [],
    completed: [],
  }
  const isAdmin = role === UserRole.ADMIN

  for (const task of tasks) {
    const isAssignedToUser = task.assignedTo?._id === userId
    const isCreatedByUser = task.createdBy._id === userId

    if (isCreatedByUser && !isAssignedToUser && !isAdmin) {
      groups.createdByYou.push(task)
      continue
    }

    if (isAdmin && !task.assignedTo) {
      groups.unassigned.push(task)
      continue
    }

    if (!isAssignedToUser && !isAdmin) continue

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
