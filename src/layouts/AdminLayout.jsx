import { useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { Outlet, useNavigate } from "react-router"
import { UserRole } from "../constants"

export const AdminLayout = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.role !== UserRole.ADMIN) {
      navigate("/login")
    }
  }, [navigate, user])
  return (
    <div>
      <Outlet />
    </div>
  )
}
