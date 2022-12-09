// deno-lint-ignore-file
// deno-lint-ignore-file no-window-prefix
MicroModal.init({
    openClass: 'is-open',
    disableScroll: true,
});

'use strict';

// Swiper
let mySwiper = new Swiper('.swiper', {
    loop: true,
    speed: 1500,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    spaceBetween: 16,
    pagination: {
        el: '.anchor',
        type: 'bullets',
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    }

})

//メニューを閉じる
const navLink = document.querySelectorAll('.nav-link');
const navCheck = document.getElementById('nav-check');
navLink.forEach(function (navClick) {
    navClick.addEventListener('click', () => {
        navCheck.checked = false;
    });
});

// Topに戻るボタン
let h = window.innerHeight;
const pageTop = document.querySelector('.pageTop');
pageTop.addEventListener('click', onClickButton);

function onClickButton() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

window.addEventListener('scroll', scrollEvent);
function scrollEvent() {
    if (window.scrollY > h) {
        pageTop.classList.add('appear');
    } else if (window.scrollY < h) {
        pageTop.classList.remove('appear');
    }
}


//時間になったら公開
async function load() {
    const data = await fetch('./static/json/data.json');
    const obj = await data.json();

    const time = obj[0].release;
    const dead = new Date(time);
    const deadTime = Date.parse(dead);
    const dateCurrent = Date.parse(new Date()); // 現在時刻を取得
    console.log(deadTime);
    console.log(dateCurrent);
    const releaseOpen = document.getElementById("releaseOpen");
    const releaseClose = document.getElementById("releaseClose");

    if (dateCurrent > deadTime) {
        releaseOpen.style.display = "block";
        releaseClose.style.display = "none";
    }
}
load();