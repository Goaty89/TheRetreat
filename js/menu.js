var config = new config();

$(function () {
	$("a").click(function(e){debugger
		var id = $(this).data("section");
		if(config.previousTab!==void(0)){
			if(this.id !== config.previousTab.id && config.previousTab.id!==""){
				$(config.previousTab).removeClass("active");
			}
		}
			
		$(this).parent().addClass('align_normal');
		if($(".hdr-logo.active").length>0){
			$(".hdr-logo.active").removeClass('active');
			var $self = $(this);
			setTimeout(function() {
			  $self.addClass("active");
			}, 1000); 
		}else{
			$(this).addClass("active");
		}
		$(".hme-background").fadeOut();
		$("section:visible").fadeOut(function() {
			$(id).fadeIn();
		});
	
		config.previousTab = this;
	});
	
	//nav back to original
	$(".hdr-logo").click(function(){
		$(this).addClass("active");
		$(".hme-background").fadeIn();	
		setTimeout(function() {
		  $(".menu-nav").removeClass('align_normal');
		}, 1000);  
	});
});
	
function config(){
	//this.activeTab = "";
	var previousTab = this.previousTab;
	return previousTab;
}	