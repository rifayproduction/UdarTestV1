const tg = window.Telegram?.WebApp;

const accentWords = [
  { correct: "аэропОрты", wrong: "аэропортЫ" },
  { correct: "аэропОрт", wrong: "аэрОпорт" },
  { correct: "бАнты", wrong: "бантЫ" },
  { correct: "бОроду", wrong: "борОду" },
  { correct: "бородА", wrong: "бОрода" },
  { correct: "бухгАлтеров", wrong: "бухгалтерОв" },
  { correct: "бухгАлтер", wrong: "бУхгалтер" },
  { correct: "вероисповЕдание", wrong: "вероисповедАние" },
  { correct: "водопровОд", wrong: "водопрОвод" },
  { correct: "газопровОд", wrong: "газопрОвод" },
  { correct: "граждАнство", wrong: "грАжданство" },
  { correct: "дефИс", wrong: "дЕфис" },
  { correct: "дешевИзна", wrong: "дешевизнА" },
  { correct: "диспансЕр", wrong: "диспАнсер" },
  { correct: "договорЁнность", wrong: "договОренность" },
  { correct: "докумЕнт", wrong: "дОкумент" },
  { correct: "досУг", wrong: "дОсуг" },
  { correct: "еретИк", wrong: "ерЕтик" },
  { correct: "жалюзИ", wrong: "жАлюзи" },
  { correct: "знАчимость", wrong: "значИмость" },
  { correct: "Иксы", wrong: "иксЫ" },
  { correct: "каталОг", wrong: "катАлог" },
  { correct: "квартАл", wrong: "квАртал" },
  { correct: "киломЕтр", wrong: "килОметр" },
  { correct: "кОнусов", wrong: "конусОв" },
  { correct: "кОнус", wrong: "конУс" },
  { correct: "корЫсть", wrong: "кОрысть" },
  { correct: "крАны", wrong: "кранЫ" },
  { correct: "кремЕнь", wrong: "крЕмень" },
  { correct: "кремнЯ", wrong: "крЕмня" },
  { correct: "лЕкторов", wrong: "лекторОв" },
  { correct: "лОктя", wrong: "локтЯ" },
  { correct: "локтЕй", wrong: "лОктей" },
  { correct: "лыжнЯ", wrong: "лЫжня" },
  { correct: "мЕстностей", wrong: "местностЕй" },
  { correct: "мЕстность", wrong: "местнОсть" },
  { correct: "намЕрение", wrong: "нАмерение" },
  { correct: "нарОст", wrong: "нАрост" },
  { correct: "нЕдруг", wrong: "недрУг" },
  { correct: "недУг", wrong: "нЕдуг" },
  { correct: "некролОг", wrong: "некрОлог" },
  { correct: "нЕнависть", wrong: "ненавИсть" },
  { correct: "нефтепровОд", wrong: "нефтепрОвод" },
  { correct: "новостЕй", wrong: "нОвостей" },
  { correct: "нОгтя", wrong: "ногтЯ" },
  { correct: "ногтЕй", wrong: "нОгтей" },
  { correct: "Отзыв", wrong: "отзЫв" },
  { correct: "отзЫв", wrong: "Отзыв" },
  { correct: "Отрочество", wrong: "отрОчество" },
  { correct: "партЕр", wrong: "пАртер" },
  { correct: "портфЕль", wrong: "пОртфель" },
  { correct: "пОручни", wrong: "поручнИ" },
  { correct: "придАное", wrong: "прИданое" },
  { correct: "призЫв", wrong: "прИзыв" },
  { correct: "свЁкла", wrong: "свеклА" },
  { correct: "сирОты", wrong: "сИроты" },
  { correct: "созЫв", wrong: "сОзыв" },
  { correct: "сосредотОчение", wrong: "сосредоточЕние" },
  { correct: "срЕдства", wrong: "средствА" },
  { correct: "стАтуя", wrong: "статУя" },
  { correct: "столЯр", wrong: "стОляр" },
  { correct: "тамОжня", wrong: "тАможня" },
  { correct: "тОрты", wrong: "тортЫ" },
  { correct: "тУфля", wrong: "туфлЯ" },
  { correct: "цемЕнт", wrong: "цЕмент" },
  { correct: "цЕнтнер", wrong: "центнЕр" },
  { correct: "цепОчка", wrong: "цЕпочка" },
  { correct: "шАрфы", wrong: "шарфЫ" },
  { correct: "шофЁр", wrong: "шОфер" },
  { correct: "экспЕрт", wrong: "Эксперт" },
  { correct: "вернА", wrong: "вЕрна" },
  { correct: "знАчимый", wrong: "значИмый" },
  { correct: "красИвее", wrong: "красивЕе" },
  { correct: "красИвейший", wrong: "красивЕйший" },
  { correct: "кУхонный", wrong: "кухОнный" },
  { correct: "ловкА", wrong: "лОвка" },
  { correct: "мозаИчный", wrong: "мозАичный" },
  { correct: "оптОвый", wrong: "Оптовый" },
  { correct: "прозорлИвый", wrong: "прозОрливый" },
  { correct: "прозорлИва", wrong: "прозОрлива" },
  { correct: "слИвовый", wrong: "сливОвый" },
  { correct: "бралА", wrong: "брАла" },
  { correct: "бралАсь", wrong: "брАлась" },
  { correct: "взялА", wrong: "взЯла" },
  { correct: "взялАсь", wrong: "взЯлась" },
  { correct: "влилАсь", wrong: "влИлась" },
  { correct: "ворвалАсь", wrong: "ворвАлась" },
  { correct: "воспринЯть", wrong: "воспрИнять" },
  { correct: "воспринялА", wrong: "воспрИняла" },
  { correct: "воссоздалА", wrong: "воссоздАла" },
  { correct: "вручИт", wrong: "врУчит" },
  { correct: "гналА", wrong: "гнАла" },
  { correct: "гналАсь", wrong: "гнАлась" },
  { correct: "добралА", wrong: "добрАла" },
  { correct: "добралАсь", wrong: "добрАлась" },
  { correct: "дождалАсь", wrong: "дождАлась" },
  { correct: "дозвонИтся", wrong: "дозвОнится" },
  { correct: "дозИровать", wrong: "дозировАть" },
];

