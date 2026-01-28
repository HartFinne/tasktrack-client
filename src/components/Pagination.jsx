const Pagination = ({ onNext, onPrev, hasNext, hasPrev, page }) => {
  return (
    <div className="join">
      <button
        className="join-item btn btn-sm btn-outline"
        onClick={onPrev}
        disabled={!hasPrev}
      >
        « Prev
      </button>

      <button className="join-item btn btn-sm btn-ghost pointer-events-none">
        {page}
      </button>

      <button
        className="join-item btn btn-sm btn-outline"
        onClick={onNext}
        disabled={!hasNext}
      >
        Next »
      </button>
    </div>
  );
};

export default Pagination;

