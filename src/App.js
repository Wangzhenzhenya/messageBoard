/*eslint-disable-next-line*/
import React,{Component} from 'react';
import img from './bg.jpg';
import './App.css';
import { Col,Row} from 'antd';
import md5 from 'blueimp-md5';

//https://www.gravatar.com/avatar/  头像
class App extends Component {
  constructor(props){
    super()
    this.state={

    }
  }
  componentWillMount(){

  }

  render() {
    return(
        <div className="App">
          <title>留言板</title>
          <Row type='flex' justify='center'>
            <Col className='board' xs={0} sm={24} md={16} lg={20} xl={20}>
              <img className='msg_head' src={img} alt='' className="bgImg" alt="logo" />
              <button className='msg_btn' block>留下你想对我说的话...</button>
                
              <div className='msg_receive'>
                  <div className='msg_item' >
                    <span className='msg_name'>{}</span>
                      <img src={`https://www.gravatar.com/avatar/${md5('2369711831@qq.com')}`} alt="头像" />
                  </div>
              </div>

              <div className='borad'>
            
              </div>
            </Col>
          </Row>
        
        </div>
   )}
}

export default App;