const tabs = document.querySelectorAll("[data-tab]");
const screens = document.querySelectorAll("[data-screen]");
const startTestButton = document.getElementById("startTestButton");
const dictionarySearch = document.getElementById("dictionarySearch");
const dictionaryResults = document.getElementById("dictionaryResults");
const quizCounter = document.getElementById("quizCounter");
const answerGrid = document.getElementById("answerGrid");

let quizQuestions = [];
let quizIndex = 0;
let answerLocked = false;

if (tg) {
  tg.ready();
  tg.expand();
}

function plainWord(value) {
  return value
    .toLocaleLowerCase("ru-RU")
    .replace(/ё/g, "е")
    .trim();
}

function normalizeText(value) {
  return plainWord(value);
}

function formatStress(value) {
  const vowels = "аеёиоуыэюя";

  return [...value]
    .map((letter) => {
      const lower = letter.toLocaleLowerCase("ru-RU");
      const isStressedVowel = letter !== lower && vowels.includes(lower);

      if (isStressedVowel && lower === "ё") {
        return "ё";
      }

      if (isStressedVowel) {
        return `${lower}\u0301`;
      }

      return lower;
    })
    .join("");
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function showScreen(screenName) {
  if (screenName === "favorites") {
    return;
  }

  const nextScreen = screenName === "dictionary" || screenName === "quiz" ? screenName : "test";

  screens.forEach((screen) => {
    const isActive = screen.dataset.screen === nextScreen;
    screen.hidden = !isActive;
    screen.classList.toggle("active", isActive);
  });

  tabs.forEach((tab) => {
    const activeTab = nextScreen === "dictionary" ? "dictionary" : "test";
    tab.classList.toggle("active", tab.dataset.tab === activeTab);
  });

  if (nextScreen === "dictionary") {
    dictionarySearch.focus();
  }
}

function renderDictionary() {
  const query = normalizeText(dictionarySearch.value.trim());
  dictionaryResults.innerHTML = "";
  dictionaryResults.hidden = !query;

  if (!query) {
    return;
  }

  const words = accentWords.filter((word) => normalizeText(word.correct).includes(query));

  if (!words.length) {
    dictionaryResults.innerHTML = '<div class="empty-state">Ничего не найдено</div>';
    return;
  }

  words.forEach((word) => {
    const row = document.createElement("div");
    row.className = "word-row";
    row.textContent = formatStress(word.correct);
    dictionaryResults.append(row);
  });
}

function startQuiz() {
  quizQuestions = shuffle(accentWords).slice(0, 3).map((word) => ({
    ...word,
    answers: shuffle([
      { text: word.correct, isCorrect: true },
      { text: word.wrong, isCorrect: false },
    ]),
  }));
  quizIndex = 0;
  answerLocked = false;
  showScreen("quiz");
  renderQuizQuestion();
}

function finishQuiz() {
  showScreen("test");
}

function renderQuizQuestion() {
  const question = quizQuestions[quizIndex];
  answerLocked = false;

  quizCounter.textContent = `${quizIndex + 1} из ${quizQuestions.length}`;
  answerGrid.innerHTML = "";

  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = formatStress(answer.text);
    button.addEventListener("click", () => handleAnswer(button, answer.isCorrect));
    answerGrid.append(button);
  });
}

function handleAnswer(button, isCorrect) {
  if (answerLocked) {
    return;
  }

  answerLocked = true;
  button.classList.add(isCorrect ? "correct" : "wrong");
  tg?.HapticFeedback?.notificationOccurred(isCorrect ? "success" : "error");

  window.setTimeout(() => {
    quizIndex += 1;

    if (quizIndex >= quizQuestions.length) {
      finishQuiz();
      return;
    }

    renderQuizQuestion();
  }, 650);
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    showScreen(tab.dataset.tab);
  });
});

startTestButton.addEventListener("click", startQuiz);
dictionarySearch.addEventListener("input", renderDictionary);

renderDictionary();
showScreen("test");
