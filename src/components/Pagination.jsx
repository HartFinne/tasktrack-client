const Pagination = ({ onNext, onPrev, hasNext, hasPrev, page }) => {
  return (
    <div className="btn-group ">
      <button className="btn btn-xs btn-accent sm:btn-sm" onClick={onPrev} disabled={!hasPrev}>
        « Prev
      </button>

      <button className="btn btn-xs sm:btn-sm">{page}</button>

      <button className="btn btn-xs btn-accent sm:btn-sm" onClick={onNext} disabled={!hasNext}>
        Next »
      </button>
    </div>
  );
};

export default Pagination;
