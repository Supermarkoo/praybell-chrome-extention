// Handle installation
chrome.runtime.onInstalled.addListener(() => {
    // Initialize default settings
    chrome.storage.sync.get({
        notifications: true,
        adhanSound: true,
        calculationMethod: 2, // Default to Islamic Society of North America
        customMessages: {
            Fajr: "Time for Fajr prayer. May your day begin with blessings.",
            Dhuhr: "Time for Dhuhr prayer. May your day be blessed.",
            Asr: "Time for Asr prayer. May Allah accept your prayers.",
            Maghrib: "Time for Maghrib prayer. May your evening be peaceful.",
            Isha: "Time for Isha prayer. May Allah grant you a peaceful night."
        }
    }, (items) => {
        chrome.storage.sync.set(items);
    });
});

// Check and update prayer times periodically
async function updatePrayerTimes() {
    try {
        const { latitude, longitude } = await getLocation();
        
        // Get prayer times
        const date = new Date();
        const response = await fetch(
            `https://api.aladhan.com/v1/timings/${date.getTime()/1000}?latitude=${latitude}&longitude=${longitude}&method=2`
        );
        const data = await response.json();
        
        if (data.code === 200) {
            const timings = data.data.timings;
            setupAlarms(timings);
            // Store timings for popup use
            chrome.storage.local.set({ prayerTimings: timings });
        }
    } catch (error) {
        console.error('Error updating prayer times:', error);
    }
}

async function getLocation() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(['latitude', 'longitude'], (result) => {
            if (result.latitude && result.longitude) {
                resolve({ latitude: result.latitude, longitude: result.longitude });
            } else {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        chrome.storage.sync.set({ latitude, longitude });
                        resolve({ latitude, longitude });
                    },
                    (error) => reject(error)
                );
            }
        });
    });
}

function setupAlarms(timings) {
    // Clear existing alarms
    chrome.alarms.clearAll();
    
    // Set up new alarms for each prayer time
    Object.entries(timings).forEach(([prayer, time]) => {
        if (['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].includes(prayer)) {
            const [hours, minutes] = time.split(':');
            const prayerTime = new Date();
            prayerTime.setHours(parseInt(hours), parseInt(minutes), 0);
            
            // Only set alarm if prayer time hasn't passed today
            if (prayerTime > new Date()) {
                chrome.alarms.create(`prayer_${prayer}`, {
                    when: prayerTime.getTime()
                });
            }
        }
    });
}

// Handle alarms
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name.startsWith('prayer_')) {
        const prayer = alarm.name.split('_')[1];
        
        chrome.storage.sync.get(['notifications', 'customMessages'], (items) => {
            if (items.notifications) {
                const message = items.customMessages?.[prayer] || `It's time for ${prayer} prayer`;
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: 'icons/icon128.png',
                    title: `${prayer} Prayer Time`,
                    message: message,
                    priority: 2
                });
            }
        });
    }
});

// Update prayer times every hour
setInterval(updatePrayerTimes, 3600000); // 1 hour
updatePrayerTimes(); // Initial update

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateLocation') {
        updatePrayerTimes().then(() => sendResponse({ success: true }));
        return true; // Will respond asynchronously
    }
}); 