import { GET_INFO_ABOUT_FILES } from "./types";


let initialState = {
    files: [],
    prevDir: '',
    currDir: ''
};

const fileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INFO_ABOUT_FILES:
            return {
                ...state,
                ...action.data,
            }
        default:
            return state;
    }
}

export default fileReducer;