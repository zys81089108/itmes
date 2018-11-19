define(['tools'], function(tools){
	// -------- nav color -----------
	class Nav{
		constructor(){
		}init(){ //下拉选项 color
			this.nav = tools.$('#nav');
			this.li = tools.$('.li_', this.nav);
			var _this = this;
			for (var i = 0; i < this.li.length; i++) {
				tools.on(this.li[i], 'onmouseenter', function(){
					_this.nav.firstElementChild.className = 'li_';  //改变第一个li class名
					this.className = 'li_ on';  //将当前li 加上class名
				})
				tools.on(this.li[i], 'onmouseleave', function(){
					this.className = 'li_'; //移除时当前li 变回默认
					_this.nav.firstElementChild.className = 'li_ on'; //第一个li 变回默认
				})
			}
			this.move();
		}move(){ //下拉菜单随窗口大小居中
			tools.on(window, 'resize', ()=> {
				this.down_menu = tools.$('.down_menu')
				for (var i = 0; i < this.down_menu.length; i++) {
					this.down_menu[i].style.left = (this.li[0].offsetWidth - this.down_menu[i].offsetWidth) / 2 + 'px';
				}
			})
		}
	}
	//------------ nav color END ------------
	return new Nav;
})