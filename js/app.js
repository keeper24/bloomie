/**
 * Bloomie — client-side prototype logic.
 *
 * A small screen-router plus the diagnostic, catalog, favorites and
 * settings flows. State is kept in memory and mirrored to localStorage
 * so a returning visitor keeps their profile and favorites.
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
    dashboard: "updateDashboard",
    catalog: "updateCatalog",
    recommendations: "updateRecommendations",
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

  // --- Recommendations & catalog ----------------------------------------

  updateRecommendations() {
    const container = document.getElementById("recommendations-list");

    if (!this.userData.skinType) {
      container.innerHTML =
        '<p class="paragraph-block">Complete the diagnostic to see personalized recommendations!</p>';
      return;
    }

    const matches = PRODUCTS.filter(
      (product) =>
        product.skinTypes.includes(this.userData.skinType) ||
        product.concerns.some((c) =>
          this.userData.concerns.some((uc) => uc.toLowerCase().includes(c))
        )
    );

    this.renderProductList(matches, "recommendations-list");
  },

  updateCatalog() {
    this.renderProductList(PRODUCTS, "catalog-list");
  },

  renderProductList(products, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    if (products.length === 0) {
      container.innerHTML = '<p class="paragraph-block">No products found.</p>';
      return;
    }

    products.forEach((product) => {
      const card = document.createElement("article");
      card.className = "card product-card";
      card.onclick = () => this.showProductDetail(product.id);
      card.innerHTML = `
        <div class="product-image" style="background: ${product.image}">
          <div class="product-emoji">${product.emoji}</div>
        </div>
        <div class="product-card-content">
          <div class="card-header-row">
            <div class="card-title">${product.name}</div>
            <div class="tag">Verified</div>
          </div>
          <div class="card-text">${product.type}</div>
          <div class="card-footer-row">
            <button class="button button-small" onclick="event.stopPropagation(); app.showProductDetail(${product.id})">
              View Details
            </button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  },

  // --- Product detail ----------------------------------------------------

  showProductDetail(productId) {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    this.currentProduct = product;
    this.previousScreen = this.currentScreen;

    document.getElementById("product-detail-title").textContent = "Product Details";
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-type").textContent = product.type;
    document.getElementById("product-description").textContent = product.description;
    document.getElementById("ingredients-content").textContent = product.ingredients;
    document.getElementById("product-suitability").textContent = product.suitability;

    const detailImage = document.getElementById("product-detail-image");
    detailImage.style.background = product.image;
    detailImage.querySelector(".product-emoji").textContent = product.emoji;

    this.updateFavoriteButton();
    this.showScreen("product-detail");
  },

  toggleIngredients() {
    const body = document.getElementById("ingredients-body");
    const chevron = document.getElementById("ingredients-chevron");
    const isOpen = body.classList.toggle("open");
    chevron.textContent = isOpen ? "▲" : "▼";
  },

  // --- Favorites ---------------------------------------------------------

  toggleFavorite() {
    if (!this.currentProduct) return;

    const favorites = this.userData.favorites;
    const index = favorites.indexOf(this.currentProduct.id);
    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(this.currentProduct.id);
    }

    this.saveUserData();
    this.updateFavoriteButton();
    this.updateDashboard();
  },

  updateFavoriteButton() {
    if (!this.currentProduct) return;
    const favoriteBtn = document.getElementById("favorite-btn");
    const isFavorite = this.userData.favorites.includes(this.currentProduct.id);
    favoriteBtn.textContent = isFavorite ? "Saved to Favorites" : "Save to Favorites";
    favoriteBtn.classList.toggle("saved", isFavorite);
  },

  // --- Dashboard & home --------------------------------------------------

  updateHomeScreen() {
    const userNameEl = document.getElementById("user-name");
    if (userNameEl) userNameEl.textContent = this.userData.name;
  },

  updateDashboard() {
    this.renderSkinProfile();
    this.renderFavoritesList();
  },

  renderSkinProfile() {
    const profileEl = document.getElementById("dashboard-skin-profile");
    const resultLink = document.getElementById("view-result-link");

    if (this.userData.skinType) {
      const result = SKIN_RESULTS[this.userData.skinType];
      profileEl.innerHTML = `
        <strong>Skin Type:</strong> ${result.type}<br/>
        <strong>Key Concerns:</strong> ${result.concerns.join(", ")}
      `;
      resultLink.classList.remove("hidden");
    } else {
      profileEl.textContent = "Complete the diagnostic to see your skin profile.";
      resultLink.classList.add("hidden");
    }
  },

  renderFavoritesList() {
    const favoritesList = document.getElementById("favorites-list");

    if (this.userData.favorites.length === 0) {
      favoritesList.innerHTML =
        '<p class="paragraph-block muted">No favorites yet. Start exploring products!</p>';
      return;
    }

    favoritesList.innerHTML = "";
    this.userData.favorites.forEach((id) => {
      const product = PRODUCTS.find((p) => p.id === id);
      if (!product) return;
      const row = document.createElement("div");
      row.className = "list-row";
      row.onclick = () => this.showProductDetail(id);
      row.innerHTML = `
        <span>${product.name}</span>
        <span class="chevron">→</span>
      `;
      favoritesList.appendChild(row);
    });
  },

  // --- Back navigation helpers ------------------------------------------

  goBackFromRecommendations() {
    this.showScreen(this.userData.skinType ? "result" : "home");
  },

  goBackFromProduct() {
    this.showScreen(this.previousScreen);
  },

  goBackFromSettings() {
    this.showScreen("dashboard");
  },

  // --- Catalog filters (placeholder for a post-MVP feature) --------------

  showFilter(type) {
    alert(`Filter by ${type} - Feature coming soon!`);
  },

  // --- Info modal --------------------------------------------------------

  showInfo(type) {
    const content = {
      consent: {
        title: "Manage Consent",
        text: "You can manage your consent preferences for analytics and communications here. We respect your privacy and only use data to improve your experience.",
      },
      privacy: {
        title: "Privacy Policy",
        text: "Bloomie is committed to protecting your privacy. We collect minimal data necessary to provide personalized skincare recommendations. Your data is stored securely and never shared with third parties without your consent.",
      },
      verification: {
        title: "How Bloomie Verifies Products",
        text: 'All products in our catalog undergo a rigorous verification process. We check ingredient lists, brand authenticity, and user reviews. Products marked as "Verified" meet our standards for quality, safety, and effectiveness.',
      },
    };

    const info = content[type] || { title: "Info", text: "Information not available." };
    document.getElementById("modal-title").textContent = info.title;
    document.getElementById("modal-body").innerHTML = `<p>${info.text}</p>`;
    document.getElementById("info-modal").style.display = "flex";
  },

  closeModal() {
    document.getElementById("info-modal").style.display = "none";
  },

  // --- Account & data ----------------------------------------------------

  deleteAccount() {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }
    if (!confirm("This will permanently delete all your data. Are you absolutely sure?")) {
      return;
    }

    localStorage.removeItem("bloomieUserData");
    localStorage.removeItem("bloomieFavorites");
    this.userData = { name: "Hana", skinType: null, concerns: [], favorites: [] };
    this.showScreen("login");
    alert("Account deleted successfully.");
  },

  downloadData(format = "json") {
    const data = {
      user: this.userData,
      diagnosticAnswers: this.diagnosticAnswers,
      timestamp: new Date().toISOString(),
    };

    if (format === "csv") {
      const csv = [
        "Type,Value",
        `Name,${this.userData.name}`,
        `Skin Type,${this.userData.skinType || "Not set"}`,
        `Concerns,${this.userData.concerns.join("; ")}`,
        `Favorites,${this.userData.favorites.join("; ")}`,
      ].join("\n");
      this.downloadFile(csv, "text/csv", "csv");
    } else {
      this.downloadFile(JSON.stringify(data, null, 2), "application/json", "json");
    }

    alert("Download started!");
  },

  downloadFile(contents, mimeType, extension) {
    const blob = new Blob([contents], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bloomie-data-${Date.now()}.${extension}`;
    link.click();
    URL.revokeObjectURL(url);
  },
};

document.addEventListener("DOMContentLoaded", () => app.init());

// Close the info modal when clicking the backdrop.
document.addEventListener("click", (event) => {
  const modal = document.getElementById("info-modal");
  if (event.target === modal) app.closeModal();
});
