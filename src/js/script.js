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

document.addEventListener("DOMContentLoaded", () => {
  showContent();

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


  if (window.scrollY >= 1) {
    header.classList.add('fixed');
  } else {
    header.classList.remove('fixed');
  }

  document.addEventListener("scroll", () => {
    closeMenu();
    console.log(window.scrollY);
    if (window.scrollY >= 1) {
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    }
  });

  // range calculator
  const range = document.querySelector(".range-input");
  const rangeOutput = document.querySelector(".start");
  const rangeOutputPrice = document.querySelector(".range-total__value span");
  const nftPrice = 0.03;

  // change value of rage slider
  range.oninput = () => {
    rangeOutput.innerHTML = range.value;
    rangeOutputPrice.innerHTML = nftPrice * range.value;
  }

  // jQuery for scrolling
  var sectionArray = [1, 2, 3, 4, 5, 6, 7, 8];

  $.each(sectionArray, function (index, value) {

    $(document).scroll(function () {
      var offsetSection = $('#' + 'section_' + value).offset().top;
      var docScroll = $(document).scrollTop();
      var docScroll1 = docScroll + 1;


      if (docScroll1 >= offsetSection) {
        $('.nav-list li a').removeClass('active');
        $('.nav-list li a').addClass('inactive');
        $('.nav-list li a').eq(index).addClass('active');
        $('.nav-list li a').eq(index).removeClass('inactive');
      }
    });

    $('.nav li a').eq(index).click(function (e) {
      var offsetClick = $('#' + 'section_' + value).offset().top;
      e.preventDefault();
      $('html, body').animate({
        'scrollTop': offsetClick
      }, 1000)
    });
  });

  $(document).ready(function () {
    $('.nav-list li a:link').addClass('inactive');
    $('.nav-list li a').eq(0).addClass('active');
    $('.nav-list li a:link').eq(0).removeClass('inactive');


    $(window).on('resize', function () {
      techSlider();
      teamSlider();
    });
  });

  $('.btn-scroll[href^="#"], .btn_to-top[href^="#"]').on('click', function (e) {
    e.preventDefault();
    $(".nav-list__link").removeClass("active");
    $(this).addClass("active");
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top
    }, 1000);

  });

  $('.close').click(function () {
    parent.$.fancybox.close();
  });

  const showOnScroll = () => {
    $('.section').each(function () {
      let windowPosMod = $(window).scrollTop() + $(window).height();
      let sectionPosMod = $(this).offset().top + $(this).outerHeight();

      let sectionPos = $(this).offset().top;
      let windowPos = $(window).scrollTop() + $(window).height() / 3;

      if (sectionPos < windowPos) {
        $(this).addClass('show');
      }
    });
  }
  $(window).scroll(function () {
    showOnScroll();
  });

  teamSlider();

  function teamSlider() {
    if ($(window).width() < 769 && !$('.team-list.slick-slider')[0]) {
      var maxWidth = 768;
      $('.team-list').slick({
        dots: false,
        infinite: false,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        cssEase: ' cubic-bezier(.6, 0, .41, 1)',
        dots: true,
        mobileFirst: true,
        responsive: [{
            breakpoint: maxWidth,
            settings: 'unslick'
          },
          {
            breakpoint: 460,
            settings: {
              slidesToShow: 1.6
            }
          },
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 2.6
            }
          }
        ]
      });
    }
  }
  techSlider();

  function techSlider() {
    if ($(window).width() < 769 && !$('.teach-team-list.slick-slider')[0]) {
      var maxWidth = 768;
      $('.tech-team-list').slick({
        dots: false,
        infinite: false,
        centerMode: false,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        cssEase: ' cubic-bezier(.6, 0, .41, 1)',
        mobileFirst: true,
        responsive: [{
            breakpoint: maxWidth,
            settings: 'unslick'
          },
          {
            breakpoint: 460,
            settings: {
              slidesToShow: 1.6
            }
          },
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 2
            }
          }
        ]
      });
    }
  }
});