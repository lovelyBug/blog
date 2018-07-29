import React,{Component} from 'react';
import {Table,message,Icon,Button,Progress} from 'antd';

//教师列表列名标题
const columns = [{
  title: 'ID',
  dataIndex: 'id',
},{
  title: '标题',
  dataIndex: 'title',
}, {
  title: '文章类型',
  dataIndex: 'type',
}, {
  title: '博客分类',
  dataIndex: 'classify',
},{
  title: '是否私有',
  dataIndex: 'isPrivate'
},{
    title: '创建时间',
    dataIndex: 'createTime'
},{
  title: '操作',
  dataIndex: 'opration',
  render: ()=><Button>查看/修改</Button>,
}
];
//列表数据源
const data = [];
class BlogList extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedRowKeys: [],
            loading: false,
            visible: false
        };
    }
    /**
   * 点击删除按钮时触发的事件，显示loading视图1000ms，清空已选择项
   */
  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }
  /**
   * 每次勾选/取消勾选复选框时触发的事件
   */
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
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
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
          >
            删除
          </Button>
          <Button
            style={{float: 'right'}}
            type="primary"
            onClick={this.showModal}
          >
            添加博客
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `已选择 ${selectedRowKeys.length} 项` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
    );
  }
}
export default BlogList;