// define(['tools'],function(tools){
// 	class Wx{ //------------- Wx -----------
// 		constructor(){
// 		}init(){
// 			this.wxBox = tools.$('.wx-box')[0];
// 			this.wxTxt = tools.$('.wx-txt')[0];
// 			this.wxImg = tools.$('.wx-img')[0];
// 			this.wxIcon = tools.$('.icon-img-2')[0];
// 			this.move();
// 		}move(){
// 			tools.on(this.wxIcon, 'mouseenter', ()=>{
// 				tools.animates(this.wxBox, {'top' : 0}, 1000);
// 				tools.fadeIn(this.wxTxt,1500);
// 			})
// 			tools.on(this.wxIcon, 'mouseleave', ()=>{
// 				this.wxBox.style.top = 100 + '%';
// 			})
// 		}
// 	}
// 	var wx = new Wx;
// 	wx.init();
// 	//------------ Wx END-----------------
// })
// 

define(['tools'],function(tools){
	class Bullet{ //---------- bullet screen------------
		constructor(){
		}init(){
			this.bullet = tools.$('.bullet')[0];
			this.icon = tools.$('.f-icon')[0];
			this.bullets();
		}bullets(){//事件委派进行弹幕弹出
			tools.on(this.icon, 'mouseover', (e)=>{
				e = e || event;
				var src = e.target || srcElemnt;
				if(src.nodeName === 'IMG'){
					if(src.className === 'icon-img-2'){
						this.bullet.innerHTML = '请用微信“扫一扫”进入元祖微商城';
					}else if(src.className === 'icon-img-3'){
						this.bullet.innerHTML = '请打开“京东网站”进入元祖京东商城';
					}else if(src.className === 'icon-img-4'){
						this.bullet.innerHTML = '请打开“天猫网站”进入元祖天猫商城';	
					}else if(src.className === 'icon-img-5'){
						this.bullet.innerHTML = '请打开饿了么APP,搜索元祖,享受美味';	
					}else if(src.className === 'icon-img-6'){
						this.bullet.innerHTML = '请打开美团外卖APP,搜索元祖,享受美味';	
					}else if(src.className === 'icon-img-1'){
						this.bullet.innerHTML = '欢迎访问元祖首页,享受元祖美味';	
					}
					clearInterval(this.icon.timer)//冒泡时清除已有运动定时器
					tools.animates(this.bullet, {'width' : 220}, 500)
				}
			})
			tools.on(this.icon, 'mouseout', ()=>{
				clearInterval(this.icon.timer)
				tools.animates(this.bullet, {'width' : 0}, 300)
			})
		}
	}
	//-------------- bullet screen END-------------
	return new Bullet;
})