const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      <button
        className="pagination-button"
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Anterior
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`pagination-button ${i === currentPage ? "active" : ""}`}
          onClick={() => onPageChange(i)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="pagination-button"
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
