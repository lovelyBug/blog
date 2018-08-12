import {combineReducers} from 'redux';
import {blog} from './blog';
import {content} from './content';
import {drafts} from './drafts';
import {recyclebin} from './recyclebin';
import {comment} from './comment';
import {replyComment} from './replyComment';
export const rootReducer = combineReducers({
    blog,
    content,
    drafts,
    recyclebin,
    comment,
    replyComment
});