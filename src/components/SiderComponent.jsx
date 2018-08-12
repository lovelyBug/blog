import React, { Component } from 'react';
import { Menu, Icon,message } from 'antd';
import * as actions from '../action/index';
import {connect} from 'react-redux';
const SubMenu = Menu.SubMenu;
class SiderComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      collapsed: false
    }
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  /**
   * 点击不同的menu子元素，触发不同的action，显示相应页面
   */
  onMenuClick = (key) =>{
    switch(key){
      case '新建博客':
        this.props.dispatch(actions.NEW_BLOG());
        break;
      case '博客列表':
        this.props.dispatch(actions.BLOG_LIST());
        break;
      case '评论管理':
        this.props.dispatch(actions.ALL_COMMENT());
        break;
      case '草稿箱':
        this.props.dispatch(actions.DRAFTS());
        break;
      case '回收站':
        this.props.dispatch(actions.RECYSLE_BIN());
        break;
      default:
        return;
    }
  }
  render() {
    return (
      <div>
        <Menu
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
          onClick={(item)=>{this.onMenuClick(item.key)}}
        >
          <Menu.Item key="home">
            <Icon type="home" />
            <span>我的面板</span>
          </Menu.Item>
          <SubMenu key="sub1" title={<span><Icon type="file-text" /><span>博客管理</span></span>}>
            <Menu.Item key="新建博客">新建博客</Menu.Item>
            <Menu.Item key="博客列表">博客列表</Menu.Item>
          </SubMenu>
          <Menu.Item key="评论管理">
            <Icon type="message" />
            <span>评论管理</span>
          </Menu.Item>
          <Menu.Item key="草稿箱">
            <Icon type="inbox" />
            <span>草稿箱</span>
          </Menu.Item>
          <Menu.Item key="回收站">
            <Icon type="delete" />
            <span>回收站</span>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
export default connect()(SiderComponent);