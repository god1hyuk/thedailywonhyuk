const clock = document.querySelector('.clock');
const meridiem = document.querySelector('.meridiem');
const h = document.querySelector('.hour');
const colon = document.querySelector('.colon');
const m = document.querySelector('.minutes');
const s = document.querySelector('.seconds');

function getTime(){
    const now = new Date();
    let hours = now.getHours();
    let minutes = ('00' + now.getMinutes()).slice(-2);
    let seconds = ('00' + now.getSeconds()).slice(-2);

    if (hours < 12) {
        let str = 'AM';
        meridiem.innerHTML = `${str}`
    } else {
        let str = 'PM';
        hours -= 12;
        meridiem.innerHTML = `${str}`
    }

    h.innerHTML = hours;
    m.innerHTML = minutes;
    s.innerHTML = seconds;
}

function init(){
    setInterval(getTime, 1000);
}

init();

let count = 1;
const color = ["#eee", "#47ffb8", "#fbc800", "#ff4f70", "#4f7dff"];

clock.addEventListener('click', function () {

    if (count > 4) {
        count = 0;
    }

    this.animate([
        {transform: 'scale(1)'},
        {transform: 'scale(0.99)'},
        {transform: 'translate(2px)'},
        {transform: 'translate(0px)'},
        {transform: 'translate(-2px)'}
    ], 100);

    meridiem.style.color = color[count];
    h.style.color = color[count];
    colon.style.color = color[count];
    m.style.color = color[count];
    s.style.color = color[count];

    count++;
});