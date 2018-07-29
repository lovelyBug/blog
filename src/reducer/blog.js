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
        data: action.payload
    }),
    DELETE_BLOG_RESULT: (state,action)=>({
        ...state,
        status:action.type,
        data: action.payload
    }),
    MODIFY_BLOG_RESULT: (state,action)=>({
        ...state,
        status:action.type,
        data: action.payload
    })
},{
    //初始默认值
});