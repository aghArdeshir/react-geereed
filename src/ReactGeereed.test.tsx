import React from 'react';
import { render, screen } from '@testing-library/react';
import ReactGeereed from './ReactGeereed';

test('renders learn react link', () => {
  render(
    <ReactGeereed
      columns={[{ key: 'name' }, { key: 'age' }]}
      items={[{ name: 'Ali', age: 24 }]}
    />
  );

  expect(screen.getByText('Ali')).toBeVisible();
});
