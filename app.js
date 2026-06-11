/* ==========================================================================
   GREEN CITY PHARMACY - CORE JAVASCRIPT LOGIC
   Features: Dynamic Catalog, Live Search, Multi-functional Cart, Drag & Drop Upload
   ========================================================================== */

// 1. DEFAULT PRODUCT DATABASE
const DEFAULT_PRODUCTS_DB = [
    {
        id: 1,
        name: "Paracetamol 500mg Tablets",
        category: "otc",
        price: 25.00,
        icon: "fa-tablets",
        gradientClass: "grad-otc",
        desc: "Effective relief from pain and fever. Sourced from licensed distributors.",
        size: "Strip of 10 Tablets",
        rxRequired: false,
        ingredients: "Paracetamol IP 500mg",
        benefits: ["Reduces fever (Antipyretic)", "Relieves headache & body ache", "Mild joint pain relief"],
        directions: "Take 1-2 tablets every 4 to 6 hours as needed. Maximum 4g (8 tablets) in 24 hours. Keep at least 4 hours gap between doses.",
        sideEffects: "Rare: skin rashes, liver damage if taken in excessive doses. Avoid alcohol."
    },
    {
        id: 2,
        name: "Cetirizine 10mg (Allergy Relief)",
        category: "otc",
        price: 35.00,
        icon: "fa-pills",
        gradientClass: "grad-otc",
        desc: "24-hour non-drowsy relief for seasonal allergies and hay fever.",
        size: "Strip of 10 Tablets",
        rxRequired: false,
        ingredients: "Cetirizine Hydrochloride IP 10mg",
        benefits: ["Relieves runny nose & sneezing", "Reduces watery, itchy eyes", "Treats skin hives & itching"],
        directions: "Adults and children over 12: Take 1 tablet (10mg) once daily. Best taken in the evening as it may cause light drowsiness.",
        sideEffects: "Mild drowsiness, dry mouth, headache, fatigue."
    },
    {
        id: 3,
        name: "Ibuprofen 400mg Tablets",
        category: "otc",
        price: 45.00,
        icon: "fa-capsules",
        gradientClass: "grad-otc",
        desc: "Anti-inflammatory pain reliever for body aches and minor swelling.",
        size: "Strip of 15 Tablets",
        rxRequired: false,
        ingredients: "Ibuprofen IP 400mg",
        benefits: ["Reduces swelling & inflammation", "Relieves dental & muscle pain", "Effective for menstrual cramps"],
        directions: "Take 1 tablet after meals with water, 2-3 times daily as prescribed. Do not take on an empty stomach.",
        sideEffects: "Stomach upset, heartburn, nausea, dizziness. Use caution if you have gastric ulcers."
    },
    {
        id: 4,
        name: "Vitamin C 1000mg with Zinc",
        category: "vitamins",
        price: 180.00,
        icon: "fa-prescription-bottle-medical",
        gradientClass: "grad-vitamins",
        desc: "Premium antioxidant blend to boost daily immune defense.",
        size: "Bottle of 30 Gummies",
        rxRequired: false,
        ingredients: "Ascorbic Acid IP 1000mg, Zinc Oxide IP 15mg",
        benefits: ["Strengthens immune system", "Acts as a powerful antioxidant", "Promotes healthy skin & wound healing"],
        directions: "Chew or dissolve 1 gummy daily, preferably in the morning after breakfast.",
        sideEffects: "Excess dose may cause stomach cramps or diarrhea."
    },
    {
        id: 5,
        name: "Multivitamin Daily Active",
        category: "vitamins",
        price: 240.00,
        icon: "fa-prescription-bottle",
        gradientClass: "grad-vitamins",
        desc: "Complete nutritional profile with key vitamins and minerals for active energy.",
        size: "Bottle of 60 Tablets",
        rxRequired: false,
        ingredients: "Essential Vitamins A, B-Complex, C, D3, E, Iron, Calcium & Minerals",
        benefits: ["Boosts daily energy & vitality", "Supports bone & brain function", "Fills nutritional gaps in diet"],
        directions: "Take 1 tablet daily after a main meal (lunch or dinner) with a glass of water.",
        sideEffects: "Generally safe. Iron content may cause temporary dark stools."
    },
    {
        id: 6,
        name: "Fish Oil Omega-3 (1000mg)",
        category: "vitamins",
        price: 320.00,
        icon: "fa-droplet",
        gradientClass: "grad-vitamins",
        desc: "Premium molecularly distilled fish oil for heart, joint, and brain health.",
        size: "Bottle of 30 Softgels",
        rxRequired: false,
        ingredients: "Purified Fish Oil 1000mg providing EPA 180mg, DHA 120mg",
        benefits: ["Supports heart and cardiovascular health", "Improves joint flexibility & comfort", "Enhances brain function & vision"],
        directions: "Take 1 softgel daily, ideally with a meal to improve absorption.",
        sideEffects: "Fishy aftertaste (can be avoided by taking before meals), mild nausea."
    },
    {
        id: 7,
        name: "Digital LCD Thermometer",
        category: "essentials",
        price: 199.00,
        icon: "fa-thermometer",
        gradientClass: "grad-essentials",
        desc: "High precision oral/underarm temperature reading with automatic buzzer.",
        size: "1 Unit Pack",
        rxRequired: false,
        ingredients: "Precision Electronic Sensor & LCD Display",
        benefits: ["Quick 60-second temperature reading", "High accuracy (+/- 0.1°C)", "Mercury-free & safe for infants"],
        directions: "Place under tongue or armpit. Wait for the beep sound. Clean sensor with alcohol swab after use.",
        sideEffects: "None. Keep battery cover locked away from children."
    },
    {
        id: 8,
        name: "N95 Surgical Face Masks",
        category: "essentials",
        price: 150.00,
        icon: "fa-mask-face",
        gradientClass: "grad-essentials",
        desc: "5-layer particulate filtration with comfortable soft earloops.",
        size: "Pack of 5 Masks",
        rxRequired: false,
        ingredients: "5-layer Non-woven Meltblown Filtering Media",
        benefits: ["Filters 95% of airborne particles", "Protects against dust, smog & pollen", "Comfortable soft ear loops & nose clip"],
        directions: "Fit nose clip snugly over nose bridge. Adjust ear loops. Avoid touching the front of the mask while wearing.",
        sideEffects: "None. Replace if breathing becomes difficult or mask gets soiled."
    },
    {
        id: 9,
        name: "Antiseptic Liquid (250ml)",
        category: "essentials",
        price: 85.00,
        icon: "fa-pump-medical",
        gradientClass: "grad-essentials",
        desc: "First-aid concentrated disinfectant liquid for cuts, bites, and hygiene.",
        size: "250ml Bottle",
        rxRequired: false,
        ingredients: "Chlorhexidine Gluconate 0.3%, Cetrimide 3.0%",
        benefits: ["Kills 99.9% of disease germs", "First-aid wound disinfection", "Sanitizes skin & household surfaces"],
        directions: "Dilute 1 part antiseptic with 10 parts water for skin application. Do not apply directly to deep, open wounds.",
        sideEffects: "For external use only. Mild skin irritation in sensitive individuals."
    },
    {
        id: 10,
        name: "Soothing Aloe Vera Gel",
        category: "personal",
        price: 120.00,
        icon: "fa-leaf",
        gradientClass: "grad-personal",
        desc: "99% pure organic aloe extract for instant skin hydration and sun relief.",
        size: "150g Tube",
        rxRequired: false,
        ingredients: "Organic Aloe Barbadensis Leaf Juice 99%",
        benefits: ["Hydrates & cools sun-damaged skin", "Calms shaving irritation & redness", "Non-greasy natural moisturizer"],
        directions: "Apply a thin layer to clean skin area. Massage gently until absorbed. Reapply as needed.",
        sideEffects: "Extremely safe. Perform a patch test if you have plant allergies."
    },
    {
        id: 11,
        name: "Hydrating Herb Face Wash",
        category: "personal",
        price: 145.00,
        icon: "fa-soap",
        gradientClass: "grad-personal",
        desc: "Gentle soap-free wash with tea tree extract for clean, breakout-free skin.",
        size: "100ml Squeeze Tube",
        rxRequired: false,
        ingredients: "Tea Tree Oil, Neem Extract, Salicylic Acid 0.5%",
        benefits: ["Controls oil & clears breakouts", "Gentle deep pore cleansing", "Doesn't strip skin moisture"],
        directions: "Squeeze a small amount onto wet palms. Work into lather and massage onto face. Rinse thoroughly.",
        sideEffects: "Avoid direct eye contact. May cause mild dryness initially."
    },
    {
        id: 12,
        name: "Intensive Moisturizing Cream",
        category: "personal",
        price: 210.00,
        icon: "fa-spa",
        gradientClass: "grad-personal",
        desc: "Deep skin barrier nourishment with cocoa butter and vitamin E.",
        size: "200ml Tub",
        rxRequired: false,
        ingredients: "Cocoa Butter, Shea Butter, Vitamin E, Glycerin",
        benefits: ["Restores dry skin barrier", "Deep 24-hour nourishment", "Relieves flakiness and dry patches"],
        directions: "Apply generously to dry areas like elbows, hands, and feet, especially after bathing.",
        sideEffects: "None. Avoid applying to active acne-prone facial zones."
    }
];

// Initialize database from localStorage or defaults
let PRODUCTS_DB = JSON.parse(localStorage.getItem('gcp_catalog')) || DEFAULT_PRODUCTS_DB;
if (!localStorage.getItem('gcp_catalog')) {
    localStorage.setItem('gcp_catalog', JSON.stringify(DEFAULT_PRODUCTS_DB));
}

// Payment & Store Settings
const DEFAULT_STORE_SETTINGS = {
    proprietorName: "Ameen Ahamad",
    pharmacistName: "Ameen Ahamad",
    regNo: "49301",
    dlNo: "DL-29302/20B/21B",
    phone: "+91 98765 43210",
    whatsappNumber: "919876543210",
    email: "contact@greencitypharmacy.com",
    mapsLink: "https://maps.google.com",
    operatingHours: "Monday - Sunday: 08:00 AM - 10:00 PM (IST)",
    shortAddress: "Near Central Plaza, Green City, India",
    longAddress: "Shop No. 12, Ground Floor, Central Plaza Mall, Near Metro Station, Green City, India",
    gstPercentage: 12,
    upiId: "ameena@okaxis",
    beneficiaryName: "Green City Pharmacy",
    bankName: "State Bank of India",
    accountNumber: "34051029341",
    ifscCode: "SBIN0001234"
};

