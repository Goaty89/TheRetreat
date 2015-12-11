$(function() {
  !window.console&&(window.console={log:function(){}});
  var element = $('.weather');
  var source = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.bylocation%20where%20location%3D%22kuantan%2Cmy%22%20and%20unit%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
  var image_source = [window.webroot, 'img', 'weather', 'icons'].join('/');
  var image_ext = 'svgz';
  
  if (!element.length) {
    return;
  }
  
  $.get(source, function(response) {
    if ( !response
      || !response.query
      || !response.query.results
      || !response.query.results.weather
      || !response.query.results.weather.rss
      || !response.query.results.weather.rss.channel
      || !response.query.results.weather.rss.channel.item
      || !response.query.results.weather.rss.channel.item.forecast
    ) {
      return;
    }
    var forecast = response.query.results.weather.rss.channel.item.forecast;
    var today = response.query.results.weather.rss.channel;
    console.log('today', today);
    console.log('forecast', forecast);
    element.empty();
    
    var today_item = $('<div class="today">');
    var background = 0;
    var style = 'dark';
    
    switch (parseInt(today.item.condition.code)) {
      case 36:
        background = 1;
        break;
      case 24:
        background = 2;
        break;
      case 31:
        background = 3;
        break;
      case 32:case 34:case 33:
        background = 4;
        break;
      case 26:case 28:
        background = 6;
        break;
      case 25:
        background = 7;
        break;
      case 27:
        background = 8;
        break;
      case 20:
        background = 9;
        break;
      case 19:case 21:
        background = 10;
        style = 'light';
        break;
      case 22:
        background = 11;
        break;
      case 29:
        background = 12;
        break;
      case 30:
        background = 13;
        break;
      case 44:
        background = 14;
        break;
      case 8:case 9:case 10:case 11:case 12:case 13:case 14:case 15:case 16:case 17:case 18:case 23:case 35:case 40:case 41:case 42:case 43:
        background = 15;
        style = 'light';
        break;
      case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:case 37:case 38:case 39:case 45:case 46:case 47:
        background = 16;
        break;
      default:
        break;
    }
    
    element.removeClass().addClass('weather').addClass('background-' + background).addClass(style);
    
    var location = [];
    
    if (today.location.city) {
      location.push(today.location.city);
    }
    
    if (today.location.country) {
      location.push(today.location.country);
    }
    
    if (today.location.region) {
      location.push(today.location.region);
    }
    
    today_item.append(
      $('<div class="location">').append(location.join(', '))
    );
    
    today_item.append(
        $('<div class="icon">').addClass('icon-' + today.item.condition.code)
    ).append(
      $('<div class="temperature">').append(today.item.condition.temp).append($('<sup>')).append(
        $('<span class="unit">').append(today.units.temperature)
      )
    ).append(
      $('<div class="condition">').append(today.item.condition.text)
    );
    
    element.append(today_item);
    
    var forecast_container = $('<div class="forecast-container">');
    
    for (var i = 0, ilen = forecast.length; i < ilen; i++) {
      var forecast_item = $('<div class="forecast">');
      var day = moment(forecast[i].date).format('dddd');
      var now = moment().format('dddd')
      var tomorrow = moment().add(1, 'd').format('dddd');
      if (now == day) {
        day = 'Today';
      } else if (tomorrow == day) {
        day = 'Tomorrow';
      }
      
      forecast_item.append(
        $('<div class="day">').append(day)
      ).append(
        $('<div class="icon">').addClass('icon-' + forecast[i].code)
      ).append(
        $('<div class="high">').append(forecast[i].high).append($('<sup>'))
      ).append(
        $('<div class="low">').append(forecast[i].low).append($('<sup>'))
      ).append(
        $('<div class="condition">').append($('<span>').append(forecast[i].text))
      );
      
      forecast_container.append(forecast_item);
    }
    
    element.append(
      $('<div class="container-fluid">').append(today_item).append(forecast_container)
    );
    
  });
});
