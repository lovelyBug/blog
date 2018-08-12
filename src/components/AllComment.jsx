import React,{Component} from 'react';
import {Table,message,Icon,Button,Progress} from 'antd';
import {connect} from 'react-redux';
import * as actions from '../action/index';
import ReplyComment from './ReplyComment';
class AllComment extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false
        };
    }
    /**
     * 生命周期函数
     */
    componentWillMount(){
        let info = 'blogId=all';
        this.props.dispatch(actions.QUERY_COMMENT(info,this.props.dispatch));
    }
    /**
     * 列表列名标题
     */
    columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    },{
        title: '评论者昵称',
        dataIndex: 'userName',
        key: 'userName'
    }, {
        title: '评论内容',
        dataIndex: 'commentText',
        key: 'commentText'
    },{
        title: '评论者邮箱',
        dataIndex: 'email',
        key: 'email'
    }, {
        title: '评论时间',
        dataIndex: 'creatTime',
        key: 'creatTime'
    },{
        title: '所属博客ID',
        dataIndex: 'blogID',
        key: 'blogID'
    },
    {
        title: '操作',
        dataIndex: 'opration',
        key: 'opration',
        render: (text,record,)=>(
        <span>
            <Button onClick={()=>{this.showReplyView(record)}}>回复</Button>
        </span>
        )
    }];
    /**
     * 回复评论
     */
    replyComment = (text) =>{
        let myDate = new Date();
        let time = myDate.toLocaleString();
        let info = 'commentID=' + this.state.blogId +
                    '&replyText=' + text + 
                    '&createTime=' + time;
        this.props.dispatch(actions.REPLY_COMMENT(info,this.props.dispatch));
    }
    /**
     * 取消回复评论
     */
    onCancel = () =>{
        this.setState({
            visible: false
        });
    }
    /**
     * 显示回复评论视图
     */
    showReplyView = (record) =>{
        this.setState({
            visible: true,
            blogId: record.id
        });
    }
    render(){
        return(
            <div>
                <Table columns={this.columns} dataSource={this.props.data} />
                <ReplyComment
                    visible={this.state.visible}
                    onCancel={this.onCancel}
                    onCreate={this.replyComment}
                />
            </div>
        )
    }
}
const mapStateToProps = (state,ownProps)=>({
    status: state.comment.status,
    data: state.comment.data
  });
export default connect(mapStateToProps)(AllComment);