// Backwards compatibility import
const legacyPayment = JSON.parse(localStorage.getItem('gcp_payment_settings'));
if (legacyPayment) {
    DEFAULT_STORE_SETTINGS.upiId = legacyPayment.upiId || DEFAULT_STORE_SETTINGS.upiId;
    DEFAULT_STORE_SETTINGS.beneficiaryName = legacyPayment.beneficiaryName || DEFAULT_STORE_SETTINGS.beneficiaryName;
    DEFAULT_STORE_SETTINGS.bankName = legacyPayment.bankName || DEFAULT_STORE_SETTINGS.bankName;
    DEFAULT_STORE_SETTINGS.accountNumber = legacyPayment.accountNumber || DEFAULT_STORE_SETTINGS.accountNumber;
    DEFAULT_STORE_SETTINGS.ifscCode = legacyPayment.ifscCode || DEFAULT_STORE_SETTINGS.ifscCode;
}

let STORE_SETTINGS = JSON.parse(localStorage.getItem('gcp_store_settings')) || DEFAULT_STORE_SETTINGS;
if (!localStorage.getItem('gcp_store_settings')) {
    localStorage.setItem('gcp_store_settings', JSON.stringify(STORE_SETTINGS));
}

// Security & Password Settings
const DEFAULT_ADMIN_PASSWORD = "admin123";
let ADMIN_PASSWORD = localStorage.getItem('gcp_admin_password') || DEFAULT_ADMIN_PASSWORD;
if (!localStorage.getItem('gcp_admin_password')) {
    localStorage.setItem('gcp_admin_password', DEFAULT_ADMIN_PASSWORD);
}

// 2. STATE VARIABLES
let cart = [];
let currentCategory = "all";
let currentSearchQuery = "";
let deliveryType = "pickup"; // 'pickup' or 'delivery'
const DELIVERY_FEE = 30.00;
let uploadedFile = null;
let isAdminAuthenticated = false;
let activeOTP = "";

// 3. ELEMENT SELECTIONS
const productGrid = document.getElementById("product-grid-container");
const catalogTabs = document.getElementById("catalog-tabs");
const globalSearch = document.getElementById("global-search");
const clearSearchBtn = document.getElementById("clear-search");
const displayedCount = document.getElementById("displayed-count");

const cartBtn = document.getElementById("cart-btn");
const cartOverlay = document.getElementById("cart-overlay");
const cartPanel = document.getElementById("cart-panel");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartCounter = document.getElementById("cart-counter");
const cartEmpty = document.getElementById("cart-empty");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartSummarySection = document.getElementById("cart-summary-section");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartTotal = document.getElementById("cart-total");
const checkoutSubmitBtn = document.getElementById("checkout-submit-btn");

const deliveryOptionPickup = document.getElementById("delivery-option-pickup");
const deliveryOptionHome = document.getElementById("delivery-option-home");
const deliveryAddressGroup = document.getElementById("delivery-address-group");

const prescriptionDropzone = document.getElementById("prescription-dropzone");
const prescriptionInput = document.getElementById("prescription-input");
const uploadSuccessState = document.getElementById("upload-success");
const uploadedFilename = document.getElementById("uploaded-filename");
const removeFileBtn = document.getElementById("remove-file-btn");
const prescriptionForm = document.getElementById("prescription-details-form");
const prescriptionPreviewContainer = document.getElementById("prescription-preview-container");
const prescriptionPreviewImg = document.getElementById("prescription-preview-img");

const mobileToggle = document.getElementById("mobile-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const mainHeader = document.querySelector(".main-header");
const toastContainer = document.getElementById("toast-container");

// New Admin Portal Elements
const adminPortalBtn = document.getElementById("admin-portal-btn");
const mobileAdminPortalBtn = document.getElementById("mobile-admin-portal-btn");
const adminPortalModal = document.getElementById("admin-portal-modal");
const closeAdminModal = document.getElementById("close-admin-modal");
const tabBtnCatalog = document.getElementById("tab-btn-catalog");
const tabBtnOrders = document.getElementById("tab-btn-orders");
const tabBtnSettings = document.getElementById("tab-btn-settings");
const panelCatalog = document.getElementById("panel-catalog");
const panelOrders = document.getElementById("panel-orders");
const panelSettings = document.getElementById("panel-settings");
const adminProductSearch = document.getElementById("admin-product-search");
const adminAddProductBtn = document.getElementById("admin-add-product-btn");
const adminProductsList = document.getElementById("admin-products-list");
const adminResetCatalogBtn = document.getElementById("admin-reset-catalog-btn");

// Admin Settings form fields
const adminSettingsForm = document.getElementById("admin-settings-form");
const cfgProprietor = document.getElementById("cfg-proprietor");
const cfgPharmacistName = document.getElementById("cfg-pharmacist-name");
const cfgRegNo = document.getElementById("cfg-reg-no");
const cfgDlNo = document.getElementById("cfg-dl-no");
const cfgStorePhone = document.getElementById("cfg-store-phone");
const cfgStoreWhatsapp = document.getElementById("cfg-store-whatsapp");
const cfgStoreEmail = document.getElementById("cfg-store-email");
const cfgMapsLink = document.getElementById("cfg-maps-link");
const cfgHours = document.getElementById("cfg-hours");
const cfgGstRate = document.getElementById("cfg-gst-rate");
const cfgShortAddress = document.getElementById("cfg-short-address");
const cfgLongAddress = document.getElementById("cfg-long-address");
const cfgUpiId = document.getElementById("cfg-upi-id");
const cfgBeneficiary = document.getElementById("cfg-beneficiary");
const cfgBankName = document.getElementById("cfg-bank-name");
const cfgAccNumber = document.getElementById("cfg-acc-number");
const cfgIfsc = document.getElementById("cfg-ifsc");

// Orders log elements
const adminOrderSearch = document.getElementById("admin-order-search");
const adminSimulateOrderBtn = document.getElementById("admin-simulate-order-btn");
const adminOrdersList = document.getElementById("admin-orders-list");
const adminClearOrdersBtn = document.getElementById("admin-clear-orders-btn");
const ordersBadgeCount = document.getElementById("orders-badge-count");

// Invoice print elements
const invoiceModalOverlay = document.getElementById("invoice-modal-overlay");
const invoicePaperContent = document.getElementById("invoice-paper-content");
const invoicePrintBtn = document.getElementById("invoice-print-btn");
const closeInvoiceBtn = document.getElementById("close-invoice-btn");

// Floating live chat elements
const chatBubbleTrigger = document.getElementById("chat-bubble-trigger");
const chatWindowPanel = document.getElementById("chat-window-panel");
const chatPanelCloseBtn = document.getElementById("chat-panel-close-btn");
const chatMessagesList = document.getElementById("chat-messages-list");
const chatTypingBubble = document.getElementById("chat-typing-bubble");
const chatMessageInput = document.getElementById("chat-message-input");
const chatInputForm = document.getElementById("chat-input-form");
const chatWhatsappRedirectBtn = document.getElementById("chat-whatsapp-redirect-btn");
const chatNotificationDot = document.getElementById("chat-notification-dot");

// New Product Form Modal Elements
const productFormModal = document.getElementById("product-form-modal");
const productFormTitle = document.getElementById("product-form-title");
const closeProductForm = document.getElementById("close-product-form");
const adminProductDetailsForm = document.getElementById("admin-product-details-form");
const editProductId = document.getElementById("edit-product-id");
const prodName = document.getElementById("prod-name");
const prodCategory = document.getElementById("prod-category");
const prodPrice = document.getElementById("prod-price");
const prodSize = document.getElementById("prod-size");
const prodIcon = document.getElementById("prod-icon");
const prodDesc = document.getElementById("prod-desc");
const prodIngredients = document.getElementById("prod-ingredients");
const prodBenefits = document.getElementById("prod-benefits");
const prodDirections = document.getElementById("prod-directions");
const prodSideeffects = document.getElementById("prod-sideeffects");
const prodRx = document.getElementById("prod-rx");

// Product Details Modal Elements
const productModalOverlay = document.getElementById("product-modal-overlay");
const closeProductModal = document.getElementById("close-product-modal");
const modalProductHeader = document.getElementById("modal-product-header");
const modalDesc = document.getElementById("modal-desc");
const modalBenefits = document.getElementById("modal-benefits");
const modalIngredients = document.getElementById("modal-ingredients");
const modalDirections = document.getElementById("modal-directions");
const modalSideEffects = document.getElementById("modal-side-effects");
const modalPrice = document.getElementById("modal-price");
const modalSize = document.getElementById("modal-size");
const modalAddToCartBtn = document.getElementById("modal-add-to-cart-btn");

// Checkout Payment Selector Elements
const payOptionCod = document.getElementById("pay-option-cod");
const payOptionUpi = document.getElementById("pay-option-upi");
const payOptionBank = document.getElementById("pay-option-bank");
const checkoutPaymentInstructions = document.getElementById("checkout-payment-instructions");

// Security Access Gate Elements
const adminLoginView = document.getElementById("admin-login-view");
const adminDashboardView = document.getElementById("admin-dashboard-view");
const authPasswordForm = document.getElementById("auth-password-form");
const authOtpForm = document.getElementById("auth-otp-form");
const adminPassInput = document.getElementById("admin-pass-input");
const toggleLoginPass = document.getElementById("toggle-login-pass");
const adminLogoutBtn = document.getElementById("admin-logout-btn");
const backToPasswordBtn = document.getElementById("back-to-password-btn");
const resendOtpBtn = document.getElementById("resend-otp-btn");
const otpDigitInputs = document.querySelectorAll(".otp-digit-input");

// Mock SMS elements
const mockSmsNotification = document.getElementById("mock-sms-notification");
const smsOtpDisplay = document.getElementById("sms-otp-display");
const closeSmsBtn = document.getElementById("close-sms-btn");

// Security settings elements
const cfgPasswordOld = document.getElementById("cfg-password-old");
const cfgPasswordNew = document.getElementById("cfg-password-new");

// Current Customer Payment Option State
let customerPaymentMethod = "cod";

// 4. APP INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    applyStoreSettings();
    renderCatalog();
    initAdminPanelFields();
    renderSearchAnalytics();
    renderOrdersLog();
    updatePaymentInstructionsPanel();
    setupEventListeners();
    setupFAQAccordion();
    initChatWidget();
});

