require(['config'], () => {
    require(['jquery', 'cart-render', 'cookie'], ($,cart) => {
        new Promise((resolve,reject) => {
            $('header').load("/html/component/shop-header.html", () => {
                require(['shop-header'],()=>{$().username()})
            });
            $('footer').load("/html/component/shop-footer.html");
			$('#sideBar').load("/html/component/sideBar.html", ()=>{resolve()});
        }).then(() => {
             // $('#search').search(); //search框
            cart.init();
        })
    })
})
