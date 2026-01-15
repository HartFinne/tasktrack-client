const FormInput = ({ label, type, value, onChange, error, placeholder }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input input-bordered w-full"
      />

      {error && (
        <div className="text-red-600 mt-1 py-0 text-sm">
          {error.split("\n").map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </div>
      )}

    </div>
  )
}

export default FormInput