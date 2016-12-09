console.log("JS is linked")

// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).on("ready", function() {

  // CODE IN HERE!
  //initMap();
  $.ajax({
      method: 'GET',
      dataType: 'json',
      url: weekly_quakes_endpoint,
      success: onSucess,
      error: onError
    });

  var map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 37.78, lng: -122.44},
                zoom: 8
            });

  var source = $('#p_template').html();
  var template = Handlebars.compile(source);



  function onSucess(data){

    data.features.forEach(function(quake){
      var timeElapsed = Math.round((Date.now() - quake.properties.time) /3600000);

      var titleHtml = template({title: quake.properties.title,
                              time: timeElapsed
                      });




      var locationObject = {lat: quake.geometry.coordinates[0],
                           lng: quake.geometry.coordinates[1]
                         };

      $("#info").append(titleHtml);

      var marker = new google.maps.Marker({
                       position: locationObject,
                       map: map
                  });
  });

}


function onError(){
  console.log("onError function");
}

});
