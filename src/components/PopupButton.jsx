import { useEffect, useRef, useState } from "react"
import { FaCircleInfo } from "react-icons/fa6"

export default function PopupButton({ message, icon }) {
  const [open, setOpen] = useState(false)
  const boxRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  return (
    <div className="relative inline-block">
      <div
        onClick={() => setOpen((v) => !v)}
        className={`mt-1 cursor-pointer text-teal-200`}
      >
        {icon}
      </div>

      {open && (
        <div>
          <div className="absolute mt-2 right-0.75 z-100 rotate-45 bg-teal-200 p-2 border-l-2 border-t-2 border-gray-500"></div>
          <div
            ref={boxRef}
            className="
            absolute -right-3 mt-4
            w-50
            rounded-md
            bg-teal-200 border-2 border-gray-500 pt-3
            text-sm text-gray-700
            z-50
          "
          >
            {message}
          </div>
        </div>
      )}
    </div>
  )
}
