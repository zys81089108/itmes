
define(['jquery'], function($){
	$.fn.extend({
		jqueryzoom : function (options) {
		var settings = {
			xzoom: 200, //zoomed width default width
			yzoom: 200, //zoomed div default width
			offset: 10, //zoomed div default offset
			position: "right", //zoomed div default position,offset position is to the right of the image
			lens: 1, //zooming lens over the image,by default is 1;
			preload: 1
		};
 
		if (options) {
			$.extend(settings, options);
		}
 
 
		var noalt = '';
		//jQueryObject.hover( handlerIn , handlerOut )
		//分别指定鼠标移入、移出元素时的事件处理函数。
		$(this).hover(function () {
				//offsetLeft = left + marginLeft
				var imageLeft = this.offsetLeft;
 
				var imageRight = this.offsetRight;
				// offsetTop = top +marginTop
				var imageTop = $(this).get(0).offsetTop;
				//offsetWidth时间获取的是盒模型(width+border+padding)
				//like:<div id="app"></div> 
				//#app { width:200px; height:200px; border:1px solid #ccc; padding:2px; margin:2px; background:#336699;}
				//offsetWidth 200+2+4=206
				var imageWidth = $(this).children('img').get(0).offsetWidth;
				var imageHeight = $(this).children('img').get(0).offsetHeight;
 
 
				noalt = $(this).children("img").attr("alt");
				var bigimage = $(this).children("img").attr("jqimg");
 
	
				$(this).children("img").attr("alt", '');
				//get() 方法获得由选择器指定的 DOM 元素
				if ($("div.zoomdiv").get().length == 0) {
					$(this).after("<div class='zoomdiv'><img class='bigimg' src='" + bigimage + "'/></div>");
					$(this).append("<div class='jqZoomPup'> </div>");
				}
 
				if (settings.position == "right") {
					//1+500+10+480>1920
					if (imageLeft + imageWidth + settings.offset + settings.xzoom > screen.width) {
						leftpos = imageLeft - settings.offset - settings.xzoom;
					} else {
						leftpos = imageLeft + imageWidth + settings.offset;
					}
				} else {
					leftpos = imageLeft - settings.xzoom - settings.offset;
					if (leftpos < 0) {
						leftpos = imageLeft + imageWidth + settings.offset;
					}
				}
				$("div.zoomdiv").css({
					top: imageTop,
					left: leftpos
				});
				$("div.zoomdiv").width(settings.xzoom);
				$("div.zoomdiv").height(settings.yzoom);
				$("div.zoomdiv").show();
				if (!settings.lens) {
					$(this).css('cursor', 'crosshair'); //十字拖拽
				}
				$(document.body).mousemove(function (e) {
					mouse = new MouseEvent(e);
					/*$("div.jqZoomPup").hide();*/
					var bigwidth = $(".bigimg").get(0).offsetWidth; //800
					var bigheight = $(".bigimg").get(0).offsetHeight; //800
					var scaley = 'x';
					var scalex = 'y';
					if (isNaN(scalex) | isNaN(scaley)) {
						var scalex = (bigwidth / imageWidth); //800/500
						var scaley = (bigheight / imageHeight);
						$("div.jqZoomPup").width((settings.xzoom) / scalex); //480/1.6
						$("div.jqZoomPup").height((settings.yzoom) / scaley);
						if (settings.lens) {
							$("div.jqZoomPup").css('visibility', 'visible');
						}
					}
					xpos = mouse.x - $("div.jqZoomPup").width() / 2 - imageLeft;
					ypos = mouse.y - $("div.jqZoomPup").height() / 2 - imageTop;
					if (settings.lens) {
						xpos = (mouse.x - $("div.jqZoomPup").width() / 2 < imageLeft) ? 0 : (mouse.x + $("div.jqZoomPup").width() / 2 > imageWidth + imageLeft) ? (imageWidth - $("div.jqZoomPup").width() - 2) : xpos;
						ypos = (mouse.y - $("div.jqZoomPup").height() / 2 < imageTop) ? 0 : (mouse.y + $("div.jqZoomPup").height() / 2 > imageHeight + imageTop) ? (imageHeight - $("div.jqZoomPup").height() - 2) : ypos;
					}
					if (settings.lens) {
						$("div.jqZoomPup").css({
							top: ypos,
							left: xpos
						});
					}
					scrolly = ypos;
					$("div.zoomdiv").get(0).scrollTop = scrolly * scaley; //设置 div.zoomdiv 元素中滚动条的垂直偏移
					scrollx = xpos;
					$("div.zoomdiv").get(0).scrollLeft = (scrollx) * scalex;
				});
 
			},
 
			//离开后
			function () {
 
				$(this).children("img").attr("alt", noalt);
				$(document.body).unbind("mousemove");
				if (settings.lens) {
					$("div.jqZoomPup").remove();
				}
				$("div.zoomdiv").remove();
			});
			count = 0;
			if (settings.preload) {
				// $('body').append("<div style='display:none;' class='jqPreload" + count + "'>sdsdssdsd</div>");
				$(this).each(function () {
					var imagetopreload = $(this).children("img").attr("jqimg");
					var content = jQuery('div.jqPreload' + count + '').html();
					jQuery('div.jqPreload' + count + '').html(content + '<img src="' + imagetopreload + '">');
				});
			}
			function MouseEvent(e) {
				this.x = e.pageX; //e.pageX：鼠标相对于文档X方向的距离( ie678 不支持)
				this.y = e.pageY; //e.pageY：鼠标相对于文档X方向的距离( ie678 不支持)
	    	}
	    }
	})
})

