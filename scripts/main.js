
const options = {
    target: '[data-toggle="lightboxx"]',
	keyboard: true,
	size: 'fullscreen'
};

document.querySelectorAll('.gallery-element').forEach((el) => el.addEventListener('click', (e) => {
	e.preventDefault();
	const lightbox = new Lightbox(el, options);
	lightbox.show();
}));

$(window).on('hashchange', function(e){
    history.replaceState ("", document.title, e.originalEvent.oldURL);
});

$('#ww-navbarNav a,button').on('click', function(){
	$('#ww-navbarNav').removeClass('show');
});

$('#navbar-title').on('click', function(){
	$('#ww-navbarNav').removeClass('show');
});
