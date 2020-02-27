import React from 'react';
import { render } from '@testing-library/react';
import ReactGeereed from './ReactGeereed';

test('renders learn react link', () => {
  render(<ReactGeereed columns={[{ key: 'name' }, { key: 'age' }]} items={[{ name: 'Ali', age: 24 }]} />);
});
