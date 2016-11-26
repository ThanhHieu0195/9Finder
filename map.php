<!DOCTYPE html>
<html>
  <head>
    <style>
      #map {
        height: 400px;
        width: 100%;
       }
    </style>
  </head>
  <body>
    <h3>My Google Maps Demo</h3>
    <div id="map"></div>
    <script>
      function initMap(x=10.7680519,y=106.4141714, z=4) {
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
    </script>

    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB4yFaUjh6Vab5MXA-khLWUmU_QFx0hKoU&callback=initMap"></script>

  </body>
</html>