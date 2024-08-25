import { makeRequest } from "./makeRequest";

async function getSampleTemplates(path: string = "/"){
    try {
        return await makeRequest({
            method: 'get',
            baseUrl: 'https://gen-doc.sandymoon.com.ng',
            path,

        })
    } catch (error) {
        console.log(error)
        throw new Error("could not get file")
    }
}

async function generateJsonFile(config: any, paths: any){
    try {
        return await makeRequest({
            method: 'POST',
            baseUrl: 'https://gen-doc.sandymoon.com.ng',
            path: "/generate",
            payload: {config, paths},
            headers: {}
        })
    } catch (error) {
        
    }
}

export {
    getSampleTemplates,
    generateJsonFile
}