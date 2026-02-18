const DEFAULTS_POPUP = {
  showNavigator: true,
  showMore: true,
  showFooter: true,
  showTopChips: true
};

function load() {
  chrome.storage.sync.get(DEFAULTS_POPUP, s => {
    nav.checked = s.showNavigator;
    more.checked = s.showMore;
    footer.checked = s.showFooter;
    chips.checked = s.showTopChips;
  });
}

function save() {
  chrome.storage.sync.set({
    showNavigator: nav.checked,
    showMore: more.checked,
    showFooter: footer.checked,
    showTopChips: chips.checked
  });
}

nav.onchange = save;
more.onchange = save;
footer.onchange = save;
chips.onchange = save;

load();
