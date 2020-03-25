import React,{Component} from 'react'
import { Form, Input, Button } from 'antd';
import store from '../../store';
import {
    ADD_REPLYS
} from '../../store/actionTypes';
import {
    addReply
} from '../../store/actionCreators';
import { message } from 'antd';
import './replys.css';

class Replys extends Component {
    
    constructor(props){
        super();
        this.state=store.getState();
        // store.subscribe(this.storeChange); //订阅
    }

     handleStoreChange=()=>{
        this.setState(store.getState())
    }
  
    render(){
        const success = () => {
            message.success('留言成功！');
        };

        const layout = {
            labelCol: {
                span: 8
            },
            wrapperCol: {
                span: 16
            },
        };

        const validateMessages = {
            required: '必填!',
            types: {
                email: '邮箱非法!',
                number: '非法数字!',
            }
        };

        const onFinish = async (values) => {
            console.log(values.user.name);
             const action = {
                 type:ADD_REPLYS,
                 reply:{
                     name:values.user.name,
                     email:values.user.email,
                     content:values.user.content,
                     _id:new Date().toISOString(),
                 }
             }
             store.dispatch(await addReply(action.reply,[]))
             if(this.state.status===true){
               
                values.user.name='';
                values.user.email='';
                values.user.content=''
             }
             success();
             console.log(this.state.status)
            
             
        };

        return (
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name={['user', 'name']} label="用户名" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'content']} label="留言内容">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit" >
                        留言
                    </Button>
                </Form.Item>
                <p className='info'> 留下你的脚印吧...... </p>
                {/* {this.state.status===true?success():''} */}
            </Form>
        )
    }
}
export default Replys