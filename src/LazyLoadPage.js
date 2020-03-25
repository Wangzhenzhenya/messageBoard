export function LazyLoadPage(){
    let viewHeight=document.documentElement.clientHeight //获取可视区高度
    function lazyload(){
        let eles=document.querySelectorAll('img[data-original][lazyload]')
        Array.prototype.forEach.call(eles,function(item,index){
            let rect;
            if(item.dataset.original==='') return
            rect = item.getBoundingClientRect()  //获得某个元素的左，上，右和下分别对于浏览器视窗的位置
            if(rect.bottom>=0 && rect.top<viewHeight){
                (function(){
                    let img=new Image();
                    img.src=item.dataset.original;
                    img.onload=function(){
                        item.src=img.src;
                    }
                    item.removeAttribute("data-original") //移除属性，下次不再遍历
                    item.removeAttribute("lazyload")
                })()
            }
        })
    }
    lazyload()  //刚开始还没滚动屏幕时，要先触发一次函数，初始化首页的页面图片
    console.log('lazyloadimg')
    window.addEventListener("scoll",lazyload)
}