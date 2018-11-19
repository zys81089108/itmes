define(['tools'],function(tools){
	//-------- 首页banner -------
	class Banner{
		constructor(){
		}init(){//初始化此模块需要的元素
			this.banner = tools.$('#banner');
			this.li = tools.$('li', this.banner);
			this.main = tools.$('main')[0];
			this.header = tools.$('header')[0];
			this.nextIndex = 0;
			this.flag = true;  //函数节流开关
			this.move(); //默认调用一次
			this.animate();
			window.onresize = this.move.bind(this);//窗口大小变动重置轮播大小
		}move(){//动态改变轮播大小（跟随窗口大小）
			for (var i = 0; i < this.li.length; i++) {
					this.li[i].style.height = tools.getBody().height - this.header.offsetHeight + 'px';
				}
				this.main.style.top = this.header.offsetHeight + 'px';
				this.main.style.height = this.li[0].offsetHeight + 'px';
				this.banner.style.top = -this.nextIndex * this.li[0].offsetHeight + 'px';
		}animate(){//鼠标滑轮滚动事件
			 function scroll(e){
					if(!this.flag) //函数节流开关
						return;
					this.flag = false;
					e = e || event;
					var scroll = e.detail || e.wheelDelta; //滑轮上下判断兼容
					if(scroll == -3 || scroll == 120)
						 this.nextIndex--
					else if(scroll == 3 || scroll == -120)
						 this.nextIndex++	
					// scroll < 0 ? this.nextIndex++ : this.nextIndex--
					if(this.nextIndex > this.li.length -1) //当滑动到最后一张图片时候锁定高度
						this.nextIndex = this.li.length - 1;
					else if (this.nextIndex < 0) //当滑动到第一张图片时候锁定高度
						this.nextIndex = 0;
					this.top = -this.li[0].offsetHeight * this.nextIndex; //每次移动高度计算
					tools.buffers(this.banner, {top: this.top}, 10, () => {
						this.flag = true;
					})
				}
				//firefox 兼容滚动	
				if(navigator.userAgent.indexOf("Firefox") != -1){
					tools.on(document.body, "DOMMouseScroll", scroll.bind(this));
				}else{
					window.onmousewheel = scroll.bind(this);
				}	
		}
	}
	//--------------END-----------------
	return new Banner;
})