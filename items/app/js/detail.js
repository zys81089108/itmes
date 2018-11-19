require(['config'], () => {
	require(['jquery', 'detail-render', 'jqzoom', 'glassTab', 'switchover', 'detail-sideBar','cookie'], ($, detail) => {
		new Promise((resolve, reject) => {
			$('header').load("/html/component/shop-header.html", () => {
			    require(['shop-header'],()=>{$().username()})
			});
			$('footer').load("/html/component/shop-footer.html");
			$('#sideBar').load("/html/component/sideBar.html", ()=>{resolve()});
			$('#detail-sideBar').load("/html/component/detail-sideBar.html");
		}).then(()=>{
            detail.render(); //详细页面数据渲染染
			$('#glass').glassTab();//放大镜切换区
			$('.product-img').switchover('show','color')//商品评价区切换
			$().deSideBar([25,3,26,2,23,27,1,2]); //可传入 detail-side-bar 需要显示的商品id
            // $('#search').search(); //search框
		})
		.then(()=>{
			$(".jqzoom").jqueryzoom({ //图片放大镜样式
                xzoom: 450,	//放大高度
                yzoom: 450,	//放大高度
                offset: 20, //放大距离
            });
		})
	})
})