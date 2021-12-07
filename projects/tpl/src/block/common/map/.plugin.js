//2gis map
var twoGis_map_container = 'map-2gis';
var twoGis_cont = $('#' + twoGis_map_container);  
var CMS__TPL_PATH = '/wp-content/themes/azbn7theme';  
//var CMS__TPL_PATH = '/tpl';  
//var CMS__TPL_PATH = '';  
if(twoGis_cont.length) { 
	var twoGis_map_data = JSON.parse(twoGis_cont.attr('data-map') || '{}');
	var map;
	var mapCoord = twoGis_map_data.center;
	var mapZoom = twoGis_map_data.zoom;
	var placeholderCoord = twoGis_map_data.placemarks.coord;
	var iconUrl = CMS__TPL_PATH + '/img/svg/icon-map.svg';
	var iconRetinaUrl = CMS__TPL_PATH + '/img/svg/icon-map.svg';
	var iconSize = [55, 84];
	var iconAnchor = [27, 84]; 
	DG.then(function () {
		map = DG.map(twoGis_map_container, {
			center: mapCoord,
			zoom: mapZoom,
			scrollWheelZoom: false,
			fullscreenControl: false
		});
		var myIcon = DG.icon({
			iconUrl: iconUrl,
			iconRetinaUrl: iconRetinaUrl,
			iconSize: iconSize,
			iconAnchor: iconAnchor,
			popupAnchor: [0, 0]
		});

		if(twoGis_map_data.placemarks.length) {
			for(var i = 0; i < twoGis_map_data.placemarks.length; i++) {
				var popHeading = '<div class="map__popup-heading">'+twoGis_map_data.placemarks[i].heading+'</div>';	
				var obj_popup = DG.popup({
					className: 'map__popup',
				}).setContent(popHeading);

				DG.marker(twoGis_map_data.placemarks[i].coord, {icon: myIcon}).addTo(map).bindPopup(obj_popup);
			}
		}
	});
}
//google map
/*function initMap() {  
  var map_container_div_id = 'map-google';
  var cont = $('#' + map_container_div_id);  
  var CMS__TPL_PATH = '/wp-content/themes/azbn7theme';  
  if(cont.length) {    
	var map_data = JSON.parse(cont.attr('data-map') || '{}');
	var coordMapOfficeOne = map_data.center;
	var zoomMapOfficeOne = map_data.zoom;    
	 if($(document).width() < 768) {
		var coordMapOfficeOne = map_data.center_xs;
		var zoomMapOfficeOne = map_data.zoom_xs;    
	 }  
	var styleMapOfficeOne = [{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#e9e5dc"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.medical","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"poi.sports_complex","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54},{"visibility":"off"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"water","elementType":"all","stylers":[{"saturation":43},{"lightness":-11},{"color":"#89cada"}]}],
		optionsMapOfficeOne = {
		  zoom: zoomMapOfficeOne, 
		  center: new google.maps.LatLng(coordMapOfficeOne[0], coordMapOfficeOne[1]), 
		  //styles: styleMapOfficeOne
		}, 
	  idOfficeOne = document.getElementById(map_container_div_id),
	  mapOfficeOne = new google.maps.Map(idOfficeOne, optionsMapOfficeOne),
	  iconOfficeOne = {   
		path: "M29.0061 0C12.9878 0 -5.73408e-07 12.8421 -5.73408e-07 28.6841C-5.73408e-07 36.7885 7.98612 51.308 7.98612 51.308L27.9369 85L48.7532 51.7014C48.7532 51.7014 58 37.848 58 28.6841C58.0024 12.8421 45.0171 0 29.0061 0ZM28.8703 44.4827C19.6962 44.4827 12.2653 37.0854 12.2653 27.9432C12.2653 18.813 19.6938 11.4205 28.8703 11.4205C38.0395 11.4205 45.4777 18.813 45.4777 27.9432C45.4777 37.0854 38.0395 44.4827 28.8703 44.4827Z", 
		fillColor: '#00AEF3',
		strokeColor: '#000000',
		fillOpacity: 1,
		//anchor: new google.maps.Point(26,65),
		anchor: new google.maps.Point(29,85),
		strokeWeight: 0,
		scale: 1,
	  }; 
	  if(map_data.placemarks.length) {
		for(var i = 0; i < map_data.placemarks.length; i++) {
		  var iconCoordOfficeOne = {lat: map_data.placemarks[i].coord[0],  lng: map_data.placemarks[i].coord[1]}, 
		  OfficeOne = new google.maps.Marker({
			position: iconCoordOfficeOne,
			map: mapOfficeOne,
			icon: iconOfficeOne,
			title: map_data.placemarks[i].title,
			  //animation: google.maps.Animation.DROP
		  });
		}
	  }

	 if(map_data.placemarks2.length) {
		for(var i = 0; i < map_data.placemarks2.length; i++) {
		  var iconCoordOfficeOne2 = {lat: map_data.placemarks2[i].coord[0],  lng: map_data.placemarks2[i].coord[1]}, 
		  OfficeOne = new google.maps.Marker({
			position: iconCoordOfficeOne2,
			map: mapOfficeOne,
			icon: iconOfficeOne,
			title: map_data.placemarks2_title,
		  });
		}
	  }
	  
	  
	  //$(window).on('resize', function() {
	  //  google.maps.event.trigger(mapOfficeOne, "resize");
	  //  mapOfficeOne.setCenter(OfficeOne);
	  //});
	  
	  $(document.body).on('click.azbn7', '.azbn__office__map__set-center-btn', null, function(event){
		event.preventDefault();
		var btn = $(this);
		var coord = btn.attr('data-coord');
		var coord_arr = coord.split(',');
		console.dir(coord_arr);
		mapOfficeOne.setCenter({
		  lat : parseFloat((coord_arr[0] || '').trim()),
		  lng : parseFloat((coord_arr[1] || '').trim()),
		});
		
	  });
	  
	
  }
  
}; 
$(function () {
	$(document.body).on('shown.bs.modal', '.modal', {}, function(event){
		event.preventDefault();
		$(window).trigger('resize');    
	});  
});*/