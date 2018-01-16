$(document).ready(function() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    $(".degree").innerHTML = "Geolocations is not supported by this browser.";
  }

  function showPosition(position) {

    $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude, function(json) {

      $("#country").html("<h2>" + json.name + "," + json.sys.country + "</h2>");

      $("#description").html("<h3>" + json.weather[0].description + " |  wind - " + (json.wind.speed * 1.852).toFixed(1) + " km/h </h3>");

      $("#temperature").html("<h2>" + (json.main.temp).toFixed(1) + "	&#8451;" + "</h2>");
      $("#choice").html("<button >CELSIUS</button>");

      switch (json.weather[0].main) {
        case ("Snow"):
          $("#weather").html("<img src='https://cdn3.iconfinder.com/data/icons/weather-icons/32/Snow_Flake-512.png' alt='Snow' height='200' >");
          break;
        case ("Clouds"):
          $("#weather").html("<img src='https://cdn3.iconfinder.com/data/icons/gray-toolbar-6/512/clouds-512.png' alt='Clouds' height='200' >");
          break;
        case ("Clear"):
          $("#weather").html("<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Feather-weather-sun.svg/1024px-Feather-weather-sun.svg.png' alt='Clear' height='200' >");
          break;
        case ("Rain"):
          $("#weather").html("<img src='https://cdn4.iconfinder.com/data/icons/weathercons/64/rain-512.png' alt='Rain' height='200' >");
          break;
        case ("Partly cloudy"):
          $("#weather").html("<img src='https://cdn4.iconfinder.com/data/icons/weathercons/64/rain-512.png' alt='Clear' height='200' />");
          break;
      }

      $("#choice").click(function() {

        $(this).text(function(i, text) {
          if (text === "CELSIUS") {

            let temp2 = (json.main.temp * 9 / 5 + 32).toFixed(1);

            $("#temperature").html("<h2>" + temp2 + "&#8457</h2>");
            $("#choice").html("<button >FAHRENHEIT</button>");
          } else {

            let temp = (json.main.temp).toFixed(1);

            $("#temperature").html("<h2>" + temp + "&#8451</h2>");
            $("#choice").html("<button >CELSIUS</button>");

          }

        })

      });

    });
  }


});
