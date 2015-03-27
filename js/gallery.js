$('document').ready(function(){
	$("#galleryBox").ready(function(){
		var $img = $("#galleryHolder").find("img"),
			$arrow = $(".arrow"),
			downPresses = 0,
			loadedImages = 0,
			imageHeight = 128,
			maxUp = 0-2*imageHeight;

		$('.imageContainer').each(function(){
				maxUp += $(this).height();
		});

		var errors = 0;		
		/*$img.load(function(){
			$img.error(function(){
				errors++;
				console.log("Errors: " + errors);
				maxUp -= $(this).height();
				$(this).remove();
			});
		});*/
				
		var totalImages = ($img.length-errors-1);
			/*maxUp = imageHeight*totalImages - imageHeight*2*/
		console.log("num images: " + totalImages);
		console.log("Height: " + imageHeight);
		console.log("maxUp: " + maxUp);
		
		/*$('.imageContainer').each(function(){
			loadedImages++;
			console.log("Loaded: " + loadedImages);
		});*/
		
		$("#upArrow").click(function(){
			//maxUp = imageHeight*(totalImages-errors) - imageHeight*2;
            if(!$("#smallGallery").is(":animated") && $("#smallGallery").position().top>-maxUp+imageHeight) {
                $("#smallGallery").animate({top : "-=" + imageHeight + "px"});
				downPresses--;
				console.log(downPresses);
            }
            return false;
        });
		
		$("#downArrow").click(function(){
            if(!$("#smallGallery").is(":animated") && $("#smallGallery").position().top<0){
                $("#smallGallery").animate({top : "+=" + imageHeight + "px"});
				downPresses++;
				console.log(downPresses);
            }
            return false;
        });
		
		$img.click(function(){
			$(".current").removeClass("current");
			$(this).parent().addClass("current");
			$("#bigImage").attr("src", $(this).attr("src")).load(function(){
				$("#imageCaption").width($('#bigImage').width())
				.css("margin-left", -1*($('#bigImage').width()/2));
			});
			if($("#galleryBox").hasClass("selected")){
				if($(this).next('p').text()!=""){
					$('#imageCaption').text($(this).next('p').text())
					.show();
				} else {
					$('#imageCaption').hide();
				}
			}
			downPresses = 0;
		});
		
		$("#rightArrow").click(function(){
			if(!$("#smallGallery").is(":animated")){
				//maxUp = imageHeight*(totalImages-errors) - imageHeight*2;
				var $current = $(".current");
				if(!$("#smallGallery").is(":animated") && $current[0] != $('.imageContainer').last()[0]){
					$("#smallGallery").animate({top : "-=" + (imageHeight + imageHeight*downPresses) + "px"});
					downPresses = 0;
					console.log("Index of Current: " + $(".current").index(".imageContainer"));
					$current.removeClass("current");
					var $next = $current.next();
					$next.addClass("current");
					$("#bigImage").attr("src", $next.children().attr("src")).load(function(){
						console.log("image loaded");
						$("#imageCaption").width($('#bigImage').width())
						.css("margin-left", -1*($('#bigImage').width()/2));
					});
					if($next.children("p").text()!=""){
						$('#imageCaption').text($next.children("p").text())
						.css("width", $('#bigImage').width())
						.css("margin-left", -1*($('#bigImage').width()/2));
						$('#imageCaption').show();
					} else {
						$('#imageCaption').hide();
					}
				}				
			}
		});
		
		$("#leftArrow").click(function(){
			if(!$("#smallGallery").is(":animated") && $(".current").index(".imageContainer")!=0){
				var $current = $(".current");
				$current.removeClass("current");
				var $prev = $current.prev();
				$prev.addClass("current");
				$("#smallGallery").animate({top : "+=" + (imageHeight + -imageHeight*downPresses) + "px"});
				$("#bigImage").attr("src", $prev.children().attr("src")).load(function(){
					console.log("image loaded");
					$("#imageCaption").width($('#bigImage').width())
					.css("margin-left", -1*($('#bigImage').width()/2));
				});
				if($prev.children("p").text()!=""){
						$('#imageCaption').text($prev.children("p").text())
						.css("width", $('#bigImage').width())
						.css("margin-left", -1*($('#bigImage').width()/2));
						$('#imageCaption').show();
					} else {
						$('#imageCaption').hide();
					}
				downPresses = 0;
				console.log("Index of Current: " + $(".current").index(".imageContainer"));
			}
		});
				
		$arrow.on("mouseenter", function(){
			$(this).css("opacity", "0.75");
		});
		
		$arrow.on("mouseout", function(){
			$(this).css("opacity", "0.5");
		});
		
		$arrow.on("mousedown", function(){
			$(this).css("opacity", "1");
		});
		
		$arrow.on("mouseup", function(){
			$(this).css("opacity", "0.75");
		});
		
	});
});