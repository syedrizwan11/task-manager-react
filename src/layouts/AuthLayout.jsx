import { Outlet, Navigate } from "react-router"
import { useAuth } from "../hooks/useAuth"

import UserProfilePopup from "../components/UserProfilePopup"
import { Loader } from "../components/Loader"

export const AuthLayout = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return <Loader />
  }
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return (
    <>
      <UserProfilePopup />
      <Outlet />
    </>
  )
}
