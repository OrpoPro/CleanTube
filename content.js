function hideSections() {
  // скрываем разделы по заголовкам
  document.querySelectorAll("ytd-guide-section-renderer").forEach(section => {
    const titleEl = section.querySelector("#guide-section-title");
    if (!titleEl) return;

    const title = titleEl.innerText.trim().toLowerCase();

    if (
      title.includes("навигатор") ||
      title.includes("другие возможности")
    ) {
      section.style.display = "none";
    }
  });

  // скрываем футерный блок ссылок целиком
  document.querySelectorAll("#footer, ytd-guide-section-renderer[is-footer]").forEach(el => {
    el.style.display = "none";
  });
}

// YouTube — SPA, отслеживаем перерисовки
const observer = new MutationObserver(hideSections);
observer.observe(document.body, { childList: true, subtree: true });

hideSections();
