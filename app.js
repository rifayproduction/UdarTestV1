const tg = window.Telegram?.WebApp;

const QUIZ_LENGTH = 10;
const MISTAKES_STORAGE_KEY = "egeAccentMistakes";

const baseAccentWords = [
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

const additionalWordForms = [
  "ждалА",
  "жилОсь",
  "закУпорить",
  "занЯть",
  "зАнял",
  "занялА",
  "зАняли",
  "заперлА",
  "запломбировАть",
  "защемИт",
  "звалА",
  "звонИт",
  "клАла",
  "клЕить",
  "крАлась",
  "кровоточИть",
  "лгалА",
  "лилА",
  "лилАсь",
  "навралА",
  "наделИт",
  "надорвалАсь",
  "назвалАсь",
  "назвАлся",
  "накренИтся",
  "налилА",
  "нарвалА",
  "начАть",
  "нАчал",
  "началА",
  "нАчали",
  "обзвонИт",
  "облегчИть",
  "облегчИт",
  "облилАсь",
  "обнЯлась",
  "обогналА",
  "ободралА",
  "ободрИть",
  "ободрИт",
  "ободрИться",
  "ободрИтся",
  "обострИть",
  "одолжИть",
  "одолжИт",
  "озлОбить",
  "оклЕить",
  "окружИт",
  "опОшлить",
  "освЕдомиться",
  "освЕдомится",
  "отбылА",
  "отдалА",
  "откУпорить",
  "отозвалА",
  "отозвалАсь",
  "перезвонИт",
  "перелилА",
  "перелИть",
  "плодоносИть",
  "пломбировАть",
  "повторИт",
  "позвалА",
  "позвонИт",
  "полилА",
  "положИть",
  "положИл",
  "понЯть",
  "понялА",
  "послАла",
  "прибЫть",
  "прИбыл",
  "прибылА",
  "прИбыли",
  "принЯть",
  "прИнял",
  "принялА",
  "прИняли",
  "рвалА",
  "сверлИт",
  "снялА",
  "сорвалА",
  "создалА",
  "собралА",
  "сорИт",
  "убралА",
  "углубИть",
  "укрепИт",
  "чЕрпать",
  "щемИт",
  "щЁлкать",
  "закУпорив",
  "начАв",
  "начАвшись",
  "отдАв",
  "поднЯв",
  "понЯв",
  "прибЫв",
  "создАв",
  "довезЁнный",
  "зАгнутый",
  "зАнятый",
  "занятА",
  "зАпертый",
  "заселЁнный",
  "заселенА",
  "кормЯщий",
  "кровоточАщий",
  "нажИвший",
  "налИвший",
  "нанЯвшийся",
  "начАвший",
  "нАчатый",
  "низведЁнный",
  "облегчЁнный",
  "ободрЁнный",
  "обострЁнный",
  "отключЁнный",
  "повторЁнный",
  "поделЁнный",
  "понЯвший",
  "прИнятый",
  "принятА",
  "приручЁнный",
  "прожИвший",
  "снятА",
  "сОгнутый",
  "углублЁнный",
  "вОвремя",
  "дОверху",
  "донЕльзя",
  "дОнизу",
  "дОсуха",
  "зАсветло",
  "зАтемно",
  "красИвее",
  "надОлго",
  "ненадОлго",
];

const additionalAccentWords = additionalWordForms.map((correct) => ({
  correct,
  wrong: makeWrongAccent(correct),
}));

const accentWords = dedupeWords([...baseAccentWords, ...additionalAccentWords]);

const tabs = document.querySelectorAll("[data-tab]");
const screens = document.querySelectorAll("[data-screen]");
const modeButtons = document.querySelectorAll("[data-mode]");
const startTestButton = document.getElementById("startTestButton");
const dictionarySearch = document.getElementById("dictionarySearch");
const dictionaryResults = document.getElementById("dictionaryResults");
const quizCounter = document.getElementById("quizCounter");
const answerGrid = document.getElementById("answerGrid");
const mistakesCount = document.getElementById("mistakesCount");
const modeHint = document.getElementById("modeHint");

let quizQuestions = [];
let quizIndex = 0;
let answerLocked = false;
let selectedMode = "all";
let mistakes = loadMistakes();

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

function dedupeWords(words) {
  const seen = new Set();

  return words.filter((word) => {
    const key = normalizeText(word.correct);

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function makeWrongAccent(correct) {
  const vowels = "аеёиоуыэюя";
  const letters = [...correct];
  const lowerLetters = letters.map((letter) =>
    letter.toLocaleLowerCase("ru-RU").replace(/ё/g, "е")
  );
  const stressedIndex = letters.findIndex((letter) => {
    const lower = letter.toLocaleLowerCase("ru-RU");
    return letter !== lower && vowels.includes(lower);
  });
  const vowelIndexes = lowerLetters
    .map((letter, index) => (vowels.includes(letter) ? index : -1))
    .filter((index) => index !== -1);
  const wrongIndex = vowelIndexes.find((index) => index !== stressedIndex);

  if (wrongIndex === undefined) {
    return correct;
  }

  return lowerLetters
    .map((letter, index) => (index === wrongIndex ? letter.toLocaleUpperCase("ru-RU") : letter))
    .join("");
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

function loadMistakes() {
  try {
    return JSON.parse(localStorage.getItem(MISTAKES_STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveMistakes() {
  localStorage.setItem(MISTAKES_STORAGE_KEY, JSON.stringify(mistakes));
}

function updateMistakeStats(word, isCorrect) {
  const key = normalizeText(word.correct);

  if (!isCorrect) {
    mistakes[key] = {
      correct: word.correct,
      wrong: word.wrong,
      count: (mistakes[key]?.count || 0) + 1,
    };
    saveMistakes();
    renderModeState();
    return;
  }

  if (selectedMode === "mistakes" && mistakes[key]) {
    mistakes[key].count -= 1;

    if (mistakes[key].count <= 0) {
      delete mistakes[key];
    }

    saveMistakes();
    renderModeState();
  }
}

function getMistakeWords() {
  const mistakeKeys = new Set(Object.keys(mistakes));
  return accentWords.filter((word) => mistakeKeys.has(normalizeText(word.correct)));
}

function renderModeState() {
  const count = Object.keys(mistakes).length;

  if (mistakesCount) {
    mistakesCount.textContent = count;
  }

  if (selectedMode === "mistakes" && count === 0) {
    if (modeHint) {
      modeHint.textContent = "Ошибок пока нет";
    }
    startTestButton.disabled = true;
    return;
  }

  if (modeHint) {
    modeHint.textContent = selectedMode === "mistakes" ? `Слов с ошибками: ${count}` : "";
  }
  startTestButton.disabled = false;
}

function setMode(mode) {
  selectedMode = mode;

  modeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });

  renderModeState();
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
  const sourceWords = selectedMode === "mistakes" ? getMistakeWords() : accentWords;

  if (!sourceWords.length) {
    renderModeState();
    return;
  }

  quizQuestions = shuffle(sourceWords).slice(0, QUIZ_LENGTH).map((word) => ({
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

  const question = quizQuestions[quizIndex];
  answerLocked = true;
  button.classList.add(isCorrect ? "correct" : "wrong");
  updateMistakeStats(question, isCorrect);
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

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setMode(button.dataset.mode);
  });
});

startTestButton.addEventListener("click", startQuiz);
dictionarySearch.addEventListener("input", renderDictionary);

renderDictionary();
renderModeState();
showScreen("test");
