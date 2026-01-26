const TaskSkeleton = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="card bg-base-200 shadow-lg border border-base-300 animate-pulse"
        >
          <div className="card-body">

            <h2 className="card-title justify-between items-center">
              {/* Title */}
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>

              {/* Badge */}
              <div className="h-6 bg-gray-400 rounded w-24 mb-3"></div>
            </h2>


            {/* Description */}
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-2">
              <div className="h-3 bg-gray-300 rounded w-1/4"></div>
              <div className="h-6 bg-gray-400 rounded w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskSkeleton;
