(function () {
  var toggle = document.querySelector(".nav-toggle");
  var closeBtn = document.querySelector(".nav-close");
  var nav = document.getElementById("site-nav");
  var links = nav ? Array.prototype.slice.call(nav.querySelectorAll("a[href^='#']")) : [];
  var menuLinks = nav ? Array.prototype.slice.call(nav.querySelectorAll("a")) : [];
  var year = document.getElementById("year");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  function setOpen(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        setOpen(false);
      });
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });

    menuLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });

    document.addEventListener("click", function (event) {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) {
        setOpen(false);
      }
    });
  }

  var sectionToNav = {
    home: "#home",
    experience: "#experience",
    skills: "#projects",
    projects: "#projects",
    research: "#research",
    contact: "#contact"
  };

  function setCurrent(href) {
    links.forEach(function (link) {
      link.setAttribute("aria-current", link.getAttribute("href") === href ? "true" : "false");
    });
  }

  var sections = document.querySelectorAll("main section[id]");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion && "IntersectionObserver" in window) {
    document.documentElement.classList.add("js-motion");

    var motionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-inview");
          motionObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    document
      .querySelectorAll(".timeline, .timeline > li, .project, .skill-list > div, .education")
      .forEach(function (el) {
        motionObserver.observe(el);
      });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          setCurrent(sectionToNav[entry.target.id] || "#home");
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }
})();
