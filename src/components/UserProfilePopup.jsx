import { useEffect, useRef, useState } from "react"
import { FaUserCircle } from "react-icons/fa"
import { useAuth } from "../hooks/useAuth"
import { Link, useNavigate } from "react-router"
import { LOGOUT_API_URL } from "../constants"
import axios from "axios"

const UserProfilePopup = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const popupRef = useRef(null)
  const { user } = useAuth()

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        LOGOUT_API_URL,
        {},
        { withCredentials: true },
      )

      if (response.data.success) {
        navigate("/login")
      }
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="absolute top-6 right-4" ref={popupRef}>
      <button onClick={() => setOpen(!open)}>
        <FaUserCircle className="text-gray-300 text-4xl cursor-pointer hover:text-gray-400" />
      </button>

      {open && (
        <div className="absolute -right-2 top-8 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-semibold">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>

          <div className="py-1">
            <button
              onClick={() => {
                setOpen(false)
                navigate("/profile")
              }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            >
              Profile
            </button>
            <div
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
            >
              Logout
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfilePopup
