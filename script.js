const app = {
    // State
    currentScreen: 'login',
    previousScreen: 'home',
    cart: [],
    user: {
        name: 'Yaren',
        profile: null, // skin profile
        favorites: []
    },

    // Database
    products: [
        // --- CLEANSERS (1-15) ---
        { id: 1, name: "Low pH Good Morning Gel Cleanser", brand: "COSRX", price: 14.00, category: "skincare", image: "#E3F2FD", emoji: "🫧", rating: 4.8, desc: "Gentle gel cleanser for sensitive skin.", featured: true, skinTypes: ["oily", "combination", "sensitive"] },
        { id: 2, name: "Green Tea Foam Cleanser", brand: "Innisfree", price: 12.00, category: "skincare", image: "#E8F5E9", emoji: "🍃", rating: 4.6, desc: "Refreshing foam from Jeju Green Tea.", featured: false, skinTypes: ["oily", "combination"] },
        { id: 3, name: "Rice Water Bright Oil", brand: "The Face Shop", price: 15.00, category: "skincare", image: "#FFFDE7", emoji: "🌾", rating: 4.7, desc: "Deep cleansing oil for brightening.", featured: false, skinTypes: ["dry", "normal"] },
        { id: 4, name: "Heartleaf Quercetinol Foam", brand: "Anua", price: 18.00, category: "skincare", image: "#F1F8E9", emoji: "🌿", rating: 4.9, desc: "Deep cleans pores and calms acne.", featured: true, skinTypes: ["oily", "acne"] },
        { id: 5, name: "Clean It Zero Balm", brand: "Banila Co", price: 22.00, category: "skincare", image: "#FCE4EC", emoji: "🩰", rating: 4.8, desc: "Sherbet texture balm to remove makeup.", featured: false, skinTypes: ["all", "dry"] },
        { id: 6, name: "Soda Pore Cleansing", brand: "Manyo", price: 20.00, category: "skincare", image: "#E1F5FE", emoji: "🧼", rating: 4.5, desc: "Deep pore cleansing foam.", featured: false, skinTypes: ["oily"] },
        { id: 7, name: "BHA Blackhead Cleanser", brand: "Some By Mi", price: 19.00, category: "skincare", image: "#CFD8DC", emoji: "🫧", rating: 4.6, desc: "Bye bye blackheads.", featured: false, skinTypes: ["oily", "acne"] },
        { id: 8, name: "Centella Ampoule Foam", brand: "Skin1004", price: 16.00, category: "skincare", image: "#FFF3E0", emoji: "🍯", rating: 4.8, desc: "Madagascar Centella soothing foam.", featured: false, skinTypes: ["sensitive"] },
        { id: 9, name: "Dokdo Cleanser", brand: "Round Lab", price: 15.00, category: "skincare", image: "#EEEEEE", emoji: "🏔️", rating: 4.7, desc: "Gentle low pH cleanser.", featured: true, skinTypes: ["sensitive", "dry"] },
        { id: 10, name: "Super Volcanic Pore Micellar", brand: "Innisfree", price: 18.00, category: "skincare", image: "#5D4037", emoji: "🌋", rating: 4.7, desc: "Powerful pore cleansing.", featured: false, skinTypes: ["oily"] },
        { id: 11, name: "Snail Mucin Gel Cleanser", brand: "COSRX", price: 18.00, category: "skincare", image: "#BF360C", emoji: "🐌", rating: 4.5, desc: "Regenerating cleanser.", featured: false, skinTypes: ["dry", "damaged"] },
        { id: 12, name: "All Clean Balm", brand: "Heimish", price: 21.00, category: "skincare", image: "#FFFFFF", emoji: "🥥", rating: 4.8, desc: "Aromatic cleansing balm.", featured: false, skinTypes: ["all"] },
        { id: 13, name: "Pore Control Cleansing Oil", brand: "Anua", price: 22.00, category: "skincare", image: "#FFF9C4", emoji: "💧", rating: 4.9, desc: "Mild oil for blackheads.", featured: true, skinTypes: ["oily", "sensitive"] },
        { id: 14, name: "Blueberry Rebalancing 5.5", brand: "Innisfree", price: 10.00, category: "skincare", image: "#EDE7F6", emoji: "🫐", rating: 4.6, desc: "Balanced cleanser.", featured: false, skinTypes: ["all"] },
        { id: 15, name: "Mugwort Calming Cleanser", brand: "Round Lab", price: 17.00, category: "skincare", image: "#A5D6A7", emoji: "🌿", rating: 4.7, desc: "Calms irritated skin.", featured: false, skinTypes: ["acne", "sensitive"] },

        // --- TONERS (16-30) ---
        { id: 16, name: "Supple Preparation Toner", brand: "Klairs", price: 22.00, category: "skincare", image: "#EFEBE9", emoji: "🧴", rating: 5.0, desc: "Restores hydration and pH balance.", featured: true, skinTypes: ["dry", "sensitive", "normal"] },
        { id: 17, name: "Wonder Rice Mochi Toner", brand: "TonyMoly", price: 16.00, category: "skincare", image: "#FFF9C4", emoji: "🍡", rating: 4.5, desc: "For bouncy, mochi-like skin.", featured: false, skinTypes: ["dry", "normal"] },
        { id: 18, name: "AHA/BHA Treatment Toner", brand: "COSRX", price: 19.00, category: "skincare", image: "#FAFAFA", emoji: "✨", rating: 4.4, desc: "Gentle exfoliation.", featured: false, skinTypes: ["oily", "combination", "acne"] },
        { id: 19, name: "Heartleaf 77% Soothing Toner", brand: "Anua", price: 23.00, category: "skincare", image: "#DCEDC8", emoji: "🌿", rating: 4.9, desc: "Viral soothing toner.", featured: true, skinTypes: ["sensitive", "acne", "oily"] },
        { id: 20, name: "Ginseng Essence Water", brand: "Beauty of Joseon", price: 18.00, category: "skincare", image: "#D7CCC8", emoji: "🏺", rating: 4.7, desc: "Revitalizes tired skin.", featured: false, skinTypes: ["dry", "combination"] },
        { id: 21, name: "Dokdo Toner", brand: "Round Lab", price: 17.00, category: "skincare", image: "#E3F2FD", emoji: "💧", rating: 4.8, desc: "Exfoliates and hydrates.", featured: false, skinTypes: ["dry", "sensitive"] },
        { id: 22, name: "Green Tea Seed Skin", brand: "Innisfree", price: 20.00, category: "skincare", image: "#C8E6C9", emoji: "🍃", rating: 4.6, desc: "Hydration layering.", featured: false, skinTypes: ["combination", "oily"] },
        { id: 23, name: "Full Fit Propolis Toner", brand: "COSRX", price: 21.00, category: "skincare", image: "#FFF8E1", emoji: "🐝", rating: 4.8, desc: "Nourishing radiance.", featured: false, skinTypes: ["dry", "dull"] },
        { id: 24, name: "Galactomyces Vitamin C", brand: "Some By Mi", price: 19.00, category: "skincare", image: "#FFCCBC", emoji: "🍊", rating: 4.5, desc: "Brightening toner.", featured: false, skinTypes: ["dull", "hyperpigmentation"] },
        { id: 25, name: "Time Revolution First Essence", brand: "Missha", price: 40.00, category: "skincare", image: "#CFD8DC", emoji: "⏳", rating: 4.9, desc: "Anti-aging essence toner.", featured: false, skinTypes: ["mature", "all"] },
        { id: 26, name: "Licorice pH Balancing Toner", brand: "Acwell", price: 18.00, category: "skincare", image: "#D7CCC8", emoji: "🪵", rating: 4.7, desc: "Deep cleansing toner.", featured: false, skinTypes: ["sensitive", "hyperpigmentation"] },
        { id: 27, name: "Centella Toning Toner", brand: "Skin1004", price: 19.00, category: "skincare", image: "#FFE0B2", emoji: "🟡", rating: 4.6, desc: "Mild exfoliation.", featured: false, skinTypes: ["sensitive", "acne"] },
        { id: 28, name: "Biome Comforting Toner", brand: "Axis-Y", price: 20.00, category: "skincare", image: "#B2DFDB", emoji: "🦠", rating: 4.5, desc: "Strengthens barrier.", featured: false, skinTypes: ["sensitive"] },
        { id: 29, name: "Rose Water Toner", brand: "Mamonde", price: 15.00, category: "skincare", image: "#F8BBD0", emoji: "🌹", rating: 4.6, desc: "Soothing and fragrant.", featured: false, skinTypes: ["all"] },
        { id: 30, name: "Milk Skin Toner", brand: "Tirtir", price: 28.00, category: "skincare", image: "#FAFAFA", emoji: "🥛", rating: 4.9, desc: "Glass skin milk.", featured: true, skinTypes: ["dry", "dehydrated"] },

        // --- SERUMS (31-50) ---
        { id: 31, name: "Snail 96 Mucin Essence", brand: "COSRX", price: 25.00, category: "skincare", image: "#E0E0E0", emoji: "🐌", rating: 4.8, desc: "Repair and hydration.", featured: true, skinTypes: ["all", "dry", "acne"] },
        { id: 32, name: "Glow Serum", brand: "Beauty of Joseon", price: 17.00, category: "skincare", image: "#FFF59D", emoji: "🍯", rating: 4.9, desc: "Propolis + Niacinamide.", featured: true, skinTypes: ["oily", "combination"] },
        { id: 33, name: "Freshly Juiced Vitamin Drop", brand: "Klairs", price: 23.00, category: "skincare", image: "#F5F5F5", emoji: "🍋", rating: 4.6, desc: "Gentle Vitamin C.", featured: false, skinTypes: ["dull", "sensitive"] },
        { id: 34, name: "Peach 70 Niacin Serum", brand: "Anua", price: 24.00, category: "skincare", image: "#FFCCBC", emoji: "🍑", rating: 4.7, desc: "Smooths texture.", featured: true, skinTypes: ["combination", "dry"] },
        { id: 35, name: "Centella Unscented Serum", brand: "Purito", price: 20.00, category: "skincare", image: "#C8E6C9", emoji: "🌱", rating: 4.8, desc: "Sooths irritation.", featured: false, skinTypes: ["sensitive", "acne"] },
        { id: 36, name: "Blemish Care Serum", brand: "Isoi", price: 35.00, category: "skincare", image: "#F48FB1", emoji: "🌹", rating: 4.7, desc: "Rose oil for blemishes.", featured: false, skinTypes: ["acne", "sensitive"] },
        { id: 37, name: "Dark Spot Correcting Serum", brand: "Axis-Y", price: 19.00, category: "skincare", image: "#EEEEEE", emoji: "🌟", rating: 4.8, desc: "Niacinamide + Squalane.", featured: true, skinTypes: ["hyperpigmentation", "oily"] },
        { id: 38, name: "Vita B3 Source", brand: "Tiam", price: 18.00, category: "skincare", image: "#FAFAFA", emoji: "🧬", rating: 4.6, desc: "High concentration Niacinamide.", featured: false, skinTypes: ["oily", "dull"] },
        { id: 39, name: "Green Tea Seed Serum", brand: "Innisfree", price: 27.00, category: "skincare", image: "#A5D6A7", emoji: "🍃", rating: 4.7, desc: "Instant moisture boost.", featured: false, skinTypes: ["dehydrated"] },
        { id: 40, name: "First Care Activating Serum", brand: "Sulwhasoo", price: 89.00, category: "skincare", image: "#FFECB3", emoji: "👑", rating: 4.9, desc: "Luxury anti-aging.", featured: false, skinTypes: ["mature", "dry"] },
        { id: 41, name: "Revive Serum", brand: "Beauty of Joseon", price: 17.00, category: "skincare", image: "#FFE0B2", emoji: "🐌", rating: 4.6, desc: "Ginseng + Snail.", featured: false, skinTypes: ["mature", "dry"] },
        { id: 42, name: "Calming Serum", brand: "Beauty of Joseon", price: 17.00, category: "skincare", image: "#C8E6C9", emoji: "🍵", rating: 4.6, desc: "Green tea + Panthenol.", featured: false, skinTypes: ["sensitive", "redness"] },
        { id: 43, name: "1025 Dokdo Ampoule", brand: "Round Lab", price: 24.00, category: "skincare", image: "#E1F5FE", emoji: "💧", rating: 4.7, desc: "Heavy hydration.", featured: false, skinTypes: ["dry"] },
        { id: 44, name: "Ampoule Foam", brand: "Skin1004", price: 18.00, category: "skincare", image: "#BCAAA4", emoji: "🪐", rating: 4.6, desc: "Barrier support.", featured: false, skinTypes: ["sensitive"] },
        { id: 45, name: "Retinol Cica Ampoule", brand: "Innisfree", price: 35.00, category: "skincare", image: "#E0F2F1", emoji: "💊", rating: 4.7, desc: "Gentle retinol.", featured: false, skinTypes: ["acne", "oily"] },
        { id: 46, name: "Yuja Niacin Serum", brand: "Some By Mi", price: 20.00, category: "skincare", image: "#FFF176", emoji: "🍋", rating: 4.5, desc: "Brightening blemish care.", featured: false, skinTypes: ["dull"] },
        { id: 47, name: "Peptide 9 Volume Essence", brand: "Medi-Peel", price: 30.00, category: "skincare", image: "#E3F2FD", emoji: "🧪", rating: 4.6, desc: "Oxygen bubble essence.", featured: false, skinTypes: ["mature"] },
        { id: 48, name: "Madecassoside Ampoule", brand: "Apieu", price: 15.00, category: "skincare", image: "#E0E0E0", emoji: "🚑", rating: 4.4, desc: "Intense soothing.", featured: false, skinTypes: ["sensitive"] },
        { id: 49, name: "Propolis Energy Ampoule", brand: "CNP Laboratory", price: 28.00, category: "skincare", image: "#FFF9C4", emoji: "⚡", rating: 4.7, desc: "Vitality boost.", featured: false, skinTypes: ["dry", "dull"] },
        { id: 50, name: "Red Peel Tingle Serum", brand: "So Natural", price: 25.00, category: "skincare", image: "#FFCDD2", emoji: "🩸", rating: 4.3, desc: "Wash off peeling serum.", featured: false, skinTypes: ["oily"] },

        // --- MOISTURIZERS (51-70) ---
        { id: 51, name: "Dynasty Cream", brand: "Beauty of Joseon", price: 24.00, category: "skincare", image: "#FFFFFF", emoji: "👑", rating: 4.8, desc: "Luxury hydration.", featured: true, skinTypes: ["dry", "normal"] },
        { id: 52, name: "SoonJung 2x Barrier Cream", brand: "Etude", price: 20.00, category: "skincare", image: "#B2EBF2", emoji: "🛡️", rating: 4.9, desc: "Heals skin barrier.", featured: false, skinTypes: ["sensitive", "dry"] },
        { id: 53, name: "Birch Juice Cream", brand: "Round Lab", price: 26.00, category: "skincare", image: "#E3F2FD", emoji: "💧", rating: 4.9, desc: "Watery cream.", featured: true, skinTypes: ["oily", "combination", "dry"] },
        { id: 54, name: "Red Bean Water Gel", brand: "Beauty of Joseon", price: 18.00, category: "skincare", image: "#EF9A9A", emoji: "🫘", rating: 4.6, desc: "Lightweight gel.", featured: false, skinTypes: ["oily", "acne"] },
        { id: 55, name: "Water Sleeping Mask", brand: "Laneige", price: 32.00, category: "skincare", image: "#BBDEFB", emoji: "🌙", rating: 4.7, desc: "Overnight moisture.", featured: false, skinTypes: ["dry", "dehydrated"] },
        { id: 56, name: "Advanced Snail 92 All in one Cream", brand: "COSRX", price: 22.00, category: "skincare", image: "#E0E0E0", emoji: "🐌", rating: 4.8, desc: "Snail mucin cream.", featured: true, skinTypes: ["all", "dry"] },
        { id: 57, name: "Centella Soothing Cream", brand: "Skin1004", price: 19.00, category: "skincare", image: "#FFF3E0", emoji: "🌾", rating: 4.7, desc: "Calming gel cream.", featured: false, skinTypes: ["oily", "acne"] },
        { id: 58, name: "Midnight Blue Calming Cream", brand: "Klairs", price: 26.00, category: "skincare", image: "#212121", emoji: "💙", rating: 4.9, desc: "Spot treatment cream.", featured: false, skinTypes: ["sensitive", "sunburn"] },
        { id: 59, name: "Aestura Atobarrier 365 Cream", brand: "Aestura", price: 32.00, category: "skincare", image: "#FAFAFA", emoji: "🧱", rating: 4.9, desc: "Ceramide capsules.", featured: true, skinTypes: ["dry", "sensitive"] },
        { id: 60, name: "Heartleaf Soothing Cream", brand: "Anua", price: 25.00, category: "skincare", image: "#F1F8E9", emoji: "🌿", rating: 4.7, desc: "Daily soothing.", featured: false, skinTypes: ["sensitive"] },
        { id: 61, name: "Oil-Free Ultra Moisturizing Lotion", brand: "COSRX", price: 20.00, category: "skincare", image: "#E3F2FD", emoji: "🧴", rating: 4.6, desc: "Birch sap lotion.", featured: false, skinTypes: ["oily"] },
        { id: 62, name: "Jeju Cherry Blossom Jelly Cream", brand: "Innisfree", price: 24.00, category: "skincare", image: "#F8BBD0", emoji: "🌸", rating: 4.7, desc: "Dewy glow gel.", featured: false, skinTypes: ["dull", "dry"] },
        { id: 63, name: "Green Tea Seed Cream", brand: "Innisfree", price: 26.00, category: "skincare", image: "#E8F5E9", emoji: "🍵", rating: 4.6, desc: "Antioxidant cream.", featured: false, skinTypes: ["all"] },
        { id: 64, name: "Cica Balm", brand: "Dr.Jart+", price: 38.00, category: "skincare", image: "#E0F2F1", emoji: "🐯", rating: 4.8, desc: "Tiger grass repair.", featured: false, skinTypes: ["sensitive"] },
        { id: 65, name: "Honey Ceramide Cream", brand: "COSRX", price: 25.00, category: "skincare", image: "#FFF9C4", emoji: "🍯", rating: 4.6, desc: "Rich moisture.", featured: false, skinTypes: ["dry"] },
        { id: 66, name: "Ceramidin Cream", brand: "Dr.Jart+", price: 42.00, category: "skincare", image: "#FFF176", emoji: "🟡", rating: 4.8, desc: "Extreme barrier locking.", featured: true, skinTypes: ["very dry"] },
        { id: 67, name: "Panthensoside Cica Balm", brand: "Etude", price: 18.00, category: "skincare", image: "#E0E0E0", emoji: "🩹", rating: 4.6, desc: "Soothes stressed skin.", featured: false, skinTypes: ["sensitive"] },
        { id: 68, name: "Water Bank Blue Hyaluronic Cream", brand: "Laneige", price: 35.00, category: "skincare", image: "#B3E5FC", emoji: "💧", rating: 4.7, desc: "Micro hyaluronic acid.", featured: false, skinTypes: ["dry"] },
        { id: 69, name: "Nutri-Moisturizing Cream", brand: "Pyunkang Yul", price: 22.00, category: "skincare", image: "#3E2723", emoji: "🏺", rating: 4.7, desc: "Minimal ingredients.", featured: false, skinTypes: ["sensitive"] },
        { id: 70, name: "Vita 75 Vitamin Cream", brand: "By Wishtrend", price: 28.00, category: "skincare", image: "#FFEB3B", emoji: "☀️", rating: 4.5, desc: "Vitamin tree water.", featured: false, skinTypes: ["dull"] },

        // --- SUNSCREENS (71-80) ---
        { id: 71, name: "Relief Sun", brand: "Beauty of Joseon", price: 18.00, category: "skincare", image: "#FFFDE7", emoji: "☀️", rating: 5.0, desc: "Organic sunscreen.", featured: true, skinTypes: ["all", "dry"] },
        { id: 72, name: "Birch Juice Sun Cream", brand: "Round Lab", price: 22.00, category: "skincare", image: "#E1F5FE", emoji: "🌥️", rating: 4.9, desc: "Moisturizing SPF.", featured: true, skinTypes: ["all", "oily"] },
        { id: 73, name: "Daily UV Defense", brand: "Innisfree", price: 16.00, category: "skincare", image: "#FFF9C4", emoji: "🌻", rating: 4.5, desc: "Water-based SPF.", featured: false, skinTypes: ["combination"] },
        { id: 74, name: "Centella Hyalu-Cica Water-Fit Sun Serum", brand: "Skin1004", price: 19.00, category: "skincare", image: "#E3F2FD", emoji: "💧", rating: 4.9, desc: "Serum-like SPF.", featured: true, skinTypes: ["oily", "acne"] },
        { id: 75, name: "Aloe Soothing Sun Cream", brand: "COSRX", price: 15.00, category: "skincare", image: "#C8E6C9", emoji: "🌵", rating: 4.6, desc: "Hydrating aloe SPF.", featured: false, skinTypes: ["dry"] },
        { id: 76, name: "Cotton Soft Sun Stick", brand: "Tocobo", price: 18.00, category: "skincare", image: "#81D4FA", emoji: "☁️", rating: 4.7, desc: "Matte finish stick.", featured: true, skinTypes: ["oily", "combination"] },
        { id: 77, name: "Air Fit UV Defense", brand: "Klairs", price: 22.00, category: "skincare", image: "#E0F7FA", emoji: "🌬️", rating: 4.6, desc: "Lightweight finish.", featured: false, skinTypes: ["sensitive"] },
        { id: 78, name: "Red Blemish Soothing Sun", brand: "Dr.G", price: 24.00, category: "skincare", image: "#ECEFF1", emoji: "🛡️", rating: 4.7, desc: "For acne prone skin.", featured: false, skinTypes: ["acne"] },
        { id: 79, name: "UV Shield Sun Stick", brand: "IOPE", price: 28.00, category: "skincare", image: "#FFF59D", emoji: "🦯", rating: 4.5, desc: "Anti-pollution.", featured: false, skinTypes: ["all"] },
        { id: 80, name: "All-Around Safe Block", brand: "Missha", price: 14.00, category: "skincare", image: "#F8BBD0", emoji: "🌂", rating: 4.6, desc: "Soft finish sun milk.", featured: false, skinTypes: ["oily"] },

        // --- MAKEUP: BASE (81-95) ---
        { id: 81, name: "Kill Cover Mesh Glow Cushion", brand: "Clio", price: 28.00, category: "makeup", image: "#F8BBD0", emoji: "🪞", rating: 4.7, desc: "Glass skin cushion.", featured: true, skinTypes: ["normal", "dry"] },
        { id: 82, name: "Neo Cushion Matte", brand: "Laneige", price: 30.00, category: "makeup", image: "#B2DFDB", emoji: "💚", rating: 4.6, desc: "Matte coverage.", featured: false, skinTypes: ["oily"] },
        { id: 83, name: "Red Blemish Cushion", brand: "Dr.G", price: 25.00, category: "makeup", image: "#C8E6C9", emoji: "🌿", rating: 4.5, desc: "Calming cushion.", featured: false, skinTypes: ["acne", "sensitive"] },
        { id: 84, name: "Mask Fit Red Cushion", brand: "Tirtir", price: 29.00, category: "makeup", image: "#FFCDD2", emoji: "🔴", rating: 4.8, desc: "Viral high coverage.", featured: true, skinTypes: ["all"] },
        { id: 85, name: "Be Glow Foundation", brand: "Espoir", price: 32.00, category: "makeup", image: "#FFF176", emoji: "✨", rating: 4.7, desc: "Natural glow.", featured: false, skinTypes: ["dry"] },
        { id: 86, name: "Zero Cushion", brand: "Rom&nd", price: 24.00, category: "makeup", image: "#E0E0E0", emoji: "0️⃣", rating: 4.6, desc: "Lightweight matte.", featured: false, skinTypes: ["oily"] },
        { id: 87, name: "Black Cushion", brand: "Hera", price: 55.00, category: "makeup", image: "#212121", emoji: "🖤", rating: 4.9, desc: "Semi-matte luxury.", featured: true, skinTypes: ["all"] },
        { id: 88, name: "Double Lasting Foundation", brand: "Etude", price: 18.00, category: "makeup", image: "#FFE0B2", emoji: "⏳", rating: 4.5, desc: "24h persistence.", featured: false, skinTypes: ["all"] },
        { id: 89, name: "No Sebum Mineral Powder", brand: "Innisfree", price: 8.00, category: "makeup", image: "#C8E6C9", emoji: "☁️", rating: 4.8, desc: "Oil control powder.", featured: true, skinTypes: ["oily"] },
        { id: 90, name: "Peach Cotton Powder", brand: "Skinfood", price: 12.00, category: "makeup", image: "#FFCCBC", emoji: "🍑", rating: 4.6, desc: "Peach scent setting.", featured: false, skinTypes: ["oily"] },
        { id: 91, name: "M Perfect Cover BB Cream", brand: "Missha", price: 16.00, category: "makeup", image: "#B71C1C", emoji: "🅱️", rating: 4.7, desc: "Classic BB cream.", featured: false, skinTypes: ["all"] },
        { id: 92, name: "Tone Up No Sebum Sunscreen", brand: "Innisfree", price: 15.00, category: "makeup", image: "#FCE4EC", emoji: "🌸", rating: 4.6, desc: "Primer + SPF.", featured: false, skinTypes: ["oily"] },
        { id: 93, name: "Fixer Mist", brand: "So Natural", price: 18.00, category: "makeup", image: "#F8BBD0", emoji: "🚿", rating: 4.7, desc: "Makeup setting spray.", featured: false, skinTypes: ["all"] },
        { id: 94, name: "Pure Canvas Primer", brand: "Vidi Vici", price: 45.00, category: "makeup", image: "#FAFAFA", emoji: "🎨", rating: 4.8, desc: "Skin illuminator.", featured: false, skinTypes: ["dry"] },
        { id: 95, name: "Glass Ting Tint", brand: "Clio", price: 16.00, category: "makeup", image: "#F8BBD0", emoji: "🥃", rating: 4.5, desc: "Glassy lips.", featured: false, skinTypes: ["all"] },

        // --- MAKEUP: POINTS (96-115) ---
        { id: 96, name: "Juicy Lasting Tint", brand: "Rom&nd", price: 13.00, category: "makeup", image: "#FFCDD2", emoji: "🍒", rating: 4.9, desc: "Shiny fruit tint.", featured: true, skinTypes: ["all"] },
        { id: 97, name: "Ink Velvet", brand: "Peripera", price: 10.00, category: "makeup", image: "#EF9A9A", emoji: "💄", rating: 4.8, desc: "Velvet texture.", featured: true, skinTypes: ["all"] },
        { id: 98, name: "Glasting Melting Balm", brand: "Rom&nd", price: 15.00, category: "makeup", image: "#F48FB1", emoji: "👄", rating: 4.7, desc: "Moisturizing balm.", featured: false, skinTypes: ["dry"] },
        { id: 99, name: "Etude Fixing Tint", brand: "Etude", price: 12.00, category: "makeup", image: "#E1BEE7", emoji: "💋", rating: 4.6, desc: "Mask-proof matte.", featured: false, skinTypes: ["all"] },
        { id: 100, name: "Kill Lash Mascara", brand: "Clio", price: 18.00, category: "makeup", image: "#212121", emoji: "👁️", rating: 4.8, desc: "Superproof mascara.", featured: true, skinTypes: ["all"] },
        { id: 101, name: "Better Than Palette", brand: "Rom&nd", price: 28.00, category: "makeup", image: "#D7CCC8", emoji: "🎨", rating: 4.9, desc: "10-color garden.", featured: true, skinTypes: ["all"] },
        { id: 102, name: "Play Color Eyes", brand: "Etude", price: 22.00, category: "makeup", image: "#FFCCBC", emoji: "🍞", rating: 4.5, desc: "Bakehouse palette.", featured: false, skinTypes: ["all"] },
        { id: 103, name: "Drawing Eyebrow", brand: "Etude", price: 5.00, category: "makeup", image: "#795548", emoji: "✏️", rating: 4.7, desc: "Easy brow pencil.", featured: false, skinTypes: ["all"] },
        { id: 104, name: "Sharp So Simple Liner", brand: "Clio", price: 12.00, category: "makeup", image: "#4E342E", emoji: "🖊️", rating: 4.8, desc: "Waterproof liner.", featured: false, skinTypes: ["all"] },
        { id: 105, name: "Shading Powder", brand: "Too Cool For School", price: 16.00, category: "makeup", image: "#D7CCC8", emoji: "🗿", rating: 4.9, desc: "Artclass shading.", featured: true, skinTypes: ["all"] },
        { id: 106, name: "Mood Pebble Nail", brand: "Rom&nd", price: 8.00, category: "makeup", image: "#FFCCBC", emoji: "💅", rating: 4.6, desc: "Syrup nails.", featured: false, skinTypes: ["all"] },
        { id: 107, name: "Water Blur Tint", brand: "WakeMake", price: 14.00, category: "makeup", image: "#F06292", emoji: "💧", rating: 4.5, desc: "Blurring tint.", featured: false, skinTypes: ["all"] },
        { id: 108, name: "Fruity Glam Tint", brand: "Laka", price: 15.00, category: "makeup", image: "#FFAB91", emoji: "🍋", rating: 4.7, desc: "Vegan fruit tint.", featured: false, skinTypes: ["all"] },
        { id: 109, name: "Jelly Blush", brand: "Fwee", price: 18.00, category: "makeup", image: "#E1BEE7", emoji: "🍮", rating: 4.8, desc: "Soft jelly blush.", featured: true, skinTypes: ["dry", "normal"] },
        { id: 110, name: "Glitter Pedia", brand: "Unleashia", price: 20.00, category: "makeup", image: "#E0F2F1", emoji: "✨", rating: 4.7, desc: "All glitter palette.", featured: false, skinTypes: ["all"] },

        // --- SETS (116-120) ---
        { id: 116, name: "Glass Skin Starter", brand: "Bloomie", price: 45.00, category: "sets", image: "#E1F5FE", emoji: "🧊", rating: 5.0, desc: "Essentials for shiny skin.", featured: true, skinTypes: ["dry", "normal", "dull"] },
        { id: 117, name: "Acne Goodbye Set", brand: "Bloomie", price: 55.00, category: "sets", image: "#C8E6C9", emoji: "🩹", rating: 4.9, desc: "Full routine for troubled skin.", featured: false, skinTypes: ["acne", "oily"] },
        { id: 118, name: "Hydration Bomb Set", brand: "Bloomie", price: 60.00, category: "sets", image: "#E3F2FD", emoji: "🌊", rating: 5.0, desc: "Deep moisture for winter.", featured: false, skinTypes: ["dry", "dehydrated"] },
        { id: 119, name: "Glow Makeup Set", brand: "Bloomie", price: 75.00, category: "sets", image: "#F8BBD0", emoji: "🎀", rating: 4.8, desc: "Cushion + Tint + Blush.", featured: false, skinTypes: ["all"] },
        { id: 120, name: "Sun Protection Kit", brand: "Bloomie", price: 40.00, category: "sets", image: "#FFF9C4", emoji: "☀️", rating: 4.9, desc: "Sun cream + Stick.", featured: false, skinTypes: ["all"] }
    ],

    services: {
        makeup: {
            title: "Professional Makeup Application",
            price: 85.00,
            desc: "Get ready for your event with our expert artists using premium K-Beauty products.",
            icon: "💄"
        },
        color: {
            title: "Personal Color Analysis",
            price: 120.00,
            desc: "Discover your seasonal palette (Spring, Summer, Autumn, Winter) and finding your best colors.",
            icon: "🎨"
        }
    },

    // Diagnostic Helpers
    diagnosticData: {
        step: 0,
        answers: [],
        questions: [
            "How does your skin feel 2 hours after washing?",
            "How often do you get breakouts?",
            "What is your main skin goal?",
            "Do you wear makeup daily?",
            "How does your skin react to the sun?",
            "How much time do you have in the morning?",
            "What is your budget range?"
        ],
        options: [
            ["Tight & Dry", "Oily & Shiny", "Normal", "Oily T-Zone"],
            ["Rarely", "Monthly", "Weekly", "Always"],
            ["Hydration", "Anti-aging", "Clear Skin", "Glow"],
            ["Yes", "No", "Sometimes", "Only Sunscreen"],
            ["Burning", "Tanning", "Both", "Nothing"],
            ["5 min", "15 min", "30+ min", "1 hour"],
            ["High", "Medium", "Low", "Flexible"]
        ]
    },

    init() {
        // Load data
        const savedCart = localStorage.getItem('bloomieCart');
        if (savedCart) this.cart = JSON.parse(savedCart);

        const savedUser = localStorage.getItem('bloomieUser');
        if (savedUser) this.user = JSON.parse(savedUser);

        // Load Orders
        const savedOrders = localStorage.getItem('bloomieOrders');
        if (savedOrders) this.orders = JSON.parse(savedOrders);

        this.updateCartBadges();
        this.renderHomeFeatured();
        this.renderCatalog(this.products);
        this.renderFavorites();

        // Check login
        if (localStorage.getItem('bloomieLoggedIn')) {
            this.showScreen('home');
        } else {
            this.showScreen('login');
        }
    },

    // Navigation
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const screen = document.getElementById(`screen-${screenId}`);
        if (screen) {
            screen.classList.add('active');
            this.previousScreen = this.currentScreen;
            this.currentScreen = screenId;
        }

        if (screenId === 'cart') this.renderCart();
        if (screenId === 'catalog') this.adjustBottomNav('catalog');
        if (screenId === 'home') this.adjustBottomNav('home');
        if (screenId === 'dashboard') this.adjustBottomNav('dashboard');
        if (screenId === 'orders') this.renderOrders();
    },

    // ... (keep middle code same if possible, or just replacing init/showScreen block)
    // Actually safer to replace related blocks. 

    // Updated Process Payment to create Order
    processPayment() {
        // Mock processing
        const btn = document.querySelector('#screen-checkout .button-primary');
        const originalText = btn.textContent;
        btn.textContent = 'Processing...';
        btn.disabled = true;

        setTimeout(() => {
            // Create Order
            const newOrder = {
                id: 'ORD-' + Date.now().toString().slice(-6),
                date: new Date().toLocaleDateString(),
                status: 'Processing',
                total: this.cart.reduce((total, item) => {
                    const p = this.products.find(x => x.id == item.productId); // Loose equality just in case
                    return total + (p ? p.price * item.qty : 0);
                }, 0),
                items: this.cart.map(item => {
                    const p = this.products.find(x => x.id == item.productId);
                    return {
                        id: item.productId,
                        name: p ? p.name : 'Unknown',
                        price: p ? p.price : 0,
                        qty: item.qty,
                        image: p ? p.image : '',
                        emoji: p ? p.emoji : '📦'
                    };
                })
            };

            this.orders.unshift(newOrder); // Add to top
            this.saveOrders();

            // Clear Cart
            this.cart = [];
            this.saveCart();
            this.updateCartBadges();
            this.showScreen('success');
            btn.textContent = originalText;
            btn.disabled = false;
        }, 2000);
    },

    orders: [],

    saveOrders() {
        localStorage.setItem('bloomieOrders', JSON.stringify(this.orders));
    },

    renderOrders() {
        const list = document.getElementById('orders-list-container');
        if (!list) return;
        list.innerHTML = '';

        if (!this.orders || this.orders.length === 0) {
            list.innerHTML = `
                <div class="empty-state">
                    <div class="emoji-large">📦</div>
                    <h3>No past orders</h3>
                    <p>You haven't purchased anything yet.</p>
                    <button class="button button-secondary" onclick="app.showScreen('catalog')">Start Shopping</button>
                </div>
            `;
            return;
        }

        this.orders.forEach(order => {
            const div = document.createElement('div');
            div.className = 'order-card';

            let itemsHtml = '';
            order.items.forEach(item => {
                itemsHtml += `
                    <div class="order-item-thumb" style="background:${item.image}">
                        ${item.emoji}
                    </div>
                `;
            });

            div.innerHTML = `
                <div class="order-header">
                    <div>
                        <div class="order-id">#${order.id}</div>
                        <div class="order-date">${order.date}</div>
                    </div>
                    <div class="order-status">${order.status}</div>
                </div>
                <div class="order-items-preview">
                    ${itemsHtml}
                </div>
                <div class="order-footer">
                    <span>${order.items.length} Items</span>
                    <span class="order-total">$${order.total.toFixed(2)}</span>
                </div>
            `;
            list.appendChild(div);
        });
    },

    goBack() {
        if (this.currentScreen === 'checkout') this.showScreen('cart');
        else if (this.currentScreen === 'cart') this.showScreen(this.previousScreen || 'home');
        else this.showScreen('home');
    },

    adjustBottomNav(activeId) {
        document.querySelectorAll(`.bottom-nav .nav-item`).forEach(el => el.classList.remove('is-active'));
        // Simple logic for brevity, in a real app would use IDs
    },

    login(method) {
        localStorage.setItem('bloomieLoggedIn', 'true');
        this.showScreen('home');
    },

    logout() {
        localStorage.removeItem('bloomieLoggedIn');
        this.showScreen('login');
    },

    // Home Logic
    renderHomeFeatured() {
        const list = document.getElementById('home-featured-list');
        list.innerHTML = '';
        this.products.filter(p => p.featured).forEach(p => {
            const card = this.createProductCard(p);
            list.appendChild(card);
        });
    },

    scrollToSection(id) {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    },

    // Catalog Logic
    renderCatalog(products) {
        const grid = document.getElementById('catalog-list');
        grid.innerHTML = '';
        products.forEach(p => {
            const card = this.createProductCard(p);
            grid.appendChild(card);
        });
    },

    createProductCard(product) {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.onclick = () => this.showProductDetail(product.id);
        div.innerHTML = `
            <div class="p-image" style="background: ${product.image}">
                ${product.emoji}
            </div>
            <div class="p-details">
                <div class="p-name">${product.brand}</div>
                <div class="p-name" style="color:var(--text-main);">${product.name}</div>
                <div class="p-price">$${product.price.toFixed(2)}</div>
                <button class="p-btn" onclick="event.stopPropagation(); app.addToCart(${product.id})">Add</button>
            </div>
        `;
        return div;
    },

    filterCatalog(category) {
        // Update pills
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        const activeChip = document.querySelector(`.filter-chip[data-filter="${category}"]`);
        if (activeChip) activeChip.classList.add('active');

        if (category === 'all') {
            this.renderCatalog(this.products);
        } else {
            const filtered = this.products.filter(p => p.category === category);
            this.renderCatalog(filtered);
        }
        if (this.currentScreen !== 'catalog') this.showScreen('catalog');
    },

    // Search Logic
    focusSearch() {
        const input = document.getElementById('global-search');
        input.focus();
        window.scrollTo(0, 0);
    },

    handleSearch(query) {
        const q = query.toLowerCase();
        if (q.length === 0) {
            this.renderHomeFeatured(); // Reset home view partial
            return;
        }
        // If searching, we could redirect to catalog or show inline results. 
        // For simplicity, let's just filter catalog and switch there if they hit enter, 
        // OR just filter home content? Let's switch to catalog.

        const filtered = this.products.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.category.includes(q)
        );

        // If user is typing, maybe just show results in catalog screen?
        // Let's do simple:
        // If simple input, it stays on home. If they want search results, filter catalog.
        // Actually best UX: type > show simple dropdown or switch Main View.
        // Let's make it so typing switches to "Search Mode".
        // IMPLEMENTATION: Just filter the home featured list for now as a "Quick Find"

        const list = document.getElementById('home-featured-list');
        list.innerHTML = '';
        if (filtered.length === 0) list.innerHTML = '<p style="padding:20px">No products found.</p>';
        filtered.forEach(p => {
            list.appendChild(this.createProductCard(p));
        });
    },

    // Product Detail
    currentDetailId: null,
    detailQty: 1,

    showProductDetail(id) {
        const p = this.products.find(x => x.id === id);
        if (!p) return;
        this.currentDetailId = id;
        this.detailQty = 1;

        document.getElementById('product-detail-name').textContent = p.name;
        document.getElementById('product-detail-brand').textContent = p.brand;
        document.getElementById('product-detail-price').textContent = `$${p.price.toFixed(2)}`;
        document.getElementById('product-detail-desc').textContent = p.desc;
        document.getElementById('product-detail-emoji').textContent = p.emoji;
        document.getElementById('product-detail-image').style.background = p.image;
        document.getElementById('detail-qty').textContent = '1';

        // Fav icon state
        this.updateFavIcon();

        this.showScreen('product-detail');
    },

    adjustDetailQty(delta) {
        this.detailQty += delta;
        if (this.detailQty < 1) this.detailQty = 1;
        document.getElementById('detail-qty').textContent = this.detailQty;
    },

    addToCartFromDetail() {
        this.addToCart(this.currentDetailId, this.detailQty);
        // Maybe small toast?
        alert('Added to cart!');
    },

    toggleAccordion(id) {
        const el = document.getElementById(`body-${id}`);
        const arrow = document.getElementById(`arrow-${id}`);
        if (el.classList.contains('hidden')) {
            el.classList.remove('hidden');
            arrow.textContent = '▲';
        } else {
            el.classList.add('hidden');
            arrow.textContent = '▼';
        }
    },

    goBackFromProduct() {
        this.showScreen(this.previousScreen);
    },

    // Cart Logic
    addToCart(productId, qty = 1) {
        const existing = this.cart.find(item => item.productId === productId);
        if (existing) {
            existing.qty += qty;
        } else {
            this.cart.push({ productId, qty });
        }
        this.saveCart();
        this.updateCartBadges();
    },

    saveCart() {
        localStorage.setItem('bloomieCart', JSON.stringify(this.cart));
    },

    updateCartBadges() {
        const count = this.cart.reduce((a, b) => a + b.qty, 0);
        const badges = document.querySelectorAll('.badge, .badge-mini');
        badges.forEach(b => {
            b.textContent = count;
            if (count > 0) b.classList.remove('hidden');
            else b.classList.add('hidden');
        });
    },

    renderCart() {
        const container = document.getElementById('cart-items-container');
        container.innerHTML = '';
        let subtotal = 0;

        if (this.cart.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="emoji-large">🛒</div>
                    <h3>Your cart is empty</h3>
                    <p>Looks like you haven't added anything yet.</p>
                    <button class="button button-secondary" onclick="app.showScreen('catalog')">Start Shopping</button>
                </div>
            `;
            document.getElementById('cart-summary').style.display = 'none';
            return;
        } else {
            document.getElementById('cart-summary').style.display = 'block';
        }

        this.cart.forEach((item, idx) => {
            const product = this.products.find(p => p.id === item.productId);
            if (!product) return;
            const itemTotal = product.price * item.qty;
            subtotal += itemTotal;

            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <div class="cart-thumb" style="background:${product.image}">${product.emoji}</div>
                <div class="cart-details">
                    <div class="cart-name">${product.name}</div>
                    <div class="cart-meta">${product.brand}</div>
                    <div class="cart-row-btm">
                        <div class="cart-price">$${product.price.toFixed(2)} x ${item.qty}</div>
                        <div class="remove-link" onclick="app.removeFromCart(${idx})">Remove</div>
                    </div>
                </div>
            `;
            container.appendChild(div);
        });

        document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('cart-total').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('checkout-total').textContent = `$${subtotal.toFixed(2)}`;
    },

    removeFromCart(index) {
        this.cart.splice(index, 1);
        this.saveCart();
        this.renderCart();
        this.updateCartBadges();
    },

    selectedPaymentMsg: 'credit',

    selectPaymentMethod(type) {
        this.selectedPaymentMsg = type;
        const methods = document.querySelectorAll('.payment-card');
        methods.forEach(m => {
            m.classList.remove('selected');
            const radio = m.querySelector('.radio-check');
            if (radio) {
                radio.style.background = 'transparent';
                radio.style.borderColor = '#ddd';
            }
        });

        // Find the one clicked
        const mapping = {
            'credit': 0,
            'apple': 1,
            'google': 2
        };

        const selected = methods[mapping[type]];
        if (selected) {
            selected.classList.add('selected');
            const radio = selected.querySelector('.radio-check');
            if (radio) {
                radio.style.background = 'var(--accent-color)';
                radio.style.borderColor = 'var(--accent-color)';
            }
        }
    },

    processPayment() {
        // Mock processing
        const btn = document.querySelector('#screen-checkout .button-primary');
        const originalText = btn.textContent;
        btn.textContent = 'Processing...';
        btn.disabled = true;

        setTimeout(() => {
            this.cart = [];
            this.saveCart();
            this.updateCartBadges();
            this.showScreen('success');
            btn.textContent = originalText;
            btn.disabled = false;
        }, 2000);
    },

    // Services
    currentServiceType: null,

    showServiceDetail(type) {
        const s = this.services[type];
        if (!s) return;
        this.currentServiceType = type;
        document.getElementById('service-title').textContent = s.title;
        document.getElementById('service-price').textContent = `$${s.price.toFixed(2)}`;
        document.getElementById('service-desc').textContent = s.desc;
        document.getElementById('service-icon').textContent = s.icon;

        this.showScreen('service-detail');
    },

    bookService() {
        // Just mock
        alert(`Booking Confirmed for ${this.services[this.currentServiceType].title}! We will email you the details.`);
        this.showScreen('home');
    },

    // Favorites
    toggleFavorite() {
        if (!this.currentDetailId) return;
        const exists = this.user.favorites.indexOf(this.currentDetailId);
        if (exists > -1) {
            this.user.favorites.splice(exists, 1);
        } else {
            this.user.favorites.push(this.currentDetailId);
        }
        localStorage.setItem('bloomieUser', JSON.stringify(this.user));
        this.updateFavIcon();
        this.renderFavorites();
    },

    updateFavIcon() {
        const icon = document.getElementById('detail-fav-icon');
        const isFav = this.user.favorites.includes(this.currentDetailId);
        icon.textContent = isFav ? '❤️' : '♡';
        icon.style.color = isFav ? 'red' : 'inherit';
    },

    renderFavorites() {
        const list = document.getElementById('favorites-list');
        list.innerHTML = '';
        if (this.user.favorites.length === 0) {
            list.innerHTML = '<p class="text-muted">No favorites yet.</p>';
            return;
        }
        this.user.favorites.forEach(id => {
            const product = this.products.find(p => p.id === id);
            if (product) {
                const div = document.createElement('div');
                div.className = 'cart-item'; // Reuse style
                div.onclick = () => this.showProductDetail(id);
                div.innerHTML = `
                   <div class="cart-thumb" style="background:${product.image}">${product.emoji}</div>
                   <div class="cart-details">
                       <div class="cart-name">${product.name}</div>
                   </div>
                `;
                list.appendChild(div);
            }
        });
    },

    // Diagnostic (Simplified)
    startDiagnostic() {
        this.diagnosticData.step = 0;
        this.diagnosticData.answers = [];
        this.showScreen('diagnostic');
        this.renderDiagnosticStep();
    },

    renderDiagnosticStep() {
        const step = this.diagnosticData.step;
        document.getElementById('diagnostic-step').textContent = step + 1;
        document.getElementById('progress-fill').style.width = `${((step + 1) / 7) * 100}%`;
        document.getElementById('diagnostic-question').textContent = this.diagnosticData.questions[step];

        const container = document.getElementById('diagnostic-options');
        container.innerHTML = '';
        this.diagnosticData.options[step].forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'button button-secondary button-option';
            btn.textContent = opt;
            btn.style.textAlign = 'left';
            btn.onclick = () => this.selectAnswer(idx);
            container.appendChild(btn);
        });
        document.getElementById('diagnostic-next').disabled = true;
    },

    selectAnswer(idx) {
        // Highlight selection
        const opts = document.querySelectorAll('.button-option');
        opts.forEach((o, i) => {
            if (i === idx) {
                o.style.borderColor = 'var(--text-main)';
                o.style.background = '#f0f0f0';
            } else {
                o.style.borderColor = 'var(--border-color)';
                o.style.background = 'white';
            }
        });
        this.diagnosticData.answers[this.diagnosticData.step] = idx;
        document.getElementById('diagnostic-next').disabled = false;
    },

    nextDiagnosticStep() {
        if (this.diagnosticData.step < 6) {
            this.diagnosticData.step++;
            this.renderDiagnosticStep();
        } else {
            // Finish
            this.showResult();
        }
    },

    goBackDiagnostic() {
        this.showScreen('home');
    },

    showResult() {
        // Fake logic based on answers
        // If mostly A -> Oily, B -> Dry etc.
        // Random for now as logic wasn't the task's core focus
        const types = ['Oily', 'Dry', 'Combination', 'Normal'];
        const outcome = types[Math.floor(Math.random() * types.length)];

        document.getElementById('result-skin-type').textContent = outcome;
        document.getElementById('result-concerns').innerHTML = '<li>Hydration</li><li>Brightening</li>';
        document.getElementById('result-explanation').textContent = `Your skin shows signs of being ${outcome.toLowerCase()}. We recommend balancing hydration with gentle actives.`;

        // Update button onclick to actually go to recommendations
        const btn = document.querySelector('#screen-result .button-primary');
        if (btn) {
            btn.onclick = () => this.showRecommendedProducts(outcome);
        }

        this.showScreen('result');
    },

    showRecommendedProducts(type) {
        // For simplicity, just go to catalog and filter by 'skincare' 
        // In a real app, we would filter by the specific skin type
        this.filterCatalog('skincare');
        this.showScreen('catalog');

        // Optional: Show a toast or banner saying "Showing matches for [Type]"
        // For now, just taking them to the shop is enough to unblock the flow.
    },

    switchTab(tabName) {
        if (tabName === 'favorites') {
            const section = document.getElementById('favorites-section');
            if (section) section.scrollIntoView({ behavior: 'smooth' });
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
