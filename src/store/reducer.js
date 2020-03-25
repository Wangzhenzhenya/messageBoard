import * as at from './actionTypes'

const defaultState={
    name:'wangzhen',
    status:false,
    item: {},
    loading:true,
    replys:[
        // {
            // name:'卑微小王王',
            // email:'2369714831@qq.com',
            // content:'欢迎来到我的留言板',
            // contentReply:'加油啊亲爱的',
            // whoReply:'刘三姐'
        // }
    ]

}

export default (state=defaultState,action)=>{
    //reducer里只能接受state,不能代替state
    let newState = JSON.parse(JSON.stringify(state)) //深拷贝
    switch(action.type){
        case at.ADD_REPLYS:
            //向store插入一条留言数据
            newState.loading =true
            newState.replys.unshift(action.reply)
            // newState.status=true
            newState.loading=false
            return newState
        case at.INTIAL_STATE:
            newState.loading=true
            newState.replys=action.replys
            newState.loading=false
            return newState
        case at.REPLY_TO:
            //更新某条留言的回复
            newState.replys.contentReply=action.content
            return newState
        case at.INIT_DB:
            newState.loading=true
            // newState.replys = action.reply
            newState.replys.push(action.reply)
            newState.loading=false
            return newState
        default:
            return state
    }
}