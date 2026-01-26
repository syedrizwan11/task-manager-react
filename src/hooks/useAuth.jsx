import { useContext } from "react"
import { AuthContext } from "../context/auth/userContext"

export const useAuth = () => useContext(AuthContext)
