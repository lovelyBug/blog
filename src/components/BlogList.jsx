import React,{Component} from 'react';
import {Table,message,Icon,Button,Progress} from 'antd';
import {connect} from 'react-redux';
import * as actions from '../action/index';

class BlogList extends Component{
  constructor(props){
      super(props);
      this.state = {
          selectedRowKeys: [],
          loading: false,
          visible: false,
          selectedRows: []

      };
  }
  /**
   * 生命周期函数
   */
  componentWillMount(){
    this.props.dispatch(actions.QUERY_BLOG('all',this.props.dispatch));
  }
  componentWillReceiveProps(nextProps){
    //message.success(nextProps.status);
  }
  shouldComponentUpdate(nextProps,nextState){
    //当查询单个博客时，不刷新博客列表页面
    if(nextProps.status === 'QUERY_SINGLE_BLOG_RESULT'){
      return false;
    }else{
      return true;
    }
  }
  /**
   * 列表列名标题
   */
  columns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },{
    title: '标题',
    dataIndex: 'title',
    key: 'title'
  }, {
    title: 'Label',
    dataIndex: 'label',
    key: 'label'
  },{
    title: '文章类型',
    dataIndex: 'type',
    key: 'type'
  }, {
    title: '博客分类',
    dataIndex: 'classify',
    key: 'classify'
  },{
    title: '是否私有',
    dataIndex: 'isPrivate',
    key: 'isPrivate'
  },{
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
  },{
    title: '操作',
    dataIndex: 'opration',
    key: 'opration',
    render: (text,record,)=>(
      <span>
        <Button onClick={()=>{this.readBlog(record)}}>查看</Button>
        <Button onClick={()=>{this.modifyBlog(record)}}>修改</Button>
        <Button onClick={()=>{this.deleteBlog(record)}}>删除</Button>
      </span>
    )
  }];
  /**
   * 查看博客
   */
  readBlog = (record) =>{
    message.success('查看博客ID：' + record.id);
  }
  /**
   * 修改博客
   */
  modifyBlog = (record) =>{
    this.props.dispatch(actions.MODIFY_SINGLE_BLOG({id: record.id}));
  }
  /**
   * 删除单个博客
   */
  deleteBlog = (record) =>{
    let info = 'data=' + record.id + '&isPublish=1',isPublish = 1;
    this.props.dispatch(actions.DELETE_BLOG(isPublish,info,this.props.dispatch));
  }
  /**
   * 删除多个博客
   */
  deleteBlogs = () => {
    let rows = this.state.selectedRows;
    let blogIds = [];
    //循环获取已选择博客ID
    for(let i = 0;i < rows.length;i++ ){
      blogIds.push(rows[i].id);
    }
    let info = 'data=' + blogIds + '&isPublish=1',isPublish = 1;
    this.props.dispatch(actions.DELETE_BLOG(isPublish,info,this.props.dispatch));
  }
  /**
   * 每次勾选/取消勾选复选框时触发的事件
   */
  onSelectChange = (selectedRowKeys,selectedRows) => {
    this.setState({
      selectedRowKeys: selectedRowKeys,
      selectedRows: selectedRows
    });
  }
  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ marginTop: 10 }}>
          <Button
            type="primary"
            onClick={this.deleteBlogs}
            disabled={!hasSelected}
            loading={loading}
          >
            删除
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `已选择 ${selectedRowKeys.length} 项` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} columns={this.columns} dataSource={this.props.data} />
      </div>
    );
  }
}
const mapStateToProps = (state,ownProps)=>({
  status: state.blog.status,
  data: state.blog.data
});
export default connect(mapStateToProps)(BlogList);