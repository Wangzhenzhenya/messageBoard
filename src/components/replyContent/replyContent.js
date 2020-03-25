import React,{Component} from 'react'
import store from '../../store';

import {
     insertReply, getReplyFromDB, addAllReply,deleteReply
} from '../../store/actionCreators'
import './replyContent.css'
import {
    Modal,
    Popconfirm, 
    message
} from 'antd';


class ReplyContent extends Component {
    
    constructor(props){
        super();
        this.state=store.getState();
        this.setState({
          visible: false,
          confirmLoading: false,
          value:''
        });
        // store.subscribe(this.storeChange); //订阅
    }

    handleStoreChange=()=>{
        this.setState(store.getState())
    }
    
    showModal =()=> {
          this.setState({
              visible: true,
          });
    };
        
      //提交回复的留言
    handleOk =()=> {
        this.setState({
            ModalText: '稍等',
            confirmLoading: true,
        });
    
        let item=this.props.item
        let reply={
            name:item.name,
            _id:item._id,
            contentReply:this.state.value,
            content:item.content,
            email:item.email
        }
        insertReply(reply);
        let replys=getReplyFromDB(); 
        if(replys!==''&&replys!==undefined){
            replys.then((list)=>{
                store.dispatch(addAllReply(list));
            }
            )
        }
        // console.log('jinhtu huifu')
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 1000);
        setTimeout(() => {
            window.location.reload()
        }, 1000);
    // window.location.reload()
    };
    
    //取消回复
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };

    setValue=(event)=>{
      console.dir(event)
    }
    
    //确定删除该条回复
    confirm=()=>{
        console.log('进入删除')
        deleteReply(this.props.item);
        message.success('删除成功');
        setTimeout(() => {
                window.location.reload();
        }, 1000);
        }

    cancel=(e)=> {
        console.log(e);
        console.log('进入取消')
        message.error('取消删除');
    }

    render(){
        const { visible, confirmLoading } = this.state;
        return (
        <div>
            <span className='msg_reply' onClick={this.showModal}>
            回复
            </span>
            <Popconfirm
                title="确定删除该条留言?"
                onConfirm={this.confirm}
                onCancel={this.cancel}
                okText="确认"
                cancelText="取消"
            >
                <a className='msg_reply_delete' href="#">删除</a>
            </Popconfirm>
            <Modal
            title="回复内容"
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
            okText="确认"
            cancelText="取消"
            >
            <textarea
                col="50"
                type="text"
                value={this.state.value}
                onChange={(e) => {
                    this.setState({
                        value: e.target.value,
                    });
                }}
            />
            </Modal>
        </div>
        );
    }
}
export default ReplyContent;