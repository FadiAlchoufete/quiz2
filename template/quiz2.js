(function($){
	// This is where you will write your function for the programming challenge
	// Do not commit console.log statements
	// Use ajax to reach the api endpoint
	// Whether or not you use jQuery, you still have to fix the jQuery errors. Removing jQuery is not fixing the problem.

	$mouseover = $('.mouseover');
	$click     = $('.click');
	$submit    = $('.submit');
	$timeout   = $('.timeout');

	$mouseover.on('mouseover', function() {
		$this = $(this);
		$(this).html('Scrooge McDuck!');
		$(this).height($(this).height() + 50);
	});

	$click.click(function() {
		$(this).html('Peace Out!')
		$(this).fadeOut(1500);
		return false;
	});

	$submit.on('submit', function(e) {
		e.preventDefault();
		if ($(this).find('input[type="text"]').val() !== '') {
			$(this).find('input').each(function() {
				$(this).fadeOut('slow');
			});
			$(this).append('<h2>Congratulations! You\'ve entered some text!</h2>');
		}
	});

	$(document).on('ready', function() {
		setTimeout(function() {
			$timeout.fadeIn('slow');
		}, 1000);

		changeData(false);
	});

	var isCalled = false;
	var options;
	var keep = "";

	function changeData(change = true) {
		if (change == true) {
			var r = Math.floor(Math.random() * (options.length));

			keep = options[r];

			$("#btn-gt").html("Change It");
			$("#btn-k").css("display", "inline");
		}else {
			keep = document.cookie;
		}

		if (keep != "") {
			$("#gt-response").html("You got: <i>" + keep + "</i>");
			$("#gt-response").css("display", "block");
		}
	}

	$("#btn-gt").click(function() {
		if (isCalled == false) {
			$.ajax({
				url: 'http://www.mattbowytz.com/simple_api.json',
				data: 'data=quizData',
				dataType: 'json',
				statusCode: {
					200: function( response ) {
						options = response.data;
						changeData();
						isCalled = true;
					},
					500: function( text ) {
						alert("An error occurred getting the data");
					}
				}
			});
		}else {
			changeData();
		}
	});

	$("#btn-k").click(function() {
		document.cookie = keep;
		alert("Your selected string has been saved");
	});

})(jQuery);