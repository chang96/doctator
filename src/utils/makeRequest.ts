import axios, { AxiosError, AxiosResponse } from "axios"


async function makeRequest(requestData: RequestData) {
    try {
        const { method, baseUrl, path, payload, headers, queries, params } = requestData;
        const url = `${baseUrl}${path||""}${formParams(params)}${formQueries(queries)}`;
    
        return await axios ({
            url,
            method,
            headers,
            data: payload
        }).then(response => {
            return {
                data: {
                    responseBodyCode: response.status,
                    responseBody: btoa(response.data)
                }
            }
        })
    } catch (error: any) {
        console.log(error)
        return error.response as AxiosResponse
    }
}

async function makeProxyRequest(requestData: RequestData): Promise<AxiosResponse> {
    try {
        const { method, baseUrl, path, payload, headers, queries, params } = requestData;
        const url = `${baseUrl}${path||""}${formParams(params)}${formQueries(queries)}`;
    
        return await axios ({
            url: "https://gen-doc.sandymoon.com.ng/proxy-request",
            method: "post",
            data: {
                url,
                headers,
                method: method,
                ...(payload && {body: payload})
        
            }
        }).then(response => response)
    } catch (error: any) {
        console.log(error)
        return error.response as AxiosResponse
    }
}

function formQueries(queries?: MrQueries) {
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

async function getById (id:string){
    try {
        const res = await axios.get(`https://gen-doc.sandymoon.com.ng/get-document?id=${id}`)
        return res.data
    } catch (error: any) {
        throw error
    }
}

export {
    makeRequest,
    r,
    makeProxyRequest,
    getById
}


