const languageButtons = document.querySelectorAll("[data-language]");
const languagePanels = document.querySelectorAll("[data-language-panel]");
const translatedLabels = document.querySelectorAll("[data-lang-label]");

const pageMetadata = {
  zh: {
    htmlLanguage: "zh-CN",
    title: "付强（Sean Fu）｜研发组织与工程平台负责人",
    description:
      "付强（Sean Fu），研发组织与工程平台负责人，专注 Developer Productivity、移动基础设施与团队建设。",
  },
  en: {
    htmlLanguage: "en",
    title: "Sean Fu | Engineering Platforms & Developer Productivity Leader",
    description:
      "Sean Fu is an engineering leader focused on developer productivity, engineering platforms, mobile infrastructure, and team building.",
  },
};

function setLanguage(language, updateUrl = true) {
  const selectedLanguage = language === "en" ? "en" : "zh";
  const metadata = pageMetadata[selectedLanguage];

  languagePanels.forEach((panel) => {
    panel.hidden = panel.dataset.languagePanel !== selectedLanguage;
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.language === selectedLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  translatedLabels.forEach((label) => {
    label.hidden = label.dataset.langLabel !== selectedLanguage;
  });

  document.documentElement.lang = metadata.htmlLanguage;
  document.title = metadata.title;
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", metadata.description);

  try {
    window.localStorage.setItem("resume-language", selectedLanguage);
  } catch {
    // The language still works when storage is unavailable.
  }

  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", selectedLanguage);
    window.history.replaceState({}, "", url);
  }
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.language);
  });
});

document.querySelector("[data-print]")?.addEventListener("click", () => {
  window.print();
});

const urlLanguage = new URLSearchParams(window.location.search).get("lang");
let storedLanguage = null;

try {
  storedLanguage = window.localStorage.getItem("resume-language");
} catch {
  storedLanguage = null;
}

const browserLanguage = navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
setLanguage(urlLanguage || storedLanguage || browserLanguage, false);
