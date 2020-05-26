import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import blogReducer from '../Reducers/reducer';


const combineReducer = combineReducers({
    blogStore: blogReducer
})

const store = createStore(combineReducer, applyMiddleware(ReduxThunk));

export default store;