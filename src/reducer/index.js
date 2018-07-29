import {combineReducers} from 'redux';
import {blog} from './blog';
import {content} from './content';
export const rootReducer = combineReducers({
    blog,
    content
});