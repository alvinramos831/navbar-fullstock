$(function(){


	var backdrop = {
		show: function(el) {
			if(!el) el = 'body';
			$(el).prepend($("<div/>", {
				class: "backdrop"
			}));
			$(".backdrop").fadeIn();
		},
		hide: function() {
			$(".backdrop").fadeOut(function() {
				$(".backdrop").remove();
			});
		},
		click: function(clicked) {
			$(document).on("click", ".backdrop", function() {
				clicked.call(this);
				return false;
			});
		}
	}

  // browser
	if($.browser.safari) {
		$("head").append($("<link/>", {
			rel: "stylesheet",
			href: "css/safari.css"
		}));
	}else if($.browser.mozilla) {
		$(".social li").each(function() {
			$(this).find("rect").attr("width", "100%");
			$(this).find("rect").attr("height", "100%");
		});
	}

	

	var verticalSlider = function () {
		$(".vertical-slider").each(function(ii){
			var $this = $(this), 
					$item = $this.find($this.data("item")),
					$item_height = 0,
					$item_max = $this.data("max"),
					$nav = $($this.data("nav"));

			$this.attr("data-current", 1);

			$item.each(function(i){
				i++;
				$(this).attr("data-list", i);
				if(i > $item_max) {
					return;
				}
				$item_height += ($(this).outerHeight() + 15);
			});

			$this.css({
				overflow: 'hidden'
			});
			$item.wrapAll($("<div/>", {
				style: 'height:'+$item_height+'px;',
				id: 'vs_inner_'+ii
			}))

			

			$nav.find(".prev").click(function(){
				vs_prev();
			});
			$nav.find(".next").click(function(){
				vs_next();
			});
			setInterval(function(){
				vs_next();
			},10000);
		});		
	}

	
	// ease scroll
	var easeScrollFunc = function() {
		$("html").easeScroll();
	}

	var toggleMobile = function() {
		$(document).on("click", "[data-toggle=menu]", function() {
			var $this = $(this),
					$target = $($this.data("target"));

			backdrop.click(function() {
				$(".nav-list").removeClass("active");
				$(".nav-list .dropdown-menu").removeClass("active");
				$(".nav-title a").text("Menu");
				$(".nav-title .back").remove();
				$("body").css({
					overflow: "auto"
				});
				backdrop.hide();
			});

			$("body").css({
				overflow: "hidden"
			});
			backdrop.show('#menu-list');
			setTimeout(function() {
				$target.find('.nav-list').addClass("active");
			},50);
			return false;
		});

		$(document).on("click", ".nav-list li.vin-dropdown > a", function() {
			var $this = $(this),
					$parent = $this.parent(),
					$titleBefore = $this.text(),
					$back = '<div class="back"><i class="ion-ios-arrow-left"></i></div>';

			if($(".nav-title .back").length) {
				var titleNow = $(".nav-title .back").attr('data-title');
				titleNow += ("," + $this.text());
				$(".nav-title .back").attr('data-title', titleNow);
			}else{
				$(".nav-title").prepend($($back).attr('data-title', $(".nav-title a").text() + "," + $this.text()));
			}
			$(".nav-title a").html($this.text());
			$parent.find("> .dropdown-menu").fadeIn(100).addClass("active");
			return false;
		});

		var titleLen = 0;
		$(document).on("click", ".nav-title .back", function() {
			var $dd = $(".dropdown-menu.active"),
					$len = $dd.length,
					title;

			$dd.eq($len-1).removeClass("active");
			setTimeout(function() {
				$dd.eq($len-1).hide();
			},500);
			title = $(this).attr('data-title').split(",");
			titleLen = title.length-1;
			title = title.splice(0, titleLen);
			$(".nav-title a").text(title[title.length-1]);
			$(".nav-title .back").attr('data-title', title);
			if((title.length-1) == 0) {
				$(".nav-title .back").remove();
			}
			return false;
		});

		if(!$("#sidebar").length) {
			$("[data-toggle=sidebar]").hide();
		}
		$(document).on("click", "[data-toggle=sidebar]", function() {
			var $this = $(this),
					$target = $($this.data("target"));

			backdrop.click(function() {
				backdrop.hide();
				$target.removeClass("active");
				$("body").css({
					overflow: "auto"
				});
			});

			$("body").css({
				overflow: "hidden"
			});
			backdrop.show();
			setTimeout(function() {
				$target.addClass("active");
			},50);
			return false;
		});
	}


	
	verticalSlider();
	easeScrollFunc();
	toggleMobile();
	

});


