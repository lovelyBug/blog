import React from 'react';
import {Button,Menu,Dropdown,Icon,Switch,message} from 'antd';
// 引入编辑器以及编辑器样式
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';
import '../css/components/Editor.css';
import {connect} from 'react-redux';
import * as actions from '../action/index';

class Editor extends React.Component {
  constructor(props){
    super(props);
    this.state={
        articleTitle: '',
        articleContent: '',
        articleLabel: '',
        showArticleLabelText: '',
        articleType: '请选择',
        articleSort: '选择分类',
        isPrivate: false
    }
  }
  componentWillReceiveProps(nextProps){
    //   if(nextProps.status === ''){

    //   }
      message.success('redux: ' + nextProps.status);
  }
  menu = (
    <Menu selectable={true} defaultSelectedKeys={['1']} onClick={(item)=>{this.setState({articleType: item.key})}}>
        <Menu.Item key="请选择">请选择</Menu.Item>
        <Menu.Item key="原创">原创</Menu.Item>
        <Menu.Item key="转裁">转裁</Menu.Item>
        <Menu.Item key="翻译">翻译</Menu.Item>
    </Menu>
  );
  blogType = (
    <Menu selectable={true} defaultSelectedKeys={['1']} onClick={(item)=>{this.setState({articleSort: item.key})}}>
        <Menu.Item key="选择分类">选择分类</Menu.Item>
        <Menu.Item key="RN">RN</Menu.Item>
        <Menu.Item key="React">React</Menu.Item>
        <Menu.Item key="JavaScript">JavaScript</Menu.Item>
        <Menu.Item key="Node">Node</Menu.Item>
        <Menu.Item key="跨域">跨域</Menu.Item>
        <Menu.Item key="HTTP">HTTP</Menu.Item>
        <Menu.Item key="ES6">ES6</Menu.Item>
        <Menu.Item key="CSS">CSS</Menu.Item>
    </Menu>
  );
  /**
   * 当标题改变时触发该事件
   */
  handleArticleTitleChange = (e) =>{
    this.setState({
        articleTitle: e.target.value
    });
  }
  /**
   * 当内容改变时触发该事件
   */
  handleArticleContentChange = (e) =>{
    this.setState({
        articleContent: e.target.value
    });
  }/**
   */
  handleArticleLabelChange = (e) =>{
    this.setState({
        articleLabel: e.target.value
    });
  }
  /**
   * 添加标签时触发该事件
   */
  addArticleLabel = (e) =>{
    this.setState({
        showArticleLabelText: this.state.showArticleLabelText +  this.state.articleLabel + '  '
    });
  }
  /**
   * 发布博客时触发该事件
   */
  publishBlog = () =>{
      if(this.state.articleTitle.length === 0){
        message.warning('标题不能为空！');
        return;
      }
      if(this.editorInstance.getRawContent().blocks[0].text.length === 0){
        message.warning('内容不能为空！');
        return;
      }
      if(this.state.articleType === '请选择'){
        message.warning('请选择文章类型！');
        return;
      }
      if(this.state.articleSort === '选择分类'){
        message.warning('请选择博客分类！');
        return;
      }
      var myDate = new Date();
      let time = myDate.toLocaleString();
      let info = "title=" + this.state.articleTitle +
                 "&content=" + this.editorInstance.getHTMLContent() +
                 "&label=" + this.state.showArticleLabelText + 
                 "&type=" + this.state.articleType + 
                 "&classify=" + this.state.articleSort + 
                 "&isPrivate=" + this.state.isPrivate + 
                 "&createTime=" + time + 
                 "&isPublish=1" + 
                 "&isDelete=0";
      //发送saveBlog的action
      this.props.dispatch(actions.ADD_BLOG(info,this.props.dispatch));
  }
  /**
   * 保存博客时触发该事件
   */
  saveBlog = () =>{
        if(this.state.articleTitle.length === 0){
            message.warning('标题不能为空！');
            return;
        }
        if(this.editorInstance.getRawContent().blocks[0].text.length === 0){
            message.warning('内容不能为空！');
            return;
        }
        //获取content
        //this.editorInstance.getRawContent().blocks[0].text;
        //获取Raw格式内容
        //this.editorInstance.getHTMLContent();
        var myDate = new Date();
        let time = myDate.toLocaleString();
        let info = "title=" + this.state.articleTitle +
                    "&content=" + this.editorInstance.getHTMLContent() +
                    "&label=" + this.state.showArticleLabelText + 
                    "&type=" + this.state.articleType + 
                    "&classify=" + this.state.articleSort + 
                    "&isPrivate=" + this.state.isPrivate + 
                    "&createTime=" + time + 
                    "&isPublish=0" + 
                    "&isDelete=0";
        //发送saveBlog的action
        this.props.dispatch(actions.ADD_BLOG(info,this.props.dispatch));
  }
  render () {
    const editorProps = {
      height: 500,
    //   contentFormat: 'raw',
    //   initialContent: 'Hello World!',
      placeholder: '在这里编辑文章'
    }

    return (
      <div className="demo">
        <div className='blog-title-style'>
            <input className='blog-title-input' placeholder='请输入文章标题' onChange={this.handleArticleTitleChange}/>
        </div>
        <BraftEditor ref={instance => this.editorInstance = instance} {...editorProps} />
        <hr />
        <div className='blog-label-style'>
            文章标签：
            <input className='blog-label-input-style' placeholder='文章标签' onChange={this.handleArticleLabelChange}/>
            <Button style={{ marginLeft: 8 }} onClick={this.addArticleLabel}>
                    添加 <Icon type="plus" />
            </Button>
            <span className='article-label-text-style'>{this.state.showArticleLabelText}</span>
        </div>
        <div className='blog-type-div-style'>
            <span>文章类型：</span>
            <Dropdown overlay={this.menu}>
                <Button style={{ marginLeft: 8,width: 100 }}>
                    {this.state.articleType} <Icon type="down" />
                </Button>
            </Dropdown>
            <span className='blog-type-sort'>博客分类：</span>
            <Dropdown overlay={this.blogType}>
                <Button style={{ marginLeft: 8,width: 100 }}>
                    {this.state.articleSort} <Icon type="down" />
                </Button>
            </Dropdown>
        </div>
        <div className='private-article-style'>
            私密文章：
            <Switch onChange={(checked)=>{this.setState({isPrivate: checked})}} style={{ marginLeft: 8 }} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} />
        </div>
        <div className='blog-btn-div-style'>
            <Button className='publish-btn' type="primary" onClick={this.publishBlog}>发布博客</Button>
            <Button className='save-btn' type="primary" onClick={this.saveBlog}>保存为草稿</Button>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state,ownProps)=>({
    status: state.blog.status,
    data: state.blog.data
});
export default connect(mapStateToProps)(Editor);