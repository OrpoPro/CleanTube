const DEFAULTS = {
  showNavigator: true,
  showMore: true,
  showFooter: true,
  showTopChips: true
};

function getSettings() {
  return new Promise(resolve => {
    chrome.storage.sync.get(DEFAULTS, s => resolve(s));
  });
}

function setDisplay(el, show) {
  el.style.display = show ? "" : "none";
}

function applySidebarSettings(settings) {
  document.querySelectorAll("ytd-guide-section-renderer").forEach(section => {
    const titleEl = section.querySelector("#guide-section-title");
    if (!titleEl) return;

    const title = titleEl.innerText.trim().toLowerCase();

    if (title.includes("навигатор")) {
      setDisplay(section, settings.showNavigator);
    }

    if (title.includes("другие возможности")) {
      setDisplay(section, settings.showMore);
    }
  });

  document.querySelectorAll("#footer, ytd-guide-section-renderer[is-footer]")
    .forEach(el => setDisplay(el, settings.showFooter));
}


function applyTopChipsSettings(settings) {
  const show = settings.showTopChips;

  // сами чипсы
  document.querySelectorAll(
    "ytd-feed-filter-chip-bar-renderer, yt-chip-cloud-renderer"
  ).forEach(el => {
    el.style.display = show ? "" : "none";
  });

  // контейнер frosted-glass который держит высоту
  const frosted = document.getElementById("frosted-glass");
  if (frosted) {
    if (show) {
      frosted.classList.remove("no-chipbar-by-ext");
    } else {
      frosted.classList.remove("with-chipbar");
      frosted.classList.add("no-chipbar-by-ext");
    }
  }
}



// дополнительный CSS-фикс контейнера
function ensureStyleFix() {
  if (document.getElementById("yt-cleaner-style")) return;

  const style = document.createElement("style");
  style.id = "yt-cleaner-style";
  style.textContent = `
    ytd-feed-filter-chip-bar-renderer[hidden-by-ext],
    yt-chip-cloud-renderer[hidden-by-ext] {
      display: none !important;
      height: 0 !important;
      min-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
    }
  `;
  document.documentElement.appendChild(style);
}

function markChipsHidden(settings) {
  const hide = !settings.showTopChips;

  document.querySelectorAll(
    "ytd-feed-filter-chip-bar-renderer, yt-chip-cloud-renderer"
  ).forEach(el => {
    if (hide) el.setAttribute("hidden-by-ext", "1");
    else el.removeAttribute("hidden-by-ext");
  });
}


async function applyAll() {
  const settings = await getSettings();
  applySidebarSettings(settings);
  applyTopChipsSettings(settings);
  ensureStyleFix();
  markChipsHidden(settings);
}

const observer = new MutationObserver(() => applyAll());
observer.observe(document.body, { childList: true, subtree: true });

applyAll();
chrome.storage.onChanged.addListener(() => applyAll());


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
