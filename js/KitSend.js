function getNextField($form){
	var j = 1;
	while( $form.find("input[name="+j+"]").length ){
		j++;
	}
	return j;
}

function fancyOpen(el){
    $.fancybox(el,{
    	padding:0,
    	fitToView: false,
        scrolling: 'no',
        tpl: {
			closeBtn : '<a title="Закрыть" class="popup-close icon-close" href="javascript:;"></a>'
		},
        beforeShow: function(){
			$(".fancybox-wrap").addClass("beforeShow");
		},
		afterShow: function(){
			$(".fancybox-wrap").removeClass("beforeShow");
			$(".fancybox-wrap").addClass("afterShow");
			if( !device.mobile() ){
				setTimeout(function(){
	                $('.fancybox-wrap').css({
	                    'position':'absolute'
	                });
	                $('.fancybox-inner').css('height','auto');
	            },200);
			}
            el.find("input[type='text'],input[type='number'],textarea").eq(0).focus();
		},
		beforeClose: function(){
			$(".fancybox-wrap").removeClass("afterShow");
			$(".fancybox-wrap").addClass("beforeClose");
		},
		afterClose: function(){
			$(".fancybox-wrap").removeClass("beforeClose");
			$(".fancybox-wrap").addClass("afterClose");
		}
    }); 
    if( !device.mobile() ){
    	$('html').addClass('fancybox-lock'); 
    	$('.fancybox-overlay').html($('.fancybox-wrap')); 
    }
    return false;
}

function bindFancy(){
	$(".fancy").each(function(){
		var $popup = $($(this).attr("data-block")),
			$this = $(this);
		$this.fancybox({
			padding : 0,
			content : $popup,
			fitToView: false,
			scrolling: 'no',
			tpl: {
				closeBtn : '<a title="Закрыть" class="popup-close icon-close" href="javascript:;"></a>'
			},
			beforeShow: function(){
				$(".fancybox-wrap").addClass("beforeShow");
				$popup.find(".custom-field").remove();
				if( $this.attr("data-value") ){
					var name = getNextField($popup.find("form"));
					$popup.find("form").append("<input type='hidden' class='custom-field' name='"+name+"' value='"+$this.attr("data-value")+"'/><input type='hidden' class='custom-field' name='"+name+"-name' value='"+$this.attr("data-name")+"'/>");
				}
				$popup.find("label.error").remove();
				$popup.find(".error").removeClass("error");
				if( $this.attr("data-beforeShow") && customHandlers[$this.attr("data-beforeShow")] ){
					customHandlers[$this.attr("data-beforeShow")]($this);
				}
			},
			afterShow: function(){
				$(".fancybox-wrap").removeClass("beforeShow");
				$(".fancybox-wrap").addClass("afterShow");
				if( $this.attr("data-afterShow") && customHandlers[$this.attr("data-afterShow")] ){
					customHandlers[$this.attr("data-afterShow")]($this);
				}
				$popup.find("input[type='text'],input[type='tel'],input[type='email'],input[type='number'],textarea").eq(0).focus();
			},
			beforeClose: function(){
				$(".fancybox-wrap").removeClass("afterShow");
				$(".fancybox-wrap").addClass("beforeClose");
				if( $this.attr("data-beforeClose") && customHandlers[$this.attr("data-beforeClose")] ){
					customHandlers[$this.attr("data-beforeClose")]($this);
				}
			},
			afterClose: function(){
				$(".fancybox-wrap").removeClass("beforeClose");
				$(".fancybox-wrap").addClass("afterClose");
				if( $this.attr("data-afterClose") && customHandlers[$this.attr("data-afterClose")] ){
					customHandlers[$this.attr("data-afterClose")]($this);
				}
			}
		});
		$this.removeClass("fancy");
	});
}

var customHandlers = [];

