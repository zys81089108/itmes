define(function(){
    var tools = {
        /**
         * 根据选择器查找元素
         * @param {String} selector 选择器，可取 #id、 .class、 element;
         * @param {[DOMObject]} context 查询上下文，即在该DOM元素后代查找满足选择器条件的元素，默认在document中查找;
         * @return 返回查找到的元素（根据id查找时返回的是查找到的DOM对象，根据类名或元素名查找时，返回的是 HTMLCollection;
         */
        $ : function(selector, context){
            // 如果未传递 context 参数，则默认取 document 值
            context = context || document;
            switch(selector.charAt(0)){
                case '#' : //id
                    return context.getElementById(selector.slice(1));
                case '.' : //class
                    return context.getElementsByClassName(selector.slice(1));
                default : //element
                    return context.getElementsByTagName(selector);
            }
        },
        /**
         * 解决根据类名查找元素浏览器兼容
         * @param {String} className  待查找的类名
         * @param {DOMObject} context  查询上下文，即在该DOM元素后代查找满足选择器条件的元素，默认在 document 中查找
         * @return 返回查找到的元素
         */
        byClassName : function(className, context){
            // 如果未传递 context 参数，则默认取 document 值
            context = context || document;
            
            //支持使用 getElementsByClassName 方法，则直接使用 
            if(context.getElementsByClassName)
                return context.getElementsByClassName(className);
            
            //不支持使用 getElementsByClassName 方法
            // 将查询上下文后代中所有元素查找出来
            var allElement = context.getElementsByTagName('*');
            // 保存所有查找到元素的数组
            var result = []; 
            // 遍历迭代所有元素
            for (var i = 0; i < allElement.length; i++) {
                // 获取当前遍历到元素的所有类名
            	var classNames = allElement[i].className.split(" ");
            	// 遍历所有类名
            	for (var j = 0; j < classNames.length; j++) {
            		if(classNames[j] === className){ // 当前元素的某个类名与待查找的类名一致
            		    // 说明当前遍历到的元素是需要查找的元素之一
            		    result.push(allElement[i]);
            		    break;
            		}
            	}
            }
    	    // 返回所有查找到的结果
            return result;
        },
        
        /**
         * 根据元素查找内部与外部样式
         * @param {DOMObject} element 获取样式的元素对象；
         * @param {String} attrName  属性名；
         * @return 返回样式属性
         */
        css : function(element, attrName){ // 支持使用 getComputedStyle(),不支持则currentStyle()
           return window.getComputedStyle ? window.getComputedStyle(element)[attrName] : element.currentStyle[attrName];
        },
        
        /**
         * 使元素绝对居中
         * @param {DOMObject} element 要居中的元素
         */
        showCenter: function(element){
            var _this = this;
            element.style.display = "block";  //元素默认显示状态
            element.style.position = "absolute"; //添加绝对定位
            //计算left和top
            function calc(){
                var left = (_this.getBody().width - element.offsetWidth)/2;
                var top = (_this.getBody().height - element.offsetHeight)/2;
                element.style.left = left + "px";
                element.style.top = top + "px";
            }
            calc();
            window.onresize = calc; //当浏览器发生大小变化时再次调用函数
        },
        
        /**
         * 获得浏览器宽高
         * @return object width,height
         */
        getBody: function(){
            return {
                //获取浏览器可视区域宽度
                width: document.documentElement.clientWidth || document.body.clientWidth,
                //获取浏览器可视区域高度
                height: document.documentElement.clientHeight || document.body.clientHeight
            }
        },
        
        /**
         * 添加事件监听：事件冒泡
         * @param {DOMObject} element 待添加事件监听的元素
         * @param {String} type 事件类型字符串
         * @param {Function} callback 事件处理程序回调函数
         */
        on : function(element, type, callback) {
            if (element.addEventListener) { // 支持使用 addEventListener()
                // 判断 type 是否以 "on" 开头
                if (type.slice(0,2) === "on") // 以 "on" 开头，不需要，则去掉
                    type = type.slice(2);
                element.addEventListener(type, callback);
            } else { // 不支持使用 addEventListener()
                // 判断 type 是否以 "on" 开头
                if (type.slice(0, 2) !== "on") // 没有以 "on" 开头，需要，则加上
                    type = "on" + type;
                element.attachEvent(type, callback);
            }
        },
        
        /**
         * 移除事件监听：事件冒泡
         * @param {DOMObject} element 待添加事件监听的元素
         * @param {String} type 事件类型字符串
         * @param {Function} callback 事件处理程序回调函数
         */
        off : function(element, type, callback) {
            if (element.addEventListener) { // 支持使用 addEventListener()
                // 判断 type 是否以 "on" 开头
                if (type.slice(0,2) === "on") // 以 "on" 开头，不需要，则去掉
                    type = type.slice(2);
                element.removeEventListener(type, callback);
            } else { // 不支持使用 addEventListener()
                // 判断 type 是否以 "on" 开头
                if (type.slice(0, 2) !== "on") // 没有以 "on" 开头，需要，则加上
                    type = "on" + type;
                element.detachEvent(type, callback);
            }
        },
        
        /**
         * 获取/保存 /删除 cookie
         * @param {String} key  cookie名
         * @param {[string]} value 可选，当不传递时，表示根据 cookie 名查找 cookie 值
         * @param {[Object]} options 可配置选项参数，如：{expires:3, path:"/", domain:".baidu.com", secure:true}
         */
        cookie : function(key, value, options){
            // 为传递 value 参数， 则表示读取 cookie
            if(typeof value === 'undefined'){
    		    // 将域下所有 cookie 读取出来，以 "; " 分割保存到数组中
                var cookies = document.cookie.split('; ');
                // 遍历迭代所有的 cookie ，查找指定 key 对应的 cookie 值
                for(var i = 0; i < cookies.length; i++ ){
    			    // 将当前遍历到的 cookie 使用 "=" 分割
                    var parts = cookies[i].split('='); 
                    // 数组中第一个元素为 cookie 名，将 cookie 名解码
                    var name = decodeURIComponent(parts.shift());
    			    // 判断当前 cookie 名与待查找 cookie 的名称是否一致
                    if(name === key)
                        return decodeURIComponent(parts);
                }
        		// 如果循环迭代完毕所有 cookie 都不存在要查找的 cookie 信息，则说明未保存过
                return undefined;
            }
            // 传递了 value 参数，表示保存 cookie
            // "key=value"，将 key 和 value 编码
            var _cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value);
            // 判断可配置选项
            options = options || {};
            if(value === '')
            	options.expires = -1;
            if(options.expires){// 有失效时间的配置
                var date = new Date();
                date.setDate(date.getDate() + options.expires);
                _cookie += ';expires=' + date.toUTCString();
            }
            if(options.path)// 有配置路径
                _cookie += ';path=' + options.path;
            if(options.domain) // 域
                _cookie += ';domain=' + options.domain;
            if(options.secure) // 安全链接
                _cookie += ';secure';
    	    // 保存 cookie
            document.cookie = _cookie;
        },
        
        /**
         * 删除cookie
         * @param {String} key cookie名
         * @param {Object} options 日期
         */
        removeCookie : function(key, options){
            options = options || {};
            options.expires = -1;// 要删除 cookie ，则失效时间为当前时间之前的某一刻
            this.cookie(key, '', options);
        },

        /**
         * [animate 单属性运动框架]
         * @param  {DOMObject}   element  [待操作的元素]
         * @param  {String}      attrName [元素的属性名]
         * @param  {Number}      speed    [总时间]
         * @param  {Number}      end      [元素结束属性]
         * @param  {[Function]}  fn       [运动结束后运行函数]
         */
        animate : function (element, attrName, speed, end, fn){
            //清除定时器
            clearInterval(element.timer)
            //获取元素初始属性值
            var start =  parseFloat(this.css(element,attrName)),
                //获取运动开始时间
                startTime = +Date.now(),
                //获取属性变化范围
                range = end - start;
                //绑定计时器
            element.timer = setInterval(function(){
                //获取运动时间差
                var elapsed = Math.min(+Date.now() - startTime, speed),
                    //求出该时间差所变化值
                    result = elapsed * range / speed + start;
                    //将属性返回元素
                    element.style[attrName] = result + (attrName === 'opacity' ? '' : 'px' ); 
                    if(elapsed === speed){
                        //满足最终属性时，清除定时器
                        clearInterval(element.timer);
                        fn && fn();
                    }
            },1000/60);  
        },

        /**
         * [多属性运动]
         * @param  {DOMObject}   element [待操作的元素]
         * @param  {Object}      options [属性对象]
         * @param  {Number}      speed   [总时间]
         * @param  {[Function]}    fn      [运动结束后运行函数]
         */
        animates : function (element, options, speed, fn){
            //清除定时器
            clearInterval(element.timer)
            //获取起始属性，并用最终属性求得属性范围
            var start = {},
                range = {};
            for(var attrName in options){
                start[attrName] = parseFloat(this.css(element, attrName));
                range[attrName] = options[attrName] - start[attrName];
            }
            //运动初始时间
            var startTime = +new Date();
            element.timer = setInterval(function(){
                //获取运动时间差
                var elapsed = Math.min(+new Date() - startTime, speed)
                //求出该时间各个属性变化值
                for(var attrName in options){
                    var result = elapsed * range[attrName] / speed + start[attrName];
                    //将属性返回元素
                    element.style[attrName] = result + (attrName === 'opacity' ? '' : 'px');
                }
                if(elapsed === speed){
                    //满足最终属性时，清除定时器
                    clearInterval(element.timer);
                    fn && fn();
                }
            },1000/60)
        },

        /**
         * [buffrt 缓冲运动]
         * @param  {DOMObject}   element  [待操作的元素]
         * @param  {String}      attrName [元素的属性名]
         * @param  [Number}      speed    [速率]
         * @param  {Number}      end      [元素结束属性]
         * @param  {[Function]}  fn       [运动结束后运行函数]
         */
        buffer : function(element, attrName, speed, end, fn){
            //清除定时器
            clearInterval(element.timer)
            //获取元素初始属性值
            var start = parseFloat(this.css(element,attrName))
            element.timer = setInterval(function(){
                //计算出每次运动步数
                var step = (end - start)/speed;  
                    start += step;
                    //当最运动步数前三位为0时
                    if(step.toFixed(2) == 0)
                        //则运动到达终点
                        start = end;
                //将属性返回元素
                element.style[attrName] = start + (attrName === 'opacity' ? '' : 'px');
                if(end === start){
                    //满足最终属性时，清除定时器
                    clearInterval(element.timer);
                    fn && fn();
                }
            },1000/60);  
        },

        /**
         * [buffrts 缓冲运动]
         * @param  {DOMObject}   element  [待操作的元素]
         * @param  {Object}      options  [属性对象]
         * @param  [Number}      speed    [速率]
         * @param  {[Function]}  fn       [运动结束后运行函数]
         */
        buffers : function(element, options, speed, fn){
            //清除定时器
            clearInterval(element.timer)
            var start = {},//暂存起始值
                range = {};//暂存每次运动值
             //获取元素初始属性值
            for(var attrName in options){
                start[attrName] = parseFloat(this.css(element,attrName));
            }
            element.timer = setInterval(function(){
                //计算出每次运动步数
                var flag = true; 
                //遍历传入的最终属性
                for(var attrName in options){
                    //获取每次运动的值
                    range[attrName] =  (options[attrName] - start[attrName]) / speed;
                    //每次运动的起始值加上运动的值
                    start[attrName] += range[attrName];
                    //当运动的值小数前两位都为0时，将起始值等于最终值
                    if(range[attrName].toFixed(2) == 0)
                        start[attrName] = options[attrName];
                     element.style[attrName] = start[attrName] + (attrName === 'opacity' ? '' : 'px');
                     //判断所有属性是否都达到最终属性，只要有一条属性没满足则false
                     if(start[attrName] !== options[attrName])
                        flag = false;
                }
                //到达终点时
                if(flag === true){
                    //满足最终属性时，清除定时器
                    clearInterval(element.timer);
                    fn && fn();
                }
            },1000/60);  
        },

        /**
         * [fadeIn 淡入]
         * @param  {DOMObject}   element [待操作的元素]
         * @param  {Number}      speed   [速率]
         * @param  {Function}    fn      运动结束后运行函数]
         */
        fadeIn : function(element, speed, fn){
            element.style.display = 'block';
            element.style.opacity = 0;
            this.animates(element, {opacity : 1}, speed, fn)
        },

        /**
         * [fadeIn 淡出]
         * @param  {DOMObject}   element [待操作的元素]
         * @param  {Number}      speed   [速率]
         * @param  {Function}    fn      运动结束后运行函数]
         */
        fadeOut : function(element, speed, fn){
            element.style.display = 'block';
            element.style.opacity = 1;
            this.animates(element, {opacity : 0}, speed, function(){
                element.style.display = 'none';
                fn && fn();
            })
        },

        /**
         * [ajaxGet GET请求]
         * @param  {[string]}   url     [请求地址]
         * @param  {[object]}   options [请求携带参数]
         * @param  {[Function]} fn      [请求成功后回调函数]
         */
        ajaxGet : function(url, options, fn){
            if(typeof options === 'object'){
              url += '?';
              for (var key in options) {
                  url += key + '=' + options[key] + '&';
              }
              url = url.slice(0, -1)
          }else
            fn = options;
            var ajax = new XMLHttpRequest();
            ajax.open("GET", url);
            ajax.send(null);
            console.log('1')
            ajax.onreadystatechange = function(){
                if(ajax.readyState === 4 && ajax.status === 200){
                    var data = ajax.responseText;
                    fn && fn(data);
                }
            }
        },

        /**
         * [ajax 数据请求]
         * @param  {Object} options [选项参数]
         */
        /*
        options = {
        type : "get", // 请求方式，默认为 "get"
        url : "xxxx", // 请求资源的URL
        data : {username:"abc", password:"xxx", address: "xxxxx"}, // 向服务器传递的参数数据
        success : function(data){}, // 请求成功时执行的函数，传递获取到的数据
        error : function(err) {}, // 请求失败时执行的函数
        }
        */
        ajax : function(options){
            options = options || {};
            var url = options.url;
            if(!url)
                return;
            var method = (options.type || 'get').toUpperCase();
            var queryString = '';
            if(options.data){
                for (var attr in options.data) {
                    queryString += attr + '=' + options.data[attr] + '&';
                }
                queryString = queryString.slice(0, -1);
            }
            if(method === 'GET' && queryString){
                url += '?' + queryString;
                queryString = null
            }

            var ajax = new XMLHttpRequest();
            ajax.open(method, url ,true);
            if(method === 'POST')
                ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            ajax.send(queryString);
            ajax.onreadystatechange = function(){
                if(ajax.readyState === 4){
                    if(ajax.status === 200){
                        var data = ajax.responseText;
                        try {
                            data = JSON.parse(data);
                            options.success && options.success(data);
                        } catch(e) {
                            options.success && options.success(data);
                        }
                    }else{
                        options.error && options.error(ajax.status)
                    }
                }
            }
        },

        /**
         * [createDiv 创建div]
         * @param  {String}     className [class名]
         * @param  {String}     parent    [父级元素]
         * @return {DOMObject}  element   [返回创建的div]
         */
        createDiv : function(className, parent){
            parent = parent || document.body;
            className  = className || '';
            var div = document.createElement('div');
            div.className = className;
            parent.appendChild(div);
            return div;
        },


        // ajaxPromise : function(options){
            
        // }
    } 

    return tools;   
})
    
  
