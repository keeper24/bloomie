/**
 * Bloomie — client-side prototype logic.
 *
 * A small screen-router plus the diagnostic flow. State is kept in memory
 * and mirrored to localStorage so a returning visitor keeps their profile.
 *
 * Content (questions, results, products) lives in js/data.js.
 */
const app = {
  currentScreen: "login",
  diagnosticStep: 0,
  diagnosticAnswers: [],
  currentProduct: null,
  previousScreen: "home",
  userData: {
    name: "Hana",
    skinType: null,
    concerns: [],
    favorites: [],
  },

  // Screens that update themselves whenever they become active.
  screenRefreshers: {
    home: "updateHomeScreen",
  },

  init() {
    this.loadUserData();
    this.showScreen(this.currentScreen);
    this.updateBottomNav();
  },

  // --- Persistence -------------------------------------------------------

  loadUserData() {
    const saved = localStorage.getItem("bloomieUserData");
    if (saved) {
      this.userData = { ...this.userData, ...JSON.parse(saved) };
    }
    const favorites = localStorage.getItem("bloomieFavorites");
    if (favorites) {
      this.userData.favorites = JSON.parse(favorites);
    }
  },

  saveUserData() {
    localStorage.setItem("bloomieUserData", JSON.stringify(this.userData));
    localStorage.setItem("bloomieFavorites", JSON.stringify(this.userData.favorites));
  },

  // --- Navigation --------------------------------------------------------

  showScreen(screenName) {
    document.querySelectorAll(".screen").forEach((screen) => {
      screen.classList.remove("active");
    });

    const targetScreen = document.getElementById(`screen-${screenName}`);
    if (!targetScreen) return;

    targetScreen.classList.add("active");
    this.currentScreen = screenName;
    this.updateBottomNav();

    const refresher = this.screenRefreshers[screenName];
    if (refresher) this[refresher]();
  },

  updateBottomNav() {
    const navItems = document.querySelectorAll(".bottom-nav .nav-item");
    navItems.forEach((item) => item.classList.remove("is-active"));

    const navIndex = { home: 0, catalog: 1, dashboard: 2 };
    const index = navIndex[this.currentScreen];
    if (index !== undefined && navItems[index]) {
      navItems[index].classList.add("is-active");
    }
  },

  login(provider) {
    // Social login is mocked for the prototype — just move to Home.
    setTimeout(() => {
      this.showScreen("home");
      this.updateHomeScreen();
    }, 300);
  },

  logout() {
    if (confirm("Are you sure you want to logout?")) {
      this.showScreen("login");
    }
  },

  updateHomeScreen() {
    const userNameEl = document.getElementById("user-name");
    if (userNameEl) userNameEl.textContent = this.userData.name;
  },

  // --- Diagnostic flow ---------------------------------------------------

  startDiagnostic() {
    this.diagnosticStep = 0;
    this.diagnosticAnswers = [];
    this.previousScreen = this.currentScreen;
    this.showScreen("diagnostic");
    this.updateDiagnosticScreen();
  },

  updateDiagnosticScreen() {
    const question = DIAGNOSTIC_QUESTIONS[this.diagnosticStep];
    if (!question) return;

    const total = DIAGNOSTIC_QUESTIONS.length;
    document.getElementById("diagnostic-step").textContent = this.diagnosticStep + 1;
    document.getElementById("diagnostic-question").textContent = question.question;
    document.getElementById("progress-fill").style.width =
      ((this.diagnosticStep + 1) / total) * 100 + "%";

    const optionsContainer = document.getElementById("diagnostic-options");
    optionsContainer.innerHTML = "";

    question.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.className = "button button-option";
      button.textContent = option.text;
      button.onclick = () => this.selectDiagnosticOption(index);
      if (this.diagnosticAnswers[this.diagnosticStep] === index) {
        button.classList.add("selected");
      }
      optionsContainer.appendChild(button);
    });

    const answered = this.diagnosticAnswers[this.diagnosticStep] !== undefined;
    const isLastStep = this.diagnosticStep === total - 1;
    this.setNextButtonState(answered);
    document.getElementById("diagnostic-next").textContent = isLastStep
      ? "See My Results"
      : "Next";
  },

  setNextButtonState(enabled) {
    const nextButton = document.getElementById("diagnostic-next");
    nextButton.classList.toggle("button-disabled", !enabled);
    nextButton.disabled = !enabled;
  },

  selectDiagnosticOption(index) {
    this.diagnosticAnswers[this.diagnosticStep] = index;

    document.querySelectorAll("#diagnostic-options .button-option").forEach((btn, i) => {
      btn.classList.toggle("selected", i === index);
    });

    this.setNextButtonState(true);
  },

  nextDiagnosticStep() {
    if (this.diagnosticAnswers[this.diagnosticStep] === undefined) return;

    if (this.diagnosticStep < DIAGNOSTIC_QUESTIONS.length - 1) {
      this.diagnosticStep++;
      this.updateDiagnosticScreen();
    } else {
      this.completeDiagnostic();
    }
  },

  goBackDiagnostic() {
    if (this.diagnosticStep > 0) {
      this.diagnosticStep--;
      this.updateDiagnosticScreen();
    } else {
      this.showScreen(this.previousScreen);
    }
  },

  completeDiagnostic() {
    const answers = this.diagnosticAnswers.map(
      (idx, step) => DIAGNOSTIC_QUESTIONS[step].options[idx].value
    );

    this.userData.skinType = this.deriveSkinType(answers);
    this.userData.concerns = this.deriveConcerns(answers);
    this.saveUserData();

    this.showResultScreen(this.userData.skinType);
  },

  // Rule engine: first two answers drive the skin type, question 3 the concern.
  deriveSkinType(answers) {
    if (answers[0] === "oily" || answers[1] === "oily") return "oily";
    if (answers[0] === "dry" || answers[1] === "dry") return "dry";
    if (answers[0] === "normal" || answers[1] === "normal") return "normal";
    return "combination";
  },

  deriveConcerns(answers) {
    const concernLabels = {
      acne: "Acne and breakouts",
      dryness: "Dryness and flakiness",
      aging: "Fine lines and wrinkles",
      pigmentation: "Uneven tone and dark spots",
    };
    const label = concernLabels[answers[2]];
    return label ? [label] : [];
  },

  showResultScreen(skinType) {
    const result = SKIN_RESULTS[skinType] || SKIN_RESULTS.combination;

    document.getElementById("result-skin-type").textContent = result.type;
    document.getElementById("result-subtext").textContent = result.subtext;
    document.getElementById("result-explanation").textContent = result.explanation;
    document.getElementById("recommendations-skin-type").textContent =
      result.type.toLowerCase();

    const concernsList = document.getElementById("result-concerns");
    concernsList.innerHTML = "";
    result.concerns.forEach((concern) => {
      const li = document.createElement("li");
      li.textContent = concern;
      concernsList.appendChild(li);
    });

    this.showScreen("result");
  },
};

document.addEventListener("DOMContentLoaded", () => app.init());
