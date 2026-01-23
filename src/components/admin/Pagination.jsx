// components/admin/Pagination.jsx
const Pagination = ({ onNext, onPrev, hasNext, hasPrev, page }) => {
  return (
    <div className="btn-group ">
      <button className="btn btn-sm btn-accent" onClick={onPrev} disabled={!hasPrev}>
        « Prev
      </button>

      <button className="btn btn-sm">{page}</button>

      <button className="btn btn-sm btn-accent" onClick={onNext} disabled={!hasNext}>
        Next »
      </button>
    </div>
  );
};

export default Pagination;
