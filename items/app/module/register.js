define(['jquery'], ($)=>{
    class Register{
        constructor(){
        //------- 初始数据 --------
        }init(){
            this.regBox = $('#register-data');
            this.regInput = $('.form').children('input');
            this.subBtn = $('#reg-btn');
            this.loginTitle = $('#login-title');
            this.focus().blur().sub().hover();
            this.flag = true;
        //------ input框 实时判断------
        }focus(){
            this.regInput.focus(function(){
                $(this).siblings('.err').hide();
            });
            return this;
        //------ input框 实时判断------
        }blur(){ 
            var isthis = this,
                reg;
            this.regInput.blur(function(){
                isthis.regExp($(this));
                //----- 实时判断手机号是否注册 过--------
                if($(this).attr('id') === 'reg-phone')
                var options = {
                    username : $(this).val()
                }
                    $.ajax({
                        url: 'http://localhost/php/items/api/register.php',
                        data: options,
                        method: 'POST',
                        dataType : 'json',
                        success: (data)=>{
                           if(!data.code && $(this).val().length == 11)
                              $(this).siblings('.err').show().html('手机号已注册')
                        } 
                    })
            });
            return this;
        //------ button 提交判断------
        }sub(){ //注册提交
            var isthis = this,
                reg;
            this.subBtn.click(()=>{
                this.flag = true;
                if(!$('#checkbox').prop('checked'))
                    this.flag = false;
                this.regInput.each(function(curr){
                    isthis.regExp($(this))
                })
                if(this.flag){
                    var options = {
                        username: $('#reg-phone').val(),
                        password: $('#reg-password').val(),
                        hePhone: $('#he-phone').val(),
                        birthday: $('#birthday').val(),
                        email: $('#email').val()
                    }
                    $.ajax({
                        url: "http://localhost/php/items/api/register.php",
                        data: options,
                        method: 'POST',
                        dataType : 'json',
                        success: (data)=>{
                            if(data.code){
                               alert('注册成功')
                                setTimeout(function(){
                                    this.location.reload(true);
                                },500) 
                            }
                        }
                    });
                }
            })
            return this;
        //------ input框 判断机制-------
        }regExp(ele){ //input判断
              var isthis = this,
                reg; 
              if(ele.attr('id') === 'reg-phone'){
                    reg = /^[1-9]\d{10}$/;
                    if(!reg.test(ele.val())){
                        ele.siblings('.err').show().html("请输入正确的手机号码");
                        isthis.flag = false;
                    }
               }
               if(ele.attr('id') === 'verifi'){
                    if(ele.val().toLowerCase() != 'ukzf'){
                        ele.siblings('.err').show().html("请输入正确验证码");
                        isthis.flag = false;
                    }
               }
               if(ele.attr('id') === 'mes'){
                    if(ele.val() != '2333'){
                        ele.siblings('.err').show().html("请输入正确短信验证码");
                        isthis.flag = false;
                    }
               }
               if(ele.attr('id') === 'he-phone' && ele.val()){
                    reg = /^[1-9]\d{10}$/;
                        if(!reg.test(ele.val())){
                            ele.siblings('.err').show().html("请输入正确的手机号码");
                            isthis.flag = false;
                        }
               }
               if(ele.attr('id') === 'email' && ele.val()){
                    reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
                        if(!reg.test(ele.val())){
                            ele.siblings('.err').show().html("请输入正确的邮箱");
                            isthis.flag = false;
                        }
               }
               if(ele.attr('id') === 'reg-password'){
                    reg = /^.{6,}$/;
                    if(!reg.test(ele.val())){
                        ele.siblings('.err').show().html("密码六位以上");
                        isthis.flag = false;
                    }else if(ele.val().trim().length <= 6){
                        ele.siblings('.err').show().html("密码六位以上");
                        isthis.flag = false;
                    }
               }
               if(ele.attr('id') === 're-password'){
                    reg = /^.{6,}$/;
                    if(ele.val() !== $('#reg-password').val()){
                        ele.siblings('.err').show().html("两次密码输入请一致");
                        isthis.flag = false;
                    }else if(ele.val().trim().length <= 6){
                        ele.siblings('.err').show().html("密码六位以上");
                        isthis.flag = false;
                    }
               }
        }hover(){
            this.loginTitle.click(()=>{
               this.regInput.siblings('.err').hide();
               this.regInput.val('');
            })
        }
    }
    return new Register;
})