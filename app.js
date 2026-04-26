const tg = window.Telegram?.WebApp;
const tabs = document.querySelectorAll("[data-tab]");
const screens = document.querySelectorAll("[data-screen]");

if (tg) {
  tg.ready();
  tg.expand();
}

function showScreen(screenName) {
  const nextScreen = screenName === "dictionary" ? "dictionary" : "test";

  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.screen === nextScreen);
  });

  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === screenName);
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    showScreen(tab.dataset.tab);
  });
});
