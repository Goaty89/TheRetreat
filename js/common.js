$(function(){
	$("#faq article").click(toggleArticle);	
	$("#activities article").click(toggleArticle);	
});
function toggleArticle(e){
	e.stopPropagation();
	var selectedElem = e;
	$("#"+this.parentElement.id+" div:visible").slideUp();
	$(this).find("div").slideDown();
}