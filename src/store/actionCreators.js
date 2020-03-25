import * as at from '../store/actionTypes';
import PouchDB from 'pouchdb';
const replydb = new PouchDB('http://localhost:5984/reply');//如果没有该数据库，会自动创建该数据库

//向数据库添加留言，并存入redux
export async function addReply(reply, replys) {
  if (reply !== '') {
    await replydb.put({
      _id:reply._id,
      name: reply.name,
      email: reply.email,
      content: reply.content,
      contentReply:''
    }).then(() => {
      console.log('update success');
    }).catch((err) => {
      console.log(err);
    });
    replys.push(reply);
  }
  console.log(reply);
  return {
    type: at.ADD_REPLYS,
    reply,
  };
}

//添加留言的回复内容，根据留言的_id更新数据库该字段的contentReply值
export async function insertReply(reply) {
  console.log(reply)
  await replydb.get(reply._id).then(function(doc){
    return replydb.put({
      _id:reply._id,
      _rev:doc._rev,
      name: doc.name,
      email: reply.email,
      content: reply.content,
      contentReply:reply.contentReply
    });
  }).then(function(){
    console.log('update success')
    
  }).catch(function(err){
    console.log(err);
  })
  console.log(reply);
}

//删除某条留言的回复，根据留言的_id更新数据库
export async function deleteReplyContent(reply) {
  console.log(reply)
  await replydb.get(reply._id).then(function (doc) {
    return replydb.put({
      _id: reply._id,
      _rev: doc._rev,
      name: doc.name,
      email: reply.email,
      content: reply.content,
      contentReply: ''
    });
  }).then(function () {
    console.log('delete replycomment success')

  }).catch(function (err) {
    console.log(err);
  })
  console.log(reply);
}

//根据留言_id删除某条留言
export function deleteReply(reply){
  replydb.get(reply._id).then(function(doc){
    return replydb.remove(doc);
  }).then(function(){
    console.log('delete sucess');
  }).catch(function(err){
    console.log(err);
  })
}

//初次启动项目时，将从数据库读取的值赋值给store
export function addAllReply(replys) {
  console.log(replys)
  return {
    type: at.INTIAL_STATE,
    replys,
  };
}

//新建数据库，或数据库没有内容时插入数据
export async function intailDB(item) {
  let reply = {
    _id: item._id,
    name: item.name,
    email: item.email,
    content: item.content,
    contentReply: item.contentReply
  }
  await replydb.put(reply).then(() => {
    console.log('init success');
  }).catch((err) => {
    console.log(err);
  });
 
}

export function firstPatch(reply){
  return {
    type: at.INIT_DB,
    reply,
  };
} 

//从数据库获取所有留言
export async function getReplyFromDB() {
  // console.log(replydb);
    var replys= await replydb.allDocs({
      include_docs: true,
      attachments: true,
    }).then((result) => {
      var reply=[]
      for (let i = 0; i < result.rows.length; i++) {
        reply.push(result.rows[i].doc);
      }
      // console.log(reply)
      console.log(reply.length);
      // replys=reply;
      if(reply.length===0){ //如果数据库没有任何留言时，插入一条留言
          reply={
            _id: new Date().toISOString(),
            name: '卑微小王',
            email: '2369714831@qq.com',
            content: '感谢使用我的留言板',
            contentReply: ''
          }       
          intailDB(reply);//插入留言
          return reply
      }
      console.log(reply);
      return reply
    }).catch((err) => {
      console.log(err);
    })
    return replys;
}

