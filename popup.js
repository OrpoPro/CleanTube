
const DEFAULTS_POPUP = {
  showNavigator: true,
  showMore: true,
  showFooter: true
};

function load() {
  chrome.storage.sync.get(DEFAULTS_POPUP, s => {
    nav.checked = s.showNavigator;
    more.checked = s.showMore;
    footer.checked = s.showFooter;
  });
}

function save() {
  chrome.storage.sync.set({
    showNavigator: nav.checked,
    showMore: more.checked,
    showFooter: footer.checked
  });
}

nav.onchange = save;
more.onchange = save;
footer.onchange = save;

load();