// 5. EVENT LISTENERS SETUP
function setupEventListeners() {
    // Scroll header background blur
    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            mainHeader.classList.add("scrolled");
        } else {
            mainHeader.classList.remove("scrolled");
        }
    });

    // Mobile Menu Toggle
    mobileToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
        const icon = mobileToggle.querySelector("i");
        if (mobileMenu.classList.contains("open")) {
            icon.classList.replace("fa-bars", "fa-xmark");
        } else {
            icon.classList.replace("fa-xmark", "fa-bars");
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll(".mobile-link").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
            mobileToggle.querySelector("i").classList.replace("fa-xmark", "fa-bars");
        });
    });

    // Catalog Category Tab Filtering
    catalogTabs.addEventListener("click", (e) => {
        if (e.target.classList.contains("tab-btn")) {
            // Update Active tab styling
            document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
            e.target.classList.add("active");
            
            currentCategory = e.target.getAttribute("data-category");
            renderCatalog();
        }
    });

    // Search input handlers
    let searchDebounceTimer;
    globalSearch.addEventListener("input", (e) => {
        currentSearchQuery = e.target.value.toLowerCase().trim();
        if (currentSearchQuery.length > 0) {
            clearSearchBtn.style.display = "block";
        } else {
            clearSearchBtn.style.display = "none";
        }
        renderCatalog();

        // Debounced search query logging
        clearTimeout(searchDebounceTimer);
        if (currentSearchQuery.length >= 3) {
            searchDebounceTimer = setTimeout(() => {
                logSearchQuery(currentSearchQuery);
            }, 1200);
        }
    });

    clearSearchBtn.addEventListener("click", () => {
        globalSearch.value = "";
        currentSearchQuery = "";
        clearSearchBtn.style.display = "none";
        renderCatalog();
    });

    // Cart Panel Toggles
    cartBtn.addEventListener("click", openCart);
    closeCartBtn.addEventListener("click", closeCart);
    cartOverlay.addEventListener("click", closeCart);
    document.getElementById("empty-shop-now").addEventListener("click", closeCart);

    // Delivery/Pickup Option Toggles
    deliveryOptionPickup.addEventListener("click", () => setDeliveryType("pickup"));
    deliveryOptionHome.addEventListener("click", () => setDeliveryType("delivery"));

    // Cart Quantity adjusters (using event delegation)
    cartItemsContainer.addEventListener("click", (e) => {
        const cartItem = e.target.closest(".cart-item");
        if (!cartItem) return;
        
        const productId = parseInt(cartItem.getAttribute("data-id"));
        
        if (e.target.classList.contains("qty-plus") || e.target.closest(".qty-plus")) {
            updateCartQuantity(productId, 1);
        } else if (e.target.classList.contains("qty-minus") || e.target.closest(".qty-minus")) {
            updateCartQuantity(productId, -1);
        } else if (e.target.classList.contains("cart-item-remove") || e.target.closest(".cart-item-remove")) {
            removeFromCart(productId);
        }
    });

    // Checkout Submit (WhatsApp Link integration)
    checkoutSubmitBtn.addEventListener("click", handleCheckoutSubmit);

    // Prescription Drag & Drop
    prescriptionDropzone.addEventListener("click", () => {
        if (!uploadedFile) prescriptionInput.click();
    });
    
    prescriptionInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
            handleUploadedFile(e.target.files[0]);
        }
    });

    prescriptionDropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        prescriptionDropzone.classList.add("dragover");
    });

    prescriptionDropzone.addEventListener("dragleave", () => {
        prescriptionDropzone.classList.remove("dragover");
    });

    prescriptionDropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        prescriptionDropzone.classList.remove("dragover");
        if (e.dataTransfer.files.length > 0) {
            handleUploadedFile(e.dataTransfer.files[0]);
        }
    });

    removeFileBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Avoid triggering dropzone input trigger
        removePrescriptionFile();
    });

    // Prescription Submission
    prescriptionForm.addEventListener("submit", handlePrescriptionFormSubmit);

    // Admin Portal Modal Toggles
    adminPortalBtn.addEventListener("click", openAdminModalPortal);
    mobileAdminPortalBtn.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        openAdminModalPortal();
    });
    closeAdminModal.addEventListener("click", closeAdminModalPortal);

    // Admin Portal Tabs
    tabBtnCatalog.addEventListener("click", () => setAdminTab("catalog"));
    tabBtnOrders.addEventListener("click", () => setAdminTab("orders"));
    tabBtnSettings.addEventListener("click", () => setAdminTab("settings"));

    // Admin Product Search
    adminProductSearch.addEventListener("input", renderAdminProductsList);

    // Admin Add Product Button
    adminAddProductBtn.addEventListener("click", openProductFormForAdd);

    // Admin Reset Catalog Button
    adminResetCatalogBtn.addEventListener("click", resetAdminCatalog);

    // Admin Save Settings Form
    adminSettingsForm.addEventListener("submit", handleSaveSettings);

    // Admin Orders Log listeners
    adminOrderSearch.addEventListener("input", renderOrdersLog);
    adminSimulateOrderBtn.addEventListener("click", simulateMockOrder);
    adminClearOrdersBtn.addEventListener("click", clearOrderHistory);
    document.getElementById("admin-clear-search-analytics-btn").addEventListener("click", clearSearchAnalytics);

    // Invoice print events
    invoicePrintBtn.addEventListener("click", () => window.print());
    closeInvoiceBtn.addEventListener("click", closeInvoiceModal);
    invoiceModalOverlay.addEventListener("click", (e) => {
        if (e.target === invoiceModalOverlay) closeInvoiceModal();
    });

    // Chat Widget events
    chatBubbleTrigger.addEventListener("click", toggleChatWindow);
    chatPanelCloseBtn.addEventListener("click", closeChatWindow);
    chatInputForm.addEventListener("submit", handleChatSubmit);
    chatWhatsappRedirectBtn.addEventListener("click", handleChatWhatsappEscalation);

    // Product Form Modal Closing
    closeProductForm.addEventListener("click", closeProductFormModal);
    document.getElementById("btn-cancel-product-form").addEventListener("click", closeProductFormModal);
    adminProductDetailsForm.addEventListener("submit", handleProductFormSubmit);

    // Product Detailed Modal Closing
    closeProductModal.addEventListener("click", closeProductDetailModal);
    productModalOverlay.addEventListener("click", (e) => {
        if (e.target === productModalOverlay) closeProductDetailModal();
    });

    // Product Modal Tab Navigation
    document.querySelector(".modal-tab-nav").addEventListener("click", (e) => {
        if (e.target.classList.contains("modal-tab-btn")) {
            document.querySelectorAll(".modal-tab-btn").forEach(btn => btn.classList.remove("active"));
            e.target.classList.add("active");

            const tab = e.target.getAttribute("data-tab");
            document.querySelectorAll(".modal-tab-content").forEach(panel => panel.classList.remove("active"));
            document.getElementById(`tab-${tab}`).classList.add("active");
        }
    });

    // Checkout Payment Method Selector
    payOptionCod.addEventListener("click", () => setCustomerPaymentMethod("cod"));
    payOptionUpi.addEventListener("click", () => setCustomerPaymentMethod("upi"));
    payOptionBank.addEventListener("click", () => setCustomerPaymentMethod("bank"));

    // Security Gate Event Listeners
    authPasswordForm.addEventListener("submit", handlePasswordVerifySubmit);
    toggleLoginPass.addEventListener("click", toggleLoginPasswordVisibility);
    authOtpForm.addEventListener("submit", handleOtpVerifySubmit);
    adminLogoutBtn.addEventListener("click", logoutAdminPortal);
    backToPasswordBtn.addEventListener("click", showPasswordStageInPortal);
    resendOtpBtn.addEventListener("click", resendMockOTPCode);
    closeSmsBtn.addEventListener("click", () => mockSmsNotification.style.display = "none");

    // Auto-focus transitions in 6-digit OTP fields
    otpDigitInputs.forEach((input, index) => {
        input.addEventListener("input", (e) => {
            const val = e.target.value;
            // Force numbers only
            e.target.value = val.replace(/[^0-9]/g, "");
            if (e.target.value.length === 1 && index < otpDigitInputs.length - 1) {
                otpDigitInputs[index + 1].focus();
            }
        });
        
        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && e.target.value.length === 0 && index > 0) {
                otpDigitInputs[index - 1].focus();
            }
        });
    });
}

// 6. RENDER CATALOG FUNCTION
function renderCatalog() {
    productGrid.innerHTML = "";
    
    const filteredProducts = PRODUCTS_DB.filter(product => {
        const matchesCategory = (currentCategory === "all" || product.category === currentCategory);
        const matchesSearch = (product.name.toLowerCase().includes(currentSearchQuery) || 
                               product.desc.toLowerCase().includes(currentSearchQuery));
        return matchesCategory && matchesSearch;
    });

    displayedCount.textContent = filteredProducts.length;

    if (filteredProducts.length === 0) {
        productGrid.innerHTML = `
            <div class="no-products-found" style="grid-column: 1/-1; text-align: center; padding: 40px 20px; color: var(--text-muted);">
                <i class="fa-solid fa-face-frown" style="font-size: 3rem; color: var(--border-color-glow); margin-bottom: 12px;"></i>
                <h3 style="color: var(--accent);">No Health Products Found</h3>
                <p>Try refining your search query or choosing a different category tab.</p>
            </div>
        `;
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.style.cursor = "pointer";
        
        // Construct visual elements
        const badgeHTML = product.rxRequired ? 
            `<div class="product-badge rx-badge"><span><i class="fa-solid fa-file-prescription"></i> Rx Required</span></div>` : ``;

        productCard.innerHTML = `
            ${badgeHTML}
            <div class="product-img-wrapper ${product.gradientClass}">
                <i class="fa-solid ${product.icon} product-icon"></i>
            </div>
            <div class="product-details-body">
                <span class="product-category">${product.category.replace('otc', 'OTC Medicine').replace('vitamins', 'Vitamins').replace('essentials', 'Health Essentials').replace('personal', 'Personal Care')}</span>
                <h3 class="product-title" title="${product.name}">${product.name}</h3>
                <p class="product-desc">${product.desc}</p>
                <div class="product-footer">
                    <div>
                        <div class="product-price">₹${product.price.toFixed(2)}</div>
                        <span style="font-size: 0.7rem; color: var(--text-muted); font-weight: 600;">${product.size}</span>
                    </div>
                    <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id})" aria-label="Add ${product.name} to Cart">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        `;

        productCard.addEventListener("click", () => {
            openProductModal(product.id);
        });

        productGrid.appendChild(productCard);
    });
}

// 7. TOAST NOTIFICATIONS
function showToast(message, iconClass = "fa-solid fa-circle-check") {
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.innerHTML = `
        <i class="${iconClass}"></i>
        <span class="toast-message">${message}</span>
    `;
    toastContainer.appendChild(toast);

    // Fade out and remove
    setTimeout(() => {
        toast.classList.add("toast-remove");
        toast.addEventListener("animationend", () => {
            toast.remove();
        });
    }, 3000);
}

// 8. CART PANEL ACTIONS
function openCart() {
    cartPanel.classList.add("open");
    cartOverlay.classList.add("open");
    document.body.style.overflow = "hidden"; // Disable background scrolling
}

// 9. CART SYSTEM LOGIC
window.addToCart = function(productId) {
    const product = PRODUCTS_DB.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.product.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }

    renderCart();
    showToast(`Added ${product.name} to cart!`);
};

function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.product.id === productId);
    if (itemIndex > -1) {
        const name = cart[itemIndex].product.name;
        cart.splice(itemIndex, 1);
        renderCart();
        showToast(`Removed ${name} from cart.`, "fa-solid fa-trash-can");
    }
}

function updateCartQuantity(productId, delta) {
    const existingItem = cart.find(item => item.product.id === productId);
    if (existingItem) {
        existingItem.quantity += delta;
        if (existingItem.quantity < 1) {
            removeFromCart(productId);
        } else {
            renderCart();
        }
    }
}

function renderCart() {
    // Update navbar badge count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounter.textContent = totalItems;
    
    // Toggle Empty state vs Lists
    if (cart.length === 0) {
        cartEmpty.style.display = "flex";
        cartItemsContainer.style.display = "none";
        cartSummarySection.style.display = "none";
        return;
    }

    cartEmpty.style.display = "none";
    cartItemsContainer.style.display = "flex";
    cartSummarySection.style.display = "block";

    // Build Cart items list
    cartItemsContainer.innerHTML = "";
    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.product.price * item.quantity;
        subtotal += itemTotal;

        const cartItemHTML = document.createElement("div");
        cartItemHTML.classList.add("cart-item");
        cartItemHTML.setAttribute("data-id", item.product.id);
        
        cartItemHTML.innerHTML = `
            <div class="cart-item-img ${item.product.gradientClass}">
                <i class="fa-solid ${item.product.icon} cart-item-icon"></i>
            </div>
            <div class="cart-item-details">
                <h4>${item.product.name}</h4>
                <div class="cart-item-meta">${item.product.size}</div>
                <div class="cart-item-price">₹${itemTotal.toFixed(2)} <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: normal;">(₹${item.product.price.toFixed(2)} each)</span></div>
            </div>
            <div class="cart-item-actions">
                <div class="qty-control">
                    <button class="qty-btn qty-minus" aria-label="Decrease quantity"><i class="fa-solid fa-minus"></i></button>
                    <span class="qty-val">${item.quantity}</span>
                    <button class="qty-btn qty-plus" aria-label="Increase quantity"><i class="fa-solid fa-plus"></i></button>
                </div>
                <button class="cart-item-remove" aria-label="Remove item"><i class="fa-solid fa-trash-can"></i> Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemHTML);
    });

    // Calculate totals
    cartSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
    let total = subtotal;
    if (deliveryType === "delivery") {
        total += DELIVERY_FEE;
    }
    cartTotal.textContent = `₹${total.toFixed(2)}`;
    updatePaymentInstructionsPanel(total);
}

function setDeliveryType(type) {
    deliveryType = type;
    if (type === "pickup") {
        deliveryOptionPickup.classList.add("active");
        deliveryOptionHome.classList.remove("active");
        deliveryAddressGroup.style.display = "none";
        document.getElementById("cart-cust-address").removeAttribute("required");
    } else {
        deliveryOptionHome.classList.add("active");
        deliveryOptionPickup.classList.remove("active");
        deliveryAddressGroup.style.display = "block";
        document.getElementById("cart-cust-address").setAttribute("required", "required");
    }
    renderCart();
}

function closeCart() {
    cartPanel.classList.remove("open");
    cartOverlay.classList.remove("open");
    document.body.style.overflow = "auto"; // Enable background scrolling
}

// 10. WHATSAPP ORDER SUBMISSION
function handleCheckoutSubmit() {
    const custName = document.getElementById("cart-cust-name").value.trim() || "Valued Customer";
    const custPhone = document.getElementById("cart-cust-phone").value.trim();
    const custAddress = document.getElementById("cart-cust-address").value.trim();

    if (!custPhone) {
        showToast("Please enter your Phone/WhatsApp number.", "fa-solid fa-triangle-exclamation");
        document.getElementById("cart-cust-phone").focus();
        return;
    }

    if (deliveryType === "delivery" && !custAddress) {
        showToast("Please enter your delivery address.", "fa-solid fa-triangle-exclamation");
        document.getElementById("cart-cust-address").focus();
        return;
    }

    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.product.price * item.quantity;
    });
    const finalTotal = subtotal + (deliveryType === "delivery" ? DELIVERY_FEE : 0);

    // Save order details to local database
    const savedOrder = saveOrderToLocalHistory(custName, custPhone, custAddress, subtotal, finalTotal);

    // Build the WhatsApp message content
    let messageText = `*NEW ORDER - GREEN CITY PHARMACY*\n`;
    messageText += `*Invoice ID:* ${savedOrder.id}\n`;
    messageText += `------------------------------------\n`;
    messageText += `*Name:* ${custName}\n`;
    messageText += `*Phone:* ${custPhone}\n`;
    messageText += `*Order Type:* ${deliveryType === "pickup" ? "🏬 In-Store Self-Pickup (Free)" : "🚚 Home Delivery (₹30)"}\n`;
    if (deliveryType === "delivery") {
        messageText += `*Delivery Address:* ${custAddress}\n`;
    }
    
    // Payment method addition
    let paymentLabel = "Cash on Delivery / Pay on Pickup";
    if (customerPaymentMethod === "upi") {
        paymentLabel = `UPI Transfer (to: ${STORE_SETTINGS.upiId})`;
    } else if (customerPaymentMethod === "bank") {
        paymentLabel = `Bank Transfer (to Acc: ${STORE_SETTINGS.accountNumber})`;
    }
    messageText += `*Payment Method:* ${paymentLabel}\n`;
    messageText += `------------------------------------\n`;
    messageText += `*ITEMS ORDERED:*\n`;

    cart.forEach(item => {
        const itemTotal = item.product.price * item.quantity;
        messageText += `• ${item.quantity} x ${item.product.name} (${item.product.size}) - ₹${itemTotal.toFixed(2)}\n`;
    });

    const gstRate = parseFloat(STORE_SETTINGS.gstPercentage) || 12;
    messageText += `------------------------------------\n`;
    messageText += `*Subtotal:* ₹${subtotal.toFixed(2)}\n`;
    messageText += `*GST (Included ${gstRate}%):* ₹${savedOrder.gstAmount.toFixed(2)}\n`;
    if (deliveryType === "delivery") {
        messageText += `*Delivery Fee:* ₹${DELIVERY_FEE.toFixed(2)}\n`;
    }
    messageText += `*Total Amount:* ₹${finalTotal.toFixed(2)}\n\n`;
    messageText += `_Note: Sourced & checked by Registered Pharmacist ${STORE_SETTINGS.pharmacistName}. PCI Reg No: ${STORE_SETTINGS.regNo}. Please confirm our order via reply!_`;

    // Encode text for URL
    const encodedMessage = encodeURIComponent(messageText);
    
    // Primary shop mobile number loaded dynamically from settings
    const storeWhatsAppNumber = STORE_SETTINGS.whatsappNumber.replace(/[^0-9]/g, ""); 
    const whatsAppUrl = `https://api.whatsapp.com/send?phone=${storeWhatsAppNumber}&text=${encodedMessage}`;

    // Open receipt modal for the customer before routing
    openInvoiceModal(savedOrder.id, () => {
        window.open(whatsAppUrl, "_blank");
        showToast("Opening WhatsApp to place your order!", "fa-brands fa-whatsapp");
        
        // Success State Reset
        cart = [];
        renderCart();
        closeCart();
        
        // Clear forms
        document.getElementById("cart-cust-name").value = "";
        document.getElementById("cart-cust-phone").value = "";
        document.getElementById("cart-cust-address").value = "";
    });
}

// 11. PRESCRIPTION FILE HANDLERS
function handleUploadedFile(file) {
    uploadedFile = file;
    
    // Set file details
    uploadedFilename.textContent = file.name;
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    document.querySelector(".success-meta").textContent = `File successfully loaded (${fileSizeMB} MB)`;

    // Toggle thumbnail preview if it is an image
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            prescriptionPreviewImg.src = e.target.result;
            prescriptionPreviewContainer.style.display = "block";
        };
        reader.readAsDataURL(file);
    } else {
        prescriptionPreviewContainer.style.display = "none";
        prescriptionPreviewImg.src = "";
    }

    // Toggle Dropzone States
    prescriptionDropzone.querySelector(".drop-zone-content").style.display = "none";
    uploadSuccessState.style.display = "block";
    
    showToast(`Loaded ${file.name} successfully!`);
}

function removePrescriptionFile() {
    uploadedFile = null;
    prescriptionInput.value = "";
    
    // Reset views
    prescriptionDropzone.querySelector(".drop-zone-content").style.display = "block";
    uploadSuccessState.style.display = "none";
    prescriptionPreviewContainer.style.display = "none";
    prescriptionPreviewImg.src = "";
    
    showToast("Prescription file removed.", "fa-solid fa-trash-can");
}

function handlePrescriptionFormSubmit(e) {
    e.preventDefault();

    if (!uploadedFile) {
        showToast("Please drag & drop or select a prescription file first.", "fa-solid fa-triangle-exclamation");
        return;
    }

    const name = document.getElementById("p-name").value.trim();
    const phone = document.getElementById("p-phone").value.trim();
    const notes = document.getElementById("p-notes").value.trim();

    // Mock API Submit / WhatsApp redirect
    let submitText = `*PRESCRIPTION UPLOAD - GREEN CITY PHARMACY*\n`;
    submitText += `------------------------------------\n`;
    submitText += `*Patient Name:* ${name}\n`;
    submitText += `*Phone Number:* ${phone}\n`;
    if (notes) {
        submitText += `*Pharmacist Notes:* ${notes}\n`;
    }
    submitText += `*Uploaded File:* ${uploadedFile.name} (${(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB)\n`;
    submitText += `------------------------------------\n`;
    submitText += `_Registered Pharmacist Ameen Ahamad, please verify DL credentials and review prescription for dispensing._`;

    const encodedText = encodeURIComponent(submitText);
    const storeWhatsAppNumber = "919876543210"; 
    const whatsAppUrl = `https://api.whatsapp.com/send?phone=${storeWhatsAppNumber}&text=${encodedText}`;

    // Prompt user & Open WhatsApp
    setTimeout(() => {
        window.open(whatsAppUrl, "_blank");
    }, 1200);

    showToast("Prescription submitted! Redirecting to WhatsApp...", "fa-solid fa-clock");
    
    // Reset prescription states
    removePrescriptionFile();
    prescriptionForm.reset();
}

