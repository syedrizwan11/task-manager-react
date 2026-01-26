import axios from "axios"
import { AuthContext } from "./userContext"
import { useEffect, useState } from "react"
import { TOKEN_DECODE_API_URL } from "../../constants"
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const setUserData = (userData) => {
    setUser(userData)
  }
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserFromToken = async () => {
      try {
        const res = await axios.get(TOKEN_DECODE_API_URL, {
          withCredentials: true,
        })

        setUserData(res.data.data)
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
