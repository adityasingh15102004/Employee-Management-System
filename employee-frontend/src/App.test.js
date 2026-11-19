import { act, render, screen } from '@testing-library/react';
import App from './App';

test('renders the employee management heading', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );

  await act(async () => {
    render(<App />);
  });

  expect(
    screen.getByRole('heading', { name: /employee management system/i })
  ).toBeInTheDocument();
});
