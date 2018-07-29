import React,{Component} from 'react';
import {Layout} from 'antd';
import '../css/pages/Blog.css';

const {Header,Content,Sider,Footer} = Layout;
class Blog extends Component{
    render() {
        return (
          <Layout className='blog-layout'>
                <Header className='blog-header'>header</Header>
                <Layout>
                    <Sider className='blog-sider'>sider</Sider>
                    <Content className='blog-content'>content</Content>
                </Layout>
                <Footer className='blog-footer'>Footer</Footer>            
          </Layout>
        );
      }
}
export default Blog;