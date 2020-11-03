import { act, renderHook } from '@testing-library/react-hooks';
import { useGeereedPagination } from '../use-geereed-pagination';

test('page test', () => {
  const { result } = renderHook(() => useGeereedPagination(true, 20));
  expect(result.current[0].num).toBe(1);

  function goToNextPage() {
    result.current[1]({
      num: result.current[0].num + 1,
      rows: result.current[0].rows,
    });
  }
  act(goToNextPage);
  expect(result.current[0].num).toBe(2);

  act(goToNextPage);
  expect(result.current[0].num).toBe(3);
});

test('rows test', () => {
  const { result } = renderHook(() => useGeereedPagination(true, 20));
  expect(result.current[0].rows).toBe(20);

  act(() => result.current[1]({ num: result.current[0].num, rows: 10 }));
  expect(result.current[0].rows).toBe(10);

  act(() => result.current[1]({ num: result.current[0].num, rows: 20 }));
  expect(result.current[0].rows).toBe(20);
});

test('default values test 1', () => {
  const { result } = renderHook(() => useGeereedPagination(true, 5));
  expect(result.current[0]).toEqual({ num: 1, rows: 5 });
});

test('default values test 2', () => {
  const { result } = renderHook(() => useGeereedPagination(true, 80));
  expect(result.current[0]).toEqual({ num: 1, rows: 80 });
});

test('default values test 3', () => {
  const { result } = renderHook(() => useGeereedPagination(false, 80));
  expect(result.current[0]).toEqual({ num: 1, rows: Infinity });
});

test('default values test 4', () => {
  const { result } = renderHook(() => useGeereedPagination(false, 20));
  expect(result.current[0]).toEqual({ num: 1, rows: Infinity });
});
