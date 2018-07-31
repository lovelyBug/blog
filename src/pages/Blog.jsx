import React,{Component} from 'react';
import {Layout} from 'antd';
import '../css/pages/Blog.css';
import BlogTittleList from '../components/BlogTittleList';
import BlogContent from '../components/BlogContent';

const {Header,Content,Sider} = Layout;
class Blog extends Component{
    render() {
        return (
          <Layout className='blog-layout'>
                <Header className='blog-header'>CLF 的博客主页</Header>
                <Layout>
                    <Sider className='blog-sider'><BlogTittleList/></Sider>
                    <Content className='blog-content'><BlogContent/></Content>
                </Layout>            
          </Layout>
        );
      }
}
export default Blog;