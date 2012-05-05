
$(document).ready(function() {
	$('.showIfJSEnabled').css('display','block');
	//Set the thumbContainer width to be the size of the images
	var padding = 5;
	
	var numberOfThumbnails = function() {
		var thumbs = $('.imageThumbnail');
		return thumbs.length;
	};
	
	var updateImagePosition = function(currentImagePosition) {
		var newImageCounter = currentImagePosition + " / " + numberOfThumbnails();
		$('#currentImageCounter').text(newImageCounter);
	};
	
	var setImageAs = function(currentThumbnail) {
		var bigImageLocation = currentThumbnail.find('img').attr('data-image-src');
		$('#currentImage img').attr('src', bigImageLocation);
		currentThumbnail.addClass('active');
	};
	
	var activateImage = function(imageElement) {
		var currentImage = imageElement;
		var lastActiveImage = $('.imageThumbnail.active');
		lastActiveImage.removeClass('active');
				
		setImageAs(currentImage);
				
		var currentImagePosition = $('.imageThumbnail').index(currentImage) + 1;
		updateImagePosition(currentImagePosition);
	};
	
	$('.nextImage').click(function() {
		var currentImage = $('.imageThumbnail.active');
		
		var currentImagePosition = $('.imageThumbnail').index(currentImage) + 1;
		//If it's the last image, then we can't move to next
		if(currentImagePosition >= numberOfThumbnails()) return;
		
		var nextImage = currentImage.next();
		var nextImageStartingPos = nextImage.position().left;
		var nextImagesWidth = nextImage.width();
		var nextImagesRightSide = nextImageStartingPos + nextImagesWidth;
		
		var thumbsStartingPos = $('#thumbs').position().left;
		var thumbsWidth = $('#thumbs').width();
		var thumbsRightPos = thumbsStartingPos + thumbsWidth;
		
		if(nextImagesRightSide > thumbsRightPos) {
			var movement = "-=" + (nextImagesRightSide - thumbsRightPos) + "px";
			$('#thumbContainer').animate({marginLeft: movement}, 300);
		}
		
		activateImage(nextImage);
	});
	
	$('.previousImage').click(function() {
		var currentImage = $('.imageThumbnail.active');
		
		var currentImagePosition = $('.imageThumbnail').index(currentImage) + 1;
		//If it's the last image, then we can't move to next
		if(currentImagePosition <= 1) return;
		
		var prevImage = currentImage.prev();
		var prevImageStartingPos = prevImage.position().left;
		
		var thumbsStartingPos = $('#thumbs').position().left;
		
		if((prevImageStartingPos) <= thumbsStartingPos) {
			var movement = "+=" + (thumbsStartingPos - prevImageStartingPos) + "px";
			$('#thumbContainer').animate({marginLeft: movement}, 300);
		}
		
		activateImage(prevImage);
	});
	
	$('.imageThumbnail').click(function() {
		var currentImage = $(this);
		
		var thumbsStartingPos = $('#thumbs').position().left;
		var thumbsWidth = $('#thumbs').width();
		var thumbsRightPos = thumbsStartingPos + thumbsWidth;
		
		var currentImageLeftPos = currentImage.position().left;
		var currentImageWidth = currentImage.width();
		var currentImageRightPos = currentImageLeftPos + currentImageWidth;

		if(currentImageLeftPos <= thumbsStartingPos) {
			var movement = "+=" + (thumbsStartingPos - currentImageLeftPos) + "px";
			$('#thumbContainer').animate({marginLeft: movement}, 300);
		}
		
		if(currentImageRightPos > thumbsRightPos) {
			var movement = "-=" + (currentImageRightPos - thumbsRightPos) + "px";
			$('#thumbContainer').animate({marginLeft: movement}, 300);
		}
		
		
		activateImage(currentImage);
	});
		
	updateImagePosition(1);
});


$(window).load(function () {
	var allThumbnails = $('.imageThumbnail');
	var thumb;
	var thumbWidths = 0;
	
	$.map(allThumbnails,function(thumb){
		thumbWidths += $(thumb).width() + 5;
	});
			
	$('#thumbContainer').width(thumbWidths);
});

