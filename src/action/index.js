import {createAction} from 'redux-actions';
import {message} from 'antd';
/**
 * blog
 */
export const ADD_BLOG_RESULT = createAction('ADD_BLOG_RESULT');
export const QUERY_BLOG_RESULT = createAction('QUERY_BLOG_RESULT');
export const DELETE_BLOG_RESULT = createAction('DELETE_BLOG_RESULT');
export const MODIFY_BLOG_RESULT = createAction('MODIFY_BLOG_RESULT');
/**
 * content
 */
export const NEW_BLOG = createAction('NEW_BLOG');
export const BLOG_LIST = createAction('BLOG_LIST');
export const UNREAD_COMMENT = createAction('UNREAD_COMMENT');
export const ALL_COMMENT = createAction('ALL_COMMENT');
export const DRAFTS = createAction('DRAFTS');
export const RECYSLE_BIN = createAction('RECYSLE_BIN');
/**
 * 添加博客
 * @param {*} state 
 * @param {*} dispatch 
 */
export const ADD_BLOG = (info,dispatch) => async =>{
    let URL = 'http://localhost:9000/add_blog';
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: info,
        mode:'cors',
        })
        .then((res)=>{
            res.json().then(function (json) {
                //从服务端传来的JSON数据
                message.success(json.message);
                dispatch(ADD_BLOG_RESULT({data: json.message}));
            });
        })
        .catch((e)=>{
          message.error('请求失败！');
        });
}
/**
 * 查询博客
 * @param {*} state 
 * @param {*} dispatch 
 */
export const QUERY_BLOG = (dispatch) => async =>{
    let URL = 'http://localhost:9000/query_blog';
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        mode:'cors',
        })
        .then((res)=>{
            res.json().then(function (json) {
                //从服务端传来的JSON数据
                message.success(json[0].title);
                dispatch(QUERY_BLOG_RESULT({data: json.message}));
            });
        })
        .catch((e)=>{
          message.error('请求失败！');
        });
}
/**
 * 删除博客
 * @param {*} state 
 * @param {*} dispatch 
 */
export const DELETE_BLOG = (state,dispatch) =>{
    
}
/**
 * 修改博客
 * @param {*} state 
 * @param {*} dispatch 
 */
export const MODIFY_BLOG = (state,dispatch) =>{
    
}