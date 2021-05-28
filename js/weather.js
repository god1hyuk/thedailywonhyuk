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
  let weather = data.weather; // 날씨 객체
  let main = data.main; // 온도 기압 관련 객체
  let icon = weather[0].icon; // 날씨 아이콘 정보
  let country = sys.country; // 국가명
  let temp = main.temp; // 현재 온도
  let temp_max = main.temp_max; // 최고 온도
  let temp_min = main.temp_min; // 최저 온도
  let lat = data.coord.lat; // 위도
  let lon = data.coord.lon; // 경도
  
  let timezone_url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat +'&lon='+ lon +'&units=metric&appid=1f5db96c55e3ed2d7c867bd727652038';
  
  $.getJSON(timezone_url, function (c) {

    function convertDay(d) {
      let st = new Date(d * 1000);
      let cDay = st.getDay();
      return cDay;
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

      let daily = '<div id="weather_daily"> <div class="daily_day">' + dDay + '</div> <div class="daily_icon">' + '<img src="images/weatheradar/' + dIcon + '.png">' + '</div> <div class="daily_temp_max">' + parseInt(dTemp_max)+'&deg max' + '</div> <div class="daily_temp_min">' + parseInt(dTemp_min)+ '&deg min' + '</div> </div>';
      
      $('.daily_wrap').append(daily);

    }

  });
  
  $('.home .weather .city').html(city + '/' + country);
  $('.home .weather .icon').html("<img src='images/weatheradar/" + icon + ".png'>");
  $('.home .weather_main .temp').html(parseInt(temp) + '&deg');
  $('.temp_max>p').append(parseInt(temp_max) + '&deg;');
  $('.temp_min>p').append(parseInt(temp_min) + '&deg;');
});