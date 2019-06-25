//humb
var humb = $(".navbar__hamburger-card"),
	toggle_navbar = humb.data("toggle-nav"),
	toggle_body = humb.data("body"),
	toggle_collapse = humb.data("collapse-nav"); 
humb.on('click',function() {				
	$(toggle_body).toggleClass("is--open-navbar");
	$(toggle_navbar).toggleClass("is--open");
	$(toggle_collapse).toggleClass("is--open");
	$(this).toggleClass("is--active");
});	
$(document.body).on('click', function(event) {
	if($(event.target).closest('.navbar__block').length == 0){	
		$(toggle_body).removeClass("is--open-navbar");
		$(toggle_navbar).removeClass("is--open");
		$(toggle_collapse).removeClass("is--open");
		humb.removeClass("is--active");
	}		
});		

var url = window.location.pathname;
//var url = window.location.href;
$('.navbar__nav a[href="'+url+'"]').parent().addClass('is--active'); 
$('.navbar-aside__nav a[href="'+url+'"]').parent().addClass('is--active'); 
$('.tabs__nav a[href="'+url+'"]').parent().addClass('is--active'); 
$('[data-azbn-toggle="dropdown"]').on('click', function(e) {
	$(".azbn-dropdown").toggleClass('open');
});	
$('.navbar-aside__dropdown [data-toggle="dropdown"]').on('click', function(e) {
	e.preventDefault();
	e.stopPropagation();
	$(this).parent().siblings().removeClass('open');
	$(this).parent().toggleClass('open');
});
$('.azbn__search-dropdown').on('shown.bs.dropdown', function(e) {
	$('.azbn__search-input').focus();
});
