import React,{Component} from 'react';
import * as actions from '../action/index';
import {connect} from 'react-redux';
import { Menu, Icon,message } from 'antd';

class BlogContent extends Component{
    constructor(props){
        super(props);
        this.state={
            articleTitle: '',
            articleContent: '<p>123</p>',
            articleLabel: '',
            showArticleLabelText: '',
            articleType: '请选择',
            articleSort: '选择分类',
            isPrivate: false,
            contentId: 0
        }
    }
    // componentWillMount(){
    //     this.props.dispatch(actions.QUERY_BLOG(17,this.props.dispatch));
    // }
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
              contentId: data[0].id
          });
        }
        //将从服务器端获取到的HTML内容插入到container节点中
        document.getElementById('container').innerHTML = nextProps.data[0].content;
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
            <div id='container'></div>
            
        )
    }
}
const mapStateToProps = (state,ownProps)=>({
    status: state.blog.status,
    data: state.blog.data
  });
export default connect(mapStateToProps)(BlogContent);