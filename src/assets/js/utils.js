var codeFiles = [
	['/assets/css/styles.css','css'],
	['/assets/js/utils.js','js'],
	['/index.html','html']
];
function initBackground(){
	// create the wrapper
	var wrapper = $('<div>').addClass('background-wrapper');

	var layers = 3;
	for (var layer = 0; layer < layers; layer++) {
		var codeFile = codeFiles[layer];//codeFiles.splice(Math.floor(codeFiles.length * Math.random()),1)[0];
		var element = $('<code>').addClass('language-'+codeFile[1]);
		$.ajax({
			url: codeFile[0],
			dataType: 'text',
			success: function (element, text) {
				element.text(text);

				// highlight it
				Prism.highlightElement(element.get(0), false);
				element.parent().removeAttr('class');
			}.bind(this, element)
		});

		// scroll code
		var scrollRate = layer+2;
		$(window).on("scroll", function(element, scrollRate) {
			element.get(0).style.top = (-window.scrollY/scrollRate)+'px';
		}.bind(this, element, scrollRate));

		var pre = $('<pre>').append(element).appendTo(wrapper);
		var position = layer/(layers-1);
		element.css({
			'transform-origin': 'left',
			'transform': 'translateZ('+(position*-500-50)+'px) rotateY(35deg)',
			'opacity': (layers-layer)/layers
		});
	}

	$('body').prepend(wrapper);
	$(window).trigger('resize');
}

$(document).on('click','[href="#"]',function(event){
	event.preventDefault();
});

// play videos on hover
$(document).on('mouseover', 'video.play-on-hover', function(event){
	event.target.play();
	event.target.playbackRate = parseFloat($(event.target).attr('rate')) || event.target.playbackRate;

	if(!event.target.onended && event.target.hasAttribute('loopPause')){
		event.target.onended = function(event){
			var wait = parseFloat(event.target.getAttribute('loopPause')) * 1000;
			if(isNaN(wait)) return;
			event.target.loopWait = setTimeout(function(el){
				el.play();
			}.bind(this, event.target),wait);
		}
	}
}).on('mouseleave', 'video.play-on-hover', function(event){
	event.target.pause();
	if(event.target.loopWait != null){
		clearTimeout(event.target.loopWait);
		event.target.loopWait = undefined;
	}
})

// toggle, add, remove class
$(document).on('click', '[data-toggle-class]', function(event){
	event.preventDefault();
	var parsed = ($(this).attr('data-toggle-class') || '').split('|');
	var selector = parsed[0];
	var className = parsed[1];
	$(selector).toggleClass(className);
});
$(document).on('click', '[data-remove-class]', function(event){
	event.preventDefault();
	var parsed = ($(this).attr('data-remove-class') || '').split('|');
	var selector = parsed[0];
	var className = parsed[1];
	$(selector).removeClass(className);
});
$(document).on('click', '[data-add-class]', function(event){
	event.preventDefault();
	var parsed = ($(this).attr('data-add-class') || '').split('|');
	var selector = parsed[0];
	var className = parsed[1];
	$(selector).addClass(className);
});

// image modal
function createImageModal(){
	var modal = $([
		'<div class="modal fade" id="preview-image">',
		'	<div class="modal-dialog modal-xl">',
		'		<div class="modal-content" style="border-radius: 0px;">',
		'			<div class="modal-header">',
		'				<button class="btn btn-default btn-sm pull-right" data-dismiss="modal">Close</button>',
		'				<a id="download-image" class="btn btn-primary btn-sm" target="_blank" download><i class="fa fa-download"></i> Download</a>',
		'			</div>',
		'			<div class="modal-body">',
		'				<img style="max-height: 95vh; margin: 0 auto; max-width: 100%; display: block; height: auto"/>',
		'			</div>',
		'		</div>',
		'	</div>',
		'</div>'
	].join(''));

	modal.modal();

	$(document.body).append(modal);
}
function createVideoModal(){
	var modal = $([
		'<div class="modal fade" id="preview-video">',
		'	<div class="modal-dialog modal-lg">',
		'		<div class="modal-content" style="border-radius: 0px;">',
		'			<div class="modal-body">',
		'				<iframe id="video-player" style="width: 100%; height: 50vh;" frameborder="0" allowfullscreen></iframe>',
		'			</div>',
		'		</div>',
		'	</div>',
		'</div>'
	].join(''));

	modal.modal();

	modal.on('hidden.bs.modal', function(){
		modal.find('iframe').attr('src', '');
	});

	$(document.body).append(modal);
}

$(document).on('click', '[data-image-modal]', function(event){
	// if its on a mobile device then open a new tab
	if(window.innerWidth < 768){
		if($(this).is('a')){
			return;
		}
		else{
			window.open($(this).data('image-modal'));
			return;
		}
	}

	event.preventDefault();

	if(!$('#preview-image').get(0))
		createImageModal();

	var src = $(this).data('image-modal') || $(this).attr('href');
	$('#download-image').attr('href', src);
	$('#preview-image img').attr('src', src);
	$('#preview-image').modal('show');
})

function openImageModal(src){
	if(window.innerWidth < 768){
		// its a mobile device, open the image in a new tab
		window.open(src,'_blank');
		return;
	}

	if(!$('#preview-image').get(0))
		createImageModal();

	$('#download-image').attr('href', src);
	$('#preview-image img').attr('src', src);
	$('#preview-image').modal('show');
}

$(document).on('click', '[data-video-modal]', function(event){
	// if its on a mobile device then open a new tab
	if(window.innerWidth < 768){
		if($(this).is('a')){
			return;
		}
		else{
			window.open('https://www.youtube.com/embed/'+$(this).data('video-modal'));
			return;
		}
	}

	event.preventDefault();

	if(!$('#preview-video').get(0))
		createVideoModal();

	var id = $(this).data('video-modal');
	var src = id? 'https://www.youtube.com/embed/'+id+'?autoplay=1' : $(this).attr('href');
	$('#preview-video #video-player').attr('src', src);
	$('#preview-video').modal('show');
});

function openVideoModal(id){
	var url = 'https://www.youtube.com/embed/'+id;
	if(window.innerWidth < 768){
		// its a mobile device, open the image in a new tab
		window.open(url,'_blank');
		return;
	}

	if(!$('#preview-video').get(0))
		createImageModal();

	$('#preview-video #video-player').attr('src', url);
	$('#preview-video').modal('show');
}

$(document).ready(function () {
	console.log('creating background');
	initBackground();
});
