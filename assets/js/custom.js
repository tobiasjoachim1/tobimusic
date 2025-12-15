console.log("custom.js loaded");


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

    // set initial icon
    btn.html('<i class="bi bi-play-fill"></i>');

    btn.on("click", function() {
      // 🔇 Stop all other audios
      audios.each(function() {
        if (this !== audio) {
          this.pause();
          this.currentTime = 0;
          const otherBtn = $(".play-btn").filter(`[data-audio='${this.id}']`);
          otherBtn.html('<i class="bi bi-play-fill"></i>');
          const otherRing = otherBtn.siblings("svg").find(".jp-progress-ring");
          otherRing.css("stroke-dashoffset", 2 * Math.PI * 22); // reset
        }
      });

      // ⏯️ Play / pause current audio
      if (audio.paused) {
        audio.play();
        btn.html('<i class="bi bi-pause-fill"></i>');
      } else {
        audio.pause();
        btn.html('<i class="bi bi-play-fill"></i>');
      }
    });

    // update progress ring
    audio.ontimeupdate = function() {
      const progress = audio.currentTime / audio.duration;
      const offset = circumference - progress * circumference;
      ring.css("stroke-dashoffset", offset);
    };

    // reset when song ends
    audio.onended = function() {
      btn.html('<i class="bi bi-play-fill"></i>');
      ring.css("stroke-dashoffset", circumference);
    };
  });
});



window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  const collapseMenu = document.querySelector('#navbar-collapse');

  // If mobile menu is open, skip scroll effect
  if (collapseMenu.classList.contains('open')) return;

  if (window.scrollY > 100) { // adjust threshold if needed
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


//hamburger
$(document).ready(function() {
  const $toggle = $("#custom-navbar-toggle");
  const $collapse = $("#navbar-collapse");
  const $overlay = $(".mobile-overlay");

  $toggle.click(function() {
    const isOpen = $collapse.hasClass("open");
    $collapse.toggleClass("open");
    $overlay.toggleClass("active");
    $toggle.toggleClass("open");

    // Force remove Bootstrap’s “collapsed” background state
    if (isOpen) {
      $toggle.addClass("collapsed");
    } else {
      $toggle.removeClass("collapsed");
    }

    // Remove focus immediately (fallback)
    setTimeout(() => $toggle.blur(), 10);
  });

  $overlay.click(function() {
    $collapse.removeClass("open");
    $overlay.removeClass("active");
    $toggle.removeClass("open").addClass("collapsed");
    $toggle.blur();
  });
});
