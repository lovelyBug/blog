import {combineReducers} from 'redux';
import {blog} from './blog';
import {content} from './content';
import {drafts} from './drafts';
import {recyclebin} from './recyclebin';
export const rootReducer = combineReducers({
    blog,
    content,
    drafts,
    recyclebin
});