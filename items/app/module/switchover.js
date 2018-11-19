define(['jquery'], ($) => {
	$.fn.extend({
		switchover: function(boxName,titleName){ //只限切换className
			var _this = this; //调用的最上层盒子 
			class Switchover{
				constructor(){
				}init(){
					this.title = _this.children().first(); //分别找出切换标题和切换盒子
					this.box = _this.children().last();
					this.t_children = this.title.children(); //在分别找出子标题子盒子
					this.b_children = this.box.children();
					this.change();
				}change(){
					var isthis = this;
					this.t_children.click(function(event) {
						$(this).addClass(titleName).siblings().removeClass(titleName);
						isthis.b_children.eq(($(this).index())).addClass(boxName).siblings().removeClass(boxName)
					});
				}
			}

			var switchover = new Switchover;
			switchover.init()
		}
	})
})