import { AuthContext } from "./userContext"
import { useEffect, useState } from "react"
import { decodeTokenApi } from "../../api/auth.api"
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const setUserData = (userData) => {
    setUser(userData)
  }
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserFromToken = async () => {
      try {
        const res = await decodeTokenApi()
        setUserData(res.data)
      } catch (error) {
        console.error("Failed to fetch user from token", error)
      } finally {
        setLoading(false)
      }
    }
    fetchUserFromToken()
  }, [])
  return (
    <AuthContext.Provider value={{ user, loading, setUserData }}>
      {children}
    </AuthContext.Provider>
  )
}
