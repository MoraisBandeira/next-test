import { render, screen } from '@testing-library/react';
import {ContactPage,TextName} from '@/app/contact/page';

describe('Contact', () => {
  it('renders without crashing', () => {
    render(<ContactPage />);
  });

  it('renders the get started text', () => {
    render(<ContactPage />);
    expect(screen.getByText(/Formulário com todos os tipos de campos HTML./i)).toBeInTheDocument();
  });

});
