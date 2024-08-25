import axios, { AxiosError } from "axios"


async function makeRequest(requestData: RequestData) {
    try {
        const { method, baseUrl, path, payload, headers, queries, params } = requestData;
        const url = `${baseUrl}${path}${formParams(params)}${formQueries(queries)}`;
        return await axios ({
            url,
            method,
            headers,
            data: payload
        }).then(response => response.data)
    } catch (error) {
        throw error
    }
}

function formQueries(queries?: Queries) {
    if(!queries) return ''
    return `?${queries.map(query => Object.keys(query).map(key => `${key}=${encodeURIComponent(query[key])}`).join('&')).join('&')}`
}

function formParams (params?: Params){
    if(!params){
        return ''
    }
    return params.map(param => `/${param}`).join('')
}

async function r(reqData: RequestData) {
    const {payload, queries, params, headers, baseUrl, method, path} = reqData || {}
    try {
        return await makeRequest({
            baseUrl,
            headers,
            queries,
            payload,
            params,
            method,
            path,
            })
    } catch (error: any) {
        const {status, code, name, message} = error as AxiosError
        return {status, code, name, message}
    }
}

export {
    makeRequest,
    r
}


