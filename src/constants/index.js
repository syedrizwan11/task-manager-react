export const SIGNUP_API_URL = "http://localhost:3000/auth/register"
export const LOGIN_API_URL = "http://localhost:3000/auth/login"
export const LOGOUT_API_URL = "http://localhost:3000/auth/logout"
export const TOKEN_DECODE_API_URL = "http://localhost:3000/auth/decodeToken"
export const TASKS_API_URL = "http://localhost:3000/api/tasks"
export const TASK_ASSIGN_API_URL = "http://localhost:3000/api/assign-task"
export const TASK_COMPLETE_API_URL =
  "http://localhost:3000/api/mark-task-as-completed"

export const USER_API_URL = "http://localhost:3000/api/users"
export const GET_CURRENT_USER_API_URL = "http://localhost:3000/api/current-user"
export const UPDATE_USER_PROFILE_API_URL =
  "http://localhost:3000/api/update-user-profile"

export const USER_COUNT_API_URL = "http://localhost:3000/api/users-count"
export const TASK_COUNT_API_URL = "http://localhost:3000/api/tasks-count"

export const TaskStatus = {
  PENDING: "pending",
  COMPLETED: "completed",
}

export const UserRole = {
  ADMIN: "admin",
  USER: "user",
}
