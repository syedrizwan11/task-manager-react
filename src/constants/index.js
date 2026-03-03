export const BASE_API = "http://localhost:3000/"

// Auth
export const SIGNUP_API_URL = `${BASE_API}auth/register`
export const LOGIN_API_URL = `${BASE_API}auth/login`
export const LOGOUT_API_URL = `${BASE_API}auth/logout`
export const TOKEN_DECODE_API_URL = `${BASE_API}auth/decodeToken`

// Task
export const TASKS_API_URL = `${BASE_API}api/tasks`
export const TASK_ASSIGN_API_URL = `${BASE_API}api/assign-task`
export const UPDATE_TASK_STATUS_API_URL = `${BASE_API}api/tasks/:id/status`

// User
export const USER_API_URL = `${BASE_API}api/users`
export const GET_CURRENT_USER_API_URL = `${BASE_API}api/current-user`
export const UPDATE_USER_PROFILE_API_URL = `${BASE_API}api/update-user-profile`

export const USER_COUNT_API_URL = `${BASE_API}api/users-count`
export const TASK_COUNT_API_URL = `${BASE_API}api/tasks-count`

export const TaskStatus = Object.freeze({
  PENDING: "pending",
  INPROGRESS: "inprogress",
  COMPLETED: "completed",
})

export const UserRole = Object.freeze({
  ADMIN: "admin",
  USER: "user",
})
