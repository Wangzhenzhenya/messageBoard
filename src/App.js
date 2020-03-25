/*eslint-disable-next-line*/
import React,{Component} from 'react';
import img from './bg.jpg';
import './App.css';
import {
  Spin,
  Col,
  Row,
  Divider,
  Tooltip,
  message
} from 'antd';
import md5 from 'blueimp-md5';
import Replys from './components/Replys'
import store from './store'
import {
  getReplyFromDB,
  addAllReply,
  deleteReplyContent,
  firstPatch
} from './store/actionCreators'
import ReplyContent from './components/replyContent'
import DeleteReplyContent from './components/deleteReplyContent/'

class App extends Component {
  constructor(props){
    super(props)
    this.state=store.getState()
    store.subscribe(this.handleStoreChange);
    this.setState({
      sy:false
    })
  }

  componentWillMount(){
      // intailDB();
      let replys=getReplyFromDB();
      console.log(replys);   
        if(replys!==''&&replys!==undefined){
          replys.then((list)=>{
            console.log(list);
            console.log(list.length)
            if(list.length===undefined){
              //初次创建数据库,自动插入一条数据并存入redux
              store.dispatch(firstPatch(list));
            }
            else{
              //加载数据库中数据至redux
                 store.dispatch(addAllReply(list));
            }
          }
        )
      }  
  }

  // componentDidMount(){
  //   this.state=store.getState()
  // }
 
  handleStoreChange=()=>{
      this.setState(store.getState())
  }

  showModal(){
    return
  }

  confirm=(e,item)=>{
    console.log(e);
    deleteReplyContent(item);
    // window.location.reload();
    message.success('删除成功');
  }

  cancel=(e)=>{
    console.log(e);
    message.error('取消删除');
  }

  //获取留言回复
  listReply(item){
        if(item.contentReply!==''&&item.contentReply!==undefined&&item.contentReply!==null){
            return(
              <li className='who'>
                    <Tooltip placement="bottom" title="回复">
                      <span className='who_name'>{item.whoReply}</span>
                    </Tooltip>
                  回复
                    <Tooltip placement="bottom" title="回复">
                      <span className='replyTo_who'>{item.name}:</span>
                    </Tooltip>
                  <span className='reply_content'>{item.contentReply}</span>
                  <DeleteReplyContent item={item} />
                </li>
            )
          } 
          return ''
  }
  
  //获取留言板内容
  getReplys=()=>{
    let block=[]
     console.log('state:'+this.state.replys)
     for (let item of this.state.replys) {
         if(item.name!==''&&item.name!==undefined){
           block.push(<div className='msg_receive'>
                    <div className='msg_item' >  
                        <img className = 'msg_img'
                        lazyload="true"
                        data-original={`https://www.gravatar.com/avatar/${md5(item.email)}`}
                        src={`https://www.gravatar.com/avatar/${md5(item.email)}`} alt = "头像" />
                        <div className='msg_info'>
                          <span className='msg_name'>{item.name}</span>
                          <p className='msg_content'>{item.content}</p>
                          <p className='time'>
                              <span>{item._id}</span>
                                <ReplyContent item={item} />
                          </p>
                        </div> 
                    </div>
                      <ul className="replyTo">
                        <li><Divider></Divider> </li>
                        {
                          this.listReply(item)
                        }   
                     </ul>
                </div>)
        }
       } 
      return block
  }

  render(){
    return(
          <div className="App">
              <title>留言板</title>
              <Row className="row_fixed row_title" type='flex' justify='center'>
                <Col className='row_titile' span={24}><h2>留言板</h2></Col>
              </Row>
              <Row className="row_fixed" type='flex' justify='left'>
                <Col  className='board' span={18} >
                  <img className='msg_head' src={img} alt='' className="bgImg" alt="logo" />
                </Col>
              </Row>

              <div  className='msg_leave'>
                    <Replys />
              </div>
              
              <Row>
                <Col span={18}>
                <Spin  spinning={this.state.loading}>
                </Spin>
                    {this.getReplys()}
                </Col>
              </Row>
          </div>
    )}
}

export default App;
