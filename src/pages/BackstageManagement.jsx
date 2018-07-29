import React, { Component } from 'react';
import {Layout} from 'antd';
import '../css/pages/BackstageManagement.css';
import SiderComponent from '../components/SiderComponent';
import HeaderComponent from '../components/HeaderComponent';
import ContentComponent from '../components/ContentComponent';
const {Header,Content,Sider} = Layout;
class BackstageManagement extends Component {
  render() {
    return (
      <Layout className='back-layout'>
            <Header className='back-header'><HeaderComponent /></Header>
            <Layout>
                <Sider className='back-sider'><SiderComponent /></Sider>
                <Content className='back-content'><ContentComponent /></Content>
            </Layout>            
      </Layout>
    );
  }
}

export default BackstageManagement;