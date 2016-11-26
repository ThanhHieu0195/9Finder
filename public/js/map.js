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