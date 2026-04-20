// jest.mock('@/app/api/GetRequest');
//Criamos um tipo para o GetRequest mockado, permitindo definir o comportamento da função durante os testes
import GetRequest from '@/app/api/GetRequest';
import PostRequest from '@/app/api/PostRequest';
//Definimos o tipo do GetRequest como uma função mockada, para podermos usar métodos como mockResolvedValue e mockReturnValue
import { describe, expect, it } from "@jest/globals";
import { error } from 'console';

const mockUsers = [
  { id: 1, name: 'Alice', email: 'alice@example.com', website: 'alice.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com', website: 'bob.com' },
];

describe("GetRequest", () => {
   let mockFetch: jest.Mock;

  beforeEach(() => {
    global.fetch = jest.fn();
    mockFetch = global.fetch as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("Deve retornar um array de objetos quando a requisição for bem-sucedida", async () => {
    const mockUsers = [
        { id: 1, name: 'Alice', email: 'alice@example.com', website: 'alice.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com', website: 'bob.com' },
      ];
    mockFetch.mockResolvedValueOnce({
      ok:true,
      status:200,
      json: jest.fn().mockResolvedValueOnce(mockUsers),
    });
    const result = await GetRequest("/api/users");
    expect(result).toEqual(mockUsers);
    })  

  it("Deve retornar mensagem de erro quando o recurso não for encontrado (404)", async () => {
    // mockGetRequest.mockResolvedValueOnce("Recurso não encontrado");
        mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: jest.fn(),
      });
      const result = await GetRequest("/api/recurso-nao-encontrado");

      expect(result).toBe("Recurso não encontrado");
  });

  it("Deve retornar mensagem de erro quando as credenciais forem inválidas (401)", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: jest.fn(),
      });
      const result = await GetRequest("/api/credenciais-invalidas");
      expect(result).toBe("Credenciais inválidas");
  });

  it("Deve retornar mensagem de erro quando ocorrer um erro interno (500)", async () => {
    const errorStatus = 500;
    mockFetch.mockResolvedValueOnce({
        ok: false,
        status: errorStatus,
        json: jest.fn(),
      });
      const result = await GetRequest("/api/erro-interno");
      expect(result).toBe(`Ocorreu um erro: ${errorStatus}`);
  });

});

describe("PostRequest",()=>{
   let mockFetch: jest.Mock;

  beforeEach(() => {
    global.fetch = jest.fn();
    mockFetch = global.fetch as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Deve retornar mensagem de sucesso quando a requisição for bem-sucedida', async () => {
    const mockData = { id: 1, name: 'Alice', email: 'alice@example.com', website: 'alice.com' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 201,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });
    const result = await PostRequest("/api/users", mockData);
    expect(result).toEqual('Recurso criado com sucesso');
  });

  it('Deve retornar mensagem de requisição inválida', async () => {
    const mockData = { id: 1, name: 'Alice', email: 'alice@example.com', website: 'alice.com' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 400,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });
    const result = await PostRequest("/api/users", mockData);
    expect(result).toEqual('Requisição inválida');
  });

   it('Deve retornar mensagem de recurso não encontrado', async () => {
    const mockData = { id: 1, name: 'Alice', email: 'alice@example.com', website: 'alice.com' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 404,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });
    const result = await PostRequest("/api/users", mockData);
    expect(result).toEqual('Recurso não encontrado');
  });

   it('Deve retornar mensagem de requisição não autorizada', async () => {
    const mockData = { id: 1, name: 'Alice', email: 'alice@example.com', website: 'alice.com' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 401,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });
    const result = await PostRequest("/api/users", mockData);
    expect(result).toEqual('Requisição não autorizada');
  });

   it('Deve retornar mensagem de recurso não encontrado', async () => {
    const mockData = { id: 1, name: 'Alice', email: 'alice@example.com', website: 'alice.com' };
    const errorStatus = 500;
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: errorStatus,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });
    const result = await PostRequest("/api/users", mockData);
    expect(result).toEqual(`Ocorreu um erro: ${errorStatus}`);
  });

});