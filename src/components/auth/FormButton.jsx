const FormButton = ({ label, isLoading }) => {
  return (
    <button disabled={isLoading} className="btn btn-primary w-full text-lg">
      {isLoading ? <span className="loading loading-spinner text-primary"></span> : label}
    </button>
  )
}

export default FormButton