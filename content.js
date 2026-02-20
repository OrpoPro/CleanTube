function isHomePage() {
  const browse = document.querySelector('ytd-browse[page-subtype="home"]');
  return !!browse;
}

function applyTopChipsSettings(settings) {
  if (!isHomePage()) return;

  const show = settings.showTopChips;

  const home = document.querySelector('ytd-browse[page-subtype="home"]');
  if (!home) return;

  // ищем чипсы ТОЛЬКО внутри главной
  home.querySelectorAll("ytd-feed-filter-chip-bar-renderer")
    .forEach(el => {
      el.style.display = show ? "" : "none";
    });

  // контейнер
  const frosted = document.getElementById("frosted-glass");
  if (frosted) {
    if (show) {
      frosted.classList.add("with-chipbar");
      frosted.classList.remove("no-chipbar-by-ext");
    } else {
      frosted.classList.remove("with-chipbar");
      frosted.classList.add("no-chipbar-by-ext");
    }
  }
}

(function addChipbarFixStyle() {
  if (document.getElementById("yt-chipbar-fix")) return;

  const style = document.createElement("style");
  style.id = "yt-chipbar-fix";
  style.textContent = `
    #frosted-glass.no-chipbar-by-ext {
      height: 0 !important;
      min-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
    }
  `;
  document.documentElement.appendChild(style);
})();