const Pagination = ({ onNext, onPrev, hasNext, hasPrev, page }) => {
  return (
    <div className="join flex gap-1">
      <button
        className="join-item btn btn-sm btn-soft btn-primary disabled:btn-disabled"
        onClick={onPrev}
        disabled={!hasPrev}
      >
        « Prev
      </button>

      <button className="join-item btn btn-sm btn-soft pointer-events-none font-semibold text-primary">
        {page}
      </button>

      <button
        className="join-item btn btn-sm btn-soft btn-primary disabled:btn-disabled"
        onClick={onNext}
        disabled={!hasNext}
      >
        Next »
      </button>
    </div>
  );
};

export default Pagination;
