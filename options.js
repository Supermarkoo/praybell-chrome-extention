import { PrayerTimes, CALCULATION_METHODS, MADHAB } from './utils/prayerTimes.js';
import LocationManager from './utils/location.js';
import HijriDate from './utils/hijri.js';

class OptionsManager {
    constructor() {
        this.prayerTimes = new PrayerTimes();
        this.locationManager = new LocationManager();
        this.hijriDate = new HijriDate();
        this.settings = {};
        this.setupEventListeners();
    }

    async init() {
        await this.loadSettings();
        this.updateUI();
    }

    async loadSettings() {
        this.settings = await chrome.storage.sync.get({
            // General settings
            language: 'en',
            timeFormat: '24',
            showHijri: true,
            
            // Prayer time settings
            calculationMethod: 'MWL',
            madhab: 'SHAFI',
            
            // Notification settings
            notifications: true,
            notificationSound: 'adhan',
            notificationTime: '0',
            
            // Location settings
            latitude: null,
            longitude: null,
            country: '',
            countryCode: '',
            city: '',
            autoLocation: true
        });
    }

    updateUI() {
        // General settings
        document.getElementById('language-select').value = this.settings.language;
        document.getElementById('time-format-select').value = this.settings.timeFormat;
        document.getElementById('show-hijri-toggle').checked = this.settings.showHijri;

        // Prayer time settings
        document.getElementById('calculation-method-select').value = this.settings.calculationMethod;
        document.getElementById('madhab-select').value = this.settings.madhab;

        // Notification settings
        document.getElementById('notifications-toggle').checked = this.settings.notifications;
        document.getElementById('notification-sound-select').value = this.settings.notificationSound;
        document.getElementById('notification-time-select').value = this.settings.notificationTime;

        // Update translations
        this.updateTranslations();
    }

    async saveSettings() {
        // Get values from UI
        const newSettings = {
            // General settings
            language: document.getElementById('language-select').value,
            timeFormat: document.getElementById('time-format-select').value,
            showHijri: document.getElementById('show-hijri-toggle').checked,
            
            // Prayer time settings
            calculationMethod: document.getElementById('calculation-method-select').value,
            madhab: document.getElementById('madhab-select').value,
            
            // Notification settings
            notifications: document.getElementById('notifications-toggle').checked,
            notificationSound: document.getElementById('notification-sound-select').value,
            notificationTime: document.getElementById('notification-time-select').value
        };

        // Save to storage
        await chrome.storage.sync.set(newSettings);
        this.settings = { ...this.settings, ...newSettings };

        // Update prayer times if calculation method or madhab changed
        if (this.settings.latitude && this.settings.longitude) {
            await this.updatePrayerTimes();
        }

        // Show success message
        this.showMessage('Settings saved successfully!', 'success');
    }

    async updatePrayerTimes() {
        try {
            const prayerData = await this.prayerTimes.getPrayerTimes(
                this.settings.latitude,
                this.settings.longitude,
                this.settings.calculationMethod,
                this.settings.madhab
            );

            // Store prayer times
            await chrome.storage.local.set({ prayerTimings: prayerData.timings });

            // Update alarms
            await this.updateAlarms(prayerData.timings);
        } catch (error) {
            console.error('Error updating prayer times:', error);
            this.showMessage('Failed to update prayer times', 'error');
        }
    }

    async updateAlarms(timings) {
        // Clear existing alarms
        await chrome.alarms.clearAll();

        // Set new alarms for each prayer
        const prayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
        for (const prayer of prayers) {
            const [hours, minutes] = timings[prayer].split(':');
            const now = new Date();
            const prayerTime = new Date();
            prayerTime.setHours(parseInt(hours), parseInt(minutes), 0);

            // If prayer time has passed, schedule for next day
            if (prayerTime <= now) {
                prayerTime.setDate(prayerTime.getDate() + 1);
            }

            // Calculate delay in minutes
            const delayInMinutes = (prayerTime - now) / (1000 * 60);

            // Create alarm
            await chrome.alarms.create(prayer, {
                delayInMinutes: delayInMinutes
            });
        }
    }

    showMessage(message, type = 'info') {
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}`;
        messageElement.textContent = message;

        // Add to page
        document.body.appendChild(messageElement);

        // Remove after 3 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 3000);
    }

    setupEventListeners() {
        // Save button
        document.getElementById('save-settings').addEventListener('click', () => {
            this.saveSettings();
        });

        // Language change
        document.getElementById('language-select').addEventListener('change', () => {
            this.updateTranslations();
        });

        // Notifications toggle
        document.getElementById('notifications-toggle').addEventListener('change', (e) => {
            const notificationSettings = document.querySelectorAll('#notification-sound-select, #notification-time-select');
            notificationSettings.forEach(setting => {
                setting.disabled = !e.target.checked;
            });
        });
    }

    updateTranslations() {
        const language = document.getElementById('language-select').value;
        document.documentElement.setAttribute('dir', ['ar', 'fa'].includes(language) ? 'rtl' : 'ltr');
        
        // Update all translatable elements
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = chrome.i18n.getMessage(key);
        });
    }
}

// Initialize options manager
const optionsManager = new OptionsManager();
optionsManager.init(); 