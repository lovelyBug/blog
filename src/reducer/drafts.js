import {handleActions} from 'redux-actions';

export const drafts = handleActions({
    QUERY_UNPUBLISH_BLOG_RESULT: (state,action)=>({
        ...state,
        status:action.type,
        data: action.payload.data
    }),
    DELETE_UNPUBLISH_BLOG_RESULT: (state,action)=>({
        ...state,
        status:action.type,
        data: action.payload.data
    })
},{
    //初始默认值
});