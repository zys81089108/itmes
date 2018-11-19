define(['jquery'], ($)=>{
	$.fn.extend({
		search : function(){
			var isthis = this;
			class Search{
					constructor(){
					}search(){
						console.log($('.s-c').attr('action'))
						console.log(isthis.val())
						$('.s-btn').click(()=>{
							console.log(1)
							$('.s-c').attr('action', $('.s-c').attr('action') + isthis.val());
						})
					}
				}
			var search = new Search;
			search.search();
		}
	})
})