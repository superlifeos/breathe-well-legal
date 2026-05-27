(function () {
  var storageKey = "breatheWellMinimalLegalLanguage";

  function normalize(value) {
    return value === "zh-Hans" ? "zh-Hans" : "en";
  }

  function applyLanguage(language) {
    var next = normalize(language);
    document.documentElement.dataset.lang = next;
    document.documentElement.lang = next;

    var title = document.documentElement.dataset[next === "en" ? "titleEn" : "titleZh"];
    if (title) {
      document.title = title;
    }

    var button = document.querySelector("[data-language-toggle]");
    if (button) {
      button.textContent = next === "en" ? "中文" : "English";
      button.setAttribute("aria-label", next === "en" ? "Switch to Chinese" : "切换到英文");
    }

    try {
      localStorage.setItem(storageKey, next);
    } catch (_) {}
  }

  document.addEventListener("DOMContentLoaded", function () {
    var saved = "en";
    try {
      saved = localStorage.getItem(storageKey) || "en";
    } catch (_) {}

    applyLanguage(saved);

    var button = document.querySelector("[data-language-toggle]");
    if (button) {
      button.addEventListener("click", function () {
        applyLanguage(document.documentElement.dataset.lang === "zh-Hans" ? "en" : "zh-Hans");
      });
    }
  });
})();
