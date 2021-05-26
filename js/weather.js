// now date
let now = new Date();
let year = now.getFullYear();
let month_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let month = month_arr[now.getMonth()];
let date = now.getDate();
let day_arr = ['SUN', 'MON', 'TUE', 'THU', 'WEN', 'FRI', 'SAT'];
let day = day_arr[now.getDay()];
let hours = now.getHours();
let minutes = ('00' + now.getMinutes()).slice(-2);
let fullDate = month + ' ' + date + ' ' + day + ' , ' + year;
let fullTime = hours + ' : ' + minutes;

document.querySelector('.date>p').innerHTML = fullDate;

let url = 'https://api.openweathermap.org/data/2.5/weather?q=seoul&units=metric&appid=1f5db96c55e3ed2d7c867bd727652038';

$.getJSON(url, function (data) {
  
  let sys = data.sys; // 국가명, 일출/일몰
  let city = data.name; // 도시명
  let city_id = data.id; // 도시명 id 코드
  let weather = data.weather; // 날씨 객체
  let main = data.main; // 온도 기압 관련 객체
  let wmain = weather[0].main; // 구름 상태(Cloudiness)
  let w_id = weather[0].id; // 날씨 상태 id 코드
  let icon = weather[0].icon; // 날씨 아이콘 정보
  let country = sys.country; // 국가명
  let temp = main.temp; // 현재 온도
  let temp_max = main.temp_max; // 최고 온도
  let temp_min = main.temp_min; // 최저 온도
  let feelsLike = main.feels_like; // 체감 온도
  let humidity = main.humidity; // 습도
  let icon_url = "https://openweathermap.org/img/wn/" + icon;
  let sunrise = sys.sunrise; // 일출
  // let todaySunrise = sunInfoResult(sunrise);
  let sunset = sys.sunset; // 일몰
  // let todaySunset = sunInfoResult(sunset);
  let windDeg = data.wind.deg; // 풍향
  let windSpeed = data.wind.speed; // 풍속
  let lat = data.coord.lat; // 위도
  let lon = data.coord.lon; // 경도


  function sunInfoResult(ft) {
    let st = new Date(ft * 1000);
    let cHours = st.getHours();
    let cMinutes = ('00' + st.getMinutes()).slice(-2);
    return `${cHours}:${cMinutes}`;
  }
  

  let timezone_url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat +'&lon='+ lon +'&units=metric&appid=1f5db96c55e3ed2d7c867bd727652038';
  
  $.getJSON(timezone_url, function (c) {
    
    let rainFall = c.hourly[0].pop; // 강수확률
    // console.log(parseInt(rain * 100));
    $('.rainFall>p').append(parseInt(rainFall) * 100 + '%');

    function convertTime(t) {
      let st = new Date(t * 1000);
      let cHours = st.getHours();
      return cHours;
    }

    function convertDay(d) {
      let st = new Date(d * 1000);
      let cDay = st.getDay();
      return cDay;
    }

    for (let i = 0; i < 48; i++) {
      let hTime = c.hourly[i].dt;
      let hTemp = c.hourly[i].temp;
      let hIcon = c.hourly[i].weather[0].icon;

      let currentTime = convertTime(hTime);

      if (i === 0) {
        currentTime = 'Now';
      }

      let hourly = '<div id="weather_hourly">' + '<p class="hourly_time">' + currentTime + '</p>' + '<figure class="hourly_icon">' + '<img src="images/' + hIcon + '.png">' + '</figure>' + '<p class="hourly_temp">' + parseInt(hTemp) + '&deg' + '</p>' + '</div>';
      
      $('.hourly_tab').append(hourly);


    }

    for (let j = 0; j <= 4; j++) {
      let dTime = c.daily[j].dt;
      let dIcon = c.daily[j].weather[0].icon;
      let dTemp_max = c.daily[j].temp.max;
      let dTemp_min = c.daily[j].temp.min;

      let currentDay = convertDay(dTime);
      let dDay = day_arr[currentDay];
      
      if (j === 0) {
        dDay = 'Today';
      }

      let daily = '<div id="weather_daily"> <div class="daily_day">' + dDay + '</div> <div class="daily_icon">' + '<img src="images/' + dIcon + '.png">' + '</div> <div class="daily_temp_max">' + parseInt(dTemp_max)+'&deg max' + '</div> <div class="daily_temp_min">' + parseInt(dTemp_min)+ '&deg min' + '</div> </div>';
      
      $('.daily_wrap').append(daily);

    }

  });
  
  $('#bg').html("<img src='images/" + icon + "_bg.jpg'>");
  $('#bg_intro').css('display','none');
  $('.time .fullDate').html(fullDate);
  $('.time .fullTime').html(fullTime);
  $('.home .weather .city').html(city + '/' + country);
  $('.home .weather .icon').html("<img src='images/" + icon + ".png'>");
  $('#weather_main .w_id').html(wmain);
  $('.home .weather_main .temp').html(parseInt(temp) + '&deg');
  $('.temp_max>p').append(parseInt(temp_max) + '&deg;');
  $('.temp_min>p').append(parseInt(temp_min) + '&deg;');
  $('.feelsLike>p').append(parseInt(feelsLike) + '&deg;');
  $('.humidity>p').append(humidity + '%');
  $('.wind>p').append(parseInt(windSpeed) + 'm/s');

});