(function () {
  var toggle = document.querySelector(".nav-toggle");
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
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

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