// 12. PRODUCT DETAIL MODAL ACTIONS
window.openProductModal = function(productId) {
    const product = PRODUCTS_DB.find(p => p.id === productId);
    if (!product) return;
    
    // Build Modal Header
    modalProductHeader.innerHTML = `
        <div class="modal-product-icon-wrap ${product.gradientClass}">
            <i class="fa-solid ${product.icon}"></i>
        </div>
        <div class="modal-title-area">
            <h2>${product.name}</h2>
            <span class="product-category">${product.category.replace('otc', 'OTC Medicine').replace('vitamins', 'Vitamins & Supplements').replace('essentials', 'Health Essentials').replace('personal', 'Personal Care')}</span>
            ${product.rxRequired ? '<div style="font-size: 0.75rem; color: var(--status-warning); font-weight: 700; margin-top: 4px;"><i class="fa-solid fa-file-prescription"></i> Doctor Prescription Required (Rx)</div>' : ''}
        </div>
    `;
    
    // Set Details Content
    modalDesc.textContent = product.desc;
    
    // Benefits list builder
    const benefitsUl = document.getElementById("modal-benefits");
    benefitsUl.innerHTML = "";
    if (product.benefits && product.benefits.length > 0) {
        product.benefits.forEach(b => {
            const li = document.createElement("li");
            li.textContent = b;
            benefitsUl.appendChild(li);
        });
    } else {
        benefitsUl.innerHTML = "<li>Direct wellness support.</li>";
    }
    
    document.getElementById("modal-ingredients").textContent = product.ingredients || "General formulated ingredients.";
    document.getElementById("modal-directions").textContent = product.directions || "As advised by your medical doctor.";
    document.getElementById("modal-side-effects").textContent = product.sideEffects || "No severe side effects reported.";
    
    modalPrice.textContent = `₹${product.price.toFixed(2)}`;
    modalSize.textContent = product.size;
    
    // Wire cart addition inside modal
    modalAddToCartBtn.onclick = function() {
        addToCart(productId);
        closeProductDetailModal();
    };
    
    // Reset modal tabs to Overview
    document.querySelectorAll(".modal-tab-btn").forEach(btn => {
        if (btn.getAttribute("data-tab") === "overview") {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
    document.querySelectorAll(".modal-tab-content").forEach(panel => {
        if (panel.id === "tab-overview") {
            panel.classList.add("active");
        } else {
            panel.classList.remove("active");
        }
    });
    
    productModalOverlay.style.display = "flex";
    document.body.style.overflow = "hidden";
};

function closeProductDetailModal() {
    productModalOverlay.style.display = "none";
    document.body.style.overflow = "auto";
}

// 13. PHARMACIST PORTAL ADMIN ACTIONS
function openAdminModalPortal() {
    adminPortalModal.style.display = "flex";
    document.body.style.overflow = "hidden";
    
    if (isAdminAuthenticated) {
        adminLoginView.style.display = "none";
        adminDashboardView.style.display = "flex";
        renderAdminProductsList();
        initAdminPanelFields();
        renderOrdersLog();
        renderSearchAnalytics();
        updatePendingOrdersBadge();
    } else {
        adminLoginView.style.display = "flex";
        adminDashboardView.style.display = "none";
        showPasswordStageInPortal();
    }
}

function closeAdminModalPortal() {
    adminPortalModal.style.display = "none";
    document.body.style.overflow = "auto";
    mockSmsNotification.style.display = "none";
}

function setAdminTab(tab) {
    document.querySelectorAll(".admin-tab-btn").forEach(btn => {
        if (btn.getAttribute("data-admin-tab") === tab) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
    
    panelCatalog.style.display = tab === "catalog" ? "block" : "none";
    panelOrders.style.display = tab === "orders" ? "block" : "none";
    panelSettings.style.display = tab === "settings" ? "block" : "none";
}

function initAdminPanelFields() {
    cfgProprietor.value = STORE_SETTINGS.proprietorName || "";
    cfgPharmacistName.value = STORE_SETTINGS.pharmacistName || "";
    cfgRegNo.value = STORE_SETTINGS.regNo || "";
    cfgDlNo.value = STORE_SETTINGS.dlNo || "";
    cfgStorePhone.value = STORE_SETTINGS.phone || "";
    cfgStoreWhatsapp.value = STORE_SETTINGS.whatsappNumber || "";
    cfgStoreEmail.value = STORE_SETTINGS.email || "";
    cfgMapsLink.value = STORE_SETTINGS.mapsLink || "";
    cfgHours.value = STORE_SETTINGS.operatingHours || "";
    cfgGstRate.value = STORE_SETTINGS.gstPercentage !== undefined ? STORE_SETTINGS.gstPercentage : 12;
    cfgShortAddress.value = STORE_SETTINGS.shortAddress || "";
    cfgLongAddress.value = STORE_SETTINGS.longAddress || "";
    cfgUpiId.value = STORE_SETTINGS.upiId || "";
    cfgBeneficiary.value = STORE_SETTINGS.beneficiaryName || "";
    cfgBankName.value = STORE_SETTINGS.bankName || "";
    cfgAccNumber.value = STORE_SETTINGS.accountNumber || "";
    cfgIfsc.value = STORE_SETTINGS.ifscCode || "";
}

function renderAdminProductsList() {
    adminProductsList.innerHTML = "";
    const query = adminProductSearch.value.toLowerCase().trim();
    
    const filtered = PRODUCTS_DB.filter(p => p.name.toLowerCase().includes(query));
    
    if (filtered.length === 0) {
        adminProductsList.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 20px;">No products found in database.</td>
            </tr>
        `;
        return;
    }
    
    filtered.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <div class="admin-item-meta">
                    <div class="admin-item-icon ${product.gradientClass}">
                        <i class="fa-solid ${product.icon}"></i>
                    </div>
                    <span class="admin-item-name" title="${product.name}">${product.name}</span>
                </div>
            </td>
            <td><span style="text-transform: capitalize;">${product.category}</span></td>
            <td>₹${product.price.toFixed(2)}</td>
            <td>${product.rxRequired ? '<span style="color: var(--status-warning); font-weight:700;">Yes</span>' : 'No'}</td>
            <td>
                <button class="admin-btn-action admin-btn-edit" onclick="openProductFormForEdit(${product.id})" title="Edit details"><i class="fa-solid fa-pencil"></i></button>
                <button class="admin-btn-action admin-btn-delete" onclick="deleteProductFromAdmin(${product.id})" title="Delete product"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        `;
        adminProductsList.appendChild(row);
    });
}

window.openProductFormForAdd = function() {
    productFormTitle.textContent = "Upload New Product";
    editProductId.value = "";
    adminProductDetailsForm.reset();
    productFormModal.style.display = "flex";
};

window.openProductFormForEdit = function(productId) {
    const product = PRODUCTS_DB.find(p => p.id === productId);
    if (!product) return;
    
    productFormTitle.textContent = "Modify Product Details";
    editProductId.value = product.id;
    prodName.value = product.name;
    prodCategory.value = product.category;
    prodPrice.value = product.price;
    prodSize.value = product.size;
    prodIcon.value = product.icon;
    prodDesc.value = product.desc;
    prodIngredients.value = product.ingredients || "";
    prodBenefits.value = (product.benefits || []).join(", ");
    prodDirections.value = product.directions || "";
    prodSideeffects.value = product.sideEffects || "";
    prodRx.checked = product.rxRequired;
    
    productFormModal.style.display = "flex";
};

function closeProductFormModal() {
    productFormModal.style.display = "none";
}

function handleProductFormSubmit(e) {
    e.preventDefault();
    
    const idVal = editProductId.value;
    const nameVal = prodName.value.trim();
    const catVal = prodCategory.value;
    const priceVal = parseFloat(prodPrice.value);
    const sizeVal = prodSize.value.trim();
    const iconVal = prodIcon.value;
    const descVal = prodDesc.value.trim();
    const ingVal = prodIngredients.value.trim();
    const benVal = prodBenefits.value.split(",").map(b => b.trim()).filter(b => b.length > 0);
    const dirVal = prodDirections.value.trim();
    const sideVal = prodSideeffects.value.trim();
    const rxVal = prodRx.checked;
    
    let gradClass = "grad-otc";
    if (catVal === "vitamins") gradClass = "grad-vitamins";
    else if (catVal === "essentials") gradClass = "grad-essentials";
    else if (catVal === "personal") gradClass = "grad-personal";
    
    const productData = {
        name: nameVal,
        category: catVal,
        price: priceVal,
        size: sizeVal,
        icon: iconVal,
        desc: descVal,
        ingredients: ingVal,
        benefits: benVal,
        directions: dirVal,
        sideEffects: sideVal,
        rxRequired: rxVal,
        gradientClass: gradClass
    };
    
    if (idVal) {
        // Edit existing product
        const index = PRODUCTS_DB.findIndex(p => p.id === parseInt(idVal));
        if (index > -1) {
            productData.id = parseInt(idVal);
            PRODUCTS_DB[index] = productData;
            showToast("Product details updated!");
        }
    } else {
        // Create new product
        const newId = PRODUCTS_DB.length > 0 ? Math.max(...PRODUCTS_DB.map(p => p.id)) + 1 : 1;
        productData.id = newId;
        PRODUCTS_DB.push(productData);
        showToast("New product uploaded to catalog!");
    }
    
    localStorage.setItem('gcp_catalog', JSON.stringify(PRODUCTS_DB));
    renderCatalog();
    renderAdminProductsList();
    closeProductFormModal();
}

window.deleteProductFromAdmin = function(productId) {
    if (confirm("Are you sure you want to delete this product? It will be removed permanently from the catalog.")) {
        PRODUCTS_DB = PRODUCTS_DB.filter(p => p.id !== productId);
        localStorage.setItem('gcp_catalog', JSON.stringify(PRODUCTS_DB));
        renderCatalog();
        renderAdminProductsList();
        showToast("Product deleted successfully.", "fa-solid fa-trash-can");
    }
};

function resetAdminCatalog() {
    if (confirm("Are you sure you want to reset the database? This will clear all custom products and restore default items.")) {
        PRODUCTS_DB = [...DEFAULT_PRODUCTS_DB];
        localStorage.setItem('gcp_catalog', JSON.stringify(PRODUCTS_DB));
        renderCatalog();
        renderAdminProductsList();
        showToast("Catalog database reset to default.");
    }
}

function handleSaveSettings(e) {
    e.preventDefault();
    
    STORE_SETTINGS.proprietorName = cfgProprietor.value.trim();
    STORE_SETTINGS.pharmacistName = cfgPharmacistName.value.trim();
    STORE_SETTINGS.regNo = cfgRegNo.value.trim();
    STORE_SETTINGS.dlNo = cfgDlNo.value.trim();
    STORE_SETTINGS.phone = cfgStorePhone.value.trim();
    STORE_SETTINGS.whatsappNumber = cfgStoreWhatsapp.value.trim();
    STORE_SETTINGS.email = cfgStoreEmail.value.trim();
    STORE_SETTINGS.mapsLink = cfgMapsLink.value.trim();
    STORE_SETTINGS.operatingHours = cfgHours.value.trim();
    STORE_SETTINGS.gstPercentage = parseInt(cfgGstRate.value) || 12;
    STORE_SETTINGS.shortAddress = cfgShortAddress.value.trim();
    STORE_SETTINGS.longAddress = cfgLongAddress.value.trim();
    STORE_SETTINGS.upiId = cfgUpiId.value.trim();
    STORE_SETTINGS.beneficiaryName = cfgBeneficiary.value.trim();
    STORE_SETTINGS.bankName = cfgBankName.value.trim();
    STORE_SETTINGS.accountNumber = cfgAccNumber.value.trim();
    STORE_SETTINGS.ifscCode = cfgIfsc.value.trim();
    
    localStorage.setItem('gcp_store_settings', JSON.stringify(STORE_SETTINGS));
    
    applyStoreSettings();
    updatePaymentInstructionsPanel();
    
    // Process password change if fields are filled
    const oldPass = cfgPasswordOld.value;
    const newPass = cfgPasswordNew.value;
    if (newPass) {
        if (oldPass !== ADMIN_PASSWORD) {
            showToast("Password change failed: Current password incorrect.", "fa-solid fa-triangle-exclamation");
            return;
        }
        if (newPass.length < 4) {
            showToast("New password must be at least 4 characters.", "fa-solid fa-triangle-exclamation");
            return;
        }
        ADMIN_PASSWORD = newPass;
        localStorage.setItem('gcp_admin_password', newPass);
        showToast("Portal password updated successfully!");
        cfgPasswordOld.value = "";
        cfgPasswordNew.value = "";
    }
    
    showToast("Configurations saved successfully!");
}

// 16. SECURITY PORTAL GATE LOGIC
function handlePasswordVerifySubmit(e) {
    e.preventDefault();
    const enteredPass = adminPassInput.value;
    
    if (enteredPass === ADMIN_PASSWORD) {
        // Go to OTP verify screen
        authPasswordForm.style.display = "none";
        authOtpForm.style.display = "block";
        generateAndSendMockOTP();
    } else {
        showToast("Incorrect portal password!", "fa-solid fa-triangle-exclamation");
    }
}

function toggleLoginPasswordVisibility() {
    const isPass = adminPassInput.type === "password";
    adminPassInput.type = isPass ? "text" : "password";
    toggleLoginPass.innerHTML = isPass ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>';
}

function generateAndSendMockOTP() {
    // Generate 6 digit random number
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    activeOTP = code;
    
    // Display OTP in mock SMS popup
    smsOtpDisplay.textContent = code;
    mockSmsNotification.style.display = "flex";
    
    // Trigger alert message
    showToast("Verification code delivered via mock SMS notification!", "fa-solid fa-comment-sms");
    
    // Focus first OTP digit
    setTimeout(() => {
        otpDigitInputs[0].focus();
    }, 100);
}

function resendMockOTPCode() {
    // Clear fields
    otpDigitInputs.forEach(input => input.value = "");
    generateAndSendMockOTP();
}

function showPasswordStageInPortal() {
    authPasswordForm.style.display = "block";
    authOtpForm.style.display = "none";
    adminPassInput.value = "";
    otpDigitInputs.forEach(input => input.value = "");
    activeOTP = "";
}

function handleOtpVerifySubmit(e) {
    e.preventDefault();
    let enteredOTP = "";
    otpDigitInputs.forEach(input => enteredOTP += input.value);
    
    if (enteredOTP === activeOTP) {
        isAdminAuthenticated = true;
        
        // Transition views
        adminLoginView.style.display = "none";
        adminDashboardView.style.display = "flex";
        mockSmsNotification.style.display = "none";
        
        renderAdminProductsList();
        initAdminPanelFields();
        showToast("Pharmacist session unlocked!", "fa-solid fa-user-shield");
    } else {
        showToast("Invalid security code. Please check your SMS alert.", "fa-solid fa-triangle-exclamation");
        // Clear OTP inputs and focus first digit
        otpDigitInputs.forEach(input => input.value = "");
        otpDigitInputs[0].focus();
    }
}

function logoutAdminPortal() {
    isAdminAuthenticated = false;
    activeOTP = "";
    showPasswordStageInPortal();
    adminLoginView.style.display = "flex";
    adminDashboardView.style.display = "none";
    showToast("Portal logged out and locked.", "fa-solid fa-lock");
}

// 14. PAYMENT OPTIONS SELECTION & UTILITIES
function setCustomerPaymentMethod(method) {
    customerPaymentMethod = method;
    document.querySelectorAll(".payment-btn").forEach(btn => {
        if (btn.getAttribute("data-pay") === method) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
    
    // Get current total amount from DOM (stripping currency symbol)
    const cartTotalVal = parseFloat(cartTotal.textContent.replace(/[^\d.]/g, "")) || 0;
    updatePaymentInstructionsPanel(cartTotalVal);
}

function updatePaymentInstructionsPanel(totalAmount) {
    if (!totalAmount) {
        totalAmount = parseFloat(cartTotal.textContent.replace(/[^\d.]/g, "")) || 0;
    }
    
    if (customerPaymentMethod === "cod") {
        checkoutPaymentInstructions.style.display = "none";
        checkoutPaymentInstructions.innerHTML = "";
    } else if (customerPaymentMethod === "upi") {
        checkoutPaymentInstructions.style.display = "block";
        
        // Generate UPI payment URI deep link
        const upiURI = `upi://pay?pa=${STORE_SETTINGS.upiId}&pn=${encodeURIComponent(STORE_SETTINGS.beneficiaryName)}&am=${totalAmount.toFixed(2)}&cu=INR&tn=${encodeURIComponent('GCP Order')}`;
        
        checkoutPaymentInstructions.innerHTML = `
            <div style="font-weight: 700; margin-bottom: 6px; border-bottom: 1px dashed rgba(16, 185, 129, 0.2); padding-bottom: 4px; color: var(--accent);">UPI Payment Info</div>
            <div class="payment-panel-row">
                <span>UPI ID: <strong>${STORE_SETTINGS.upiId}</strong></span>
                <button type="button" class="btn-copy-data" onclick="copyTextToClipboard('${STORE_SETTINGS.upiId}')">
                    <i class="fa-solid fa-copy"></i> Copy
                </button>
            </div>
            <div class="payment-panel-row">
                <span>Payee: <strong>${STORE_SETTINGS.beneficiaryName}</strong></span>
            </div>
            <div class="upi-qr-wrapper" style="text-align: center; margin-top: 10px; background: var(--primary-light); padding: 12px; border-radius: var(--border-radius-sm); border: 1.5px dashed var(--border-color-glow);">
                <div class="upi-qr-image-holder" style="background: var(--bg-white); padding: 8px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); display: inline-block; margin-bottom: 6px; box-shadow: var(--shadow-sm);">
                    <img id="upi-dynamic-qr" src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(upiURI)}" alt="UPI Payment QR Code" style="width: 150px; height: 150px; display: block;">
                </div>
                <span style="font-size: 0.7rem; color: var(--text-muted); display: block; line-height:1.3;">Scan QR using GPay, PhonePe, Paytm, or BHIM to pay <strong style="color:var(--accent);">₹${totalAmount.toFixed(2)}</strong></span>
            </div>
        `;
    } else if (customerPaymentMethod === "bank") {
        checkoutPaymentInstructions.style.display = "block";
        checkoutPaymentInstructions.innerHTML = `
            <div style="font-weight: 700; margin-bottom: 6px; border-bottom: 1px dashed rgba(16, 185, 129, 0.2); padding-bottom: 4px; color: var(--accent);">Bank Account Info</div>
            <div class="payment-panel-row">
                <span>Bank Name: <strong>${STORE_SETTINGS.bankName}</strong></span>
            </div>
            <div class="payment-panel-row">
                <span>Payee Name: <strong>${STORE_SETTINGS.beneficiaryName}</strong></span>
            </div>
            <div class="payment-panel-row">
                <span>Account No: <strong>${STORE_SETTINGS.accountNumber}</strong></span>
                <button type="button" class="btn-copy-data" onclick="copyTextToClipboard('${STORE_SETTINGS.accountNumber}')">
                    <i class="fa-solid fa-copy"></i> Copy
                </button>
            </div>
            <div class="payment-panel-row">
                <span>IFSC Code: <strong>${STORE_SETTINGS.ifscCode}</strong></span>
                <button type="button" class="btn-copy-data" onclick="copyTextToClipboard('${STORE_SETTINGS.ifscCode}')">
                    <i class="fa-solid fa-copy"></i> Copy
                </button>
            </div>
        `;
    }
}

window.copyTextToClipboard = function(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast("Copied successfully!");
    }).catch(err => {
        showToast("Copy failed.", "fa-solid fa-triangle-exclamation");
    });
};

// 15. FAQ ACCORDION HANDLERS
function setupFAQAccordion() {
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        const questionBtn = item.querySelector(".faq-question");
        questionBtn.addEventListener("click", () => {
            const isActive = item.classList.contains("active");
            
            // Collapse all
            faqItems.forEach(faq => {
                faq.classList.remove("active");
                faq.querySelector(".faq-answer").style.maxHeight = null;
            });
            
            // Expand current
            if (!isActive) {
                item.classList.add("active");
                const answer = item.querySelector(".faq-answer");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
}

// 16. DYNAMIC STORE SETTINGS BINDING APPLICATOR
function applyStoreSettings() {
    // Bindings lists
    const phoneBinds = ["bind-top-phone", "bind-footer-phone"];
    const addressBinds = ["bind-top-address", "bind-about-address"];
    const proprietorBinds = ["bind-about-proprietor", "bind-footer-proprietor"];
    const regNoBinds = ["bind-hero-reg-no", "bind-about-reg-no", "bind-footer-reg-no"];
    const dlNoBinds = ["bind-about-dl-no", "bind-footer-dl-no"];
    
    phoneBinds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = STORE_SETTINGS.phone;
    });
    addressBinds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = STORE_SETTINGS.longAddress;
    });
    proprietorBinds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = STORE_SETTINGS.proprietorName;
    });
    regNoBinds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = STORE_SETTINGS.regNo;
    });
    dlNoBinds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = STORE_SETTINGS.dlNo;
    });
    
    // Individual elements
    const heroPharm = document.getElementById("bind-hero-pharmacist");
    if (heroPharm) heroPharm.textContent = STORE_SETTINGS.pharmacistName;
    
    const footerPharm = document.getElementById("bind-footer-pharmacist");
    if (footerPharm) footerPharm.textContent = STORE_SETTINGS.pharmacistName;
    
    const footerEmail = document.getElementById("bind-footer-email");
    if (footerEmail) footerEmail.textContent = STORE_SETTINGS.email;
    
    const aboutHours = document.getElementById("bind-about-hours");
    if (aboutHours) aboutHours.textContent = STORE_SETTINGS.operatingHours;
    
    const footerHours = document.getElementById("bind-footer-hours");
    if (footerHours) footerHours.textContent = `Open everyday: ${STORE_SETTINGS.operatingHours.replace(/Monday\s*-\s*Sunday:\s*/i, "")}`;
    
    const mapLink = document.getElementById("bind-about-map-link");
    if (mapLink) mapLink.href = STORE_SETTINGS.mapsLink;
    
    const dlText = document.getElementById("bind-about-dl-text");
    if (dlText) dlText.textContent = STORE_SETTINGS.dlNo;
}

