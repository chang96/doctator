import { getSampleData } from "./helpers";
import { makeRequest } from "./makeRequest";

async function getSampleTemplates(path: string = "/"){
    try {
        // return await makeRequest({
        //     method: 'get',
        //     baseUrl: 'https://gen-doc.sandymoon.com.ng',
        //     path,

        // })
        return getSampleData(path as "/samplepath" | "/sampleconfig")
    } catch (error) {
        throw new Error("could not get file")
    }
}

async function generateJsonFile(config: any, paths: any){
    try {
        const res = await makeRequest({
            method: 'POST',
            baseUrl: 'https://gen-doc.sandymoon.com.ng',
            path: "/generate",
            payload: {config, paths},
            headers: {}
        })
        return res.data
    } catch (error) {
        
    }
}

export {
    getSampleTemplates,
    generateJsonFile
}