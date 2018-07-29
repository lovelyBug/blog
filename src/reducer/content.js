import {handleActions} from 'redux-actions';

export const content = handleActions({
    NEW_BLOG: (state,actions)=>({
        ...state,
        status: actions.type,
    }),
    BLOG_LIST: (state,actions)=>({
        ...state,
        status: actions.type,
    }),
    UNREAD_COMMENT: (state,actions)=>({
        ...state,
        status: actions.type,
    }),
    ALL_COMMENT: (state,actions)=>({
        ...state,
        status: actions.type,
    }),
    DRAFTS: (state,actions)=>({
        ...state,
        status: actions.type,
    }),
    RECYSLE_BIN: (state,actions)=>({
        ...state,
        status: actions.type,
    }),
    MODIFY_SINGLE_BLOG: (state,actions)=>({
        ...state,
        status: actions.type,
        id: actions.payload.id
    })
},{

});