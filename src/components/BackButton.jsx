import { IoArrowBackCircleSharp } from "react-icons/io5"
import { Link } from "react-router"

export const BackButton = ({ label, to }) => {
  return (
    <Link
      to={to}
      className="flex items-center gap-1 w-fit rounded-xl font-semibold px-2"
    >
      <IoArrowBackCircleSharp className="text-5xl text-blue-800 mt-1" />
      Go Back To {label}
    </Link>
  )
}
