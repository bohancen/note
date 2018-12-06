
if(window.CanvasRenderingContext2D){ CanvasRenderingContext2D.prototype.sector = function (x, y, radius, sDeg, eDeg) {
// 初始保存
this.save();
// 位移到目标点
this.translate(x, y);
this.beginPath();
// 画出圆弧
this.arc(0,0,radius,sDeg, eDeg);
// 再次保存以备旋转
this.save();
// 旋转至起始角度
this.rotate(eDeg);
// 移动到终点，准备连接终点与圆心
this.moveTo(radius,0);
// 连接到圆心
this.lineTo(0,0);
// 还原
this.restore();
// 旋转至起点角度
this.rotate(sDeg);
// 从圆心连接到起点
this.lineTo(radius,0);
this.closePath();
// 还原到最初保存的状态
this.restore();
return this;
}
}
var animateLib='.animated{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.animated200{-webkit-animation-duration:0.2s;animation-duration:0.2s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.animated500{-webkit-animation-duration:0.5s;animation-duration:0.5s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.animated1000{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.animated1500{-webkit-animation-duration:1.5s;animation-duration:1.5s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.animated2000{-webkit-animation-duration:2s;animation-duration:2s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.animated.infinite{-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.animated.hinge{-webkit-animation-duration:2s;animation-duration:2s}.animated.bounceIn,.animated.bounceOut{-webkit-animation-duration:.75s;animation-duration:.75s}.animated.flipOutX,.animated.flipOutY{-webkit-animation-duration:.75s;animation-duration:.75s}@-webkit-keyframes fadeInDown{0%{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}100%{opacity:1;-webkit-transform:none;transform:none}}.fadeInDown{-webkit-animation-name:fadeInDown;animation-name:fadeInDown}@-webkit-keyframes bounce{0%,20%,53%,80%,100%{-webkit-animation-timing-function:cubic-bezier(0.215,0.610,0.355,1.000);animation-timing-function:cubic-bezier(0.215,0.610,0.355,1.000);-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}40%,43%{-webkit-animation-timing-function:cubic-bezier(0.755,0.050,0.855,0.060);animation-timing-function:cubic-bezier(0.755,0.050,0.855,0.060);-webkit-transform:translate3d(0,-30px,0);transform:translate3d(0,-30px,0)}70%{-webkit-animation-timing-function:cubic-bezier(0.755,0.050,0.855,0.060);animation-timing-function:cubic-bezier(0.755,0.050,0.855,0.060);-webkit-transform:translate3d(0,-15px,0);transform:translate3d(0,-15px,0)}90%{-webkit-transform:translate3d(0,-4px,0);transform:translate3d(0,-4px,0)}}.bounce{-webkit-animation-name:bounce;animation-name:bounce;-webkit-transform-origin:center bottom;transform-origin:center bottom}@-webkit-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}.fadeIn{-webkit-animation-name:fadeIn;animation-name:fadeIn}@-webkit-keyframes bounceInDown{0%,60%,75%,90%,100%{-webkit-animation-timing-function:cubic-bezier(0.215,0.610,0.355,1.000);animation-timing-function:cubic-bezier(0.215,0.610,0.355,1.000)}0%{opacity:0;-webkit-transform:translate3d(0,-3000px,0);transform:translate3d(0,-3000px,0)}60%{opacity:1;-webkit-transform:translate3d(0,25px,0);transform:translate3d(0,25px,0)}75%{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}90%{-webkit-transform:translate3d(0,5px,0);transform:translate3d(0,5px,0)}100%{-webkit-transform:none;transform:none}}.bounceInDown{-webkit-animation-name:bounceInDown;animation-name:bounceInDown}@-webkit-keyframes slideInLeft{0%{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0);visibility:visible}100%{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.slideInLeft{-webkit-animation-name:slideInLeft;animation-name:slideInLeft}@-webkit-keyframes bounceInUp{0%,60%,75%,90%,100%{-webkit-animation-timing-function:cubic-bezier(0.215,0.610,0.355,1.000);animation-timing-function:cubic-bezier(0.215,0.610,0.355,1.000)}0%{opacity:0;-webkit-transform:translate3d(0,3000px,0);transform:translate3d(0,3000px,0)}60%{opacity:1;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}75%{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}90%{-webkit-transform:translate3d(0,-5px,0);transform:translate3d(0,-5px,0)}100%{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.bounceInUp{-webkit-animation-name:bounceInUp;animation-name:bounceInUp}';
$.prototype.extend({
	txtcounter:function(max,fn){
		var obj=$(this);
		var t=null;
		obj.focus(function(){
			t=setInterval(function(){
				var val=obj.val()
				var len=val.length;
				if(len>max){
					obj.val(val.substring(0,max));
				}
				fn && fn(max-len<0 ? 0 : max-len)
			},500)
		}).blur(function(){
			clearInterval(t);
		})
	},
	cavup: function(option, fn) {
		var obj = $(this);
		if ( typeof(FileReader) === 'undefined' ){
			obj.append('抱歉，请使用现代浏览器上传图片！');
			//alert('抱歉，请使用现代浏览器上传图片！');
			return;
		}
		var cavWidth = option.width;
		var cavHerght = option.height;
		var uploadurl=option.uploadurl;
		var postdata=option.data;

		var n = 0.02;
		var can = $('<canvas width="' + cavWidth + '" height="' + cavHerght + '"></canvas>');
		var file = $('<input type="file" class="file">');
		var save = $('<input type="button" class="btn disabled" value="上传" disabled="disabled">');
		var clear = $('<input type="button" value="清除">');
		//obj.append(can, file, save,clear);
		obj.append(can, file, save);

		var stage = new createjs.Stage(can.get(0));
		createjs.Touch.enable(stage);

		clear.click(function(){
			//stage.clear();
			stage.removeAllChildren ()
			stage.update();
		});

		save.click(function(){
			save.attr("disabled","disabled").val('上传中..').addClass('disabled');
			var picurl = can.get(0).toDataURL("image/jpeg");
			var formdata = new FormData();
			for(var i in postdata)
			{
				formdata.append(i, postdata[i]);
			}
			formdata.append('pic', encodeURIComponent(picurl));
			var oAjax = new XMLHttpRequest();
			oAjax.open('POST', uploadurl);
			oAjax.withCredentials=true;
			oAjax.upload.addEventListener('progress', function (){}, false);
			//oAjax.upload.addEventListener('load', function (){}, false);
			//oAjax.upload.addEventListener('error', function (){}, false);
			//oAjax.upload.addEventListener('abort',function (){}, false);

			//oAjax.setRequestHeader("Content-Type","multipart/form-data; charset=UTF-8")
			//oAjax.setRequestHeader("Content-Type","multipart/form-data; charset=UTF-8")
			//oAjax.setRequestHeader("X-Requested-With","XMLHttpRequest")
			oAjax.send(formdata);//注意url编码
			oAjax.onreadystatechange=function(d){
				if(oAjax.readyState==4){
					if(oAjax.status==200){
						save.removeAttr('disabled').removeClass('disabled').val('上传');
						fn(oAjax.responseText);
					}
				}
			};
		})
		file.change(function(event) {
			//console.log(this.files[0]);
			var file = this.files[0];
			if (!/image\/\w+/.test(file.type)) {
				alert("不是图片");
				return false;
			}
			var reader = new FileReader();
			reader.readAsDataURL(file);
			//console.log(reader);
			reader.onload = function(e) {
				save.removeAttr('disabled').removeClass('disabled')
				image = new Image();
				image.src = this.result;
				image.onload = function() {
					var img = new createjs.Bitmap(this);
					stage.removeAllChildren();
					stage.addChild(img);
					var w = this.width;
					var h = this.height;
					var s = 1;
					//初始化
					img.x = (cavWidth - w) / 2;
					img.y = (cavHerght - h) / 2;
					stage.update();
					save.show();
					can.unbind();
					can.on('mousewheel',function(e){
						e.preventDefault();
						//var obj = e;
						//if (e.wheelDelta > 0) { //up
						if (e.originalEvent.wheelDelta > 0) { //up
							s = s + n > 10 ? s : s + n
							img.x = img.x + (w * (s - n) - w * s) / 2
							img.y = img.y + (h * (s - n) - h * s) / 2
						}
						if (e.originalEvent.wheelDelta < 0) { //down
							//s=s-n<0?s:s-n
							s = s - n
							img.x = img.x + (w * (s + n) - w * s) / 2
							img.y = img.y + (h * (s + n) - h * s) / 2
						}
						img.scaleX = s
						img.scaleY = s
						stage.update();
					});
					can.on('DOMMouseScroll',function(e){
						e.preventDefault();
						//console.log(e);
						//var obj = e;
						//if (e.wheelDelta > 0) { //up
						if (e.originalEvent.detail > 0) { //up
							s = s + n > 10 ? s : s + n
							img.x = img.x + (w * (s - n) - w * s) / 2
							img.y = img.y + (h * (s - n) - h * s) / 2
						}
						if (e.originalEvent.detail < 0) { //down
							//s=s-n<0?s:s-n
							s = s - n
							img.x = img.x + (w * (s + n) - w * s) / 2
							img.y = img.y + (h * (s + n) - h * s) / 2
						}
						img.scaleX = s
						img.scaleY = s
						stage.update();
					});
					img.addEventListener("mousedown", function(e) {
						//鼠标点在图片位置
						var px = e.stageX - img.x
						var py = e.stageY - img.y
							//stage.update();
						img.addEventListener("pressmove", function(e) {
							img.x = e.stageX - px
							img.y = e.stageY - py
							stage.update();
						});
					});
				}
			}
		});
	}
});


