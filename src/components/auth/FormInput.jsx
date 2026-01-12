const FormInput = ({ label, type, value, onChange, error, placeholder }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-lg">{label}</span>
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input input-bordered w-full text-lg"
      />

      {error && (
        <div className="alert alert-error mt-2 py-2 text-sm">
          {error}
        </div>
      )}

    </div>
  )
}

export default FormInput