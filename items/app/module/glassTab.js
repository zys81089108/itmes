define(['jquery'], ($) => {
	$.fn.extend({
		glassTab: function(){
			var _this = this;

			class GlassTab{
				constructor(){
				}init(){
					this.jqImg = $('#bigImg'); //放大镜区
					this.left = _this.children('.left'); //展示图左侧按钮
					this.right = _this.children('.right'); //展示图右侧按钮
					this.glassImg = _this.children('.glassImg'); //展示图盒子区
					this.ul = this.glassImg.children();
					this.li = this.ul.children(); //展示小图
					this.ul.width(this.li.outerWidth(true)*this.li.length) //动态改变展示宽度
					this.tab().move();
				}tab(){//放大镜图片切换
					var isthis = this;
					this.li.children().mouseenter(function(event){
						isthis.jqImg.attr({src: $(this).attr('src'), jqimg: $(this).attr('src')})
					})
					return this;
				}move(){
					var len = this.li.length - 4,
						next = 1,
						curr = 0;
					_this.on('click', '.rightbtn , .leftbtn', (event) =>{
						event.preventDefault();
						var src = event.target;
						if(src.className === 'leftbtn'){
							if(next > len)
								return;
							curr = next;
							this.ul.animate({right: this.li.outerWidth(true) * next++}, 500)
						}
						if(src.className === 'rightbtn'){
							if(curr < 1)
								return;
							next = curr
							this.ul.animate({right: this.li.outerWidth(true) * --curr}, 500)
						}
					});
				}
			}

			var glassTab =  new GlassTab;
			glassTab.init();
		}
	})
})