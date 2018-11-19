define(['jquery'], ($) => {
    $.fn.extend({
        deSideBar : function(options){
            var obj = {
                arr : options
            };
            
            $.ajax({
                url: 'http://localhost/php/items/api/detail.php',
                data: obj,
                method: 'POST',
                dataType: 'json',
                success: data
            });
             
            function data(data){
               if(data.code){
                   var html = '';
                   data.detail.forEach((curr) => {
                       html += `<dl>
                                    <dt><a href="/html/detail/detail.html?id=${curr.id}"><img src="/img/detail/${curr.src.split(',')[0]}.jpg"/></a></dt>
                                    <dd>￥${Number(curr.price).toFixed(2)}</dd>
                                    <dd>${curr.title}</dd>
                                </dl>`
                   })
                   $('.d-s-product').html(html);
               }
            }
        }
    })
})