const Pagination = ({ page, setPage, hasNext }) => {
  return (
    <div className="btn-group mt-4">
      <button
        className="btn"
        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
        disabled={page === 1} // disable on first page
      >
        « Prev
      </button>

      <button className="btn">{page}</button>

      <button
        className="btn"
        onClick={() => setPage(prev => prev + 1)}
        disabled={!hasNext} // disable if no more pages
      >
        Next »
      </button>
    </div>
  );
};

export default Pagination;
