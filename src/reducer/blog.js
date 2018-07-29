import {handleActions} from 'redux-actions';

export const blog = handleActions({
    ADD_BLOG_RESULT: (state,action)=>({
        ...state,
        status:action.type,
        data: action.payload.data
    }),
    QUERY_BLOG_RESULT: (state,action)=>({
        ...state,
        status:action.type,
        data: action.payload.data
    }),
    DELETE_BLOG_RESULT: (state,action)=>({
        ...state,
        status:action.type,
        data: action.payload.data
    }),
    MODIFY_BLOG_RESULT: (state,action)=>({
        ...state,
        status:action.type,
        data: action.payload.data
    })
},{
    //初始默认值
});