// 17. CUSTOMER SEARCH ANALYTICS
function logSearchQuery(query) {
    if (!query || query.length < 3) return;
    const analytics = JSON.parse(localStorage.getItem('gcp_search_analytics')) || {};
    analytics[query] = (analytics[query] || 0) + 1;
    localStorage.setItem('gcp_search_analytics', JSON.stringify(analytics));
    renderSearchAnalytics();
}

function renderSearchAnalytics() {
    const listEl = document.getElementById("analytics-search-list");
    if (!listEl) return;
    listEl.innerHTML = "";
    
    const analytics = JSON.parse(localStorage.getItem('gcp_search_analytics')) || {};
    const sorted = Object.entries(analytics).sort((a, b) => b[1] - a[1]).slice(0, 10);
    
    if (sorted.length === 0) {
        listEl.innerHTML = `
            <tr>
                <td colspan="2" style="text-align: center; color: var(--text-muted); padding: 10px;">No searches recorded yet.</td>
            </tr>
        `;
        return;
    }
    
    sorted.forEach(([query, count]) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><strong style="color: var(--accent);">${query}</strong></td>
            <td style="text-align: right; font-weight:700; color: var(--primary-dark);">${count} searches</td>
        `;
        listEl.appendChild(row);
    });
}

function clearSearchAnalytics() {
    if (confirm("Are you sure you want to clear the customer search history trends?")) {
        localStorage.removeItem('gcp_search_analytics');
        renderSearchAnalytics();
        showToast("Search analytics trends cleared.");
    }
}

// 18. ORDERS LEDGER & LOGISTICS
function saveOrderToLocalHistory(custName, custPhone, custAddress, subtotal, finalTotal) {
    const orders = JSON.parse(localStorage.getItem('gcp_orders')) || [];
    const dateStr = new Date().toLocaleString();
    const orderId = `GCP-2026-${1000 + Math.floor(Math.random() * 9000)}`;
    
    const gstRate = parseFloat(STORE_SETTINGS.gstPercentage) || 12;
    const gstAmount = subtotal * (gstRate / (100 + gstRate));
    
    const orderItems = cart.map(item => ({
        id: item.product.id,
        name: item.product.name,
        size: item.product.size,
        price: item.product.price,
        quantity: item.quantity
    }));
    
    const newOrder = {
        id: orderId,
        date: dateStr,
        name: custName,
        phone: custPhone,
        address: deliveryType === "delivery" ? custAddress : "In-store Self-Pickup",
        deliveryType: deliveryType,
        paymentMethod: customerPaymentMethod,
        items: orderItems,
        subtotal: subtotal,
        gstAmount: gstAmount,
        deliveryFee: deliveryType === "delivery" ? DELIVERY_FEE : 0,
        total: finalTotal,
        status: "Pending"
    };
    
    orders.unshift(newOrder);
    localStorage.setItem('gcp_orders', JSON.stringify(orders));
    
    renderOrdersLog();
    updatePendingOrdersBadge();
    
    return newOrder;
}

function renderOrdersLog() {
    const ordersList = document.getElementById("admin-orders-list");
    if (!ordersList) return;
    ordersList.innerHTML = "";
    
    const query = adminOrderSearch.value.toLowerCase().trim();
    const orders = JSON.parse(localStorage.getItem('gcp_orders')) || [];
    
    const filtered = orders.filter(o => 
        o.id.toLowerCase().includes(query) || 
        o.name.toLowerCase().includes(query) || 
        o.phone.includes(query)
    );
    
    if (filtered.length === 0) {
        ordersList.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 20px;">No matching orders logged in database.</td>
            </tr>
        `;
        return;
    }
    
    filtered.forEach(order => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><strong style="color:var(--accent);">${order.id}</strong></td>
            <td>
                <div style="font-weight:600;">${order.name}</div>
                <div style="font-size:0.75rem; color:var(--text-muted);">${order.phone}</div>
            </td>
            <td>
                <div style="font-size:0.8rem;">${order.date}</div>
                <div style="font-size:0.7rem; font-weight:700; text-transform:uppercase; color:var(--primary-dark);">${order.deliveryType === "delivery" ? "🚚 Home Delivery" : "🏬 Store Pickup"}</div>
            </td>
            <td><strong>₹${order.total.toFixed(2)}</strong></td>
            <td>
                <select class="status-selector status-badge status-${order.status.toLowerCase()}" onchange="updateOrderStatus('${order.id}', this.value)" style="cursor:pointer; border:none; padding: 4px 8px; font-weight:700;">
                    <option value="Pending" ${order.status === "Pending" ? "selected" : ""}>Pending</option>
                    <option value="Packing" ${order.status === "Packing" ? "selected" : ""}>Packing</option>
                    <option value="Dispatched" ${order.status === "Dispatched" ? "selected" : ""}>Dispatched</option>
                    <option value="Completed" ${order.status === "Completed" ? "selected" : ""}>Completed</option>
                    <option value="Cancelled" ${order.status === "Cancelled" ? "selected" : ""}>Cancelled</option>
                </select>
            </td>
            <td>
                <button type="button" class="admin-btn-action admin-btn-edit" onclick="openInvoicePrintModal('${order.id}')" title="Print Invoice"><i class="fa-solid fa-print"></i></button>
                <button type="button" class="admin-btn-action admin-btn-delete" onclick="deleteOrderFromLog('${order.id}')" title="Delete Order"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        `;
        ordersList.appendChild(row);
    });
}

window.updateOrderStatus = function(orderId, newStatus) {
    const orders = JSON.parse(localStorage.getItem('gcp_orders')) || [];
    const index = orders.findIndex(o => o.id === orderId);
    if (index > -1) {
        orders[index].status = newStatus;
        localStorage.setItem('gcp_orders', JSON.stringify(orders));
        renderOrdersLog();
        updatePendingOrdersBadge();
        showToast(`Order status updated to ${newStatus}!`);
    }
};

window.deleteOrderFromLog = function(orderId) {
    if (confirm(`Are you sure you want to delete order ${orderId} from history?`)) {
        let orders = JSON.parse(localStorage.getItem('gcp_orders')) || [];
        orders = orders.filter(o => o.id !== orderId);
        localStorage.setItem('gcp_orders', JSON.stringify(orders));
        renderOrdersLog();
        updatePendingOrdersBadge();
        showToast("Order deleted from history.", "fa-solid fa-trash-can");
    }
};

function clearOrderHistory() {
    if (confirm("Are you sure you want to clear all order history? This cannot be undone.")) {
        localStorage.setItem('gcp_orders', JSON.stringify([]));
        renderOrdersLog();
        updatePendingOrdersBadge();
        showToast("Order history cleared.");
    }
}

function updatePendingOrdersBadge() {
    const orders = JSON.parse(localStorage.getItem('gcp_orders')) || [];
    const pendingCount = orders.filter(o => o.status === "Pending" || o.status === "Packing" || o.status === "Dispatched").length;
    
    if (pendingCount > 0) {
        ordersBadgeCount.textContent = pendingCount;
        ordersBadgeCount.style.display = "inline-flex";
    } else {
        ordersBadgeCount.style.display = "none";
    }
}

// 19. MOCK ORDER SIMULATOR
function simulateMockOrder() {
    const names = ["Aarav Sharma", "Diya Patel", "Kabir Singh", "Ananya Verma", "Rohan Gupta", "Priya Nair"];
    const phones = ["9876543012", "9988776655", "9123456789", "8877665544", "7766554433", "9564738291"];
    const addresses = [
        "Flat 204, Green Heights, Phase 2, Green City",
        "Shop No. 5, Market Yard, Green City",
        "House No. 12B, Lane 4, Sector 7, Green City",
        "Plot 44, Park Avenue Road, Green City"
    ];
    
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomPhone = phones[Math.floor(Math.random() * phones.length)];
    const randomAddress = addresses[Math.floor(Math.random() * addresses.length)];
    const randomItemsCount = Math.floor(Math.random() * 3) + 1;
    const randomDeliveryType = Math.random() > 0.4 ? "delivery" : "pickup";
    
    const shuffled = [...PRODUCTS_DB].sort(() => 0.5 - Math.random());
    const selectedProducts = shuffled.slice(0, randomItemsCount);
    
    const orders = JSON.parse(localStorage.getItem('gcp_orders')) || [];
    const dateStr = new Date().toLocaleString();
    const orderId = `GCP-2026-${1000 + Math.floor(Math.random() * 9000)}`;
    
    let subtotal = 0;
    const orderItems = selectedProducts.map(p => {
        const qty = Math.floor(Math.random() * 2) + 1;
        subtotal += p.price * qty;
        return {
            id: p.id,
            name: p.name,
            size: p.size,
            price: p.price,
            quantity: qty
        };
    });
    
    const gstRate = parseFloat(STORE_SETTINGS.gstPercentage) || 12;
    const gstAmount = subtotal * (gstRate / (100 + gstRate));
    const finalTotal = subtotal + (randomDeliveryType === "delivery" ? DELIVERY_FEE : 0);
    
    const mockOrder = {
        id: orderId,
        date: dateStr,
        name: randomName,
        phone: randomPhone,
        address: randomDeliveryType === "delivery" ? randomAddress : "In-store Self-Pickup",
        deliveryType: randomDeliveryType,
        paymentMethod: Math.random() > 0.5 ? "upi" : "cod",
        items: orderItems,
        subtotal: subtotal,
        gstAmount: gstAmount,
        deliveryFee: randomDeliveryType === "delivery" ? DELIVERY_FEE : 0,
        total: finalTotal,
        status: "Pending"
    };
    
    orders.unshift(mockOrder);
    localStorage.setItem('gcp_orders', JSON.stringify(orders));
    
    renderOrdersLog();
    updatePendingOrdersBadge();
    
    try {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const osc = context.createOscillator();
        const gain = context.createGain();
        osc.connect(gain);
        gain.connect(context.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, context.currentTime);
        osc.frequency.setValueAtTime(880, context.currentTime + 0.15);
        gain.gain.setValueAtTime(0.1, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.45);
        osc.start();
        osc.stop(context.currentTime + 0.5);
    } catch(e) {}
    
    showToast(`Incoming order logged: ${orderId} from ${randomName}!`, "fa-solid fa-bell");
}

// 20. PRINTABLE TAX INVOICE MODAL
let currentInvoiceCloseCallback = null;
window.openInvoicePrintModal = function(orderId) {
    openInvoiceModal(orderId);
};

function openInvoiceModal(orderId, onCloseCallback = null) {
    currentInvoiceCloseCallback = onCloseCallback;
    const orders = JSON.parse(localStorage.getItem('gcp_orders')) || [];
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    const gstRate = parseFloat(STORE_SETTINGS.gstPercentage) || 12;
    const halfGstRate = (gstRate / 2).toFixed(1);
    const halfGstAmount = (order.gstAmount / 2).toFixed(2);
    
    let itemsRowsHTML = "";
    order.items.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        itemsRowsHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>
                    <div style="font-weight:700;">${item.name}</div>
                    <div style="font-size:0.7rem; color:var(--text-muted);">${item.size}</div>
                </td>
                <td>₹${(item.price - (item.price * (gstRate / (100 + gstRate)))).toFixed(2)}</td>
                <td style="text-align:center;">${item.quantity}</td>
                <td style="text-align:right;">₹${itemTotal.toFixed(2)}</td>
            </tr>
        `;
    });
    
    invoicePaperContent.innerHTML = `
        <div class="invoice-header-grid">
            <div class="invoice-brand-col">
                <h2>GREEN CITY PHARMACY</h2>
                <p>Managed by Registered Pharmacist ${STORE_SETTINGS.pharmacistName}</p>
                <p>${STORE_SETTINGS.longAddress}</p>
                <p>Phone: ${STORE_SETTINGS.phone} | Email: ${STORE_SETTINGS.email}</p>
            </div>
            <div class="invoice-meta-col">
                <h3>TAX INVOICE / BILL</h3>
                <p><strong>Invoice ID:</strong> ${order.id}</p>
                <p><strong>Date:</strong> ${order.date}</p>
                <p><strong>Drug License:</strong> ${STORE_SETTINGS.dlNo}</p>
                <p><strong>PCI Reg No:</strong> ${STORE_SETTINGS.regNo}</p>
            </div>
        </div>
        
        <div class="invoice-details-grid">
            <div class="invoice-details-card">
                <h4>Customer Details</h4>
                <p><strong>Name:</strong> ${order.name}</p>
                <p><strong>Phone:</strong> ${order.phone}</p>
                <p><strong>Address:</strong> ${order.address}</p>
            </div>
            <div class="invoice-details-card">
                <h4>Payment & Logistics</h4>
                <p><strong>Delivery Method:</strong> ${order.deliveryType === "delivery" ? "🚚 Home Delivery" : "🏬 Store Self-Pickup"}</p>
                <p><strong>Payment Option:</strong> ${order.paymentMethod.toUpperCase()}</p>
                <p><strong>GST Rate:</strong> ${gstRate}% (Inclusive)</p>
            </div>
        </div>
        
        <table class="invoice-items-table">
            <thead>
                <tr>
                    <th style="width: 50px;">S.No</th>
                    <th>Product Description</th>
                    <th>Unit Price (Base)</th>
                    <th style="text-align:center; width: 80px;">Qty</th>
                    <th style="text-align:right; width: 100px;">Total (inc. Tax)</th>
                </tr>
            </thead>
            <tbody>
                ${itemsRowsHTML}
            </tbody>
        </table>
        
        <div class="invoice-summary-wrapper">
            <div class="invoice-summary-box">
                <div class="invoice-summary-row">
                    <span>Subtotal (Base):</span>
                    <span>₹${(order.subtotal - order.gstAmount).toFixed(2)}</span>
                </div>
                <div class="invoice-summary-row">
                    <span>CGST (${halfGstRate}%):</span>
                    <span>₹${halfGstAmount}</span>
                </div>
                <div class="invoice-summary-row">
                    <span>SGST (${halfGstRate}%):</span>
                    <span>₹${halfGstAmount}</span>
                </div>
                <div class="invoice-summary-row">
                    <span>Delivery Fee:</span>
                    <span>₹${order.deliveryFee.toFixed(2)}</span>
                </div>
                <div class="invoice-summary-row total-row">
                    <span>Grand Total:</span>
                    <span>₹${order.total.toFixed(2)}</span>
                </div>
            </div>
        </div>
        
        <div class="invoice-footer-note">
            <p><strong>Thank you for choosing Green City Pharmacy!</strong></p>
            <p style="font-size:0.65rem; color:var(--text-muted); margin-top:8px;">This is a computer-generated tax invoice verified by Registered Pharmacist ${STORE_SETTINGS.pharmacistName}. Keep this receipt for reference.</p>
        </div>
    `;
    
    invoiceModalOverlay.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeInvoiceModal() {
    invoiceModalOverlay.style.display = "none";
    document.body.style.overflow = "auto";
    if (currentInvoiceCloseCallback) {
        currentInvoiceCloseCallback();
        currentInvoiceCloseCallback = null;
    }
}

