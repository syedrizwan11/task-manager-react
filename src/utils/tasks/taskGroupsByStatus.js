import { TaskStatus } from "../../constants"

export const taskGroupsByStatus = (tasks) => ({
  pending: tasks.filter((t) => t.status === TaskStatus.PENDING),
  inProgress: tasks.filter((t) => t.status === TaskStatus.INPROGRESS),
  completed: tasks.filter((t) => t.status === TaskStatus.COMPLETED),
})
