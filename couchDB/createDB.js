const nano=require('nano')('http://127.0.0.1:5984');
nano.db.create('reply')


// setTimeout(() => {
//      const alice = nano.use('reply1')
//      alice.insert({
//          _id:'myid2',
//          name:true,
//          content:true,
//          contentReply:true
//      }).then((body) => {
//          console.log(body)
//      })
// }, 3000);





