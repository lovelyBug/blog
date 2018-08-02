import React, { Component } from 'react';
import { Menu, Icon,message } from 'antd';
import * as actions from '../action/index';
import {connect} from 'react-redux';
import GlobalVariable from '../GlobalInfo/GlobalVariable';
class BlogTittleList extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    componentWillMount(){
        this.props.dispatch(actions.QUERY_BLOG('all',this.props.dispatch));
    }
    componentWillReceiveProps(nextProps){
        //message.success(nextProps.status + '  ' + nextProps.data.length);
    }
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.status === 'QUERY_BLOG_RESULT'){
            return true;
        }else{
            return false;
        }
    }
    componentDidUpdate(){
        this.props.dispatch(actions.QUERY_BLOG(this.props.data[0].id,this.props.dispatch));
        GlobalVariable.BlogListData = this.props.data;
        message.success(GlobalVariable.BlogListData[0].title);
    }
    /**
     * 点击不同的menu子元素，触发不同的action，显示相应博客内容页面
     */
    onMenuClick = (key) =>{
        //发送切换不同content的action
        this.props.dispatch(actions.QUERY_BLOG(key,this.props.dispatch));
    }
    render() {
        return (
        <div>
            <Menu
                mode="vertical"
                theme="light"
                onClick={(item)=>{this.onMenuClick(item.key)}}
            >
                {
                    this.props.data.map((ele)=>(       
                        <Menu.Item key={ele.id}>
                            <Icon type="file-text" />
                            <span>{ele.title}</span>
                        </Menu.Item>
                    ))
                }
            </Menu>
        </div>
    );
  }
}
const mapStateToProps = (state,ownProps)=>({
    status: state.blog.status,
    data: state.blog.data
  });
export default connect(mapStateToProps)(BlogTittleList);