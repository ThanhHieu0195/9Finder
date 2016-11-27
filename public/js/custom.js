/*----------  map  ----------*/

// vĩ độ:x; kinh độ:y
function initMap(x=10.7680519,y=106.4141714, z=5) {
  var uluru = {lat: x, lng: y};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: z,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}
/*----------  change navbar  ----------*/

$(window).scroll(function(event) {
	var top = $(this).scrollTop();
	if (top == 0) {
		$('.affix').addClass('affix-top');
		$('.affix').removeClass('affix');
	} else {
		$('.affix-top').addClass('affix');
		$('.affix-top').removeClass('affix-top');
	}
});

/*----------  bpopup  ----------*/
function loading() {
  bPopup =  $('#loading').bPopup({
    modalClose: false,
      follow: [false, false],
            content:'image',
            contentContainer:'#loading',
            loadUrl:'http://product.cdn.cevaws.com/bundles/cevafeliwaysitecommon/img/loading.gif'
        });
}
function loaded() {
  bPopup.close();
}
/*----------  Subsection comment block  ----------*/
String.format = function(text) {
    if (arguments.length <= 1) {
        return text;
    }
    var tokenCount = arguments.length - 2;
    for (var token = 0; token <= tokenCount; token++) {
        text = text.replace(new RegExp("\\{" + token + "\\}", "gi"),
                arguments[token + 1]);
    }
    return text;
};
