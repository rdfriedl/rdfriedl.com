function loadImage(url,cb){
	$.ajax({
		url: 'img/'+url,
		type: 'GET',
		dataType: 'text'
	})
	.done(function() {
		if(cb) cb();
	})
}

games = [];
$(document).ready(function() {
	$gameTemp = $('#temp .game');
	$gameTemp.remove();
	$gameImage = $('#temp .game-image');
	$gameImage.remove();
	$gameItem = $('#temp .item');
	$gameItem.remove();
	
	//load json
	$.ajax({
		url: 'https://api.github.com/users/rdfriedl/repos',
		type: 'GET',
		dataType: 'json'
	})
	.done(function(json) {
		games = json;
		//build game list
		for (var i = 0; i < json.length; i++) {
			var $game = $gameTemp.clone(true,true);
			$game.find('.title').text(json[i].name);
			$game.find('.desc').text(json[i].description);
			$game.find('.source-link').attr('href',json[i].svn_url);
			$game.find('.play-link').attr('href',json[i].homepage);

			//see if we can find its image
			loadImage('games/'+json[i].name+'.png',function(game,$game) {

				$game.find('.cover').attr('href','img/games/'+game.name+'.png');
				$game.find('.cover>img').attr('src','img/games/'+game.name+'.png');
				$game.appendTo('#games');

				//find as many images as we can
				var func = function(game,$game,imageNum){
					loadImage('games/'+game.name+imageNum+'.png',function(imageNum,game,$game){
						var $image = $gameImage.clone(true);
						$image.find('a').attr('href','img/games/'+game.name+imageNum+'.png')
						$image.find('img').attr('src','img/games/'+game.name+imageNum+'.png')
						//add it
						$game.find('.images').append($image);
						imageNum++;

						func(imageNum++);
					}.bind(this,imageNum,game,$game))
				}.bind(this,game,$game)

				func(2);
			}.bind(this,json[i],$game))
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