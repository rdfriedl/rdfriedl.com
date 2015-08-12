function loadImage(url,cb){
	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'text'
	})
	.done(function() {
		if(cb) cb();
	});
}

$(document).ready(function() {
	//game
	$gameTemp = $('#temp .game');
	$gameTemp.remove();
	$gameImage = $('#temp .game-image');
	$gameImage.remove();
	//library
	$libraryTemp = $('#temp .library');
	$libraryTemp.remove();
	//game
	$toolTemp = $('#temp .tool');
	$toolTemp.remove();
	$toolImage = $('#temp .tool-image');
	$toolImage.remove();

	$('#back-to-top').click(function(){
		$.smoothScroll({offset: 0});
	});
	$(document).scroll(function() {
		$('#back-to-top').css('opacity',($(document).scrollTop()-200)/300);
		if($('#back-to-top').css('opacity') > 0){
			$('#back-to-top').show();
		}
		else{
			$('#back-to-top').hide();
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

			if(game.sourceURL.length == 0) $game.find('.source-link').hide();

			//build tags
			for(var k = 0; k < game.tags.length; k++){
				var $tag = $('<span class="label"></span>').addClass('label-'+game.tags[k].type);
				$tag.text(game.tags[k].message);
				$game.find('.tags').append($tag);
			}

			$game.appendTo('#games');

			//k = 1, because we already used image 0 for cover
			for (var k = 1; k < game.images.length; k++) {
				loadImage(game.images[k],function(url,$game){
					var $image = $gameImage.clone(true);
					$image.find('a').attr('href',url);
					$image.find('img').attr('src',url);
					//add it
					$game.find('.images').append($image);
				}.bind(this,game.images[k],$game));
			}
		}
	});

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

			if(library.sourceURL.length == 0) $library.find('.source-link').hide();

			//build tags
			for(var k = 0; k < library.tags.length; k++){
				var $tag = $('<span class="label"></span>').addClass('label-'+library.tags[k].type);
				$tag.text(library.tags[k].message);
				$library.find('.tags').append($tag);
			}

			//images
			if(library.coverImage.length){
				$library.find('.cover').attr('href',library.coverImage).find('img').attr('src',library.coverImage)
			}
			else{
				$library.find('.cover').remove();
			}

			$library.appendTo('#libraries');
		}
	});

	//load tools
	$.ajax({
		url: 'data/tools.json',
		type: 'GET',
		dataType: 'json'
	})
	.done(function(json) {
		//build library list
		for (var i = 0; i < json.length; i++) {
			var $tool = $toolTemp.clone(true,true);
			var tool = json[i];
			$tool.find('.title').text(tool.title);
			$tool.find('.desc').text(tool.description);
			$tool.find('.source-link').attr('href',tool.sourceURL);
			$tool.find('.open-link').hide();
			if(tool.openURL){
				$tool.find('.open-link').attr('href',tool.openURL).show();
			}
			$tool.find('.download-link').hide();
			if(tool.downloadURL){
				$tool.find('.download-link').attr('href',tool.downloadURL).show();
			}

			if(tool.sourceURL.length == 0) $tool.find('.source-link').hide();

			//build tags
			for(var k = 0; k < tool.tags.length; k++){
				var $tag = $('<span class="label"></span>').addClass('label-'+tool.tags[k].type);
				$tag.text(tool.tags[k].message);
				$tool.find('.tags').append($tag);
			}

			//images
			if(tool.coverImage.length){
				$tool.find('.cover').attr('href',tool.coverImage).find('img').attr('src',tool.coverImage)
			}
			else{
				$tool.find('.cover').remove();
			}

			$tool.appendTo('#tools');
		}
	});

	$.ajax({
		url: 'https://api.github.com/users/rdfriedl',
		type: 'GET',
		dataType: 'json'
	})
	.done(function(json) {
		//build game list
		$('#profile-image').attr('src',json.avatar_url);
	});
});