$(function(){
	$("#faq article").click(toggleArticle);
	$("#activities article").click(toggleArticle);

	$('.nav-room-item').on('click', function(e) {
		e.preventDefault();

		var target = $($(this).data('target'));
		if (!target) {
			return;
		}

		$('.nav-room-item').not($(this)).removeClass('active');
		$(this).addClass('active');

		$('.nav-room-category').removeClass('active');
		$(this).parent().parent().parent().addClass('active');

		$('.room-toggle').not(target).removeClass('active');
		target.addClass('active');

		if (target.hasClass('room-list')) {
			$('.nav-room').removeClass('active');
		} else {
			$('.nav-room').addClass('active');
		}

		var toggleNav = $($(this).data('toggleNav'));
		if (toggleNav) {
			toggleNav.addClass('active');
			toggleNav.parent().parent().parent().addClass('active');
		}

		return false;
	});
});
function toggleArticle(e){
	e.stopPropagation();
	var selectedElem = e;
	$("#"+this.parentElement.id+" div:visible").slideUp();
	$(this).find("div").slideDown();
}
