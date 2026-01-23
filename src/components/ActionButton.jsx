export const ActionButton = ({
  onClick,
  disabled = false,
  icon: Icon,
  bgColor = "bg-gray-200",
  textColor = "text-blue-400",
  className = "",
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      flex items-center justify-center px-3 py-2 rounded-lg enabled:hover:bg-gray-300
      ${bgColor} ${textColor}
      cursor-pointer disabled:opacity-60
      ${className}
    `}
  >
    {Icon && <Icon className="text-xl" />}
  </button>
)
