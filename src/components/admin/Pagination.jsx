// components/admin/Pagination.jsx
const Pagination = ({ onNext, onPrev, hasNext, hasPrev, page }) => {
  return (
    <div className="btn-group mt-4">
      <button className="btn btn-accent" onClick={onPrev} disabled={!hasPrev}>
        « Prev
      </button>

      <button className="btn">{page}</button>

      <button className="btn btn-accent" onClick={onNext} disabled={!hasNext}>
        Next »
      </button>
    </div>
  );
};

export default Pagination;
