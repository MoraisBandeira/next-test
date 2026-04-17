'server side'

export async function PostRequest<T>(url:string, data:T) : Promise<string> {
    const defaultUrl = 'https://jsonplaceholder.typicode.com/';
    const response = await fetch(`${defaultUrl}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    switch (response.status) {
        case 201:
            return "Recurso criado com sucesso";
        case 400:
            return "Requisição inválida";
        case 401:
            return "Requisição não autorizada";
       case 404:
            return "Recurso não encontrado";    
        default:
            return `Ocorreu um erro: ${response.status}`;
    }
}