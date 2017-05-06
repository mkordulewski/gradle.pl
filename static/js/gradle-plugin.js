(function() {

	var widgetMarker = jQuery('#grdl-three-expand');
	var flexCell = widgetMarker.find('div.flex_cell');

	var detailTarget = jQuery("<div id='grdl-three-detail'><div class='content'></div></div>").insertAfter(widgetMarker);
	var detailContent = detailTarget.find('.content');

	function expandDetail(item) {

		flexCell.removeClass('open');
		item.addClass('open');
		
		detailContent.empty();
		detailContent.append(item.find('.grdl-detail').clone());
		detailTarget.addClass('open');
	}

	flexCell.click(function() {
		expandDetail(jQuery(this));
	});	

})();
