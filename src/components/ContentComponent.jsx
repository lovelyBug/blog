import React, { Component } from 'react';
import {message} from 'antd';
import Editor from '../components/Editor';
import BlogList from '../components/BlogList';
import UnreadComment from '../components/UnreadComment';
import AllComment from '../components/AllComment';
import Drafts from '../components/Drafts';
import RecycleBin from '../components/RecycleBin';
import {connect} from 'react-redux';
class ContentComponent extends Component{

    componentWillReceiveProps(nextProps){
        //message.success('redux: ' + nextProps.status);
    }
    renderView = () =>{
        switch(this.props.status){
            case 'NEW_BLOG':
                return <Editor/>;
            case 'BLOG_LIST':
                return <BlogList/>;
            case 'UNREAD_COMMENT':
                return <UnreadComment/>;
            case 'ALL_COMMENT':
                return <AllComment/>;
            case 'DRAFTS':
                return <Drafts/>;
            case 'RECYSLE_BIN':
                return <RecycleBin/>;
            default:
                return <Editor/>;;
        }
    }
    render(){
        return(
            this.renderView()
        )
    }
}
const mapStateToProps = (state,ownProps)=>({
    status: state.content.status
});
export default connect(mapStateToProps)(ContentComponent);