const burger = document.querySelector(".js-burger");
const menu = document.querySelector(".js-menu");
const body = document.querySelector("body");
const header = document.querySelector(".js-header");
const heroSection = document.querySelector(".js-hero");
const heroSectionHeight = heroSection.offsetHeight;
const showContent = () => {
  document.querySelector(".main-wrapper").classList.remove("js-fadeIn");
}
window.onbeforeunload = () => {
  window.scrollTo(0, 0);
}
// console.log(heroSection.offsetHeight);
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
let keys = {
  37: 1,
  38: 1,
  39: 1,
  40: 1
};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () {
      supportsPassive = true;
    }
  }));
} catch (e) {}

let wheelOpt = supportsPassive ? {
  passive: false
} : false;
let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
  console.log("disable");
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
  console.log("enable");
}


document.addEventListener("DOMContentLoaded", () => {
  showContent();
  if (window.innerWidth > 1024) {
    disableScroll();
  }
  // disableScroll();
  const openMenu = () => {
    burger.classList.add('active');
    menu.classList.add('active');
    body.classList.add('fixed-body');
  }

  const closeMenu = () => {
    burger.classList.remove('active');
    menu.classList.remove('active');
    body.classList.remove('fixed-body');
  }

  burger.addEventListener("click", () => {
    if (burger.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });


  if (window.scrollY > heroSectionHeight - 10) {
    header.classList.add('fixed');
  } else {
    header.classList.remove('fixed');
  }

  document.addEventListener("scroll", () => {
    closeMenu();
    // console.log(window.scrollY);
    if (window.scrollY >= heroSectionHeight - 10) {
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    }
  });

  // range calculator
  const range = document.querySelector(".range-input");
  const rangeOutput = document.querySelector(".start");
  const rangeOutputPrice = document.querySelector(".range-total__value span");
  const nftPrice = 0.02;

  // change value of rage slider
  range.oninput = () => {
    rangeOutput.innerHTML = range.value;
    rangeOutputPrice.innerHTML = nftPrice * range.value;
  }
  // scroll spy
  let section = document.querySelectorAll(".section");
  let sections = {};
  let i = 0;

  Array.prototype.forEach.call(section, function (e) {
    sections[e.id] = e.offsetTop;
  });

  window.onscroll = function () {
    let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    for (i in sections) {
      if (sections[i] <= scrollPosition) {
        document.querySelector('.nav-list__link.active').classList.remove('active');
        document.querySelector('.nav-list__link[href*=' + i + ']').classList.add('active');
      }
    }
  };

  // jQuery for scrolling
  $('.nav-list__link[href^="#"], .btn-scroll[href^="#"], .btn_to-top[href^="#"]').on('click', function (e) {
    // enableScroll();
    e.preventDefault();
    $(".nav-list__link").removeClass("active");
    $(this).addClass("active");
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top
    }, 1000);

    // if ($($(this).attr('href')).outerHeight() > $(window).height()) {
    // console.log($(this));
    // enableScroll();
    // }
    // enableScroll();
  });

  $('.nav-list__link[href^="#"], .btn-scroll[href^="#"], .btn_to-top[href^="#"]').on('click', function (e) {
    // enableScroll();
    e.preventDefault();
    $(".nav-list__link").removeClass("active");
    $(this).addClass("active");
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top
    }, 1000);

    // if ($($(this).attr('href')).outerHeight() > $(window).height()) {
    // console.log($(this).attr('href'));
    //   enableScroll();
    // }
  });

  $('.close').click(function () {
    parent.$.fancybox.close();
  });

  const showOnScroll = () => {
    $('.section').each(function () {
      let windowPosMod = $(window).scrollTop() + $(window).height();
      let sectionPos = $(this).offset().top + $(this).outerHeight();
      if (sectionPos < windowPosMod) {
        $(this).addClass('show');
        disableScroll();
      }
    });
  }
  let scrollStart = 0;
  $(window).scroll(function () {
    // let scrollValue = $(this).scrollTop();
    showOnScroll();
    let currentScrollPosition = $(this).scrollTop();
    // console.log(currentScrollPosition);
    if (currentScrollPosition > scrollStart) {
      console.log("down");
    } else {
      console.log("up");
    }
    scrollStart = currentScrollPosition;
  });
  // const sections = document.querySelectorAll(".section");
  // console.log(sections);
  // sections.forEach((section) => { // second parameter always index of element 
  //   console.log(section.offsetHeight);

  // });



});