const formatLabel = (value) => {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

const Filter = ({ options = [], value, onChange, className = "" }) => {
  return (
    <select
      className={`select select-primary w-full sm:w-auto ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {formatLabel(option)}
        </option>
      ))}
    </select>
  );
}

export default Filter