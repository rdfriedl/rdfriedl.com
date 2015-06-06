function loadImage(url,cb){
	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'text'
	})
	.done(function() {
		if(cb) cb();
	})
}

$(document).ready(function() {
	//game
	$gameTemp = $('#temp .game');
	$gameTemp.remove();
	$gameImage = $('#temp .game-image');
	$gameImage.remove();
	$gameItem = $('#temp .item');
	$gameItem.remove();
	//library
	$libraryTemp = $('#temp .library');
	$libraryTemp.remove();
	
	$('#back-to-top').click(function(){
		$.smoothScroll({offset: 0});
	})
	$(document).scroll(function(event) {
		$('#back-to-top').css('opacity',($(document).scrollTop()-200)/300);
		if($('#back-to-top').css('opacity') > 0){
			$('#back-to-top').show()
		}
		else{
			$('#back-to-top').hide()
		}
	});

	//load games
	$.ajax({
		url: 'data/games.json',
		type: 'GET',
		dataType: 'json'
	})
	.done(function(json) {
		//build game list
		for (var i = 0; i < json.length; i++) {
			var $game = $gameTemp.clone(true,true);
			var game = json[i];
			$game.find('.title').text(game.title);
			$game.find('.desc').text(game.description);
			$game.find('.source-link').attr('href',game.sourceURL);
			$game.find('.play-link').attr('href',game.playURL);

			$game.find('.cover').attr('href',game.images[0]);
			$game.find('.cover>img').attr('src',game.images[0]);
			$game.appendTo('#games');

			for (var k = 0; k < game.images.length; k++) {
				loadImage(game.images[k],function(url,$game){
					var $image = $gameImage.clone(true);
					$image.find('a').attr('href',url)
					$image.find('img').attr('src',url)
					//add it
					$game.find('.images').append($image);
				}.bind(this,game.images[k],$game));
			};
		};
	})

	//load libraries
	$.ajax({
		url: 'data/libraries.json',
		type: 'GET',
		dataType: 'json'
	})
	.done(function(json) {
		//build library list
		for (var i = 0; i < json.length; i++) {
			var $library = $libraryTemp.clone(true,true);
			var library = json[i];
			$library.find('.title').text(library.title);
			$library.find('.desc').text(library.description);
			$library.find('.source-link').attr('href',library.sourceURL);
			$library.find('.site-link').attr('href',library.siteURL);
			$library.find('.demo-link').attr('href',library.demoURL);

			$library.appendTo('#libraries');
		};
	})

	$.ajax({
		url: 'https://api.github.com/users/rdfriedl',
		type: 'GET',
		dataType: 'json'
	})
	.done(function(json) {
		//build game list
		$('#profile-image').attr('src',json.avatar_url);
	})
});