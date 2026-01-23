export const Dropdown = ({ options, onSelect, defaultValue }) => {
  const handleChange = (e) => {
    onSelect(e.target.value)
  }

  return (
    <select
      onChange={handleChange}
      className="block w-full px-3 py-2 border bg-blue-800 text-white rounded text-sm focus:outline-none"
      defaultValue={defaultValue}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}
