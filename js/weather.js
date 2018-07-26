function weather() {
    var location = document.getElementById("location");
    var apiKey = "96857879e743500906e0a4ed6edb506d";
    var url = "https://api.forecast.io/forecast/";

    navigator.geolocation.getCurrentPosition(success, error);


    $.getJSON(
        "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=bikaner",
        function(data) {
            // $("#location2").html(forecast.results[0].formatted_address);
            console.log(data.query.pages);
        });


    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        var latlon = position.coords.latitude + "," + position.coords.longitude;

// var city = "https://maps.googleapis.com/maps/api/geocode/json?latlng=latitude,longitude&sensor=false";
// console.log(city.results.address_components);
// document.getElementById("location2").innerHTML=city.
        var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
            +latlon+"&zoom=14&size=800x350&key=AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU";
        document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";



        location.innerHTML =
            "Latitude is " + latitude + "°";
        location1.innerHTML =  " Longitude is " + longitude + "°";

        $.getJSON(
            "https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&sensor=false",
            function(forecast) {
                $("#location2").html(forecast.results[0].formatted_address);
                console.log(forecast.results[0].formatted_address);
            });



        $.getJSON(
            url + apiKey + "/" + latitude + "," + longitude + "?callback=?",
            function(data) {
                var F = data.currently.temperature;
                var C = (F-32)*5/9;


                $("#temp").html(C + "° C");

            });

        // function displayLocation(latitude,longitude){
        //      var request = new XMLHttpRequest();
        //
        //      var method = 'GET';
        //      var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
        //      var async = true;
        //
        //      request.open(method, url, async);
        //      request.onreadystatechange = function(){
        //        if(request.readyState == 4 && request.status == 200){
        //          var data = JSON.parse(request.responseText);
        //          var address = data.results[0];
        //          document.write(address.formatted_address);
        //        }
        //      };
        //      request.send();
        //    };
        //
        //    var successCallback = function(position){
        //      var x = position.coords.latitude;
        //      var y = position.coords.longitude;
        //      displayLocation(x,y);
        //    };


    }

    function error() {
        location.innerHTML = "location not found";
    }

}

weather();
