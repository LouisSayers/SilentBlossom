 $(document).ready(function(){
	var hoverEnterImagePreview = function() {
		var imagePreviewBackground = $(this).find('.image-preview-description-background');
		var imagePreviewBackgroundText = $(this).find('.image-preview-description');
		imagePreviewBackground.fadeTo("slow", 0.6);
		imagePreviewBackgroundText.fadeIn("slow");
	};
	
	var hoverExitImagePreview = function() {
		$(this).find('.image-preview-description-background').fadeOut('fast');
		$(this).find('.image-preview-description').fadeOut('fast');
	};
	
	$(".image-preview").hover(hoverEnterImagePreview, hoverExitImagePreview);
});
