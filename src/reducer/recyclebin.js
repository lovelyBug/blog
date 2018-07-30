import {handleActions} from 'redux-actions';

export const recyclebin = handleActions({
    QUERY_DELETE_BLOG_RESULT: (state,action)=>({
        ...state,
        status:action.type,
        data: action.payload.data
    }),
    REAL_DELETE_BLOG_RESULT: (state,action)=>({
        ...state,
        status:action.type,
        data: action.payload.data
    }),
    RESTORE_BLOG_RESULT: (state,action)=>({
        ...state,
        status:action.type,
        data: action.payload.data
    })
},{
    //初始默认值
});