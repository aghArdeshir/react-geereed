import { useState } from 'react';

export function useGeereedPagination(
  footer: boolean,
  defaultRowsPerPage: number
): [
  { num: number; rows: number },
  (page: { num: number; rows: number }) => void
] {
  const [page, setPage] = useState({
    num: 1,
    rows: footer === false ? Infinity : defaultRowsPerPage,
  });

  return [page, setPage];
}

/**
 * API Propose: return [page, rowsPerPage, setPage, setRowsPerPage]
 * this way, we do not have to use objects like { page: number, rows: number }
 */
