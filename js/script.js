$('document').ready(function(){
	(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
	var $boxes = $(".box");
	var hover, down, currentImg, selectedIndex;
	var homePositions = [];
	var startingIndex = [];
	var $containers = $("#leftContainer");
	var $selected = 'null';
	var $nav = $('.navObj');
	var $navNotHome = $('.navObj').not("#home");
	//window.requestAnimationFrame(animation);
		
	$boxes.ready(function(){
		$boxes.each(function(index){
			$this = $(this);
			var temp = {
				id: $this.attr("id"),
				side: $this.css("float"),
				width: $this.css("width"),
				height: $this.css("height"),
				parentID: $this.parent().attr("id"),
				parent: $this.parent(),
				classes: $this.attr("class"),
				eq: $this.eq(index),			
			};
			homePositions.push(temp);
			startingIndex.push($this.attr("id"));
			console.log(homePositions[index]);
		});
	});
		
	function view($div){
		if($div.hasClass("grow")){
			$div.removeClass('grow');
			selectedIndex = startingIndex.indexOf($div.attr("id"));
			
			$div.addClass("selected");
			$selected = $div;
			$div.find(".hide").fadeOut();
			$containers.not($div).fadeOut("fast", function(){
				$div.animate( { 'width': "1000px", 'height': "450px", 'float': "left"}, "fast")/*.delay(1000).css({})*/;
				$boxes.not($div).hide();
				$div.appendTo('#view');
				$('#imageCaption').hide();
				$div.find(".extended").delay(1000).fadeIn("slow", function(){
					$('#imageCaption').text($('.current').text());
					$("#imageCaption").width($('#bigImage').width())
					.css("margin-left", -1*($('#bigImage').width()/2));
					$('#imageCaption').fadeIn();
				});
			});
		}
		switch ($div.attr("id")){
			case "galleryBox":
				$(".current").removeClass("home");
				break;
		}
	}	
		
	$boxes.click(function(){
		var $myDiv = $(this);
		var id = $myDiv.attr("id");
		var icon = id.substr(0,id.length-3);
		console.log(icon);
		$("#"+icon).addClass("active").removeClass("dead");
		$('#home').removeClass("active").addClass("dead");
		view($myDiv);
	});
	
	function reset($object, $this){
		$('.extended').fadeOut();
		$object.animate( {"width" : homePositions[selectedIndex].width, "height" : homePositions[selectedIndex].height}, "fast");
		$object.css("float", homePositions[selectedIndex].side);
		$object.addClass(homePositions[selectedIndex].classes);
		if($object != $this) {$('.hide').fadeIn()};
		$object.attr("id") == "galleryBox" ? $object.insertAfter($("#page").eq($object.prependTo(homePositions[selectedIndex].eq))) : $object.prependTo(homePositions[selectedIndex].parent);
		switch ($object.attr("id")){
			case "galleryBox":
				$(".current").addClass("home");
				break;
		}
	}
	
	$('#home').on("click", function(){
		$('.active').addClass("dead").removeClass("active");
		$(this).addClass("active").removeClass("dead");
		$selected = $('.selected');
		/*if(homePositions[selectedIndex] != undefined){
			reset($selected, $(this));
			console.log("defined");
		}*/
		$selected.removeClass('selected');
		$selected = 'null';
		
		$boxes.each(function(index){
			$current = $(this);
			selectedIndex = index;
			reset($current, $(this));
		});
			
		$containers.show();
		$boxes.delay(500).fadeIn("slow");
	});

	$navNotHome.on("click", function(){
		$('.active').addClass("dead");
		$('.active').removeClass("active");
		$(this).addClass("active").removeClass("dead");
		var id=$(this).attr("id");
		console.log(id);
		if($selected === 'null'){
			view($("#" + id + "Box"));
		} else {
			reset($selected, $("#" + id + "Box"));
			$selected.removeClass('selected');
			$selected = $("#" + id + "Box");
			selectedIndex = startingIndex.indexOf($selected.attr("id"));
			$selected.appendTo('#view');
			$selected.fadeIn();
			view($selected);
		}
	});

	$('.glug').click(function(){
			var id = $(this).attr("id");
			var border = $("#border");
			switch (id) {
				case "blueGlug":
					border.css("background-color", "#091c58");
					$('#images').html("<li><a><img src='./resources/products/b1.png' alt='img01'></a></li><li><a><img src='./resources/products/b2.png' alt='img02'></a></li><li><a><img src='./resources/products/b3.png' alt='img03'></a></li>");
					break;
				case "greenGlug":
					border.css("background-color", "#1dd923");
					$('#images').html("<li><a><img src='./resources/products/g1.png' alt='img01'></a></li><li><a><img src='./resources/products/g2.png' alt='img02'></a></li><li><a><img src='./resources/products/g3.png' alt='img03'></a></li>");
					break;
				case "blackGlug":
					border.css("background-color", "black");
					$('#images').html("<li><a><img src='./resources/products/bl1.png' alt='img01'></a></li><li><a><img src='./resources/products/bl2.png' alt='img02'></a></li><li><a><img src='./resources/products/bl3.png' alt='img03'></a></li>");
					break;
				case "purpleGlug":
					border.css("background-color", "#E0119D");
					$('#images').html("<li><a><img src='./resources/products/p1.png' alt='img01'></a></li><li><a><img src='./resources/products/p2.png' alt='img02'></a></li><li><a><img src='./resources/products/p3.png' alt='img03'></a></li>");
					break;
				default:
					border.css("background-color", "#a20f5f");
					break;
			}
			$('#light').css('display','block');
			$('#fade').fadeIn();
			var margin = -1*($("#threesixty img").width()/2) /*< -400 ? -400 : -1*($("#threesixty img").width()/2)*/;
			$("#threesixty img").css("margin-right", margin);
	});

	$('.overlay_back').click(function(){
		$("#threesixty").fadeOut();
		$("#ye-message").fadeOut();
		$('#light').css('display','none');
		$('#fade').fadeOut(500);
		$('#content').scrollTop(0);
	});

	$('#content').scroll(function() {
		var $this = $(this);
		var contentScroll = $this.scrollTop();
		var height = $this[0].scrollHeight - $this.height()-1;
		var perScroll = contentScroll/height;
		var $images = $('#images');
		var imgHeight = $images[0].scrollHeight - $images.height()-1;
		$images.scrollTop(imgHeight*perScroll);
	});

	$("#three-d").click(function(){
		$("#threesixty").fadeIn();
		var margin = -1*($("#threesixty img").width()/2) /*< -400 ? -400 : -1*($("#threesixty img").width()/2)*/;
		$("#threesixty img").css("margin-right", margin);
	});

	$("#images").click(function(){
		$("#threesixty").fadeIn();
		var margin = -1*($("#threesixty img").width()/2) /*< -400 ? -400 : -1*($("#threesixty img").width()/2)*/;
		$("#threesixty img").css("margin-right", margin);
	});

	$("#backArrow").click(function(){
		$("#threesixty").fadeOut();
	});

	$(".buybutton").mouseover(function(){
		$("#ye-message").fadeIn();
	}).mouseout(function(){
		$("#ye-message").fadeOut();
	}).click(function(){
		$("#threesixty").fadeOut();
		$("#ye-message").fadeOut();
		$('#light').css('display','none');
		$('#fade').fadeOut(500);
	});

	$(window).resize(function(){
		var margin = -1*($("#threesixty img").width()/2)/* < -400 ? -400 : -1*($("#threesixty img").width()/2)*/;
		$("#threesixty img").css("margin-right", margin);
	});
});