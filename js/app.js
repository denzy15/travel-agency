//Бесконечный слайдер
let infiniteSlider = setInterval(repeatSlider, 5000);

let menuBtn = $(".burger");
let menu = $(".menu");

function sliderJS(id, sl) {
  let sliderType = sl[0].classList.contains("main-slider")
    ? "li.main-slider-"
    : "li.secondary-slider-";

  let ul = $(sl).find("ul");
  let bl = $(sl).find(sliderType + id);
  let step = $(bl).width();
  $(ul).animate({ marginLeft: "-" + step * id }, 500);
}

$(document).on("click", ".main-slider .main-slider-nav span", function () {
  let sl = $(this).closest(".main-slider");
  $(sl).find("span").removeClass("main-slider-on");
  $(this).addClass("main-slider-on");
  let obj = $(this).attr("relOne");

  sliderJS(obj, sl);
});

$(document).on(
  "click",
  ".secondary-slider .secondary-slider-nav span",
  function () {
    let sl = $(this).closest(".secondary-slider");
    $(sl).find("span").removeClass("secondary-slider-on");
    $(this).addClass("secondary-slider-on");
    let obj = $(this).attr("relTwo");

    sliderJS(obj, sl);
  }
);

function repeatSlider() {
  //Текущие картинки слайдеров
  let mainSliderCurrentImg = $(".main-slider .main-slider-nav").find(
    "span.main-slider-on"
  );

  let secondarySliderCurrentImg = $(
    ".secondary-slider .secondary-slider-nav"
  ).find("span.secondary-slider-on");

  let firstSliderId = $(mainSliderCurrentImg).attr("relOne");
  let secondSliderId = $(secondarySliderCurrentImg).attr("relTwo");

  mainSliderCurrentImg.removeClass("main-slider-on");
  secondarySliderCurrentImg.removeClass("secondary-slider-on");

  firstSliderId++;
  secondSliderId++;

  if (firstSliderId == 3) firstSliderId = 0;
  if (secondSliderId == 3) secondSliderId = 0;

  let mainSliderNextImg = $(".main-slider .main-slider-nav").find(
    `span[relOne=${firstSliderId}]`
  );

  let secondarySliderNextImg = $(
    ".secondary-slider .secondary-slider-nav"
  ).find(`span[relTwo=${secondSliderId}]`);

  $(mainSliderNextImg).addClass("main-slider-on");
  $(secondarySliderNextImg).addClass("secondary-slider-on");

  sliderJS(firstSliderId, $(".main-slider"));
  sliderJS(secondSliderId, $(".secondary-slider"));
}

// Burger menu ===================================================================================================================

$(menuBtn).on("click", () => {
  $(menuBtn).toggleClass("active");
  $(menu).toggleClass("active");
  $("body").toggleClass("locked");
});

// Анимация появления иконок ===================================================================================================================

const animItems = document.querySelectorAll(".animate-icons");

if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);

  function animOnScroll() {
    for (let i = 0; i < animItems.length; i++) {
      const animItem = animItems[i];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        scrollY > animItemOffset - animItemPoint &&
        scrollY < animItemOffset + animItemHeight
      ) {
        animItem.classList.add("animate-on");
        animItem.classList.add("animate-done");
      } else {
        if (!animItem.classList.contains("animate-done"))
          animItem.classList.remove("animate-on");
      }
    }
  }

  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.scrollY || document.documentElement.scroLLTop;

    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
}
