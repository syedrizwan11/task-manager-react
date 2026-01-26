import { UserRole } from "../constants"

export const gotoDashboard = (role) => {
  if (role === UserRole.ADMIN) window.open("/admin-page", "_self")
  else window.open("/tasks", "_self")
}
