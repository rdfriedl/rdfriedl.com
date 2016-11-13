function loadJSON(url){
	return new Promise(function(resolve){
		return fetch(url).then(function(res){
			return res.json();
		}).then(function(json){
			return resolve(json);
		}).catch(function(err){
			console.error('failed to load '+url,err);
		})
	})
}
function loadTemplate(url){
	return new Promise(function(resolve){
		return fetch(url).then(function(res){
			return res.text();
		}).then(function(template){
			return resolve(template);
		})
	})
}
function docReady(){
	return new Promise(function(resolve){
		$(document).ready(function(){
			resolve();
		})
	})
}
function load_github(){
	return new Promise(function(resolve){
		if(localStorage['json-cache|github'])
			return resolve(JSON.parse(localStorage['json-cache|github']));

		return fetch('https://api.github.com/users/rdfriedl').then(function(res){
			return res.json();
		}).then(function(json){
			localStorage['json-cache|github'] = JSON.stringify(json);
			return resolve(json);
		})
	})
}
function parseSearch(url){
    url = url || location.href;
    parseSearch.cache = parseSearch.cache || {};
    if(!parseSearch.cache[url]){
        var search = url.indexOf('?') !== -1? url.substr(url.indexOf('?')+1,url.length+1) : '';
        var queries = search.replace(/^\?/, '').replace(/\+/g,' ').split('&');
        parseSearch.cache[url] = {};
        for( var i = 0; i < queries.length; i++ ) {
            var split = queries[i].split('=');
            if(split[0] !== '') parseSearch.cache[url][split[0]] = window.unescape(split[1]);
        }
    }
    return parseSearch.cache[url];
}

function loadData(){
	var data = {};

	data.search = parseSearch();

	return Promise.all([
		load_github().then(function(json){
			data.github = json;
		}),
		loadJSON('/data/technologies.json').then(function(json){
			data.technologies = {};
			for (var i = 0; i < json.length; i++) {
				data.technologies[json[i].id] = json[i];
			}
		}),
		loadJSON('/data/games.json').then(function(json){
			data.games = json;
		}),
		loadJSON('/data/expariments.json').then(function(json){
			data.expariments = json;
		}),
		loadJSON('/data/pens.json').then(function(json){
			data.pens = json;
		}),
		loadJSON('/data/backgrounds.json').then(function(json){
			data.backgrounds = json;
		}),
		loadJSON('/data/links.json').then(function(json){
			data.links = json;
		}),
		loadJSON('/data/info.json').then(function(json){
			data.info = json;
		})
	]).then(function(){
		for (var i = 0; i < data.games.length; i++) {
			if(data.games[i].used){
				for(var k = 0; k < data.games[i].used.length; k++){
					var id = data.games[i].used[k];
					if(data.technologies[id])
						data.games[i].used[k] = data.technologies[id];
				}
			}
		}
		for (var i = 0; i < data.pens.length; i++) {
			if(data.pens[i].used){
				for(var k = 0; k < data.pens[i].used.length; k++){
					var id = data.pens[i].used[k];
					if(data.technologies[id])
						data.pens[i].used[k] = data.technologies[id];
				}
			}
		}

		return data;
	})
}

function loadPage(page, data, templates, callbacks){
	var data = data || [];
	var templates = templates || [];
	var callbacks = callbacks || {};
	var wait = [];
	var view = {}, partials = {}, pageTemplate = '';

	if(data.indexOf('backgrounds') == -1)
		data.push('backgrounds');

	// load the data
	// for (var i = 0; i < data.length; i++) {
	// 	wait.push((data[i] == 'github'? load_github() : loadJSON('/data/'+data[i]+'.json')).then(function(name, json){
	// 		view[name] = json;
	// 	}.bind(this, data[i])));
	// }

	wait.push(loadData().then(function(json){
		view = json;
	}));

	// load the templates
	for (var i = 0; i < templates.length; i++) {
		wait.push(loadTemplate('/templates/'+templates[i]+'.mustache').then(function(name, json){
			partials[name] = json;
		}.bind(this, templates[i])))
	}

	// load the page
	wait.push(loadTemplate('/templates/pages/'+page+'.mustache').then(function(html){
		pageTemplate = html;
	}));

	// wait for everything to finish loading
	return Promise.all(wait).then(function(){
		if(callbacks.preRender)
			callbacks.preRender(view, partials);

		//render
		$('#page').append(Mustache.render(pageTemplate, view, partials));

		// create background
		var background = $('<div id="background" class="hidden-xs"><img id="background-image"><div id="overlay"></div></div>');
		$(document.body).prepend(background);

		// set background
		var backgroundImage = (view.backgrounds[Math.floor(Math.random() * view.backgrounds.length)] || {}).src;
		if(backgroundImage){
			$('#background-image').attr('src', backgroundImage).on('load', function(){
				$('#background-image').addClass('loaded');
			});
		}

		// handle scroll
		$(window).on("scroll", function() {
			$('#background').attr('style','top:'+(-window.scrollY/3)+'px');
		});

		$('[data-toggle="tooltip"]').tooltip();

		setTimeout(function(){
			$('body').removeClass('page-showing');
		},750);

		window.view = view;

		if(callbacks.done)
			callbacks.done();
	})
}

$(document).on('click','[href="#"]',function(event){
	event.preventDefault();
});

// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-62048613-2', 'auto');
ga('send', 'pageview');
