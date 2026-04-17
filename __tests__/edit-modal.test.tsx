import { render, screen, fireEvent } from '@testing-library/react';
import { EditModal } from '@/app/table/page';

const user = { id: 1, name: 'Alice', email: 'alice@example.com', role: 'alice.com' };

describe('EditModal', () => {
  it('renderiza os campos preenchidos com os dados do usuário', () => {
    render(<EditModal user={user} onSave={jest.fn()} onClose={jest.fn()} />);
    expect(screen.getByDisplayValue('Alice')).toBeInTheDocument();
    expect(screen.getByDisplayValue('alice@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('alice.com')).toBeInTheDocument();
  });

  it('chama onClose ao clicar no botão fechar', () => {
    const onClose = jest.fn();
    render(<EditModal user={user} onSave={jest.fn()} onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /fechar modal/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('chama onClose ao clicar em cancelar', () => {
    const onClose = jest.fn();
    render(<EditModal user={user} onSave={jest.fn()} onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('chama onClose ao pressionar Escape', () => {
    const onClose = jest.fn();
    render(<EditModal user={user} onSave={jest.fn()} onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('chama onClose ao clicar no backdrop', () => {
    const onClose = jest.fn();
    render(<EditModal user={user} onSave={jest.fn()} onClose={onClose} />);
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('chama onSave com os dados atualizados', () => {
    const onSave = jest.fn();
    render(<EditModal user={user} onSave={onSave} onClose={jest.fn()} />);
    fireEvent.change(screen.getByDisplayValue('Alice'), { target: { value: 'Alice Nova' } });
    fireEvent.click(screen.getByRole('button', { name: /salvar/i }));
    expect(onSave).toHaveBeenCalledWith({ ...user, name: 'Alice Nova' });
  });

  it('não chama onSave ao cancelar sem salvar', () => {
    const onSave = jest.fn();
    render(<EditModal user={user} onSave={onSave} onClose={jest.fn()} />);
    fireEvent.change(screen.getByDisplayValue('Alice'), { target: { value: 'Alice Nova' } });
    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }));
    expect(onSave).not.toHaveBeenCalled();
  });
});