$(function(){
	//$('html,body').scrollTop(0);
	var AN=function(s){
		var k=['-moz-','-webkit-','-ms-','-o-'],y=s.replace(/(-webkit-)/g,'');
		for(i in k){
			y+='\n\/* ###'+k[i]+'专用### *\/\n';
			y+=s.replace(/(-webkit-)/g,k[i]);
		}
		return y+'\n';
	}
	$('head').append('<style type="text/css">'+AN(animateLib)+'</style>');

	jQuery('.scrollA').each(function() {
		var a = jQuery(this),
			b = a.find('.scrollA'),
			c = a.find('.scrollC'),
			d = a.find('.scrollD'),
			e = a.find('.scrollE'),
			l = a.find('.scrollL'),
			r = a.find('.scrollR'),
			g = a.find('.txt').addClass('bounceInDown animated'),
			h = a.find('.scrollF'),
			v = 5000,
			s = Math.ceil(d.size() / 1),
			i = 0,
			t = null,
			ct = null;
			d.each(function(){e.append('<span><canvas width="16" height="16"></canvas></span>')});
			var f = e.find('span')
			can=e.find('canvas'),
			fna = function() {
				var st=v/20;
				c.stop().animate({
					'left': (-100 * i) + '%'
				}, 500),
				f.removeClass('cur').eq(i).addClass('cur'),h.html(g.eq(i))
				if($.browser.msie && $.browser.version<9){
					f.removeClass('iecur').eq(i).addClass('iecur'),h.html(g.eq(i))
					return
				}
				if(arguments.length>0) return fnc(v/20);
				clearInterval(ct);
				ct=setInterval(function(){
					if(st<1) return
					st--;
					fnc(st)
				},20)
				;
			},
			fnb = function() {
				t = setInterval(function() {
					i = i++ >= s - 1 ? 0 : i++;
					fna()
				}, v)
			},fnc=function(intervalIndex){
					var ctx=can.eq(i).get(0).getContext('2d')
					ctx.clearRect(0,0,16,16);
					ctx.fillStyle="#cccccc";;
					ctx.sector(8,8,8,-Math.PI * 0.5,Math.PI * 2/v*20*intervalIndex-Math.PI * 0.5).fill();
			};
		f.hover(function(){
			i= f.index(this);
			fna(1)
		},function(){}),
		r.click(function() {
			i = i++ >= s - 1 ? 0 : i++;
			fna(1)
		}).bind('selectstart', function() {
			return !1;
		}),
		l.click(function() {
			i = i-- <= 0 ? s - 1 : i--;
			fna(1)
		}).bind('selectstart', function() {
			return !1;
		}),a.hover(function(){
			clearInterval(t);
			clearInterval(ct);
		},function(){
			fnb();
			fna()
		}),fna()
		,fnb()
		;
	});
	jQuery('.scrollBox').each(function() {
		var a = jQuery(this),
			b = a.find('.scrollA'),
			c = a.find('.scrollInner'),
			d = a.find('.scrollBlock'),
			e = a.find('.scrollTabs'),
			l = a.find('.scrollTabLeft'),
			r = a.find('.scrollTabRight'),
			//g = a.find('.txt').addClass('bounceInDown animated'),
			g = a.find('.txt'),
			s = Math.ceil(d.size() / 1),
			i = 0,
			t = null;
			d.each(function(){e.append('<span class="scrollTab"></span>')});
			e.css('width',16*s+'px')
			var f = e.find('.scrollTab'),
			fna = function() {
				c.stop().animate({
					'left': (-100 * i) + '%'
				}, 500),f.removeClass('cur').eq(i).addClass('cur')
				d.eq(i).find('.txt').hide().show(1)
			},
			fnb = function() {
				t = setInterval(function() {
					i = i++ >= s - 1 ? 0 : i++;
					fna()
				}, 5000)
			};
		r.click(function() {
			i = i++ >= s - 1 ? 0 : i++;
			fna()
		}).bind('selectstart', function() {
			return !1;
		})
		l.click(function() {
			i = i-- <= 0 ? s - 1 : i--;
			fna()
		}).bind('selectstart', function() {
			return !1;
		}),a.hover(function(){
			clearInterval(t);
		},function(){
			fnb();
		}),fna(),fnb();
	});
	//$(document).on('mouseenter','.block02 .img',function(){
	//	$(this).find('.imghide').addClass('fadeIn animated').show()
	//}).on('mouseleave','.block02 .img',function(){
	//	$(this).find('.imghide').addClass('fadeIn animated').hide()
	//})
	$('.block02 .img,.block16 .img').live('mouseenter',function(){
		$(this).find('.imghide').addClass('fadeIn animated').show()
	}).live('mouseleave',function(){
		$(this).find('.imghide').addClass('fadeIn animated').hide()
	})
	// $('.block02 .img').each(function(){
	// 	var o=$(this),
	// 	h=o.find('.imghide').addClass('fadeIn animated')
	// 	//p=h.find('.posi').addClass('bounceInDown animated')
	// 	o.hover(function(){
	// 		h.show()
	// 	},function(){
	// 		h.hide()
	// 	})
	// });
	$('[data-menu]').each(function(){
		var h=$(this).find('.hideLi').addClass('fadeInDown animated200');
		$(this).hover(function(){
			h.show()
		},function(){
			h.hide()
		})
	});
	$('.clickTabBox').each(function(){
		var t=$(this).find('.clickTab')
		var c=$(this).find('.clickBlock').addClass('slideInLeft animated500')
		t.click(function(){
			var i=t.index(this);
			t.removeClass('cur').eq(i).addClass('cur')
			c.hide().eq(i).show();
		}).eq(0).click()
	});
	$('.shareBox a').each(function(){
		var k=$(this).attr('class');
		var t=document.title;
		var u=location.href;
		k=='a01' && $(this).attr('href','http://v.t.sina.com.cn/share/share.php?appkey=3938048249&title='+t+'&url='+u);
		k=='a02' && $(this).attr('href','http://v.t.qq.com/share/share.php?title='+t+'&url='+u+'&appkey=8b5c8745ea364613adfda05c616d9abe');
		k=='a03' && $(this).attr('href','http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+u);
		k=='a04' && $(this).click(function(){alert('0');return false});
	});
	$('.hideBtns').each(function(){
		var btn=$(this).find('.btn')
		var bul=$(this).find('.bul')
		$(this).hover(function(){
			bul.show()
		},function(){
			bul.hide()
		});
	});
	// (function(){
	// 	var $container = $('#masonry');
	// 	$container.imagesLoaded( function(){
	// 		$container.masonry({
	// 			itemSelector : '.li',
	// 			gutterWidth : 16,
	// 			gutterHeight : 16,
	// 			isAnimated: !1,
	// 		});
	// 	});
	// 	$('.block11 .addMore').click(function(){
	// 		function createEle(){
	// 			var str='<li class="li"><div class="tit"><h2><a href="">多元化音乐游戏</a></h2></div><div class="oth"><span class="d">2015-08-31</span><span class="a">不变身怎么低</span></div><div class="dig">风暴英雄新英雄阿塔尼斯</div><div class="img"><a href=""><img src="http://img.nga.178.com/attachments/mon_201510/23/-5363500_5629cfa44bf2b.jpg" alt=""><span class="mask"></span></a><span class="size">16P</span></div><div class="oth"><span class="f">NBA</span></div></li><li class="li"><div class="tit"><h2>多元化音乐游戏</h2></div><div class="oth"><span class="d">2015-08-31</span><span class="a">不变身怎么低</span><span class="f">守望先锋</span></div><div class="dig">风暴英雄新英雄阿塔尼斯</div><div class="img"><a href=""><img src="http://img.nga.178.com/attachments/mon_201510/23/-5363500_5629cf600fe05.jpg" alt=""><span class="mask"></span></a><span class="size">16P</span></div><div class="oth"><span class="f">NBA</span></div></li>';
	// 			for(var i=0;i<3;i++){str+=str}
	// 			return $(str);
	// 		}
	// 		var newElems=createEle().addClass('bounceInUp animated').hide();
	// 		$container.append(newElems).imagesLoaded(function(){
	// 			alert('加载完成')
	// 			newElems.show();
	// 			$container.masonry('appended', newElems);
	// 		})
	// 	})
	// })();
	(function(){
		// var locked="no",
		// 	obj=$('[loadEven]'),
		// 	geturl=window.location.href,
		// 	moreTxt=$('.addMore'),
		// 	locadName=obj.attr('data-loadname');
		// 	index=1;
		// 	if(obj.size()<=0) return;
		// var $container = $('[data-loadname=masonry]').eq(0);
		// $container.imagesLoaded( function(){
		// 	$(this).find('.li').show()
		// 	$container.masonry({
		// 		itemSelector : '.li',
		// 		gutterWidth : 16,
		// 		gutterHeight : 16,
		// 		isAnimated: !1
		// 	});
		// });
		$(window).scroll(function(){
			function suburl(){
				/*
				if(geturl.substring(geturl.length-1,geturl.length)=='/'){
					geturl+='index.html';
				}
				var j=geturl.indexOf('.html');
				return geturl.substring(0,j)+'_'+index+'.html';
				*/
				var page = moreTxt.attr('data-page');
				var action = moreTxt.attr('data-action');
				var uid = moreTxt.attr('data-uid');
				var key = moreTxt.attr('data-key');
				var url = '/column.php?action='+action+'&page='+page;
				if(uid)
				{
					url += '&uid='+uid;
				}
				if(key)
				{
					url += '&key='+key;
				}
				return url;
			}

			function appends(s){
				//var str=$('<div style="display:none;" class="bounceInUp animated temp-'+index+'">'+s+'</div>');
				//str.fadeIn();
				var s=$(s).addClass('bounceInUp animated');
				obj.append(s);
				moreTxt.hide()
				locked="no";
			}
			function appendsMasonry(s){
				var s=$(s).addClass('bounceInUp animated');
				$container.append(s).imagesLoaded(function(){
					$container.masonry('appended', s);
					moreTxt.hide()
					locked="no";
				});
			}
			if(($(this).scrollTop()+$(window).height()) >= $(document.body).outerHeight(true)-10 && locked=="no"){
				index++;
				locked="yes";
				var urls=suburl();
				moreTxt.show();
				$.ajax({
					type : 'GET',
					url : urls,
					dataType: 'json',
					success : function (response, status, xhr) {
						if(response.data.rows.length)
						{
							setTimeout(function(){
								if(locadName=='masonry'){

									appendsMasonry(response.data.rows);
									return;
								}
								appends(response.data.rows);
								var page = moreTxt.attr('data-page');
								moreTxt.attr('data-page', parseInt(page)+1);

							},500);
						}
						else
						{
							$('.addMore').hide();
						}
					},
					error : function(){
						moreTxt.hide()
					}
				});
			}
		})
	})();
	$('[clearText]').each(function(){
		var loadval=$(this).val();
		$(this).focus(function(){
			if($(this).val()==loadval){
				$(this).val('')
			}
		})
		$(this).blur(function(){
			if($(this).val()==''){
				$(this).val(loadval)
			}
		})
	});
	$('[editedInfor]').click(function(){
		var obj=$(this)
		var now=obj.attr('editedInfor');
		if(now=='edit'){

			var labels = '';
			var tags=$(".infor03 .tag");
			tags.each(function(){
				labels += $(this).text()+'|%';
			})
			var summary = $('.infor04 textarea').val();
			$.ajax({
				type: 'post',
				url: '/column.php?action=update_profile',
				data: {labels:labels, summary:summary},
				dataType: 'json',
				success: function(json) {
					if(json.code == 0)
					{
						$('[photoChange]').hide();
						obj.attr('editedInfor','');
						obj.text("编辑资料");
						$('.authorSection .infor04').removeClass('edit')
						$('.authorSection .infor03').removeClass('edit')
						//$('.authorSection .infor05').removeClass('edit')
						$('.authorSection .infor04 textarea').attr('disabled',true)
						//$('.authorSection .infor05 .nam input').attr('disabled',true)
					}
				},
				error: function(json) {
					alert("更新时出现错误");
				}
			});
		}else{
			$('[photoChange]').show();
			obj.attr('editedInfor','edit');
			$('.authorSection .infor04').addClass('edit')
			$('.authorSection .infor03').addClass('edit')
			//$('.authorSection .infor05').addClass('edit')
			$('.authorSection .infor04 textarea').attr('disabled',false)
			//$('.authorSection .infor05 .nam input').attr('disabled',false)

			obj.text("保存")
		}
		return false;
	});
	$('[photoChange]').click(function(){
		$('.photoPage').show().css('height',$('body').outerHeight())
	});
	$('.photoPage .close').click(function(){
		$('.photoPage').hide();
		// $('.photoPage').find('[uploudImg]').imgAreaSelect({
		// 	remove: true
		// });
	})
	$('.tag .remove').live('click',function(){
		$(this).parent().remove();
	});
	$('#textareanum').txtcounter(90,function(n){
		$('#textareanumhas').text(n)
	});
	$('#textareanum2').txtcounter(100,function(n){
		//$('#textareanumhas').text(n)
	});
	$('[editag]').live('keydown',function(evt){
		evt = evt ? evt: event;
		var val=$(this).val();
		var maxSize=3;//最多添加tag

		if(evt.keyCode==32){
			var tags=$(this).parent().find('.tag');
			console.log(tags);
			if(val=='') return false;
			var has=0;
			if(tags.size()>=maxSize){
				$.dialog({content:'最多可以添加'+maxSize+'个'});
				return false;
			}
			tags.each(function(){
				if($(this).text()==val){
					has=1
					$.dialog({content:'重复添加'});
					return false;
				}
			});

			if(has) return false;
			$(this).before('<span class="tag">'+val+'<em class="remove"></em></span>');
			$(this).val('')
			return false;
		}
	});
	$('[uploadBox]').each(function(){
		var uploudFile=$(this).find('[uploudFile]');
		var uploudPr=$(this).find('[uploudPr]');
		var upXYWH=$(this).find('[upXYWH]');
		upXYWH.html('')
		uploudFile.change(function() {
			var $file = $(this);
			var fileObj = $file[0];
			var windowURL = window.URL || window.webkitURL;
			var dataURL;
			uploudPr.find('[uploudImg]').imgAreaSelect({
				remove: true
			});
			var $img = $("<img uploudImg />");
			//alert(windowURL.createObjectURL(fileObj.files[0]))
			if (fileObj && fileObj.files && fileObj.files[0]) {
				dataURL = windowURL.createObjectURL(fileObj.files[0]);
				$img.attr('src', dataURL);
			} else {
				dataURL = $file.val();
				//alert(dataURL)
				var imgObj = document.getElementById("preview");
				$img.attr('src', dataURL);
			}
			uploudPr.html('').append($img);
		    $img.imgAreaSelect({
		        handles: true,
		        onSelectEnd: function(img, sel){
		        	upXYWH.html('x:'+sel.x1+'y:'+sel.y1+'宽:'+sel.width+'高'+sel.height);
		        }
		    });
		});
	});
	;(function(){
		var floatSidebar=$('<div class="floatSidebar"></div>').css('position','fixed').addClass('bounceInDown animated');
		$('body').append(floatSidebar);
		var floatSidebarChild=$('[data-floatSidebar]');
		if(floatSidebarChild.size()<=0) return;
		var top=floatSidebarChild.eq(0).offset().top;
		var barWidth=272;
		var wrapWidth=1088;
		floatSidebar.append(floatSidebarChild.clone());
		$(window).resize(function(){
			var clientWidth=document.documentElement.clientWidth < wrapWidth ? wrapWidth : document.documentElement.clientWidth;
			floatSidebar.css({'left':(clientWidth-wrapWidth)/2+wrapWidth-barWidth});
		}).resize();
		$(window).scroll(function(){
			var scrollTop=$(window).scrollTop();
			if(scrollTop>top){
				floatSidebarChild.hide()
				//floatSidebar.show().stop().animate({'top':scrollTop+10});
				floatSidebar.show().css('top','10px')
			}else{
				floatSidebar.hide()
				floatSidebarChild.show()
			}
		});
	})();
})

var AVATAR_DEFAULT_PRE = 'http://img4.nga.178.com/ngabbs/face';

function nga_avatar(a)
{
	var url = '';
	alert(a.constructor);
	if(a.constructor==Object)
	{
		if (a.t==1 || !a.t)//随机
		{
			i=Math.floor(Math.random()*a.l)
		}
		else if (a.t==2 && window.date)
		{//时段
			i = (date.getHours()+8)/24
			if (i>=1) i = i-1
			i = Math.floor(i*a.l)
		}

		if(a[i].constructor==Object)
		{
			y = new String(a[i][0])
			y.cX = a[i].cX
			y.cY = a[i].cY
			y.id = i
		}
		else
		{
			y = new String(a[i])
			y.id = i
		}

		if(y.substr(0,7)!='http://')
		{
			y= AVATAR_DEFAULT_PRE+'/'+y
		}
		url = y;
	}
	else
	{
		if(a.substr(0,1)=='{' || a.indexOf('|')!=-1)
			return url;

		if(a.substr(0,8)=='/*$js$*/')
		{
			eval('url='+a)
		}
		else
		{
			url = a.substr(0,7)!='http://' ? AVATAR_DEFAULT_PRE+'/'+a : a
		}
	}
	return url;
}