
const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST;
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;

const url = BACKEND_HOST + (BACKEND_PORT == 443 || BACKEND_PORT == 80 ? "" : ":" + BACKEND_PORT)

export function fetcher<T>(endpoint: string): Promise<T> {
    return fetch(url + endpoint, {
        method: "GET"
    })
    .then(r => {
        if (!r.ok) {
            throw new Error(r.statusText)
        }
        const data = r.json();
        return data as Promise<T>;
    })
}

export function fetcherUnwraper<T>(endpoint: string): Promise<T> {
    return fetch(url + endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<{ results: T }>
        })
        .then(data => {
            return data.results
        })
}