import { render, screen, fireEvent, act } from '@testing-library/react';
import { Toast, ToastContainer, ToastData } from '@/app/components/Toast';

jest.useFakeTimers();

afterEach(() => {
  jest.clearAllTimers();
});

const makeToast = (overrides: Partial<ToastData> = {}): ToastData => ({
  id: 1,
  message: 'Operação realizada com sucesso.',
  type: 'success',
  ...overrides,
});

describe('Toast', () => {
  it('exibe a mensagem', () => {
    render(<Toast toast={makeToast()} onClose={jest.fn()} />);
    expect(screen.getByText('Operação realizada com sucesso.')).toBeInTheDocument();
  });

  it('tem role="alert"', () => {
    render(<Toast toast={makeToast()} onClose={jest.fn()} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('chama onClose ao clicar no botão fechar', () => {
    const onClose = jest.fn();
    render(<Toast toast={makeToast({ id: 42 })} onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /fechar notificação/i }));
    expect(onClose).toHaveBeenCalledWith(42);
  });

  it('chama onClose automaticamente após 4 segundos', () => {
    const onClose = jest.fn();
    render(<Toast toast={makeToast({ id: 7 })} onClose={onClose} />);
    act(() => jest.advanceTimersByTime(4000));
    expect(onClose).toHaveBeenCalledWith(7);
  });

  it('não chama onClose antes dos 4 segundos', () => {
    const onClose = jest.fn();
    render(<Toast toast={makeToast()} onClose={onClose} />);
    act(() => jest.advanceTimersByTime(3999));
    expect(onClose).not.toHaveBeenCalled();
  });

  it.each<ToastData['type']>(['success', 'error', 'warning', 'info'])(
    'renderiza o tipo "%s" sem erros',
    (type) => {
      render(<Toast toast={makeToast({ type })} onClose={jest.fn()} />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    }
  );
});

describe('ToastContainer', () => {
  it('não renderiza nada quando a lista está vazia', () => {
    const { container } = render(<ToastContainer toasts={[]} onClose={jest.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renderiza um toast para cada item', () => {
    const toasts: ToastData[] = [
      { id: 1, message: 'Primeiro', type: 'success' },
      { id: 2, message: 'Segundo', type: 'error' },
    ];
    render(<ToastContainer toasts={toasts} onClose={jest.fn()} />);
    expect(screen.getByText('Primeiro')).toBeInTheDocument();
    expect(screen.getByText('Segundo')).toBeInTheDocument();
  });

  it('passa onClose corretamente para cada toast', () => {
    const onClose = jest.fn();
    const toasts: ToastData[] = [
      { id: 1, message: 'Toast 1', type: 'info' },
      { id: 2, message: 'Toast 2', type: 'warning' },
    ];
    render(<ToastContainer toasts={toasts} onClose={onClose} />);
    fireEvent.click(screen.getAllByRole('button', { name: /fechar notificação/i })[1]);
    expect(onClose).toHaveBeenCalledWith(2);
  });
});