// 21. FLOATING LIVE CHAT WIDGET
let isChatOpen = false;
function toggleChatWindow() {
    isChatOpen = !isChatOpen;
    chatWindowPanel.style.display = isChatOpen ? "flex" : "none";
    chatNotificationDot.style.display = "none";
    
    if (isChatOpen) {
        chatMessageInput.focus();
        chatMessagesList.scrollTop = chatMessagesList.scrollHeight;
    }
}

function closeChatWindow() {
    isChatOpen = false;
    chatWindowPanel.style.display = "none";
}

function initChatWidget() {
    setTimeout(() => {
        if (!isChatOpen) {
            chatNotificationDot.style.display = "block";
            try {
                chatBubbleTrigger.classList.add("animate-bounce");
                setTimeout(() => chatBubbleTrigger.classList.remove("animate-bounce"), 2000);
            } catch(e) {}
        }
    }, 5000);
    
    document.querySelectorAll(".quick-reply-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const text = btn.getAttribute("data-reply");
            chatMessageInput.value = text;
            handleChatSubmit();
        });
    });
}

function handleChatSubmit(e) {
    if (e) e.preventDefault();
    const userText = chatMessageInput.value.trim();
    if (!userText) return;
    
    appendChatMessage(userText, "user-msg");
    chatMessageInput.value = "";
    
    chatTypingBubble.style.display = "flex";
    chatMessagesList.scrollTop = chatMessagesList.scrollHeight;
    
    setTimeout(() => {
        chatTypingBubble.style.display = "none";
        triggerPharmacistAutoReply(userText);
    }, 1200);
}

