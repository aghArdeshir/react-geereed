import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { useGeereedColumns } from '../use-geereed-columns';

const coulumns = [
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

function TestUseGeereedColumnComponent(props: { groupBy?: string }) {
  const [
    _columns,
    groupColumn,
    groupByStateHolder,
    dispatchGroupByStateHolder,
  ] = useGeereedColumns(coulumns, props.groupBy);

  return (
    <>
      {Object.keys(groupByStateHolder).map((v) =>
        groupByStateHolder[v] ? (
          <React.Fragment key={v}>expanded: {v}</React.Fragment>
        ) : (
          <React.Fragment key={v}></React.Fragment>
        )
      )}

      <button onClick={() => dispatchGroupByStateHolder('18')}>
        expand 18
      </button>
      <button onClick={() => dispatchGroupByStateHolder('22')}>
        expand 22
      </button>
      <button onClick={() => dispatchGroupByStateHolder('25')}>
        expand 25
      </button>
      <button onClick={() => dispatchGroupByStateHolder('27')}>
        expand 27
      </button>
    </>
  );
}

test('simple test', async () => {
  const { container } = render(<TestUseGeereedColumnComponent groupBy="Age" />);
  expect(container.textContent).not.toContain('expanded: 18');

  fireEvent.click(screen.getByText('expand 18'));
  await waitFor(() => expect(container.textContent).toContain('expanded: 18'));

  fireEvent.click(screen.getByText('expand 18'));
  await waitFor(() =>
    expect(container.textContent).not.toContain('expanded: 18')
  );
});
