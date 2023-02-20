import { render, screen } from '@testing-library/react';

import Home from '@/pages/index';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: '/',
    };
  },
}));

test('page has correct category title', () => {
  render(<Home />);

  const categoryTitle = screen.getByRole('heading', {
    name: /New Arrivals/i,
  });
  expect(categoryTitle).toBeInTheDocument();
});
