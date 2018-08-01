import React,{Component} from 'react';

class CommentTextList extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <div className='comment-message-name'>{`${this.props.item.userName} 说：`}</div>
                <div className='comment-message-content'>{`${this.props.item.commentText}`}</div>
                <div className='comment-message-time'>{`${this.props.item.createTime}`}</div>
                <hr style={{color:'gray',border: '0.5px dotted gray'}}/>
            </div>
        )
    }
}
export default CommentTextList;