define(['jquery'], function($){
	$.fn.extend({
		tab: function(ele1,ele2){
			var html = '';
			$.ajax({
				url:"/json/data.json",
				method: "get",
				dataType: 'json',
				success: tem
			})
			//---- 加载json数据 生成数据模板----
			function tem(data){
				var arr = [],
					n = 0;
					
				for (var key in data[0].tab) {
					arr.push(data[0].tab[key])
				};
				arr.forEach(function(curr){
					html+=`<div class="t${curr.id}">
							<a href="/html/detail/detail.html?id=${curr.id}">
							<img src="${curr.img}">
							<i>${curr.desc}</i>
							<span> ¥${curr.price.toFixed(2)}</span>
							</a>
						</div>`
					if(!(curr.math%4)){
						ele2.eq(n++).html(html);
						html = '';
					}
				})
				hover();
			}
			//-------- json END --------------
			
			//------- tab 切换效果 -------
			function hover(){
				ele1.hover(function(){
					$(this).addClass('change').siblings().removeClass('change');
					ele2.eq(($(this).index())).addClass('tab-hover').siblings().removeClass('tab-hover');
				})
			}
			//--------- tab END --------
		}
	})
})