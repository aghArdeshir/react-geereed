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
      <button onClick={() => setPage({ num: page.num, rows: 10 })}>
        10 Rows
      </button>
      <button onClick={() => setPage({ num: page.num, rows: 20 })}>
        20 Rows
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

test('rows test', () => {
  const { container } = render(<GeereedpaginationTestComponent />);
  expect(container.textContent).toContain('rows: 20');

  fireEvent.click(screen.getByText('10 Rows'));
  expect(container.textContent).toContain('rows: 10');

  fireEvent.click(screen.getByText('20 Rows'));
  expect(container.textContent).toContain('rows: 20');
});

test('default values test 1', () => {
  const { container } = render(
    <GeereedpaginationTestComponent defaultRowsPerPage={5} />
  );
  expect(container.textContent).toContain('page: 1 - rows: 5');
});

test('default values test 2', () => {
  const { container } = render(
    <GeereedpaginationTestComponent defaultRowsPerPage={80} />
  );
  expect(container.textContent).toContain('page: 1 - rows: 80');
});

test('default values test 3', () => {
  const { container } = render(
    <GeereedpaginationTestComponent defaultRowsPerPage={80} footer={false} />
  );
  expect(container.textContent).toContain('page: 1 - rows: Infinity');
});

test('default values test 4', () => {
  const { container } = render(
    <GeereedpaginationTestComponent footer={false} />
  );
  expect(container.textContent).toContain('page: 1 - rows: Infinity');
});
