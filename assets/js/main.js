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
                    if(json[i] != null) loadJSON.cache[url][i] = json[i];
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
Math.choose = function(){return arguments[Math.floor(Math.random() * arguments.length)]}

var page = {
    games: loadJSON('data/games.json',undefined,[]),
    libraries: loadJSON('data/libraries.json',undefined,[]),
    tools: loadJSON('data/tools.json',undefined,[]),
    pens: loadJSON('data/pens.json',undefined,[]),
    backgrounds: loadJSON('data/backgrounds.json',function(backgrounds){
        for(var i in backgrounds) $('<link rel="prefetch" href="'+backgrounds[i].src+'"/>').appendTo('head')
    },[]),

    previewImage: '',
    preview: {},
    previewPen: function(pen){
        page.preview.id = pen.id;
        page.preview.title = pen.title;
        $('#preview-pen').modal('show');
    },

    profileImage: '',
    info: loadJSON('data/info.json',undefined,{}),
    github: {},
    links: loadJSON('data/links.json',undefined,[])
}

jQuery(document).ready(function($) {

    bindings.createModal(page)
    bindings.applyBindings(page,document.body)

    /* Github Activity Feed - https://github.com/rdfriedl/github-activity */
    GitHubActivity.feed({ username: "rdfriedl", selector: "#ghfeed" });

    //cache the github data
    jQuery.getJSON('https://api.github.com/users/rdfriedl', function(json, textStatus) {
        for(var i in json){
            if(json[i] === null) json[i] = undefined;
        }

        localStorage.rdfriedl_site_github = JSON.stringify(json);
        page.github = json;
    }).fail(function(){
        if(localStorage.rdfriedl_site_github){
            page.github = JSON.parse(localStorage.rdfriedl_site_github);
        }
    })

    jQuery(document).on('click','[href="#"]',function(event){
        event.preventDefault();
    })

    $('[data-toggle="tooltip"]').tooltip()

    setTimeout(function(){
        $('body').removeClass('page-showing');
    },1000);
});
