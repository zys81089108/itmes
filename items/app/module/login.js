define(['jquery','cookie'], ($)=>{
    class Login{
        constructor(){ 
        }init(){
            this.logInput = $('#login-data .form input');
            this.logBtn = $('#login-data .btn');
            this.loginUser = $('#login-username');
            this.loginPass = $('#login-password');
            this.checked = $("#login-data [type = 'checkbox']");
            this.focus().btn().press();
        //-------- input框 -----------
        }focus(){
            this.logInput.focus(function(){
                $(this).siblings('.err').hide();
            });
            return this;
        //-------- 提交按钮 ------------
        }btn(){
            var isthis = this;
            this.logBtn.click(isthis.login.bind(isthis))
            return this;
        //------- enter键提交 -----------
        }press(){ 
            this.loginPass.keypress((event)=>{
              var code = event.which || event.keyCode;
                code === 13? this.login() : '';
            })
        //-------- login 判定 ----------------
        }login(){
               var options = {
                    username: this.loginUser.val(),
                    password: this.loginPass.val()
                };
                
            $.ajax({
                url: "http://localhost/php/items/api/login.php",
                data: options,
                method: 'POST',
                dataType: 'json',
                success: (data)=>{
                    if(data.code === 1){
                        var obj;
                        this.checked.prop('checked')? obj = {expires: 99,  path: '/'} : obj = {path: '/'};
                        $.cookie('username', this.loginUser.val(),obj);
                        $.cookie('password', this.loginPass.val(),obj);    
                        this.logBtn.val('登录中....')
                        setTimeout(()=>{
                            location.href = "/html/shop-mall/shop-index.html";
                        },1000);
                    }else if(data.code === 2){
                        this.loginPass.siblings('.err').show().html('用户名或密码错误');
                    }else if(data.code === 3){
                        this.loginUser.siblings('.err').show().html('用户名不存在');
                    }
                    if(!this.loginUser.val().trim())
                        this.loginUser.siblings('.err').show().html('用户名不能为空');
                    if(!this.loginPass.val().trim())
                        this.loginPass.siblings('.err').show().html('密码不能为空');
                }
            })
        }
    }
    return new Login;
})