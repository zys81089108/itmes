define(['jquery', 'cookie'],($)=>{
    class Detail{
        constructor(){
        }render(arg){
            var id = location.search.slice(1).split('='),
                options = {};
                options[id[0]] = id[1];
            $.ajax({
                url: 'http://localhost/php/items/api/detail.php',
                data: options,
                method: 'POST',
                async: false,
                dataType: 'json',
                success: data.bind(this)
            })  

            function data(data){
                if(!data.code){
                    $('main').html('<div class="err"><a href="/index.html">404 页面没有找到,点我返回首页</a></div>');
                    $('#detail-sideBar').html('');
                }else{
                    if(data.detail.nav){
                        var html =  '',
                            arr = data.detail.nav.split(',');
                        arr.forEach((curr)=>{
                            html += ` <a href="${(curr.split('_'))[0]}">${(curr.split('_'))[1]}</a> >`;
                        })
                        html = html.slice(0,-1)
                        $('#location').html(html)
                    }
                    if(data.detail.src){//商品放大镜图片
                        var html = '',
                            arr = data.detail.src.split(',');
                        arr.forEach((curr)=>{
                            html += `<li><img src="/img/detail/${curr}.jpg" alt="" /></li>`;
                        })
                        $('.glassImg ul').append(html);
                        $('.jqzoom').append(`<img src="/img/detail/${arr[0]}.jpg" alt="" jqimg="/img/detail/${arr[0]}.jpg" id="bigImg"/>`)
                    } 
                    if(data.detail.title) //商品大标题
                        $('#detail').prepend(`<h1 class="title">${data.detail.title}</h1>`);
                    if(data.detail.btitle) //商品小标题
                        $('.title').after(`<div class="b-title">${data.detail.btitle}</div>`);
                    if(data.detail.price) //商品价格
                        $('.price').append(`<dd class="b-price">￥${Number(data.detail.price).toFixed(2)}</dd>`)
                    if(data.detail.size){ //商品规格
                        var html = '',
                            arr = data.detail.size.split(',');
                        arr.forEach((curr)=>{
                            html += `<a class="mod">${curr}</a>`;
                        })
                        $('.price').after(`
                            <dl class="size">
                                <dt>选择规格：</dt>
                                <dd class="size-num">${html}</dd>
                            </dl>
                            `)
                    }
                    if(data.detail.model){ //商品材料
                        var html = '',
                            arr = data.detail.model.split(',');
                        arr.forEach((curr)=>{
                            html += `<a class='mod'>${curr}</a>`;
                        })
                        $('.box').before(`
                            <dl class="model">
                                <dt>蛋糕夹层：</dt>
                                <dd>
                                    <div class="model-num">${html}</div>
                                </dd>
                            </dl>
                            `)
                    }
                    //默认选中第一项规格
                    $('.size-num').children().first().addClass('red');
                    $('.model-num').children().first().addClass('red');
                    if(data.detail.ser) //商品编号
                        $('.txt').prepend(`<h4>编号:${data.detail.ser}</h4>`)
                    if(data.detail.img)
                        $('.text').prepend(`<div class="show"><img src="/img/detail/${data.detail.img}.jpg"/></div>`)
                }
                this.amount().color().buy().edit();
                // .buy();

            }
        }amount(){
            this.buyBtn = $('button.buy');
            this.cartBtn = $('button.add');
            this.price = $('.b-price');
            //----------- 商品数量加减 ---------------
            $('.amBtn').children('span').click(function(){
                   var count = $('.number').val();
               $(this).attr('class') === 'add' ? $('.number').val(++count) : $('.number').val(--count <= 1 ? 1 : count);
            })
            return this;
        }color(){//--------- 显示选中规格 样式 -----------
             var isthis = this;
             $('.size-num').children().click(function(){
                 if($(this).text() === '6号')
                    isthis.price.text('¥158.00')
                 else if($(this).text() === '8号')
                    isthis.price.text('¥218.00')
                 else if($(this).text() === '10号')
                    isthis.price.text('¥288.00')
                 $(this).addClass('red').siblings().removeClass('red');
             })
             
             $('.model-num').children().click(function(){
                $(this).addClass('red').siblings().removeClass('red');
             })
             return this;
        }buy(){//-------- 加入购物车 存取cookie-------------
            var isthis = this;
            this.cartBtn.click(buy);
            this.buyBtn.click(buy);

                function buy(){
                var options = {
                    title : $('.title').text(),
                    btitle : $('.b-title').text(),
                    price : $('.b-price').text(),
                    size : $('.size .red').text(),
                    model : $('.model-num .red').text(),
                    src: $('#bigImg').attr('src'),
                    href : $('#location a').last().attr('href'),
                    amount : Number($('.number').val()),
                    select : 'checked'
                }
                //----- 加入成功交互显示 ----------
                if($(this).attr('class') === 'add'){
                    var html = '';
                    html = `
                            <ul class="pro-box">
                                <li>已添加至购物车</li>
                                <li>
                                    <dl>
                                        <dt><img src="${options.src}"/></dt>
                                        <dd>${options.title}</dd>
                                        <dd>数量 : <i>${options.amount}</i></dd>
                                        <dd>价格 : <i>${options.amount * (options.price.slice(1))}</i></dd>
                                    </dl>
                                </li>
                                <li><a href="/html/cart/cart.html">结账</a></li>
                            </ul>`;
                    //------先判断是否存在 存在立即删除-------
                   if($('#showhide')){
                        $('#showhide').remove();
                        clearTimeout(timer);
                   }
                   $('#sideBar').after("<div id='showhide'></div>");
                   $('#showhide').html(html);
                   var timer = setTimeout(()=>{
                        $('#showhide').remove()
                       },2000)

                } 
                var product = $.cookie('product');
                if(product)
                    product = JSON.parse(product);
                else
                    product = [];

                //判断当前选购商品是否已经存在
                //存在则修改数量
                var n = 0;
                product.forEach((curr)=>{
                    if(curr.title == options.title && curr.size == options.size && curr.model == options.model){
                       curr.amount+= options.amount;
                        return;
                    }
                     n++;
                })
                if(n === product.length)
                    product.push(options);
                    // console.log(product)
                $.cookie('product', JSON.stringify(product), {path:"/"});
                isthis.edit();
            }

            return this;
        }edit(){
               //------- 修改侧边栏购物车数量显示 ---------------
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
    var detail = new Detail;
    return detail;
})