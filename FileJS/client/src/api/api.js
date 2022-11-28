import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {},
});

export const fileAPI = {
    async readDirectory(path) {
        return await instance.get(`/directory?path=${path}`)
    },
    async deleteDirectory(path) {
        return await instance.get(`/directory/delete?path=${path}`)
    },
    async createDirectory(path) {
        return await instance.get(`/directory/create?path=${path}`)
    },
    async downloadFile(path) {
        return await instance.get(`/file/download?path=${path}`,
        {
            responseType: 'blob',
        })
    },
    async deleteFile(path) {
        return await instance.get(`/file/delete?path=${path}`)
    },
}