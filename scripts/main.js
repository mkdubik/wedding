
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