function appendChatMessage(text, className) {
    const msg = document.createElement("div");
    msg.classList.add("chat-msg", className);
    
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    msg.innerHTML = `
        <p>${text}</p>
        <span class="chat-msg-time">${timeStr}</span>
    `;
    chatMessagesList.appendChild(msg);
    chatMessagesList.scrollTop = chatMessagesList.scrollHeight;
}

function triggerPharmacistAutoReply(userMessage) {
    const text = userMessage.toLowerCase();
    let reply = "";
    
    if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
        reply = `Hello! I am Registered Pharmacist ${STORE_SETTINGS.pharmacistName}. How can I assist you with your health or medicines today?`;
    } else if (text.includes("prescription") || text.includes("upload") || text.includes("rx")) {
        reply = `You can upload your prescription directly in the "Upload Prescription" section on the page. Once uploaded, I will personally review the medications and contact you via WhatsApp to confirm the pricing!`;
    } else if (text.includes("hours") || text.includes("open") || text.includes("time") || text.includes("schedule")) {
        reply = `Our operating hours are: **${STORE_SETTINGS.operatingHours}**. You are welcome to visit our physical outlet or order online for dispatch.`;
    } else if (text.includes("delivery") || text.includes("shipping") || text.includes("home")) {
        reply = `We deliver orders within 2 to 4 hours in the local Green City area (flat ₹30 delivery fee). For store pickups, your order will be packed and ready inside the shop in 15 minutes.`;
    } else if (text.includes("payment") || text.includes("upi") || text.includes("bank") || text.includes("qr")) {
        reply = `We support Cash on Delivery, instant UPI payment (with dynamic scan-to-pay QR codes in the cart checkout sidebar), and Direct Bank Transfers.`;
    } else if (text.includes("paracetamol") || text.includes("dolo") || text.includes("medicine") || text.includes("cetirizine") || text.includes("stock")) {
        reply = `We keep a massive stock of genuine OTC medicines, multivitamins, and medical supplies. You can browse our Catalog, search items, and add them to your cart directly!`;
    } else {
        reply = `Thank you for reaching out! For clinical advice, checking drug interactions, or placing custom requests, you can click the **Direct WhatsApp Chat** button below to connect directly with my phone.`;
    }
    
    appendChatMessage(reply, "system-msg");
}

function handleChatWhatsappEscalation() {
    const text = "Hello Pharmacist Ameen, I have a quick medical query regarding Green City Pharmacy.";
    const storeWhatsAppNumber = STORE_SETTINGS.whatsappNumber.replace(/[^0-9]/g, ""); 
    const whatsAppUrl = `https://api.whatsapp.com/send?phone=${storeWhatsAppNumber}&text=${encodeURIComponent(text)}`;
    window.open(whatsAppUrl, "_blank");
}
