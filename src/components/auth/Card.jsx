const Card = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-6">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-8">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-gray-500 mt-1">{subtitle}</p>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Card;
