$("document").ready(function (){
	$(".tile").click(function(){
		var $this = $(this);
		if(!$this.hasClass("open")){
			$(".tile").not($this).fadeOut();
			$this.toggleClass("open").css("z-index", 10);
			$this.animate({"width": "100%", "height": "110%", "margin": "0", "left": "0" }, 250);
			$('html, body').css("overflow-y", "hidden").delay(500).animate({scrollTop: ($(this).offset().top)}, 250);
	}
	});
});