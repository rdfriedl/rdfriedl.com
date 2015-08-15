function loadJSON(url,cb,d){
	loadJSON.callbacks = loadJSON.callbacks || {};
	loadJSON.cache = loadJSON.cache || {};
	loadJSON.loading = loadJSON.loading || {};
		
	if(!loadJSON.cache[url]){
		loadJSON.cache[url] = d || {};
		$.ajax({
			url: url,
			type: 'get',
			dataType: 'json'
		})
		.done(function(json) {
			loadJSON.cache[url].__proto__ = json.__proto__;
			if(json instanceof Array){
				for (var i = 0; i < json.length; i++) {
					loadJSON.cache[url].push(json[i]);
				};
			}
			else{
				for(var i in json){
					loadJSON.cache[url][i] = json[i];
				}
			}
			
			if(cb) cb(json);

			if(loadJSON.callbacks[url]){
				for (var i = 0; i < loadJSON.callbacks[url].length; i++) {
					loadJSON.callbacks[url][i](json);
				};
			}
		})
		.fail(function() {
			if(cb) cb(false);

			if(loadJSON.callbacks[url]){
				for (var i = 0; i < loadJSON.callbacks[url].length; i++) {
					loadJSON.callbacks[url][i](false);
				};
			}
		})
	}
	else if(loadJSON.loading[url]){
		loadJSON.callbacks[url] = loadJSON.callbacks[url] || [];
		loadJSON.callbacks[url].push(cb);
	}
	else{
		if(cb) cb(loadJSON.cache[url]);
	}
	return loadJSON.cache[url];
}

var page = {
	games: loadJSON('data/games.json',undefined,[]),
	libraries: loadJSON('data/libraries.json',undefined,[]),
	tools: loadJSON('data/tools.json',undefined,[]),
	back: '#home',
	previewImage: '',
	profileImage: ''
}

$(document).ready(function() {

	bindings.createModal(page)
	bindings.applyBindings(page,document.body)

	routie({
		'home': function() {
		    $('.panel-3d').removeClass('show');
	    	$('#home-panel').addClass('show');
	    	$('a').removeClass('active');
	    	$('a[href="'+location.hash+'"]').addClass('active');
		},
		'games': function() {
		    $('.panel-3d').removeClass('show');
	    	$('#games-panel').addClass('show');
	    	$('a').removeClass('active');
	    	$('a[href="'+location.hash+'"]').addClass('active');
		},
		'libraries': function() {
		    $('.panel-3d').removeClass('show');
	    	$('#libraries-panel').addClass('show');
	    	$('a').removeClass('active');
	    	$('a[href="'+location.hash+'"]').addClass('active');
		},
		'tools': function() {
		    $('.panel-3d').removeClass('show');
	    	$('#tools-panel').addClass('show');
	    	$('a').removeClass('active');
	    	$('a[href="'+location.hash+'"]').addClass('active');
		},
		'image/*': function(url) {
		    $('.panel-3d').removeClass('show');
	    	$('#preview-image').addClass('show');
	    	$('a').removeClass('active');
	    	$('a[href="'+location.hash+'"]').addClass('active');
	    	page.previewImage = url;
		}
	});

	if(location.hash == '') routie('home');

	$(window).on('hashchange',function(){
		$(window).scrollTop(0);
	});
	$(window).scrollTop(0);

	$(document).on('click','a[href*="#"]',function(event){
		page.back = location.hash;
	})

	$.ajax({
		url: 'https://api.github.com/users/rdfriedl',
		type: 'GET',
		dataType: 'json'
	})
	.done(function(json) {
		//build game list
		page.profileImage = json.avatar_url;
	});
});