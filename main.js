function loadJSON(url){
	return new Promise(function(resolve){
		if(localStorage['json-cache|'+url] && location.search !== '?debug')
			return resolve(JSON.parse(localStorage['json-cache|'+url]));

		return fetch(url).then(function(res){
			return res.json();
		}).then(function(json){
			localStorage['json-cache|'+url] = JSON.stringify(json);
			return resolve(json);
		}).catch(function(err){
			if(localStorage['json-cache|'+url])
				return resolve(JSON.parse(localStorage['json-cache|'+url]));
		})
	})
}
function loadTemplate(url){
	return new Promise(function(resolve){
		if(localStorage['template-cache|'+url] && location.search !== '?debug')
			return resolve(localStorage['template-cache|'+url]);

		return fetch(url).then(function(res){
			return res.text();
		}).then(function(template){
			return resolve(localStorage['template-cache|'+url] = template);
		}).catch(function(err){
			if(localStorage['template-cache|'+url])
				return resolve(localStorage['template-cache|'+url]);
		})
	})
}
function previewPen(id){
	$('#open-on-codepen').attr('href', 'http://codepen.io/rdfriedl/details/'+id);
	$('#preview-pen iframe').attr('src','http://codepen.io/rdfriedl/full/'+id);
	$('#preview-pen').modal('show');
}
function previewImage(url){
	$('#download-image').attr('href', url);
	$('#preview-image img').attr('src', url);
	$('#preview-image').modal('show');
}

var partials = {};
var view = {};

$(document).ready(function() {
	// load resources
	Promise.all([
		// load templates
		loadTemplate('templates/header.mustache').then(function(template){
			partials.header = template;
		}),
		loadTemplate('templates/page.mustache').then(function(template){
			partials.page = template;
		}),
		loadTemplate('templates/game.mustache').then(function(template){
			partials.game = template;
		}),
		loadTemplate('templates/project.mustache').then(function(template){
			partials.project = template;
		}),

		// load data
		loadJSON('data/projects.json').then(function(projects){
			view.projects = projects;
		}),
		loadJSON('data/info.json').then(function(info){
			view.info = info;
		}),
		loadJSON('data/links.json').then(function(links){
			view.links = links;
		}),
		loadJSON('data/games.json').then(function(games){
			view.games = games;
		}),
		loadJSON('data/tools.json').then(function(tools){
			view.tools = tools;
		}),
		loadJSON('data/pens.json').then(function(pens){
			view.pens = pens;
		}),
		loadJSON('data/backgrounds.json').then(function(backgrounds){
			view.backgrounds = backgrounds;

			var backgroundImage = (backgrounds[Math.floor(Math.random() * backgrounds.length)] || {}).src;
			if(backgroundImage){
				$('#background-image').attr('src', backgroundImage).on('load', function(){
					$('#background-image').addClass('loaded');
				});
			}
		}),
		new Promise(function(resolve){
			if(localStorage['json-cache|github'])
				return resolve(JSON.parse(localStorage['json-cache|github']));

			return fetch('https://api.github.com/users/rdfriedl').then(function(res){
				return res.json();
			}).then(function(json){
				localStorage['json-cache|github'] = JSON.stringify(json);
				return resolve(json);
			})
		}).then(function(json){
			view.github = json;
		})
	]).then(function(){
		//render
		$('body').prepend(Mustache.render(partials.header, view, partials));
		$('body').append(Mustache.render(partials.page, view, partials));

		// handle scroll
		$(window).on("scroll", function() {
			$('#background').attr('style','top:'+(-window.scrollY/3)+'px');
		});

		$('[data-toggle="tooltip"]').tooltip()

		setTimeout(function(){
			$('body').removeClass('page-showing');
		},1000);
	})

	$(document).on('click','[href="#"]',function(event){
		event.preventDefault();
	})
});
