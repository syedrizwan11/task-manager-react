export const ActionButton = ({
  onClick,
  disabled = false,
  icon: Icon,
  bgColor = "bg-gray-200",
  textColor = "text-blue-400",
  className = "",
  label = "",
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      flex items-center justify-center px-3 py-2 rounded-lg enabled:hover:bg-gray-300
      ${bgColor} ${textColor}
      enabled:cursor-pointer disabled:opacity-50
      ${className}
    `}
  >
    {Icon && <Icon title={label} className="text-xl" />}
  </button>
)
