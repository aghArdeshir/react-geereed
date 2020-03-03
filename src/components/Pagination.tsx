import React from 'react';
import { IGeereedPagination } from '../typings';

export default function Pagination({
  pagination,
  onPage,
}: {
  pagination: IGeereedPagination;
  onPage: (page: number) => void;
}) {
  const pages = new Array(pagination.totalPages)
    .fill(1)
    .map((_, index) => index + 1);

  return (
    <>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPage(page)}
          style={{ backgroundColor: page === pagination.page ? 'red' : '' }}
        >
          {page}
        </button>
      ))}
    </>
  );
}
