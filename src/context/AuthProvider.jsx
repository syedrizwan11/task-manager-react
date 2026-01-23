import { AuthContext } from "./userContext"
import { useState } from "react"
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const setUserData = (userData) => {
    setUser(userData)
  }

  return (
    <AuthContext.Provider value={{ user, setUserData }}>
      {children}
    </AuthContext.Provider>
  )
}
