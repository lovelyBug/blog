import React,{Component} from 'react';
import * as actions from '../action/index';
import {connect} from 'react-redux';
import '../css/components/BlogContent.css';
import { Menu, Icon,message } from 'antd';
import Comment from '../components/Comment';

class BlogContent extends Component{
    constructor(props){
        super(props);
        this.state={
            articleTitle: 'loading...',
            articleContent: '<p>123</p>',
            articleLabel: '',
            showArticleLabelText: '',
            articleType: '请选择',
            articleSort: '选择分类',
            isPrivate: false,
            contentId: 0,
            createTime: ''
        }
    }
    componentWillMount(){
        this.props.dispatch(actions.QUERY_BLOG(17,this.props.dispatch));
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.status === 'QUERY_SINGLE_BLOG_RESULT'){
          let data = nextProps.data;
          this.setState({
              articleTitle: data[0].title,
              articleContent: data[0].content,
              showArticleLabelText: data[0].label,
              articleType: data[0].type,
              articleSort: data[0].classify,
              isPrivate: data[0].isPrivate,
              contentId: data[0].id,
              createTime: data[0].createTime
          });
        }
        //将从服务器端获取到的HTML内容插入到container节点中
        document.getElementById('blog-content').innerHTML = nextProps.data[0].content;
    }
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.status === 'QUERY_SINGLE_BLOG_RESULT'){
            return true;
        }else{
            return false;
        }
    }
    render(){
        return(
            <div id='blog-container'>
                <div className="blog-title">
                    <h2>{this.state.articleTitle}</h2>
                </div>
                <div className='blog-createTime'>
                    <span>
                        {this.state.articleType + ' ' + this.state.createTime}
                    </span>
                    <hr />
                </div>
                <div id='blog-content'></div>
                <div className='blog-copyright'>
                    <span>版权声明：本文为博主原创文章，未经博主允许不得转载。</span>
                </div>
                <hr style={{color:'gray'}}/>
                <div>{'文章标签：' + this.state.showArticleLabelText}</div>
                <div>{'个人分类：' + this.state.articleSort}</div>
                <div>
                    <span><a>上一篇：JavaScript修炼之路</a><a style={{marginLeft: 100}}>下一篇：JavaScript进阶之路</a></span>
                </div>
                <Comment blogId={this.state.contentId}/>
            </div>
        )
    }
}
const mapStateToProps = (state,ownProps)=>({
    status: state.blog.status,
    data: state.blog.data
  });
export default connect(mapStateToProps)(BlogContent);