$(document).ready(function(){	
	var rePhone = /^\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
		tePhone = '+7 (999) 999-99-99';

	$.validator.addMethod('customPhone', function (value) {
		return rePhone.test(value);
	});

	$(".ajax").parents("form").each(function(){
		$(this).validate({
			rules: {
				email: 'email',
				phone: 'customPhone'
			}
		});
		if( $(this).find("input[name=phone]").length ){
			$(this).find("input[name=phone]").mask(tePhone,{placeholder:"_"});
		}
	});

	function whenScroll(){
		var scroll = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		if( customHandlers["onScroll"] ){
			customHandlers["onScroll"](scroll);
		}
	}
	$(window).scroll(whenScroll);
	whenScroll();

	bindFancy();

	$(".b-go").click(function(){
		var block = $( $(this).attr("data-block") ),
			off = $(this).attr("data-offset")||0;
		$("body, html").animate({
			scrollTop : block.offset().top-off
		},800);
		return false;
	});

	$(".fancy-img").each(function(){
		var href = $(this).attr("data-href");
		$(".fancy-img").fancybox({
			padding : 0,
			href : href,
			margin: [20, 60, 20, 60],
			tpl: {
			closeBtn : '<a title="Закрыть" class="popup-close icon-close close-gallery" href="javascript:;"></a>',
			next     : '<a title="Вперед" class="fancybox-nav fancybox-next" href="javascript:;"><span class="icon-arrow-right"></span></a>',
			prev     : '<a title="Назад" class="fancybox-nav fancybox-prev" href="javascript:;"><span class="icon-arrow-left"></span></a>'
			},
			beforeShow: function(){
				$(".fancybox-wrap").addClass("beforeShow");
			},
			afterShow: function(){
				$(".fancybox-wrap").removeClass("beforeShow");
				$(".fancybox-wrap").addClass("afterShow");
			},
			beforeClose: function(){
				$(".fancybox-wrap").removeClass("afterShow");
				$(".fancybox-wrap").addClass("beforeClose");
			},
			afterClose: function(){
				$(".fancybox-wrap").removeClass("beforeClose");
				$(".fancybox-wrap").addClass("afterClose");
			},
			nextEffect: "fade",
			prevEffect: "fade"
		});
	});
	$(".fancy-ajax").fancybox({
		padding : 0,
		type: 'ajax',
		fitToView: false,
		scrolling: 'no',
		tpl: {
			closeBtn : '<a title="Закрыть" class="popup-close icon-close" href="javascript:;"></a>'
		},
		beforeShow: function(){
			$(".fancybox-wrap").addClass("beforeShow");
			$('html').addClass('fancybox-lock'); 
		},
		afterShow: function(){
			$(".fancybox-wrap").removeClass("beforeShow");
			$(".fancybox-wrap").addClass("afterShow");
		},
		beforeClose: function(){
			$('html').removeClass('fancybox-lock'); 
			$(".fancybox-wrap").removeClass("afterShow");
			$(".fancybox-wrap").addClass("beforeClose");
		},
		afterClose: function(){
			$(".fancybox-wrap").removeClass("beforeClose");
			$(".fancybox-wrap").addClass("afterClose");
		}
	});

	$(".ajax").parents("form").submit(function(){
  		if( $(this).find("input.error,select.error,textarea.error").length == 0 ){
  			var $this = $(this),
  				$thanks = $($this.attr("data-block"));

  			$this.find(".ajax").attr("onclick", "return false;");

  			if( $this.attr("data-beforeAjax") && customHandlers[$this.attr("data-beforeAjax")] ){
				customHandlers[$this.attr("data-beforeAjax")]($this);
			}

  			$.ajax({
			  	type: $(this).attr("method"),
			  	url: $(this).attr("action"),
			  	data:  $this.serialize(),
				success: function(msg){
					var $form;
					if( msg == "1" ){
						$form = $thanks;
					}else{
						$form = $("#b-popup-error");
					}

					if( $this.attr("data-afterAjax") && customHandlers[$this.attr("data-afterAjax")] ){
						customHandlers[$this.attr("data-afterAjax")]($this);
					}

					$this.find("input[type=text],input[type='tel'],input[type='email'],textarea").val("");
					fancyOpen($form);
				},
				error: function(){
					fancyOpen($("#b-popup-error"));	
					$this.find("input[type=text],input[type='tel'],input[type='email'],textarea").val("");
				},
				complete: function(){
					$this.find(".ajax").removeAttr("onclick");
				}
			});
  		}else{
  			$(this).find("input.error,select.error,textarea.error").eq(0).focus();
  		}
  		return false;
  	});
});