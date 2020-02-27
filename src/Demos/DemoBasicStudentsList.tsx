import React from 'react';
import { randomName, randomLastName, getRandom } from './Demo.Service';
import ReactGeereed from '../ReactGeereed';

export default function DemoBasicStudentsList() {
  const columns = React.useMemo(
    () => [
      {
        key: 'Name' // title will be set equal to key if not provided
      },
      { key: 'LastName', title: 'Last Name' },
      { key: 'Age' },
      { key: 'AverageMarks', title: 'Average Marks' }
    ],
    []
  );

  const items = React.useMemo(
    () =>
      new Array(10).fill(1).map(() => ({
        Name: randomName(),
        LastName: randomLastName(),
        Age: getRandom(100),
        AverageMarks: getRandom(20)
      })),
    []
  );

  return <ReactGeereed columns={columns} items={items} />;
}
