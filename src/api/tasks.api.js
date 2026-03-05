import axios from "axios"
import {
  TASK_ASSIGN_API_URL,
  TASKS_API_URL,
  UPDATE_TASK_STATUS_API_URL,
} from "../constants"

export const fetchTasksApi = () =>
  axios.get(TASKS_API_URL, { withCredentials: true }).then((res) => res.data)

export const fetchTaskByIdApi = (taskId) =>
  axios
    .get(`${TASKS_API_URL}/${taskId}`, { withCredentials: true })
    .then((res) => res.data)

export const deleteTaskApi = (taskId) =>
  axios
    .delete(`${TASKS_API_URL}/${taskId}`, { withCredentials: true })
    .then((res) => res.data)

export const updateTaskStatusApi = (taskId, status) =>
  axios
    .patch(
      UPDATE_TASK_STATUS_API_URL.replace(":id", taskId),
      { status },
      { withCredentials: true },
    )
    .then((res) => res.data)

export const createTaskApi = (taskData) =>
  axios
    .post(TASKS_API_URL, taskData, { withCredentials: true })
    .then((res) => res.data)

export const updateTaskApi = (taskId, taskData) =>
  axios
    .patch(`${TASKS_API_URL}/${taskId}`, taskData, { withCredentials: true })
    .then((res) => res.data)

export const assignTaskApi = (id, assignedTo) =>
  axios
    .post(TASK_ASSIGN_API_URL, { id, assignedTo }, { withCredentials: true })
    .then((res) => res.data)
