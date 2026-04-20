'server side'

export default async function GetRequest<T>(url:string) : Promise<T|string> {
    const defaultUrl = 'https://jsonplaceholder.typicode.com/';
    const response = await fetch(`${defaultUrl}${url}`);
    switch (response.status) {
        case 200:
            const data = await response.json();
            return data as T;
        case 404:
            return "Recurso não encontrado";
        case 401:
            return "Credenciais inválidas";    
        default:
            return `Ocorreu um erro: ${response.status}`;
    }

}