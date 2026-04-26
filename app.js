const tg = window.Telegram?.WebApp;
const tabs = document.querySelectorAll("[data-tab]");
const screens = document.querySelectorAll("[data-screen]");

if (tg) {
  tg.ready();
  tg.expand();
}

function showScreen(screenName) {
  if (screenName === "favorites") {
    return;
  }

  const nextScreen = screenName === "dictionary" ? "dictionary" : "test";

  screens.forEach((screen) => {
    const isActive = screen.dataset.screen === nextScreen;
    screen.hidden = !isActive;
    screen.classList.toggle("active", isActive);
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

showScreen("test");
