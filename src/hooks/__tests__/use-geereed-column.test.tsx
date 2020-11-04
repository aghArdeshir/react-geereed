import { act, renderHook } from '@testing-library/react-hooks';
import { useGeereedColumns } from '../use-geereed-columns';

const columns = [
  {
    key: 'Name',
  },
  {
    key: 'LastName',
    title: 'Last Name',
  },
  {
    key: 'Age',
  },
  {
    key: 'Father Name',
    renderer: (_: any, rowItem: { [key: string]: any }) => {
      return rowItem.Father.Name + ' ' + rowItem.Father.LastName;
    },
  },
];

test('columns should not include groupBy column', () => {
  const { result } = renderHook(() => useGeereedColumns(columns, 'Age'));
  const [_columns] = result.current;

  expect(_columns.length).toBe(columns.length - 1); // because `Age` should be removed
  expect(_columns[2].key).toBe(columns[3].key);
});

test('expanding and collapsing groups hsould work', async () => {
  const { result } = renderHook(() => useGeereedColumns(columns, 'Age'));

  expect(result.current[2]['18']).toBeFalsy();

  act(() => result.current[3]('18'));
  expect(result.current[2]['18']).toBeTruthy();

  act(() => result.current[3]('18'));
  expect(result.current[2]['18']).toBeFalsy();
});
