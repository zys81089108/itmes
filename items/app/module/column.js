define(['jquery'], ($) => {
	$.fn.extend({
		column : function(){
			$.ajax({
				url:"/json/data.json",
				method: "get",
				dataType: 'json',
				success: tem.bind(this)
			})

			//---- 加载json数据 生成数据模板----
			function tem(data){
				var arr = [],
					n = 0,
					html = '';

				for (var key in data[1].column) {
					arr.push(data[1].column[key])
				};
			    arr.forEach((curr) => {
			    	html+= `<div class="col">
								<a href="/html/detail/detail.html?id=${curr.id}">
									<img src="${curr.img}" alt="">
									<b>${curr.title}</b><i>${curr.desc}</i><span>¥${curr.price.toFixed(2)}</span>
								</a>
							</div>
							`
					if(!(curr.math%3)){
						this.eq(n++).html(html);
						html = '';
					}
			    })
			    hover.call(this)
		    };
		   //-------- json END --------------
		   
		   //------- column hover效果 -------
		   	function hover(){
		   		this.children().hover(function(){
		   			$(this).addClass('col-hover')
		   		},function(){
		   			$(this).removeClass('col-hover')
		   		})
		   	}
		   //------- column hover END -------	

		   //------- light move -------
		    (function(){
		   		$('.col-img').mouseenter(function(){
		   			$(this).children('.light').stop().animate({top: '50%', left: '50%'}, 900, function(){
		   				$(this).css({top: '-50%', left: '-50%'});
		   			})
		   		});
		    })();
		   //------- light move END-------
		}
	});
})	

	// class Column{
	// 	constructor(column){
	// 		this.column = column;
	// 	}ajax(){
	// 		$.ajax({
	// 			url:"/json/data.json",
	// 			method: "get",
	// 			dataType: 'json',
	// 			success: this.tem.bind(this)
	// 		})
	// 	}tem(data){
	// 		var arr = [],
	// 			n = 0,
	// 			html = '';

	// 		for (var key in data[1].column) {
	// 			arr.push(data[1].column[key])
	// 		};
	// 	    arr.forEach((curr) => {
	// 	    	html+= `<div class="col">
	// 						<a href="" title="">
	// 							<img src="${curr.img}" alt="">
	// 							<b>${curr.title}</b><i>${curr.desc}</i><span>¥${curr.price.toFixed(2)}</span>
	// 						</a>
	// 					</div>
	// 					`
	// 			if(!(curr.id%3)){
	// 				this.column.eq(n++).html(html);
	// 				html = '';
	// 			}
	// 	    })
	// 	}
	// }

	// return  Column;
