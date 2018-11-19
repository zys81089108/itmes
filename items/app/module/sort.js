define(['jquery'], ($)=>{
    class Sort{
        constructor(){
        }init(){
            this.sortBtn = $('.sort');
            this.sort();
        }sort(){
            this.sortBtn.click(function(){
                var arr = location.search.slice(1).split('='),
                    options = {};
                    options[arr[0]] = decodeURIComponent(arr[1]);
                    options.from = arr[0];
                if($('.sort').index($(this))=== 0){
                    options.sort = 'asc';
                    options.txt = 'price';
                }else if($('.sort').index($(this))=== 1){
                    options.sort = 'desc';
                    options.txt = 'price'
                }else if($('.sort').index($(this))=== 2){
                    options.sort = 'asc';
                    options.txt = 'sales';
                }else if($('.sort').index($(this))=== 3){
                    options.sort = 'desc';
                    options.txt = 'sales';
                }
                
                   $.ajax({
                    url: 'http://localhost/php/items/api/sort.php',
                    method: 'POST',
                    data: options,
                    dataType: 'json',
                    success: data
                })
                
                function data(data){
                    if(!data.code){
                        $('main').html('<div class="err"><a href="/index.html">404 页面没有找到,点我返回首页</a></div>');
                        $('#detail-sideBar').html(''); 
                    }else{
                        var html = '';
                        data.sort.forEach((curr)=>{
                            html+=  `<li>
                                        <dl class="l-left">
                                            <dt><a href="/html/detail/detail.html?id=${curr.id}"><img src="/img/detail/${(curr.src.split(','))[0]}.jpg"/></a></dt>
                                            <dd><a href=""><h3>${curr.title}</h3></a></dd>
                                            <dd>${curr.btitle}</dd>
                                        </dl>
                                        <div class="l-right">
                                            <span class="l-price">￥${Number(curr.price).toFixed(2)}</span>
                                            <div class="l-buy">
                                                <a href="/html/detail/detail.html?id=${curr.id}"><input type="button" value="立即购买" /></a>
                                            </div>
                                        </div>
                                    </li>`
                        })
                        $('#list-data').html(html);
                    }
                }
            })
        }
    }
    var sort = new Sort;
    return sort;
})