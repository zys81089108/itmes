define(['jquery'],($)=>{
    class List{
        consturctor(){
        }render(){
            var arr = location.search.slice(1).split('='),
                options = {};
                options[arr[0]] = decodeURIComponent(arr[1]);
                options.from = arr[0];
            $.ajax({
                url: 'http://localhost/php/items/api/list.php',
                method: 'POST',
                data: options,
                dataType: 'json',
                success: data
            })
            function data(data){
                console.log(data)
                if(!data.code){
                    $('main').html('<div class="err"><a href="/index.html">404 页面没有找到,点我返回首页</a></div>');
                    $('#detail-sideBar').html('');
                }else{
                   var html = '',
                       num = 0,
                       arrs = new Array(6);
                       arrs.fill(0);
                   data.list.forEach((curr)=>{
                    html+=  `<li>
                                <dl class="l-left">
                                    <dt><a href="/html/detail/detail.html?id=${curr.id}"><img src="/img/detail/${(curr.src.split(','))[0]}.jpg"/></a></dt>
                                    <dd><a href="/html/detail/detail.html?id=${curr.id}"><h3>${curr.title}</h3></a></dd>
                                    <dd>${curr.btitle}</dd>
                                </dl>
                                <div class="l-right">
                                    <span class="l-price">￥${Number(curr.price).toFixed(2)}</span>
                                    <div class="l-buy">
                                        <a href="/html/detail/detail.html?id=${curr.id}"><input type="button" value="立即购买" /></a>
                                    </div>
                                </div>
                            </li>`
                    num++; //商品数量
                    if(curr.price >= 100 && curr.price < 200)  //商品价格区间数量
                        arrs[1]++;
                    else if(curr.price >= 200 && curr.price < 300)
                        arrs[2]++;
                    else if(curr.price >= 300 && curr.price < 500)
                        arrs[3]++;
                    else if(curr.price >= 500 && curr.price < 800)
                        arrs[4]++;
                    else if(curr.price > 800)
                        arrs[5]++;
                    else if(curr.price < 100)
                        arrs[0]++;
                   })
                   //------ 商品价格区间数量赋值 ---------
                   var n = 0;
                   $('dd span').each(function(curr){
                      $(this).html('('+ arrs[n++] + ')') 
                   })
                   //-------- 商品数量赋值 ---------
                   $('#num').html(num);
                   //------- 商品数据赋值 ----------
                   $('#list-data').html(html);
                }
            }
            return this;
        }edit(){
           // ------- 修改侧边栏购物车数量显示 ---------------
           if($.cookie('product')){
            var product = JSON.parse($.cookie('product')),
                amount = 0;
            product.forEach((curr)=>{
                amount += curr.amount;
            })
            $('i.num').text(amount);
        }
      }
    }
    var list = new List;
    return list;
})