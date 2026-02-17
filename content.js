const DEFAULTS = {
  showNavigator: true,
  showMore: true,
  showFooter: true
};

function getSettings() {
  return new Promise(resolve => {
    chrome.storage.sync.get(DEFAULTS, s => resolve(s));
  });
}

async function hideSections() {
  const settings = await getSettings();

  document.querySelectorAll("ytd-guide-section-renderer").forEach(section => {
    const titleEl = section.querySelector("#guide-section-title");
    if (!titleEl) return;

    const title = titleEl.innerText.trim().toLowerCase();

    if (title.includes("навигатор")) {
      section.style.display = settings.showNavigator ? "" : "none";
    }

    if (title.includes("другие возможности")) {
      section.style.display = settings.showMore ? "" : "none";
    }
  });

  document.querySelectorAll("#footer, ytd-guide-section-renderer[is-footer]")
    .forEach(el => {
      el.style.display = settings.showFooter ? "" : "none";
    });
}

const observer = new MutationObserver(() => hideSections());
observer.observe(document.body, { childList: true, subtree: true });

hideSections();

chrome.storage.onChanged.addListener(() => hideSections());