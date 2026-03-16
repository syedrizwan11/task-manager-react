import { useEffect, useState } from "react"
import { UsersContext } from "./usersContext"
import { fetchUsersApi } from "../../api/user.api"
export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const res = await fetchUsersApi()
        setUsers(res.data)
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
