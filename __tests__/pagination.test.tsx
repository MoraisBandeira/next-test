import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '@/app/table/page';

describe('Pagination', () => {
  it('não renderiza quando há apenas uma página', () => {
    const { container } = render(
      <Pagination total={5} page={1} pageSize={10} onChange={jest.fn()} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('exibe a página atual e o total de páginas', () => {
    render(<Pagination total={20} page={2} pageSize={5} onChange={jest.fn()} />);
    expect(screen.getByText('Página 2 de 4')).toBeInTheDocument();
  });

  it('renderiza um botão por página', () => {
    render(<Pagination total={15} page={1} pageSize={5} onChange={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Página 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Página 2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Página 3' })).toBeInTheDocument();
  });

  it('marca a página atual com aria-current="page"', () => {
    render(<Pagination total={15} page={2} pageSize={5} onChange={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Página 2' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: 'Página 1' })).not.toHaveAttribute('aria-current');
  });

  it('chama onChange com o número correto ao clicar em uma página', () => {
    const onChange = jest.fn();
    render(<Pagination total={15} page={1} pageSize={5} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Página 3' }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('desabilita "anterior" e "primeira" na primeira página', () => {
    render(<Pagination total={15} page={1} pageSize={5} onChange={jest.fn()} />);
    expect(screen.getByRole('button', { name: /primeira página/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /página anterior/i })).toBeDisabled();
  });

  it('desabilita "próxima" e "última" na última página', () => {
    render(<Pagination total={15} page={3} pageSize={5} onChange={jest.fn()} />);
    expect(screen.getByRole('button', { name: /próxima página/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /última página/i })).toBeDisabled();
  });

  it('navega para a página anterior ao clicar em "‹"', () => {
    const onChange = jest.fn();
    render(<Pagination total={15} page={3} pageSize={5} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: /página anterior/i }));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('navega para a próxima página ao clicar em "›"', () => {
    const onChange = jest.fn();
    render(<Pagination total={15} page={1} pageSize={5} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: /próxima página/i }));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('navega para a primeira página ao clicar em "«"', () => {
    const onChange = jest.fn();
    render(<Pagination total={15} page={3} pageSize={5} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: /primeira página/i }));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('navega para a última página ao clicar em "»"', () => {
    const onChange = jest.fn();
    render(<Pagination total={15} page={1} pageSize={5} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: /última página/i }));
    expect(onChange).toHaveBeenCalledWith(3);
  });
});
