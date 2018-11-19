require(['config'],()=>{
   require(['jquery', 'list-render', 'sort','cookie','detail-sideBar'], ($, list, sort)=>{
       new Promise((resolve, reject)=>{
            $('header').load("/html/component/shop-header.html", function(){
                //用户登录判断模块
                require(['shop-header'],()=>{$().username()}) 
            })
            $('footer').load("/html/component/shop-footer.html")
            $('#sideBar').load("/html/component/sideBar.html", ()=>{resolve()})
            $('#detail-sideBar').load("/html/component/detail-sideBar.html")
       }).then(()=>{
            list.render().edit();//list-data渲染
            sort.init();//排序模块
            $().deSideBar([25,3,2,23,1,2]);//可传入 detail-side-bar 需要显示的商品id
            // $('#search').search();//search框
       })
   })
})