import React, { Component } from 'react';
import { Modal } from 'antd';


class ReplyComment extends Component {
    constructor(props){
        super(props);
        this.state = {
            content: ''
        }
    }
    onTextChange = (e) =>{
        this.setState({
            content: e.target.value
        });
    }
    render() {
      const { visible, onCancel, onCreate } = this.props;
        return (
            <Modal
                visible={visible}
                title="评论回复"
                okText="回复"
                cancelText="取消"
                onCancel={onCancel}
                onOk={()=>{
                    onCreate(this.state.content);
                    this.setState({
                        content: ''
                    });
                    onCancel();
                }}
                >
                <textarea cols='70' rows='5' placeholder='在此处输入信息' value={this.state.content} onChange={this.onTextChange} />
            </Modal>
        );
    }
}
export default ReplyComment;