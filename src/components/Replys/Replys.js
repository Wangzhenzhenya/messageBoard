import React,{Component} from 'react'
import { Form, Input, InputNumber, Button } from 'antd';
class Replys extends Component {
    
    constructor(props){
        this.state={
            
        }
    }
    render(){
        const layout = {
            labelCol: {
                span: 8
            },
            wrapperCol: {
                span: 16
            },
        };

        const validateMessages = {
            required: 'This field is required!',
            types: {
                email: 'Not a validate email!',
                number: 'Not a validate number!',
            },
            number: {
                range: 'Must be between ${min} and ${max}',
            },
        };

     
        const onFinish = values => {
            console.log(values);
        };

        return (
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'introduction']} label="Introduction">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
export default Replys