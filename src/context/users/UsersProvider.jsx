import axios from "axios"
import { useEffect, useState } from "react"
import { USER_API_URL } from "../../constants"
import { UsersContext } from "./usersContext"
export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const res = await axios.get(USER_API_URL, {
          withCredentials: true,
        })
        setUsers(res.data.data)
      } catch (err) {
        console.error("Failed to fetch users:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <UsersContext.Provider value={{ users, loading }}>
      {children}
    </UsersContext.Provider>
  )
}
