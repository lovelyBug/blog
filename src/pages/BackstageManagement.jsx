import React, { Component } from 'react';
import {Layout,Menu,Icon,Button} from 'antd';
import '../css/pages/BackstageManagement.css';
import SiderComponent from '../components/SiderComponent';
import HeaderComponent from '../components/HeaderComponent';
import Editor from '../components/Editor';
const {Header,Content,Footer,Sider} = Layout;
const SubMenu = Menu.SubMenu;
class BackstageManagement extends Component {
  render() {
    return (
      <Layout className='layout'>
            <Header className='header'><HeaderComponent /></Header>
            <Layout>
                <Sider className='sider'><SiderComponent /></Sider>
                <Content className='content'><Editor/></Content>
            </Layout>
            
      </Layout>
    );
  }
}

export default BackstageManagement;