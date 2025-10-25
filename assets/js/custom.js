$(document).ready(function() {
  const audios = $("audio");

  $(".play-btn").each(function() {
    const btn = $(this);
    const audioId = btn.data("audio");
    const audio = document.getElementById(audioId);
    const ring = btn.siblings("svg").find(".jp-progress-ring");
    const radius = 22;
    const circumference = 2 * Math.PI * radius;
    ring.css("stroke-dasharray", circumference);
    ring.css("stroke-dashoffset", circumference);

    btn.on("click", function() {
      // 🔇 Stoppe alle anderen Audios
      audios.each(function() {
        if (this !== audio) {
          this.pause();
          this.currentTime = 0;
          $(".play-btn").filter(`[data-audio='${this.id}']`).text("▶");
          const otherRing = $(".play-btn").filter(`[data-audio='${this.id}']`).siblings("svg").find(".jp-progress-ring");
          otherRing.css("stroke-dashoffset", 2 * Math.PI * 22); // zurücksetzen
        }
      });

      // ⏯️ Aktuelles Audio abspielen/pausieren
      if (audio.paused) {
        audio.play();
        btn.text("❚❚"); // Pause-Symbol
      } else {
        audio.pause();
        btn.text("▶"); // Play-Symbol
      }
    });

    // Fortschrittsring aktualisieren
    audio.ontimeupdate = function() {
      const progress = audio.currentTime / audio.duration;
      const offset = circumference - progress * circumference;
      ring.css("stroke-dashoffset", offset);
    };

    // Zurücksetzen, wenn Song endet
    audio.onended = function() {
      btn.text("▶");
      ring.css("stroke-dashoffset", circumference);
    };
  });
});


window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  const scrollY = window.scrollY;

  if (scrollY > 100) { // ab 100px Scrollhöhe
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

//hamburger
$(document).ready(function() {
  const $toggle = $(".navbar-toggle");
  const $collapse = $(".navbar-collapse.collapse");
  const $overlay = $(".mobile-overlay");

  $toggle.click(function() {
    // Prevent flash: hide default collapse instantly
    $collapse.css('display', 'block');

    // Toggle slide-in menu with smooth transition
    $collapse.toggleClass("open");

    // Toggle overlay
    $overlay.toggleClass("active");

    // Toggle hamburger → X icon
    $toggle.toggleClass("open");
  });

  $overlay.click(function() {
    // Close slide-in menu
    $collapse.removeClass("open");

    // Hide overlay
    $(this).removeClass("active");

    // Reset hamburger icon
    $toggle.removeClass("open");
  });

  // Optional: handle transition end to reset display if menu closed
  $collapse.on('transitionend webkitTransitionEnd oTransitionEnd', function() {
    if (!$collapse.hasClass("open")) {
      $collapse.css('display', '');
    }
  });
});
