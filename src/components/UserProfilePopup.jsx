import { useRef } from "react"
import { FaUserCircle } from "react-icons/fa"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router"
import { LOGOUT_API_URL } from "../constants"
import axios from "axios"
import PopupButton from "./PopupButton"

const UserProfilePopup = () => {
  const navigate = useNavigate()
  const popupRef = useRef(null)
  const { user, setUserData } = useAuth()

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        LOGOUT_API_URL,
        {},
        { withCredentials: true },
      )

      if (response.data.success) {
        setUserData(null)
        navigate("/login")
      }
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  return (
    <div className="absolute top-6 right-4" ref={popupRef}>
      <PopupButton
        icon={
          <>
            <FaUserCircle className="text-3xl" />
          </>
        }
        message={
          <div>
            <div className="px-4 pb-2 border-b">
              <p className="text-lg font-semibold capitalize">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>

            <div>
              <button
                onClick={() => {
                  navigate("/profile")
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-teal-100 cursor-pointer"
              >
                Profile
              </button>
              <div
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-red-600 hover:bg-teal-100 cursor-pointer"
              >
                Logout
              </div>
            </div>
          </div>
        }
      />
    </div>
  )
}

export default UserProfilePopup
