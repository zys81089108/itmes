require(['config'], () => {
	require(['jquery','register','login'], ($,register,login) => {
		new Promise((resolve, reject) => {
			$('header').load("/html/component/shop-header.html", () => {resolve()});
			$('footer').load("/html/component/shop-footer.html");
			$('#sideBar').load("/html/component/sideBar.html");
		}).then(()=>{
			require(['switchover'], ()=>{//登录注册切换模块
				$('.l-r-box').switchover('show','change');
			})
		}).then(()=>{
		    register.init() //注册模块
            login.init(); //登录模块
            // $('#search').search(); //search框
		})
	})
})