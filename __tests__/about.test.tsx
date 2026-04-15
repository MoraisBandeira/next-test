import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home', () => {
  it('renders without crashing', () => {
    render(<Home />);
  });

  it('renders the get started text', () => {
    render(<Home />);
    expect(screen.getByText(/Get started by editing/i)).toBeInTheDocument();
  });
});
