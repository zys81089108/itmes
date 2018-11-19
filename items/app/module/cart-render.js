define(['jquery', 'cookie'], ($) => {
	class Cart{
		constructor(){
		}init(){
			this.allSel = $('#allselect'); //商品全选框
			this.cookie = $.cookie('product');
			if(this.cookie){
				this.render();
				this.edit();
			}
		}render(){//---------- cart render ------------
            var product = JSON.parse(this.cookie),
            	n = 0,
                html = '';
            if(product.length){
            	//----------- cookie存在 则渲染页面-----------
                product.forEach((curr)=>{
                    html += `
                            <tr class="product-tr">
                                <td>
                                    <dl class="product-data">
                                        <dt><a href="${curr.href}"><img src="${curr.src}" alt="" /></a></dt>
                                        <dd class='a'><h3 class='title'>${curr.title}</h3><span>${curr.size? "规格 : <i class='size'>" + curr.size + "</i>" : ""} ${curr.model? "夹馅：<i class='model'>" + curr.model + "</i>" : ""}</span></dd>
                                    </dl>
                                </td>
                                <td>${curr.price}</td>
                                <td class="edit"><a class="min">-</a><input type="number" name="" class="amount" value="${curr.amount}" /><a class="add">+</a></td>
                                <td><a class="del">移除</a></td>
                                <td><input type="checkbox" name="" class="select" value="" ${curr.select}/></td>
                            </tr>`
                    if(curr.select){
                    	n++
                    	n === product.length ? this.allSel.prop('checked', true) :  this.allSel.prop('checked', false)
                    }
                })
                  $('tbody').html(html);
				  $('.cart-allPrice').show();
              }else
              	this.empty();
            this.tr = $('.product-tr'); //商品单行
			this.count = $('.all-box'); //总价格计算盒子
			this.sel = $('.select'); //单个商品选择框
		}edit(){
			var product = JSON.parse(this.cookie),
				isthis = this;

			this.tr.on('click', function(e){
				var src = e.target,
					input = $(this).find('.amount'),
					amount = input.val(),
					data = '';
				var n = 0;
				try {
					product.forEach((curr)=>{
						if(curr.title == $(this).find('.title').text() && curr.size == $(this).find('.size').text() && curr.model == $(this).find('.model').text()){
							data = curr;
							err; //报错 强制退出foreach循环；
						}
						n++; //强制退出 拿到当前保存是的n值；
					})
				} catch(e) {};
				//---------- cart 商品数量增减删 ----------------
				if(src.className === 'add' || src.className === 'min'){
					if(src.className === 'add'){
						input.val(++amount);
						data.amount++;
						//-------- 调用显示商品数量 价格 函数 -------------
						isthis.allprice(isthis, product);
						isthis.sidebar(product);
					}
					else{
						input.val(-- amount);
						if(!amount){//----------- 如果数量为0 提示是否删除 ----------
							if(confirm('是否删除此商品')){
								$(this).remove();
								product.splice(n, 1);//利用当前n删除此商品
							}else{
								input.val(1);
								data.amount++;
							}
						}
						data.amount--;
						//-------- 调用显示商品数量 价格 函数 -------------
						isthis.allprice(isthis, product);
						isthis.sidebar(product);
					}
				}
				if(src.className === 'del'){
					if(confirm('是否删除此商品')){
						$(this).remove();
						product.splice(n, 1);
						isthis.sidebar(product);
						isthis.allprice(isthis, product);
					}
				}
				//--------- input框数量 实时计算数据 -----------
				if(src.className === 'amount'){
					var istr = $(this);
					$(src).on('input', function(){
						data.amount = Number($(this).val());
						if(data.amount <= 0){ //---- 如果输入负数则立即提示是否删除 ----
							if(confirm('是否删除此商品')){
								istr.remove();
								product.splice(n, 1);

							}else{
								$(this).val(1);
								data.amount = 1;
							}
						}
						$.cookie('product', JSON.stringify(product), {path: '/'});
						isthis.allprice(isthis, product);
						isthis.sidebar(product);
					})
				}
				if(src.className === 'select'){
					data.select === 'checked' ? data.select = '' : data.select = 'checked';
					
					//--------- 使用every判定所有单选是否满足条件 --------------
					var flag = product.every((curr) => {
						return curr.select === 'checked';
					})
					flag ? isthis.allSel.prop('checked', true) : isthis.allSel.prop('checked', false);

					//------- 普通判定 -----------
					// product.forEach((curr)=>{
					// 	if(!curr.select){
					// 		isthis.allSel.prop('checked', false);
					// 		return;
					// 	}
					// 	n++
					// })
					// if(n === product.length)
					// 	isthis.allSel.prop('checked', true);
				
					isthis.allprice(isthis, product);
				} 
				//------------ 购物车删除完后 显示购物车为空 ------------
				if(product.length === 0){
					$('.cart-allPrice').hide();
					isthis.empty();
				}
				$.cookie('product', JSON.stringify(product), {path: '/'})
			})
			this.select(isthis, product).allprice(isthis, product).sidebar(product);
			return this;
		}select(isthis, product){ 
		    //--------- cookie 全选单选判定 --------------------
			this.allSel.click(function(){
				$(this).prop('checked') ? isthis.sel.prop('checked', true) : isthis.sel.prop('checked', false);
				product.forEach((curr)=>{
					//如果全选框为true 则让所有单选全为true，为false则全为false
					$(this).prop('checked') ? curr.select = 'checked' : curr.select = '';
				})
				//在把选取的状态存入cookie
				$.cookie('product', JSON.stringify(product), {path: '/'})
				isthis.allprice(isthis, product);
			});
			return this;


			// -------------------- 页面单选框判定 （不存cookie判断）--------------
			// var n = 0,
			// 	isthis = this;
			// this.allSel.click(function(){
			// 	$(this).prop('checked') ? isthis.sel.prop('checked', true) : isthis.sel.prop('checked', false);
			// });
			// this.sel.click(function(){
			// 	isthis.sel.each(function(curr) {
			// 		if((!$(this).prop('checked'))){
			// 			 isthis.allSel.prop('checked', false);
			// 			 return
			// 		}
			// 		n++;
			// 	})
			// 	n === isthis.sel.length ? isthis.allSel.prop('checked', true) : isthis.allSel.prop('checked', false);
			// 	n = 0;
			// });
		}allprice(isthis, product){
			//------- 商品数量计算 ------------
			var length = 0,
				money = 0;
			product.forEach((curr)=>{
				if(curr.select){
					length += Number(curr.amount);
					money += curr.amount * Number(curr.price.slice(1));
				}
			})
			$('.length').text(length);

			//------- 商品总价格 ---------
			$('.money').text(money.toFixed(2));
			$('.allmoney').text(money.toFixed(2));
			return this;
		}sidebar(product){
			//--------- 侧边栏购物车数量显示---------
			var amount = 0;
			product.forEach((curr)=>{
				amount += curr.amount;
			})
			$('i.num').text(amount);
			return this;
		}empty(){
			//--------- 购物车情况后显示判断--------
            var html = `
                <div class="cat-empty">
                    <ul>
                        <li><img src="/img/cart.png"/></li>
                        <li>你的购物车还是空的</li>
                        <li>返回首页添加喜欢的产品吧</li>
                        <li><a href="/html/shop-mall/shop-index.html">返回首页</a></li>
                    </ul>
                </div>`
            $('#cart-box .cart-list').remove().parent();
            $('#cart-box').html(($('#cart-box').html() + html));
		}
	}

	var cart = new Cart;
	return cart;
})