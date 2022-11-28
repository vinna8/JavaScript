import { fileAPI } from "../api/api";
import { GET_INFO_ABOUT_FILES } from "./types";

export const setInfoFiles = (files, prevDir, currDir) => {
    return {
        type: GET_INFO_ABOUT_FILES,
        data: {files, prevDir, currDir}
    };
}

export const infoFiles = (path) => {
    return (dispatch) => {
        fileAPI.readDirectory(path)
        .then(response => {
                console.log(response)
                let files = response.data.files;
                let prevDir = response.data.prevDir;
                let currDir = response.data.currDir;
                dispatch(setInfoFiles(files, prevDir, currDir));
            }
        )
        .catch(error => {
            console.log(error)
        })
    }
}

export const deleteDirectory = (path) => {
    return (dispatch) => {
        fileAPI.deleteDirectory(path)
        .then(response => {
                console.log(response)
            }
        )
        .catch(error => {
            console.log(error)
        })
    }
}

export const createDirectory = (path) => {
    return (dispatch) => {
        fileAPI.createDirectory(path)
        .then(response => {
                console.log(response)
            }
        )
        .catch(error => {
            console.log(error)
        })
    }
}

export const download = (path) => {
    return (dispatch) => {
        fileAPI.downloadFile(path)
        .then(response => {
            const blob = response.data;
            console.log(response.data)
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `${path}`;
            document.body.appendChild(link);
            link.click();
            link.remove();
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const deleteFile = (path) => {
    return (dispatch) => {
        fileAPI.deleteFile(path)
        .then(response => {
                console.log(response)
            }
        )
        .catch(error => {
            console.log(error)
        })
    }
}

