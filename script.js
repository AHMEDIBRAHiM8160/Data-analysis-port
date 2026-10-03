document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("introScreen");
  const site = document.getElementById("siteShell");
  const menuButton = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");

  // Keep the welcome screen visible for approximately 2.7 seconds.
  window.setTimeout(() => {
    intro.classList.add("hide");
    site.classList.add("ready");
  }, 2700);

  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  // Update the active navigation item while scrolling.
  const sections = ["home", "data-analysis", "web-design", "about", "contact"]
    .map(id => document.getElementById(id));
  const navLinks = [...nav.querySelectorAll("a")];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach(section => section && observer.observe(section));
});