import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../action/index';
import '../css/components/Comment.css';
import { Button,message } from '../../node_modules/antd';
import CommentTextList from '../components/CommentTextList';

class Comment extends Component{
    constructor(props){
        super(props);
        this.state={
            name: '',
            email: '',
            message: ''
        }
    }
    /**
     * 生命周期函数
     */
    componentWillReceiveProps(nextProps){
        if(nextProps.blogId !== this.props.blogId){
            let info = 'blogId=' + nextProps.blogId;
            this.props.dispatch(actions.QUERY_COMMENT(info,this.props.dispatch));
        }    
    }
    /**
     * 发表评论时触发的事件
     */
    publishComment = () =>{
        if(this.state.message.length === 0){
            message.warn('请填写评论内容！');
            return;
        }
        if(this.state.name.length === 0){
            message.warn('请填写您的昵称！');
            return;
        }
        if(this.state.email.length === 0){
            message.warn('请填写您的email！');
            return;
        }
        let myDate = new Date();
        let time = myDate.toLocaleString();
        let info = 'userName=' + this.state.name + 
                    '&commentText=' + this.state.message + 
                    '&email=' + this.state.email + 
                    '&createTime=' + time + 
                    '&blogID=' + this.props.blogId;
        this.props.dispatch(actions.ADD_COMMENT(info,this.props.dispatch));
        //清空信息
        this.setState({
            name: '',
            email: '',
            message: ''
        })
    }
    /**
     * 编辑评论时触发的事件
     */
    editMessage = (e) =>{
        this.setState({message: e.target.value});
    }
    /**
     * 编辑昵称时触发的事件
     */
    editName = (e) =>{
        this.setState({name: e.target.value});
    }
    /**
     * 编辑email时触发的事件
     */
    editEmail = (e) =>{
        this.setState({email: e.target.value});
    }
    render(){
        return(
            <div className='comment-container'>
                <div className='comment-tittle-text'>发表评论</div>
                <hr style={{color:'gray'}}/>
                <div>您的留言：</div>
                <div>
                    <textarea cols='100' rows='10' value={this.state.message} onChange={this.editMessage} />
                </div>
                <div>您的昵称：</div>
                <div>
                    <input className='comment-input-style' value={this.state.name} onChange={this.editName} />
                    <span className='warn-message'>{'<---必填项'}</span>
                </div>
                <div>电子邮件：</div>
                <div>
                    <input className='comment-input-style' value={this.state.email} onChange={this.editEmail} />
                    <span className='warn-message'>{'<---必填项，当有回复时方便及时通知您'}</span>
                </div>
                <div className='comment-btn-div-style'>
                    <Button
                        type='primary'
                        onClick={this.publishComment}
                        className='comment-btn-style'
                        >
                        发表
                    </Button>
                </div>
                <div className='comment-tittle-text'>评论</div>
                <hr style={{color:'gray'}}/>
                {   
                    this.props.data.length !== 0 ?
                    this.props.data.map((ele)=>(       
                        <CommentTextList item={ele}/>
                    ))  :
                    (<div>暂无评论！</div>)
                }
            </div>
            
            
        )
    }
}
const mapStateToProps = (state,ownProps)=>({
    status: state.comment.status,
    data: state.comment.data
});
export default connect(mapStateToProps)(Comment);