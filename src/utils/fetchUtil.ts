import fetch from 'isomorphic-fetch';

interface IFetchParams {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Headers;
    body?: {},
    csrfToken?: string,
}

export const simchaFetch = (path: string, { method, headers, body, csrfToken }: IFetchParams) => {
    const url: string = 'http://localhost:8000';
    const requestHeaders = new Headers({
        'Content-type': 'application/json',
        'Accept': 'application/json',
    });

    const options: any = {
        method,
        credentials: 'include',
    };

    if (csrfToken) {
        requestHeaders.set('X-CSRF-Token', csrfToken);
    }

    if (body) {
        options.body = JSON.stringify(body);
    }

    options.headers = requestHeaders;

    if (headers) {
        headers.forEach((val, key) => {
            options.headers.set(key, val);
        });
    }

    return fetch(`${url}/${path}`, options).then((res) => {
        const resToken = res.headers.get('X-CSRF-Token');
        return Promise.all([res.json(), Promise.resolve(resToken)])
    }).then(([jsonResponse, token]) => {
        return { data: jsonResponse, token }
    })
};
