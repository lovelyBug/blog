import {handleActions} from 'redux-actions';

export const replyComment = handleActions({
    REPLY_COMMENT_RESULT: (state,actions)=>({
        ...state,
        status: actions.type,
        data: actions.payload.data
    }),
    QUERY_REPLY_COMMENT_RESULT: (state,actions)=>({
        ...state,
        status: actions.type,
        data: actions.payload.data
    })
},{
    data: []
});