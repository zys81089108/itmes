define(['jquery'], function($){
	$.fn.extend({
		carousel: function(){
			var _this = this;

			class Carousel{
				constructor(){
				}init(){
					this.ul = _this.children().first();//轮播盒子
					this.li = this.ul.children('li'); //轮播盒子下的图片
					this.pages = _this.children().last(); //轮播盒子下的圆点盒子
					this.li.first().clone().appendTo(this.ul);//clone最后图片放在最前
					this.li.last().clone().prependTo(this.ul);//clone最前图片放在最后
					this.length = this.li.length + 2;//clone后length+2
					this.width = this.li.width() * (this.length); //获取ul盒子需要的宽度
					this.ul.css({'width': this.width, 'left' : -this.li.width()});//设置轮播盒子位置
					this.currIndex = 1; //当前图片下标
					this.nextIndex = 2; //下一张图片下标
					this.flag = true; //函数节流
					this.timer = setInterval(this.animate.bind(this),2500);//调用轮播动画函数
					this.stop().run().circle();
				}animate(){
					this.flag = false;
					this.left = -this.nextIndex * this.li.width(); //动态计算每次轮播距离
					this.currIndex = this.nextIndex; //下一张图片显示后把下标赋予现在
					this.nextIndex++; //下一张图标下标继续++
					this.ul.animate({'left': this.left}, 1000, ()=>{
						if(this.currIndex === this.length - 1){ //当当前显示图片为最后一张时
							this.currIndex = 1;//还原
							this.nextIndex = 2;//还原
							this.ul.css({'left' : -this.li.width()}); //将轮播还原
						}
						this.flag = true;
					});
					this.circleIndex = this.nextIndex - 2; //原点下标与图片小标进行匹配
					if(this.circleIndex >= this.pages.children().length) //原点小标超过本身length还原
						this.circleIndex = 0;
					this.pages.children().removeClass('red')//每次清除所有颜色为当前this加上颜色
					this.pages.children().eq(this.circleIndex).addClass('red')
			    }stop(){
			    	_this.mouseenter((event) => { //进入carousel 停止轮播
			    		clearInterval(this.timer)
			    	});
			    	return this;
			    }run(){
			    	_this.mouseleave((event) => { //离开carousel 进行轮播
			    		this.timer = setInterval(this.animate.bind(this),2500);
			    	});
			    	return this;
			    }circle(){
			    	var isthis = this; //暂存this
			    	this.html = ''; //根据图片数量动态创建原点
			    	for (var i = 0; i < this.li.length; i++) {
			    		this.html += '<i></i>';
			    	}
			    	this.pages.html(this.html)//原点添加到页面
			    	this.pages.children().first().addClass('red')//默认第一个添加颜色
			    	this.pages.children().mouseenter(function(event){
			    		// if(isthis.flag){ 节流开关
			    			isthis.nextIndex = $(this).index() + 1; //进入原点移动到指定图片
			    			isthis.animate()
			    		// }
			    	});
			    }
			}


			var carousel = new Carousel;
			carousel.init();
		}
	})
})