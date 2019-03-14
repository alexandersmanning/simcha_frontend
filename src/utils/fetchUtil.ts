import fetch from 'isomorphic-fetch';

interface IFetchParams {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers: Headers;
    body?: {},
    crsfToken?: string,
}
const simchaFetch = (path: string, { method, headers, body, crsfToken }: IFetchParams) => {
    const url: string = 'http://localhost:8000';
    const requestHeaders = new Headers({
        'Content-type': 'application/json',
        'Accept': 'application/json',
    });

    const options: any = {
        method,
        credentials: 'include',
    };

    if (method === 'POST' || method === 'PUT') {
        requestHeaders.set('X-CSRF-Token', crsfToken);
        options.body = body;
    }

    options.headers = { ...requestHeaders, ...headers };

    return fetch(`${url}/${path}`, options).then((res) => {
        const resToken = res.headers.get('X-CSRF-Token');
        return Promise.all([res.json(), Promise.resolve(resToken)])
    }).then(([jsonResponse, token]) => {
        return { data: jsonResponse, token }
    })
};
