require(['config'],function(){
	require(['tools','jquery','cookie'],function(tools,$){
		new Promise(function(resolve, reject){
				$('header').load("/html/component/shop-header.html", function(){
				    //用户登录判断模块
				    require(['shop-header'],()=>{$().username()}) 
				})
				$('footer').load("/html/component/shop-footer.html")
				$('#sideBar').load("/html/component/sideBar.html", ()=>{resolve()})
		}).then(()=>{
			require(['column','tab', 'carousel', 'sideBar'], (Column)=>{
				//加载轮播动画
				$('#carousel').carousel();
				//动态加载tab数据与交互
				$().tab($('[class*=tab-top]'),$('[class*=tab-img]'));
				//动态加载column数据与交互
				$('.col-model').column();

				if($.cookie('product')){
					var product = JSON.parse($.cookie('product'));
					if(product.length){
						var amount = 0;
						product.forEach((curr)=>{
							amount += curr.amount;
						})
						$('i.num').text(amount);
					}
				}
			})
		})
	})
})
