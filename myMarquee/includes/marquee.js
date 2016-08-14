//Javascript Document

var currIndex = 0;
var nrofElements = 0;

$(document).ready(function (){

	//Preload
	$('.marquee_panels img').imgpreload(function(){
		initializeMarquee();
	});


	//Generate Photo Lineup
	
	$('img.marquee_panel_photo').each(function(index){

		var photoWidth = $('.marquee_container').width();
		var photoPosition = index * photoWidth;

		$('.marquee_photos').append('<img class="marquee_photo" style="left:'+ photoPosition +'" src="'+ $(this).attr('src') +'" alt="'+ $(this).attr('alt') +'" width="'+ photoWidth +'" height="350" />');
		$('.marquee_photos').css('width', photoPosition + photoWidth);
	});

	//Generate Navigation Links

	$('.marquee_panels .marquee_panel').each(function(index){

		$('.marquee_nav').append('<a class="marquee_nav_item"></a>');
		nrofElements++;

	});	


	// Slide timer
	
	
	var slideTimer = setInterval(function (){
		

		if(currIndex == nrofElements - 1) 
			currIndex = 0;		
		else
			currIndex++;
		
		var selected = $('.marquee_nav_item').get(currIndex);
		$('.marquee_nav a.marquee_nav_item').removeClass('selected');
		$(selected).addClass('selected');

		var marqueeWidth = $('.marquee_container').width();
		var distanceToMove = marqueeWidth * (-1);
		var newPhotoPosition = currIndex * distanceToMove + 'px';
		var newCaption = $('.marquee_panel_caption').get(currIndex);
			
					
		$('.marquee_photos').animate({left: newPhotoPosition}, 1000);
		$('.marquee_caption').animate({top: '310px'}, 500, function(){
			var newHTML = $(newCaption).html();
			$('.marquee_caption_content').html(newHTML);
			setCaption();
		});

	}, 5000);
	

	//Set Up Navigation Links

	$('.marquee_nav a.marquee_nav_item').click(function(){

		
		$('.marquee_nav a.marquee_nav_item').removeClass('selected');
		$(this).addClass('selected');
		
		clearInterval(slideTimer);

		var navClicked = $(this).index();
		currIndex = navClicked;		
		var marqueeWidth = $('.marquee_container').width();
		var distanceToMove = marqueeWidth * (-1);
		var newPhotoPosition = navClicked * distanceToMove + 'px';
		var newCaption = $('.marquee_panel_caption').get(navClicked);
			
					
		$('.marquee_photos').animate({left: newPhotoPosition}, 1000);
		$('.marquee_caption').animate({top: '310px'}, 500, function(){
			var newHTML = $(newCaption).html();
			$('.marquee_caption_content').html(newHTML);
			setCaption();
		});

		
		slideTimer = setInterval(function (){
		

			if(currIndex == nrofElements - 1) 
				currIndex = 0;		
			else
				currIndex++;
	
			var selected = $('.marquee_nav_item').get(currIndex);
			$('.marquee_nav a.marquee_nav_item').removeClass('selected');
			$(selected).addClass('selected');
		


			var marqueeWidth = $('.marquee_container').width();
			var distanceToMove = marqueeWidth * (-1);
			var newPhotoPosition = currIndex * distanceToMove + 'px';
			var newCaption = $('.marquee_panel_caption').get(currIndex);
				
					
			$('.marquee_photos').animate({left: newPhotoPosition}, 1000);
			$('.marquee_caption').animate({top: '310px'}, 500, function(){
				var newHTML = $(newCaption).html();
				$('.marquee_caption_content').html(newHTML);
				setCaption();
			});

		}, 5000);
	
	});

	console.log(nrofElements);
	
	
});

function setCaption(){
	
	var captionHeight = $('.marquee_caption').height();
	var marqueeHeight = $('.marquee_container').height();
	var newCaptionHeight = marqueeHeight - captionHeight - 15;
	$('.marquee_caption').delay(100).animate({top: newCaptionHeight}, 500);

}

function initializeMarquee(){

	$('.marquee_caption_content').html(
		$('.marquee_panels .marquee_panel:first .marquee_panel_caption').html()
	);

	$('.marquee_nav a.marquee_nav_item:first').addClass('selected');
	$('.marquee_photos').fadeIn(1500);
	setCaption();
	

}
