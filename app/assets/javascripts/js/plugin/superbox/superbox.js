/*
	SuperBox v1.0.0 (modified by bootstraphunter.com)
	by Todd Motto: http://www.toddmotto.com
	Latest version: https://github.com/toddmotto/superbox

	Copyright 2013 Todd Motto
	Licensed under the MIT license
	http://www.opensource.org/licenses/mit-license.php

	SuperBox, the lightbox reimagined. Fully responsive HTML5 image galleries.
*/
;(function($) {

	$.fn.SuperBox = function(options) {

		var superbox      = $('<div class="superbox-show"></div>')
		var	superboximg   = $('<img src="" class="superbox-current-img"><div id="imgInfoBox" class="superbox-imageinfo inline-block"> <h1>My Image</h1><span><p class="superbox-img-description">You can remove the image by pressing the delete button.</p><p><button type="submit" class="btn btn-danger removeimage padding-5">Delete</button></p></span> </div>')
		
		var	superboxclose = $('<div class="superbox-close txt-color-white"><i class="fa fa-times fa-lg"></i></div>');

		superbox.append(superboximg).append(superboxclose);

		var imgInfoBox = $('.superbox-imageinfo');

		return this.each(function() {

			$('.superbox-list').click(function() {
				$this = $(this);

				var currentimg = $this.find('.superbox-img'),
					imgData = currentimg.data('img'),
					imgDescription = currentimg.attr('alt') || "No description",
					imgLink = imgData,
					imgTitle = currentimg.attr('title') || "No Title";

					//console.log(imgData, imgDescription, imgLink, imgTitle)

				superboximg.attr('src', imgData);

				$('.superbox-list').removeClass('active');
				$this.addClass('active');

				$('#imgInfoBox em').text(imgLink);
				$('#imgInfoBox >:first-child').text(imgTitle);
				$('#imgInfoBox .superbox-img-description').text(imgDescription);

				if($('.superbox-current-img').css('opacity') == 0) {
					$('.superbox-current-img').animate({opacity: 1});
				}

				if ($(this).next().hasClass('superbox-show')) {
					$('.superbox-list').removeClass('active');
					superbox.toggle();
				} else {
					superbox.insertAfter(this).css('display', 'block');
					$this.addClass('active');
				}

				$('html, body').animate({
					scrollBottom:superbox.position().top - currentimg.width()
				}, 'medium');

			});

			$('.superbox').on('click', '.superbox-close', function() {
				$('.superbox-list').removeClass('active');
				$('.superbox-current-img').animate({opacity: 0}, 200, function() {
					$('.superbox-show').slideUp();
				});
			});

		});
	};
})(jQuery);