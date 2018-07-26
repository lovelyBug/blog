import React from 'react';
import {Button,Menu,Dropdown,Icon,Switch} from 'antd';
// 引入编辑器以及编辑器样式
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';
import '../css/components/Editor.css';

const menu = (
    <Menu defaultSelectedKeys={['1']}>
        <Menu.Item key="1">请选择</Menu.Item>
        <Menu.Item key="2">原创</Menu.Item>
        <Menu.Item key="3">转裁</Menu.Item>
        <Menu.Item key="4">翻译</Menu.Item>
    </Menu>
);
const blogType = (
    <Menu defaultSelectedKeys={['1']}>
        <Menu.Item key="1">选择分类</Menu.Item>
        <Menu.Item key="2">RN</Menu.Item>
        <Menu.Item key="3">React</Menu.Item>
        <Menu.Item key="4">JavaScript</Menu.Item>
        <Menu.Item key="5">Node</Menu.Item>
        <Menu.Item key="6">跨域</Menu.Item>
        <Menu.Item key="7">HTTP</Menu.Item>
        <Menu.Item key="8">ES6</Menu.Item>
        <Menu.Item key="9">CSS</Menu.Item>
    </Menu>
);
export default class Demo extends React.Component {

  render () {
    const editorProps = {
      height: 500,
      contentFormat: 'raw',
      initialContent: 'Hello World!',
      onChange: this.handleChange,
      onRawChange: this.handleRawChange
    }

    return (
      <div className="demo">
        <div className='blog-title-style'>
            <input className='blog-title-input' placeholder='请输入文章标题'/>
        </div>
        <BraftEditor {...editorProps}/>
        <hr />
        <div className='blog-label-style'>文章标签：</div>
        <div className='personal-sort-style'>个人分类：</div>
        <div className='blog-type-div-style'>
            <span>文章类型：</span>
            <Dropdown overlay={menu}>
                <Button style={{ marginLeft: 8 }}>
                    请选择 <Icon type="down" />
                </Button>
            </Dropdown>
            <span className='blog-type-sort'>博客分类：</span>
            <Dropdown overlay={blogType}>
                <Button style={{ marginLeft: 8 }}>
                    选择分类 <Icon type="down" />
                </Button>
            </Dropdown>
        </div>
        <div className='private-article-style'>
            私密文章：
            <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} />
        </div>
        <div className='blog-btn-div-style'>
            <Button className='publish-btn' type="primary">发布博客</Button>
            <Button className='save-btn' type="primary">保存为草稿</Button>
        </div>
      </div>
    )
  }

  handleChange = (content) => {
    console.log(content)
  }

  handleRawChange = (rawContent) => {
    console.log(rawContent)
  }

}