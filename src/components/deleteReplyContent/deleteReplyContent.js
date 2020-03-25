import React,{Component} from 'react'
import store from '../../store';
import {
     deleteReplyContent
} from '../../store/actionCreators'
import {
    Popconfirm, 
    message
} from 'antd';
import '../../App.css'

class DeleteReplyContent extends Component {
    
    constructor(props){
        super(props);
        this.state=store.getState();
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    
    confirm=(e)=>{
      console.log(e);
      deleteReplyContent(this.props.item);
      message.success('删除成功');
      setTimeout(() => {
          window.location.reload();
      }, 1000);   
    }

    cancel=(e)=>{
      console.log(e);
      message.error('取消删除');
    }

    render(){
        return (
             <Popconfirm
                title="确定删除该条回复?"
                onConfirm={this.confirm}
                onCancel={this.cancel}
                okText="确认"
                cancelText="取消"
            >
                <a className='reply_content_delete' href="/">删除</a>
            </Popconfirm> 

        );
    }
}
export default DeleteReplyContent