import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import fileReducer  from '../redux/file-reducer';
import thunkMiddleware from 'redux-thunk'; 

let reducers = combineReducers({
    file: fileReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;