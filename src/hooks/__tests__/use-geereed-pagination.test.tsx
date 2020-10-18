import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { useGeereedPagination } from '../use-geereed-pagination';

function GeereedpaginationTestComponent(props: {
  footer?: boolean;
  defaultRowsPerPage?: number;
}) {
  const { footer = true, defaultRowsPerPage = 20 } = props;
  const [page, setPage] = useGeereedPagination(footer, defaultRowsPerPage);

  return (
    <>
      page: {page.num} - rows: {page.rows}
      <button onClick={() => setPage({ num: page.num + 1, rows: page.rows })}>
        Next Page
      </button>
    </>
  );
}

test('page test', () => {
  const { container } = render(<GeereedpaginationTestComponent />);
  expect(container.textContent).toContain('page: 1');

  fireEvent.click(screen.getByText('Next Page'));
  expect(container.textContent).toContain('page: 2');

  fireEvent.click(screen.getByText('Next Page'));
  expect(container.textContent).toContain('page: 3');
});
