import {handleActions} from 'redux-actions';

export const comment = handleActions({
    ADD_COMMENT_RESULT: (state,actions)=>({
        ...state,
        status: actions.type,
        data: actions.payload.data
    }),
    QUERY_COMMENT_RESULT: (state,actions)=>({
        ...state,
        status: actions.type,
        data: actions.payload.data
    })
},{
    data: []
});