// Global variables
let countdownInterval;
let currentLanguage = 'ar';
let currentCountry = 'JO';
let currentCity = '';

document.addEventListener('DOMContentLoaded', async () => {
    await loadSettings();
    await updatePrayerTimes();
    setupEventListeners();
    startCountdown();
});

async function loadSettings() {
    const settings = await chrome.storage.sync.get({
        language: 'ar',
        country: 'JO',
        city: '',
        latitude: null,
        longitude: null
    });
    
    currentLanguage = settings.language;
    currentCountry = settings.country;
    currentCity = settings.city;
    
    // Update UI elements
    document.getElementById('language-select').value = currentLanguage;
    document.getElementById('country-select').value = currentCountry;
    updateCitySelect();
    document.getElementById('city-select').value = currentCity;
    
    // Update translations
    updateTranslations();
}

async function updatePrayerTimes() {
    try {
        const { prayerTimings } = await chrome.storage.local.get('prayerTimings');
        if (!prayerTimings) return;

        // Update prayer times in UI
        Object.entries(prayerTimings).forEach(([prayer, time]) => {
            const element = document.getElementById(`${prayer.toLowerCase()}-time`);
            if (element) {
                element.textContent = time;
            }
        });

        // Update next prayer
        updateNextPrayer(prayerTimings);
    } catch (error) {
        console.error('Error updating prayer times:', error);
    }
}

function updateNextPrayer(timings) {
    const now = new Date();
    const prayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    
    for (const prayer of prayers) {
        const [hours, minutes] = timings[prayer].split(':');
        const prayerTime = new Date();
        prayerTime.setHours(parseInt(hours), parseInt(minutes), 0);
        
        if (prayerTime > now) {
            document.getElementById('next-prayer-name').textContent = 
                document.querySelector(`[data-en="${prayer}"]`).textContent;
            document.getElementById('next-prayer-time').textContent = timings[prayer];
            return;
        }
    }
}

function startCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    countdownInterval = setInterval(() => {
        const nextPrayerTime = document.getElementById('next-prayer-time').textContent;
        if (nextPrayerTime === '--:--') return;
        
        const [hours, minutes] = nextPrayerTime.split(':');
        const prayerTime = new Date();
        prayerTime.setHours(parseInt(hours), parseInt(minutes), 0);
        
        const now = new Date();
        const diff = prayerTime - now;
        
        if (diff <= 0) {
            updatePrayerTimes();
            return;
        }
        
        const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
        const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('countdown').textContent = 
            `${String(hoursLeft).padStart(2, '0')}:${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;
    }, 1000);
}

function setupEventListeners() {
    // Settings button
    const settingsBtn = document.getElementById('settings-btn');
    const settingsPage = document.getElementById('settings-page');
    const closeSettingsBtn = document.getElementById('close-settings');

    settingsBtn.addEventListener('click', () => {
        settingsPage.classList.add('active');
        // Update settings page translations
        updateSettingsTranslations();
    });
    
    // Close settings
    closeSettingsBtn.addEventListener('click', () => {
        settingsPage.classList.remove('active');
    });

    // Close settings when clicking outside
    settingsPage.addEventListener('click', (e) => {
        if (e.target === settingsPage) {
            settingsPage.classList.remove('active');
        }
    });

    // Language selection
    document.getElementById('language-select').addEventListener('change', async (e) => {
        currentLanguage = e.target.value;
        await chrome.storage.sync.set({ language: currentLanguage });
        updateTranslations();
        updateSettingsTranslations();
    });
    
    // Country selection
    document.getElementById('country-select').addEventListener('change', async (e) => {
        currentCountry = e.target.value;
        currentCity = '';
        await chrome.storage.sync.set({ country: currentCountry, city: currentCity });
        updateCitySelect();
        await updateLocation();
    });
    
    // City selection
    document.getElementById('city-select').addEventListener('change', async (e) => {
        currentCity = e.target.value;
        await chrome.storage.sync.set({ city: currentCity });
        await updateLocation();
    });
    
    // Auto-location button
    document.getElementById('auto-location').addEventListener('click', async () => {
        try {
            const position = await getCurrentPosition();
            const { latitude, longitude } = position.coords;
            
            // Save coordinates
            await chrome.storage.sync.set({
                latitude,
                longitude,
                autoLocation: true
            });
            
            // Update prayer times
            await updatePrayerTimes();
            
            // Show success message
            showMessage('Location updated successfully!', 'success');
        } catch (error) {
            showMessage('Failed to get location. Please try again.', 'error');
        }
    });

    // Test notification button
    document.getElementById('test-notification').addEventListener('click', async () => {
        try {
            // Get current language
            const { language = 'en' } = await chrome.storage.sync.get('language');
            const translations = TRANSLATIONS[language] || TRANSLATIONS.en;

            // Show test notification
            chrome.runtime.sendMessage({
                type: 'showNotification',
                title: translations.notifications.testTitle,
                message: translations.notifications.testMessage,
                icon: 'icons/icon48.png'
            });

            showMessage('Test notification sent!', 'success');
        } catch (error) {
            showMessage('Failed to show test notification.', 'error');
        }
    });
}

async function updateLocation() {
    await chrome.runtime.sendMessage({ action: 'updateLocation' });
    await updatePrayerTimes();
}

function updateCitySelect() {
    const citySelect = document.getElementById('city-select');
    citySelect.innerHTML = '<option value="">' + 
        (currentLanguage === 'ar' ? 'اختر المدينة' : 'Select City') + '</option>';
    
    const cities = CITIES[currentCountry] || [];
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });
}

function updateTranslations() {
    // Update all elements with translations
    document.querySelectorAll('[data-en]').forEach(element => {
        const key = element.getAttribute('data-en');
        element.textContent = TRANSLATIONS[currentLanguage][key] || key;
    });
    
    // Update other UI elements
    document.getElementById('title').textContent = TRANSLATIONS[currentLanguage]['title'];
    document.getElementById('settings-title').textContent = TRANSLATIONS[currentLanguage]['settings'];
    document.getElementById('auto-location').querySelector('.text').textContent = 
        TRANSLATIONS[currentLanguage]['autoLocation'];
}

function updateSettingsTranslations() {
    const t = TRANSLATIONS[currentLanguage];
    
    // Update settings page title
    document.getElementById('settings-title').textContent = t.settings;
    
    // Update language select label
    document.querySelector('label[for="language-select"]').textContent = t.selectCountry;
    
    // Update country select label
    document.querySelector('label[for="country-select"]').textContent = t.selectCountry;
    
    // Update city select label
    document.querySelector('label[for="city-select"]').textContent = t.selectCity;
    
    // Update auto-location button text
    const autoLocationBtn = document.getElementById('auto-location');
    autoLocationBtn.querySelector('.text').textContent = t.autoDetect;
    
    // Update test notification button text
    const testNotificationBtn = document.getElementById('test-notification');
    testNotificationBtn.querySelector('.text').textContent = t.notifications.testTitle;
} 