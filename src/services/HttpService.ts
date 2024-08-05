const baseURL = process.env.EXPO_PUBLIC_API_URL

const defaultHeaders = {
    'Content-Type': 'application/json',
};

const fetchWithBaseUrl = async (url: string, options?: RequestInit) => {
    console.log(`Fetching: ${baseURL}${url}. Options ${JSON.stringify(options)}`);
    const response = await fetch(`${baseURL}${url}`, options);
    console.log(`Response: ${JSON.stringify(response)}`);
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText} - ${errorText}
                         Url: ${baseURL}${url}`);
    }
    return response;
};

export const useGET = async <T>(url: string, options?: RequestInit): Promise<T> => {
    const response = await fetchWithBaseUrl(url, options);
    try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        } else {
            const text = await response.text();
            console.warn(`Expected JSON, but got: ${text}`);
            throw new Error(`Unexpected content-type: ${contentType}`);
        }
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to parse JSON from ${url}`);
    }
};

interface RequestProps {
    url: string;
    pathParams?: Record<string, string>;
    queryParams?: Record<string, string>;
    bodyParams?: any;
}

const buildUrlWithParams = (url: string, pathParams?: Record<string, string>, queryParams?: Record<string, string>) => {
    let urlTemplate = url;

    if (pathParams) {
        Object.keys(pathParams).forEach(key => {
            urlTemplate = urlTemplate.replace(`{${key}}`, pathParams[key]);
        });
    }

    if (queryParams) {
        const queryString = new URLSearchParams(queryParams).toString();
        if (queryString) {
            urlTemplate += `?${queryString}`;
        }
    }

    return urlTemplate;
};

export const usePOST = async <T>(props: RequestProps, options?: RequestInit): Promise<T> => {
    const urlTemplate = buildUrlWithParams(props.url, props.pathParams, props.queryParams);
    const response = await fetchWithBaseUrl(urlTemplate, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(props.bodyParams),
        ...options,
    });
    try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        } else {
            const text = await response.text();
            console.warn(`Expected JSON, but got: ${text}`);
            throw new Error(`Unexpected content-type: ${contentType}`);
        }
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to parse JSON from ${props.url}`);
    }
};

export const usePUT = async <T>(props: RequestProps, options?: RequestInit): Promise<T> => {
    const urlTemplate = buildUrlWithParams(props.url, props.pathParams, props.queryParams);
    const response = await fetchWithBaseUrl(urlTemplate, {
        method: 'PUT',
        headers: defaultHeaders,
        body: JSON.stringify(props.bodyParams),
        ...options,
    });
    try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        } else {
            const text = await response.text();
            console.warn(`Expected JSON, but got: ${text}`);
            throw new Error(`Unexpected content-type: ${contentType}`);
        }
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to parse JSON from ${props.url}`);
    }
};

export const usePATCH = async <T>(props: RequestProps, options?: RequestInit): Promise<T> => {
    const urlTemplate = buildUrlWithParams(props.url, props.pathParams, props.queryParams);
    const response = await fetchWithBaseUrl(urlTemplate, {
        method: 'PATCH',
        headers: defaultHeaders,
        body: JSON.stringify(props.bodyParams),
        ...options,
    });
    try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        } else {
            const text = await response.text();
            console.warn(`Expected JSON, but got: ${text}`);
            throw new Error(`Unexpected content-type: ${contentType}`);
        }
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to parse JSON from ${props.url}`);
    }
};

export const useDELETE = async <T>(url: string, options?: RequestInit): Promise<T> => {
    const response = await fetchWithBaseUrl(url, { method: 'DELETE', ...options });
    try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        } else {
            const text = await response.text();
            console.warn(`Expected JSON, but got: ${text}`);
            throw new Error(`Unexpected content-type: ${contentType}`);
        }
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to parse JSON from ${url}`);
    }
};
