// Bloomie App - Main Application Logic
const app = {
  currentScreen: 'login',
  diagnosticStep: 0,
  diagnosticAnswers: [],
  currentProduct: null,
  previousScreen: 'home',
  userData: {
    name: 'Hana',
    skinType: null,
    concerns: [],
    favorites: []
  },

  diagnosticQuestions: [
    {
      question: "What best describes your skin type?",
      options: [
        { text: "Oily - Shiny, especially in T-zone", value: "oily" },
        { text: "Dry - Feels tight, sometimes flaky", value: "dry" },
        { text: "Combination - Oily T-zone, dry cheeks", value: "combination" },
        { text: "Normal - Balanced, not too oily or dry", value: "normal" }
      ]
    },
    {
      question: "How does your skin feel after cleansing?",
      options: [
        { text: "Tight and dry", value: "dry" },
        { text: "Comfortable and balanced", value: "normal" },
        { text: "Oily within an hour", value: "oily" },
        { text: "Dry in some areas, oily in others", value: "combination" }
      ]
    },
    {
      question: "What are your main skin concerns?",
      options: [
        { text: "Acne and breakouts", value: "acne" },
        { text: "Dryness and flakiness", value: "dryness" },
        { text: "Fine lines and wrinkles", value: "aging" },
        { text: "Uneven tone and dark spots", value: "pigmentation" }
      ]
    },
    {
      question: "How often do you experience breakouts?",
      options: [
        { text: "Rarely or never", value: "rare" },
        { text: "Occasionally (once a month)", value: "occasional" },
        { text: "Frequently (weekly)", value: "frequent" },
        { text: "Constantly", value: "constant" }
      ]
    },
    {
      question: "How does your skin react to new products?",
      options: [
        { text: "Usually fine, no issues", value: "resistant" },
        { text: "Sometimes gets red or irritated", value: "sensitive" },
        { text: "Often breaks out", value: "reactive" },
        { text: "I'm not sure", value: "unknown" }
      ]
    },
    {
      question: "What's your main skincare goal?",
      options: [
        { text: "Clear, blemish-free skin", value: "clear" },
        { text: "Hydrated, plump skin", value: "hydrated" },
        { text: "Anti-aging and prevention", value: "anti-aging" },
        { text: "Even, glowing complexion", value: "glow" }
      ]
    },
    {
      question: "How much time can you spend on skincare daily?",
      options: [
        { text: "5 minutes - Quick routine", value: "quick" },
        { text: "10-15 minutes - Standard routine", value: "standard" },
        { text: "20+ minutes - Full routine", value: "extensive" },
        { text: "Varies day to day", value: "flexible" }
      ]
    }
  ],

  skinResults: {
    combination: {
      type: "Combination Skin",
      subtext: "Your skin has both oily and dry areas, requiring a balanced approach.",
      concerns: ["Oily T-zone", "Dry cheeks", "Need for balance"],
      explanation: "Combination skin benefits from targeted care: lighter products for oily areas and richer hydration for dry zones. Korean skincare's multi-step approach works perfectly here, allowing you to customize each step."
    },
    oily: {
      type: "Oily Skin",
      subtext: "Your skin produces excess sebum, especially in the T-zone area.",
      concerns: ["Excess oil production", "Large pores", "Shine control"],
      explanation: "Oily skin needs gentle cleansing and lightweight, non-comedogenic products. Korean skincare emphasizes hydration without heaviness, which helps balance oil production naturally."
    },
    dry: {
      type: "Dry Skin",
      subtext: "Your skin lacks moisture and may feel tight or flaky.",
      concerns: ["Lack of moisture", "Tightness", "Flakiness"],
      explanation: "Dry skin thrives on rich, hydrating products with ingredients like hyaluronic acid and ceramides. Korean skincare's layering technique helps build and lock in moisture effectively."
    },
    normal: {
      type: "Normal Skin",
      subtext: "Your skin is well-balanced and generally healthy.",
      concerns: ["Maintenance", "Prevention", "Enhancement"],
      explanation: "Normal skin is a great canvas for Korean skincare! You can explore various products and routines to enhance your natural glow and maintain your skin's health."
    }
  },

  products: [
    {
      id: 1,
      name: "COSRX Advanced Snail 96 Mucin Power Essence",
      type: "Essence",
      image: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)",
      emoji: "🐌",
      description: "A lightweight, hydrating essence with 96% snail secretion filtrate. Perfect for all skin types, especially those needing extra hydration and repair.",
      ingredients: "Snail Secretion Filtrate (96%), Betaine, Butylene Glycol, 1,2-Hexanediol, Sodium Hyaluronate, Allantoin, Arginine, Panthenol, Sodium Polyacrylate, Carbomer, Phenoxyethanol",
      suitability: "This essence provides deep hydration without heaviness, making it ideal for combination skin. The snail mucin helps repair and soothe while maintaining balance.",
      skinTypes: ["combination", "dry", "normal"],
      concerns: ["dryness", "acne"]
    },
    {
      id: 2,
      name: "Beauty of Joseon Glow Serum",
      type: "Serum",
      image: "linear-gradient(135deg, #fff9c4 0%, #fff59d 50%, #fff176 100%)",
      emoji: "✨",
      description: "A brightening serum with niacinamide and rice extract. Helps even out skin tone and add a natural glow.",
      ingredients: "Niacinamide (2%), Rice Extract, Glycerin, Butylene Glycol, Water, Sodium Hyaluronate, Allantoin, Centella Asiatica Extract",
      suitability: "Perfect for addressing uneven tone and adding radiance. The niacinamide helps control oil while brightening, ideal for combination skin.",
      skinTypes: ["combination", "oily", "normal"],
      concerns: ["pigmentation", "glow"]
    },
    {
      id: 3,
      name: "Klairs Freshly Juiced Vitamin Drop",
      type: "Serum",
      image: "linear-gradient(135deg, #ffe0b2 0%, #ffcc80 50%, #ffb74d 100%)",
      emoji: "🍊",
      description: "A vitamin C serum with 5% L-Ascorbic Acid. Brightens and evens skin tone while providing antioxidant protection.",
      ingredients: "L-Ascorbic Acid (5%), Water, Butylene Glycol, Glycerin, Sodium Hyaluronate, Centella Asiatica Extract",
      suitability: "Great for brightening and anti-aging. Start with a low concentration if you have sensitive skin.",
      skinTypes: ["normal", "combination"],
      concerns: ["pigmentation", "anti-aging", "glow"]
    },
    {
      id: 4,
      name: "Pyunkang Yul Essence Toner",
      type: "Toner",
      image: "linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 50%, #81d4fa 100%)",
      emoji: "💧",
      description: "A hydrating toner with minimal ingredients. Soothes and hydrates without irritation.",
      ingredients: "Astragalus Membranaceus Root Extract, 1,2-Hexanediol, Butylene Glycol, Glycerin",
      suitability: "Excellent for sensitive or reactive skin. Provides gentle hydration without overwhelming the skin.",
      skinTypes: ["dry", "sensitive", "normal"],
      concerns: ["dryness", "sensitive"]
    },
    {
      id: 5,
      name: "Innisfree Green Tea Seed Serum",
      type: "Serum",
      image: "linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 50%, #81c784 100%)",
      emoji: "🍃",
      description: "A hydrating serum with green tea extract and seed oil. Provides moisture and antioxidant benefits.",
      ingredients: "Green Tea Extract, Glycerin, Butylene Glycol, Green Tea Seed Oil, Sodium Hyaluronate",
      suitability: "Perfect for dry skin needing extra hydration. The green tea provides antioxidants while the seed oil locks in moisture.",
      skinTypes: ["dry", "normal"],
      concerns: ["dryness", "hydrated"]
    },
    {
      id: 6,
      name: "Some By Mi AHA-BHA-PHA 30 Days Miracle Toner",
      type: "Toner",
      image: "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 50%, #ce93d8 100%)",
      emoji: "🌸",
      description: "An exfoliating toner with AHA, BHA, and PHA. Helps clear pores and smooth texture.",
      ingredients: "Water, Centella Asiatica Extract, AHA (Glycolic Acid, Lactic Acid), BHA (Salicylic Acid), PHA (Gluconolactone), Niacinamide",
      suitability: "Great for oily and acne-prone skin. The combination of acids helps clear pores and prevent breakouts.",
      skinTypes: ["oily", "combination"],
      concerns: ["acne", "clear"]
    }
  ],

  init() {
    this.loadUserData();
    this.showScreen(this.currentScreen);
    this.updateBottomNav();
  },

  loadUserData() {
    const saved = localStorage.getItem('bloomieUserData');
    if (saved) {
      this.userData = { ...this.userData, ...JSON.parse(saved) };
    }
    const favorites = localStorage.getItem('bloomieFavorites');
    if (favorites) {
      this.userData.favorites = JSON.parse(favorites);
    }
  },

  saveUserData() {
    localStorage.setItem('bloomieUserData', JSON.stringify(this.userData));
    localStorage.setItem('bloomieFavorites', JSON.stringify(this.userData.favorites));
  },

  showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });

    const targetScreen = document.getElementById(`screen-${screenName}`);
    if (targetScreen) {
      targetScreen.classList.add('active');
      this.currentScreen = screenName;
      this.updateBottomNav();

      if (screenName === 'home') {
        this.updateHomeScreen();
      } else if (screenName === 'dashboard') {
        this.updateDashboard();
      } else if (screenName === 'catalog') {
        this.updateCatalog();
      } else if (screenName === 'recommendations') {
        this.updateRecommendations();
      }
    }
  },

  updateBottomNav() {
    document.querySelectorAll('.bottom-nav .nav-item').forEach(item => {
      item.classList.remove('is-active');
    });

    const navMap = { 'home': 0, 'catalog': 1, 'dashboard': 2 };
    if (navMap.hasOwnProperty(this.currentScreen)) {
      const navItems = document.querySelectorAll('.bottom-nav .nav-item');
      if (navItems[navMap[this.currentScreen]]) {
        navItems[navMap[this.currentScreen]].classList.add('is-active');
      }
    }
  },

  login(provider) {
    setTimeout(() => {
      this.showScreen('home');
      this.updateHomeScreen();
    }, 300);
  },

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      this.currentScreen = 'login';
      this.showScreen('login');
    }
  },

  startDiagnostic() {
    this.diagnosticStep = 0;
    this.diagnosticAnswers = [];
    this.previousScreen = this.currentScreen;
    this.showScreen('diagnostic');
    this.updateDiagnosticScreen();
  },

  updateDiagnosticScreen() {
    const question = this.diagnosticQuestions[this.diagnosticStep];
    if (!question) return;

    document.getElementById('diagnostic-step').textContent = this.diagnosticStep + 1;
    document.getElementById('diagnostic-question').textContent = question.question;
    
    const progress = ((this.diagnosticStep + 1) / 7) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';

    const optionsContainer = document.getElementById('diagnostic-options');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.className = 'button button-option';
      button.textContent = option.text;
      button.onclick = () => this.selectDiagnosticOption(index);
      if (this.diagnosticAnswers[this.diagnosticStep] === index) {
        button.classList.add('selected');
      }
      optionsContainer.appendChild(button);
    });

    const nextButton = document.getElementById('diagnostic-next');
    if (this.diagnosticAnswers[this.diagnosticStep] !== undefined) {
      nextButton.classList.remove('button-disabled');
      nextButton.disabled = false;
    } else {
      nextButton.classList.add('button-disabled');
      nextButton.disabled = true;
    }

    if (this.diagnosticStep === 6) {
      nextButton.textContent = 'See My Results';
    } else {
      nextButton.textContent = 'Next';
    }
  },

  selectDiagnosticOption(index) {
    this.diagnosticAnswers[this.diagnosticStep] = index;
    
    document.querySelectorAll('#diagnostic-options .button-option').forEach((btn, i) => {
      if (i === index) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });

    const nextButton = document.getElementById('diagnostic-next');
    nextButton.classList.remove('button-disabled');
    nextButton.disabled = false;
  },

  nextDiagnosticStep() {
    if (this.diagnosticAnswers[this.diagnosticStep] === undefined) return;

    if (this.diagnosticStep < 6) {
      this.diagnosticStep++;
      this.updateDiagnosticScreen();
    } else {
      this.completeDiagnostic();
    }
  },

  completeDiagnostic() {
    const answers = this.diagnosticAnswers.map((idx, step) => 
      this.diagnosticQuestions[step].options[idx].value
    );

    let skinType = 'combination';
    if (answers[0] === 'oily' || answers[1] === 'oily') {
      skinType = 'oily';
    } else if (answers[0] === 'dry' || answers[1] === 'dry') {
      skinType = 'dry';
    } else if (answers[0] === 'normal' || answers[1] === 'normal') {
      skinType = 'normal';
    }

    const concerns = [];
    if (answers[2] === 'acne') concerns.push('Acne and breakouts');
    if (answers[2] === 'dryness') concerns.push('Dryness and flakiness');
    if (answers[2] === 'aging') concerns.push('Fine lines and wrinkles');
    if (answers[2] === 'pigmentation') concerns.push('Uneven tone and dark spots');

    this.userData.skinType = skinType;
    this.userData.concerns = concerns;
    this.saveUserData();

    this.showResultScreen(skinType, concerns);
  },

  showResultScreen(skinType, concerns) {
    const result = this.skinResults[skinType] || this.skinResults.combination;
    
    document.getElementById('result-skin-type').textContent = result.type;
    document.getElementById('result-subtext').textContent = result.subtext;
    
    const concernsList = document.getElementById('result-concerns');
    concernsList.innerHTML = '';
    result.concerns.forEach(concern => {
      const li = document.createElement('li');
      li.textContent = concern;
      concernsList.appendChild(li);
    });

    document.getElementById('result-explanation').textContent = result.explanation;
    document.getElementById('recommendations-skin-type').textContent = result.type.toLowerCase();

    this.showScreen('result');
  },

  goBackDiagnostic() {
    if (this.diagnosticStep > 0) {
      this.diagnosticStep--;
      this.updateDiagnosticScreen();
    } else {
      this.showScreen(this.previousScreen);
    }
  },

  updateRecommendations() {
    if (!this.userData.skinType) {
      const container = document.getElementById('recommendations-list');
      container.innerHTML = '<p class="paragraph-block">Complete the diagnostic to see personalized recommendations!</p>';
      return;
    }

    const filtered = this.products.filter(p => 
      p.skinTypes.includes(this.userData.skinType) ||
      p.concerns.some(c => this.userData.concerns.some(uc => uc.toLowerCase().includes(c)))
    );

    this.renderProductList(filtered, 'recommendations-list');
  },

  updateCatalog() {
    this.renderProductList(this.products, 'catalog-list');
  },

  renderProductList(products, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    if (products.length === 0) {
      container.innerHTML = '<p class="paragraph-block">No products found.</p>';
      return;
    }

    products.forEach(product => {
      const card = document.createElement('article');
      card.className = 'card product-card';
      card.onclick = () => this.showProductDetail(product.id);
      
      card.innerHTML = `
        <div class="product-image" style="background: ${product.image || 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)'}">
          <div class="product-emoji">${product.emoji || '✨'}</div>
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

  showProductDetail(productId) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    this.currentProduct = product;
    this.previousScreen = this.currentScreen;

    document.getElementById('product-detail-title').textContent = 'Product Details';
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-type').textContent = product.type;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('ingredients-content').textContent = product.ingredients;
    document.getElementById('product-suitability').textContent = product.suitability;
    
    // Update product image in detail view
    const detailImage = document.getElementById('product-detail-image');
    if (detailImage) {
      detailImage.style.background = product.image || 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)';
      const emojiEl = detailImage.querySelector('.product-emoji');
      if (emojiEl) emojiEl.textContent = product.emoji || '✨';
    }

    const favoriteBtn = document.getElementById('favorite-btn');
    const isFavorite = this.userData.favorites.includes(productId);
    favoriteBtn.textContent = isFavorite ? 'Saved to Favorites' : 'Save to Favorites';
    favoriteBtn.classList.toggle('saved', isFavorite);

    this.showScreen('product-detail');
  },

  toggleFavorite() {
    if (!this.currentProduct) return;

    const index = this.userData.favorites.indexOf(this.currentProduct.id);
    if (index > -1) {
      this.userData.favorites.splice(index, 1);
    } else {
      this.userData.favorites.push(this.currentProduct.id);
    }

    this.saveUserData();
    this.updateFavoriteButton();
    this.updateDashboard();
  },

  updateFavoriteButton() {
    if (!this.currentProduct) return;
    const favoriteBtn = document.getElementById('favorite-btn');
    const isFavorite = this.userData.favorites.includes(this.currentProduct.id);
    favoriteBtn.textContent = isFavorite ? 'Saved to Favorites' : 'Save to Favorites';
    favoriteBtn.classList.toggle('saved', isFavorite);
  },

  toggleIngredients() {
    const body = document.getElementById('ingredients-body');
    const chevron = document.getElementById('ingredients-chevron');
    if (body.style.display === 'none') {
      body.style.display = 'block';
      chevron.textContent = '▲';
    } else {
      body.style.display = 'none';
      chevron.textContent = '▼';
    }
  },

  updateDashboard() {
    const profileEl = document.getElementById('dashboard-skin-profile');
    const resultLink = document.getElementById('view-result-link');
    
    if (this.userData.skinType) {
      const result = this.skinResults[this.userData.skinType];
      profileEl.innerHTML = `
        <strong>Skin Type:</strong> ${result.type}<br/>
        <strong>Key Concerns:</strong> ${result.concerns.join(', ')}
      `;
      resultLink.style.display = 'block';
    } else {
      profileEl.textContent = 'Complete the diagnostic to see your skin profile.';
      resultLink.style.display = 'none';
    }

    const favoritesList = document.getElementById('favorites-list');
    if (this.userData.favorites.length === 0) {
      favoritesList.innerHTML = '<p class="paragraph-block" style="color: #a89f97;">No favorites yet. Start exploring products!</p>';
    } else {
      favoritesList.innerHTML = '';
      this.userData.favorites.forEach(id => {
        const product = this.products.find(p => p.id === id);
        if (product) {
          const row = document.createElement('div');
          row.className = 'list-row';
          row.onclick = () => this.showProductDetail(id);
          row.innerHTML = `
            <span>${product.name}</span>
            <span class="chevron-placeholder">→</span>
          `;
          favoritesList.appendChild(row);
        }
      });
    }
  },

  updateHomeScreen() {
    const userNameEl = document.getElementById('user-name');
    if (userNameEl) {
      userNameEl.textContent = this.userData.name;
    }
  },

  goBackFromRecommendations() {
    if (this.userData.skinType) {
      this.showScreen('result');
    } else {
      this.showScreen('home');
    }
  },

  goBackFromProduct() {
    this.showScreen(this.previousScreen);
  },

  goBackFromSettings() {
    this.showScreen('dashboard');
  },

  showFilter(type) {
    alert(`Filter by ${type} - Feature coming soon!`);
  },

  showInfo(type) {
    const modal = document.getElementById('info-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');

    const content = {
      consent: {
        title: 'Manage Consent',
        text: 'You can manage your consent preferences for analytics and communications here. We respect your privacy and only use data to improve your experience.'
      },
      privacy: {
        title: 'Privacy Policy',
        text: 'Bloomie is committed to protecting your privacy. We collect minimal data necessary to provide personalized skincare recommendations. Your data is stored securely and never shared with third parties without your consent.'
      },
      verification: {
        title: 'How Bloomie Verifies Products',
        text: 'All products in our catalog undergo a rigorous verification process. We check ingredient lists, brand authenticity, and user reviews. Products marked as "Verified" meet our standards for quality, safety, and effectiveness.'
      }
    };

    const info = content[type] || { title: 'Info', text: 'Information not available.' };
    title.textContent = info.title;
    body.innerHTML = `<p>${info.text}</p>`;
    modal.style.display = 'flex';
  },

  closeModal() {
    document.getElementById('info-modal').style.display = 'none';
  },

  deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      if (confirm('This will permanently delete all your data. Are you absolutely sure?')) {
        localStorage.removeItem('bloomieUserData');
        localStorage.removeItem('bloomieFavorites');
        this.userData = { name: 'Hana', skinType: null, concerns: [], favorites: [] };
        this.showScreen('login');
        alert('Account deleted successfully.');
      }
    }
  },

  downloadData(format = 'json') {
    const data = {
      user: this.userData,
      diagnosticAnswers: this.diagnosticAnswers,
      timestamp: new Date().toISOString()
    };

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bloomie-data-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'csv') {
      let csv = 'Type,Value\n';
      csv += `Name,${this.userData.name}\n`;
      csv += `Skin Type,${this.userData.skinType || 'Not set'}\n`;
      csv += `Concerns,${this.userData.concerns.join('; ')}\n`;
      csv += `Favorites,${this.userData.favorites.join('; ')}\n`;
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bloomie-data-${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }

    alert('Download started!');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  app.init();
});

document.addEventListener('click', (e) => {
  const modal = document.getElementById('info-modal');
  if (e.target === modal) {
    app.closeModal();
  }
});
