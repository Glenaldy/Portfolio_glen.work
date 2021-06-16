$(function () {
  toggleOverlay($(".menu-toggle"), $(".menu-overlay"));
  toggleOverlay(
    $(".menu-toggle"),
    $(".menu-overlay .menu-toggle"),
    function () {
      crossMenu();
    }
  );
  workGenre();
  textExpander($("#cfa-press"), $("#about-text"));
  headerOpacity();
  scrollUp($(".scroll-up"));
  /*Background related*/

  $("#cloud-normal")
    .children()
    .each(function () {
      moveCloud(this);
    });
  $("#cloud-snow")
    .children()
    .each(function () {
      moveCloud(this);
    });
  shakeBranch($("#sakura").children());

  aboutLanguageSelector();
});
function aboutLanguageSelector() {
  $(".language-selector")
    .children()
    .on("click", function () {
      let text = $(".about-text");
      console.log(text);
      text.removeClass("current");
      let idLang = $(this).data("lang");
      console.log(idLang);
      text.each(function (element) {
        if ($(this).attr("id") == idLang) {
          $(this).addClass("current");
        }
      });
    });
}
function workGenre() {
  function openGenre(genre) {
    target.attr("status", "opened");
    genre.css({ display: "block" });
    genre.transition({ opacity: 1 }, 300, "easeInOutCubic");
    $(".arrow-down").addClass("pressed");
  }
  function closeGenre(genre) {
    target.attr("status", "closed");
    genre.not(".selected").css({ display: "none", opacity: "0" });
    $(".arrow-down").removeClass("pressed");
  }
  let target = $("#work-genre");
  $("#dropdown-button").on("click", function () {
    if (target.attr("status") == "closed") {
      openGenre(target.find("ul li"));
    } else if (target.attr("status") == "opened") {
      closeGenre(target.find("ul li"));
    }
  });
  target.find("ul li").on("click", function () {
    if (
      target.find("ul li").hasClass("selected") &&
      target.attr("status") == "closed"
    ) {
      openGenre(target.find("ul li"));
    } else {
      let current_select = $(this);
      target.find("ul li").removeClass("selected");
      current_select.addClass("selected");
      target.attr("status", "closed");
      closeGenre(target.find("ul li"));
      /*Change work-list*/
      let work_list = $("#work-list").children();
      work_list.each(function () {
        $(this).addClass("genre-selected");
        if (
          !$(this).data("genre").includes(current_select.data("genre")) &&
          current_select.data("genre") != "all"
        ) {
          $(this).removeClass("genre-selected");
        }
      });
    }
  });
}
function headerOpacity() {
  $(window).scroll(function () {
    if (
      $(this).scrollTop() <= 50 ||
      $(window).scrollTop() + $(window).height() + 50 > $(document).height()
    ) {
      $("header#global-header")
        .children()
        .stop(true)
        .transition({ display: "flex", opacity: 1 }, 500, "easeInOutCubic");
    } else {
      $("header#global-header .global-header_home")
        .stop(true)
        .transition({ opacity: 0 }, 500, "easeInOutCubic")
        .transition({ display: "none" });
      $("header#global-header .global-header_nav")
        .stop(true, true)
        .transition({ opacity: 0.4 }, 500, "easeInOutCubic");
    }
  });
}
function scrollUp(target) {
  target.on("click", function () {
    $("html,body").animate({ scrollTop: 0 }, 800);
    return false;
  });
}
function textExpander(source, target) {
  $(source).on("click", function () {
    $(target).addClass("expand");
    $(".text-expander").transition({ rotate: "0deg" }, 1000, "easeInOutCubic");
    $("#cfa-text").css("display", "block");
    $("#cfa-text").transition({ opacity: 1 }, 1000, "easeInOutCubic");
  });
}
function moveCloud(cloud) {
  function moveThis() {
    let width = $(document).width() + 300,
      current = parseInt($(cloud).css("left")),
      timeRand = getRndInteger(20000, 30000),
      random = (timeRand * (width - current)) / width;
    //console.log(random);
    $(cloud)
      .transition({ x: width - current }, random, "linear", function () {
        //console.log("move done");
      })
      .transition({ x: 0 }, 0, function () {
        $(cloud).css("left", "-300px");
        moveThis();
      });
  }
  moveThis();
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function crossMenu() {
  $(".menu-toggle").on("click", function () {
    $(".menu-overlay .menu-toggle.toggle-active").children().css({
      rotate: "0deg",
      opacity: 1,
    });
  });
  $(".menu-toggle").on("click", function () {
    $(".menu-toggle.toggle-active .bar1").transition(
      {
        rotate: "-45deg",
        delay: 300,
      },
      500,
      "easeInOutCubic"
    );
    $(".menu-toggle.toggle-active .bar3").transition(
      {
        rotate: "45deg",
        delay: 300,
      },
      300,
      "easeInOutCubic"
    );
    $(".menu-toggle.toggle-active .bar2").transition(
      { opacity: 0 },
      500,
      "easeInOutCubic"
    );
  });
}
function toggleOverlay(source, target, callback) {
  $(source).on("click", function () {
    $(target).toggleClass("toggle-active");
    $(".menu-overlay.toggle-active")
      //.css({ opacity: 0 })
      .transition({ opacity: 1 }, 500, "easeInOutCubic");
  });
  //$(".menu-overlay").transition({ opacity: 1 }, 3000, "easeInOutCubic");

  if (typeof callback == "function") callback();
}
function shakeBranch(tree) {
  $(tree).each(function () {
    let degreeRand = getRndInteger(-1, 2);
    let delayRand = getRndInteger(200, 3000);
    let timeRand = getRndInteger(4000, 5000);
    $(this).transition(
      {
        rotate: degreeRand + "deg",
        delay: delayRand,
        "transform-origin": "top right",
      },
      timeRand,
      "easeInOutCubic",
      function () {
        shakeBranch(this);
      }
    );
  });
}
