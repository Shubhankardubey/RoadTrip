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
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        console.log(latitude)
        console.log(longitude)
        var latlon = position.coords.latitude + "," + position.coords.longitude;

// var city = "https://maps.googleapis.com/maps/api/geocode/json?latlng=latitude,longitude&sensor=false";
// console.log(city.results.address_components);
// document.getElementById("location2").innerHTML=city.
        var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
            +latlon+"&zoom=14&size=800x350&key=AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU";
        document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";



        //   document.getElementById('location').innerHTML = "Latitude is " + latitude + "°";
        // location.innerHTML =
        //     "Latitude is " + latitude + "°";
        //  document.getElementById('location1').innerHTML = " Longitude is " + longitude + "°";

        $.getJSON(
            "https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&sensor=false",
            function(forecast) {
                $("#location2").html(forecast.results[0].address_components[4].long_name);
               // console.log(forecast.results[0].address_components[4].long_name);
                var city = forecast.results[0].address_components[4].long_name
                wiki(city);
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


function wiki(city) {
    this.city = city;
    console.log(city)
    // this.wikipedia_url = 'https://en.wikipedia.org/wiki/' + this.city;
    // console.log(this.wikipedia_url);
    // document.getElementById("html_wiki").href = this.wikipedia_url;
    // //return this.wikipedia_url
//
    $.ajax({
        url: "https://en.wikipedia.org/w/api.php",
        data: {
            format: "json",
            action: "parse",
            page: this.city,
            prop: "text",
            section: 0,
        },
        dataType: 'jsonp',
        success: function (data) {

//console.log(data)
             var markup = data.parse.text["*"];
             var i = $('<div></div>').html(markup);
         //   $('#article').html(i);

            //remove links as they will not work

            i.find('a').each(function () {
                $(this).replaceWith($(this).html());
            });

            // remove any references
            i.find('sup').remove();

            i.find('img').remove();
            i.find('span').remove();
            // remove cite error
            i.find('.mw-ext-cite-error').remove();

            let z = $(i).find('p');
            //console.log($(i).find('p')[1]);
            let arr = []
            for(let i =1; i<z.length; i++){
                let y = jQuery(z[i]).text();
                arr.push(y)
            }
            console.log(arr)
            for(let j=0; j<arr.length; j++){
                var msg = new SpeechSynthesisUtterance(arr[j]);
                window.speechSynthesis.speak(msg);
            }

           // let y = jQuery($(i).find('p')[1]).text();
           //  console.log(y)

        }
    })
}

//console.log(document.getElementById('article').value)
