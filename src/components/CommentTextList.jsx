import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../action/index';
import {message} from 'antd';
import Reply from './Reply';
class CommentTextList extends Component{
    constructor(props){
        super(props);
    }
    // componentWillMount(){
    //     let info = 'commentID=' + this.props.item.id;
    //     this.props.dispatch(actions.QUERY_REPLY_COMMENT(info,this.props.dispatch));
    //     if(this.props.item.id == 1){
    //         message.success('4541');
    //     }
    // }
    // componentWillReceiveProps(nextProps){
    //     //message.success(nextProps.status);
    // }
    render(){
        return(
            <div>
                <div className='comment-message-name'>{`${this.props.item.userName} 说：`}</div>
                <div className='comment-message-content'>{`${this.props.item.commentText}`}</div>
                <div className='comment-message-time'>{`${this.props.item.createTime}`}</div>
                {/* {   
                    this.props.data.length !== 0 ?
                    this.props.data.map((ele)=>(       
                        <Reply item={ele}/>
                    ))  :
                    null
                } */}
                <hr style={{color:'gray',border: '0.5px dotted gray'}}/>
            </div>
        )
    }
}
const mapStateToProps = (state,ownProps)=>({
    status: state.replyComment.status,
    data: state.replyComment.data
});
export default connect(mapStateToProps)(CommentTextList);