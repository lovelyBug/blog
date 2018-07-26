import React, { Component } from 'react';
import { Menu, Icon, Button } from 'antd';

const SubMenu = Menu.SubMenu;

export default class SiderComponent extends Component {
  state = {
    collapsed: false,
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <div>
        <Menu
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>我的面板</span>
          </Menu.Item>
          <SubMenu key="sub1" title={<span><Icon type="mail" /><span>博客管理</span></span>}>
            <Menu.Item key="5">新建博客</Menu.Item>
            <Menu.Item key="6">博客列表</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>评论管理</span></span>}>
            <Menu.Item key="9">未读评论</Menu.Item>
            <Menu.Item key="10">所有评论</Menu.Item>
          </SubMenu>
          <Menu.Item key="4">
            <Icon type="inbox" />
            <span>草稿箱</span>
          </Menu.Item>
          <Menu.Item key="5">
            <Icon type="inbox" />
            <span>回收站</span>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}