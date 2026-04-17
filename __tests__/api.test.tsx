jest.mock('@/app/api/GetRequest');
//Criamos um tipo para o GetRequest mockado, permitindo definir o comportamento da função durante os testes
import GetRequest from '@/app/api/GetRequest';
//Definimos o tipo do GetRequest como uma função mockada, para podermos usar métodos como mockResolvedValue e mockReturnValue
const mockGetRequest = GetRequest as jest.MockedFunction<typeof GetRequest>;
import { describe, expect, it } from "@jest/globals";

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

describe("GetRequest", () => {
    
  it("Deve retornar um array de objetos quando a requisição for bem-sucedida", async () => {
    const result = await mockGetRequest("/api/test-get");
    expect(result).toEqual(mockUsers);
  });

});