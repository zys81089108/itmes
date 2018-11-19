define(['jquery'],($)=>{
    $.fn.extend({
        username: function(){
            class Username{
                constructor(){
                }init(){
                    this.user = $('.login');
                    this.change();
                }change(){
                   if($.cookie('username'))
                      $('.login').html("<img src='/img/username.jpg'/>")
                      $('.login img').click(function(){
                          if(confirm('确定退出账户？')){
                                $.cookie('username', '', {path: '/'})
                                $.cookie('password', '', {path: '/'})
                                location.reload(true)
                          }
                      })
                }
            }
            var username = new Username;
            username.init();
        }
    })
})