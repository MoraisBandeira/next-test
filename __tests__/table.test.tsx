import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TablePage from '@/app/table/page';
//Mock do GetRequest para controlar as respostas da API durante os testes
jest.mock('@/app/api/GetRequest');
//Criamos um tipo para o GetRequest mockado, permitindo definir o comportamento da função durante os testes
import GetRequest from '@/app/api/GetRequest';
//Definimos o tipo do GetRequest como uma função mockada, para podermos usar métodos como mockResolvedValue e mockReturnValue
const mockGetRequest = GetRequest as jest.MockedFunction<typeof GetRequest>;

const mockUsers = [
  { id: 1, name: 'Alice', email: 'alice@example.com', website: 'alice.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com', website: 'bob.com' },
];
//Antes de cada teste resolver a promise do GetRequest com os dados mockados
beforeEach(() => {
  mockGetRequest.mockResolvedValue(mockUsers);
});
//Depois de cada teste limpar os mocks para evitar interferência entre testes
afterEach(() => {
  jest.clearAllMocks();
});

describe('TablePage', () => {

  const Pagina = () => render(<TablePage />);
  
  it('Deve exibir o loading enquanto os dados não chegam', () => {
    mockGetRequest.mockReturnValue(new Promise(() => {}));
    Pagina();
    expect(screen.getByRole('status', { name: /carregando/i })).toBeInTheDocument();
  });

  it('Deve exibir os dados na tabela após carregar', async () => {
    Pagina();
    await waitFor(() => expect(screen.getByText('Alice')).toBeInTheDocument());
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('bob@example.com')).toBeInTheDocument();
  });

  it('Deve exibir os cabeçalhos da tabela', async () => {
    Pagina();
    await waitFor(() => screen.getByText('Alice'));
    expect(screen.getByText(/nome/i)).toBeInTheDocument();
    expect(screen.getByText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/site/i)).toBeInTheDocument();
  });

  it('Deve exibir mensagem de sem dados quando a API retorna lista vazia', async () => {
    mockGetRequest.mockResolvedValue([]);
    Pagina();
    await waitFor(() =>
      expect(screen.getByRole('status', { name: /sem dados/i })).toBeInTheDocument()
    );
    expect(screen.getByText(/nenhum dado encontrado/i)).toBeInTheDocument();
  });

  it('não Deve exibir o loading após os dados chegarem', async () => {
    Pagina();
    await waitFor(() => screen.getByText('Alice'));
    expect(screen.queryByRole('status', { name: /carregando/i })).not.toBeInTheDocument();
  });

  it('Deve exibir um botão de editar por linha', async () => {
    Pagina();
    await waitFor(() => screen.getByText('Alice'));
    expect(screen.getByRole('button', { name: /editar alice/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /editar bob/i })).toBeInTheDocument();
  });

  it('abre o modal ao clicar em editar', async () => {
    Pagina();
    await waitFor(() => screen.getByText('Alice'));
    fireEvent.click(screen.getByRole('button', { name: /editar alice/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Alice')).toBeInTheDocument();
  });

  it('fecha o modal ao clicar em cancelar', async () => {
    Pagina();
    await waitFor(() => screen.getByText('Alice'));
    fireEvent.click(screen.getByRole('button', { name: /editar alice/i }));
    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('atualiza os dados da linha ao salvar o modal', async () => {
    Pagina();
    await waitFor(() => screen.getByText('Alice'));
    fireEvent.click(screen.getByRole('button', { name: /editar alice/i }));

    fireEvent.change(screen.getByDisplayValue('Alice'), { target: { value: 'Alice Editada' } });
    fireEvent.click(screen.getByRole('button', { name: /salvar/i }));

    await waitFor(() => expect(screen.getByText('Alice Editada')).toBeInTheDocument());
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('exibe toast de sucesso ao salvar edição', async () => {
    Pagina();
    await waitFor(() => screen.getByText('Alice'));
    fireEvent.click(screen.getByRole('button', { name: /editar alice/i }));
    fireEvent.change(screen.getByDisplayValue('Alice'), { target: { value: 'Alice Editada' } });
    fireEvent.click(screen.getByRole('button', { name: /salvar/i }));

    await waitFor(() =>
      expect(screen.getByText(/alice editada.*atualizado/i)).toBeInTheDocument()
    );
  });
});
