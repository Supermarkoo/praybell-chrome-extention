// Prayer calculation methods
const CALCULATION_METHODS = {
    MWL: 'Muslim World League',
    ISNA: 'Islamic Society of North America',
    EGYPT: 'Egyptian General Authority of Survey',
    MAKKAH: 'Umm Al-Qura University, Makkah',
    KARACHI: 'University of Islamic Sciences, Karachi',
    TEHRAN: 'Institute of Geophysics, University of Tehran',
    JAFARI: 'Shia Ithna-Ashari, Leva Research Institute, Qum'
};

// Madhab options
const MADHAB = {
    SHAFI: 'Shafi',
    HANAFI: 'Hanafi'
};

class PrayerTimes {
    constructor() {
        this.baseUrl = 'https://api.aladhan.com/v1';
    }

    async getPrayerTimes(latitude, longitude, method = 'MWL', madhab = 'SHAFI') {
        try {
            const date = new Date();
            const response = await fetch(
                `${this.baseUrl}/timings/${date.getTime() / 1000}?latitude=${latitude}&longitude=${longitude}&method=${method}&school=${madhab}`
            );
            
            if (!response.ok) {
                throw new Error('Failed to fetch prayer times');
            }

            const data = await response.json();
            return {
                timings: data.data.timings,
                date: data.data.date,
                meta: data.data.meta
            };
        } catch (error) {
            console.error('Error fetching prayer times:', error);
            throw error;
        }
    }

    async getHijriDate() {
        try {
            const date = new Date();
            const response = await fetch(
                `${this.baseUrl}/gToH/${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
            );
            
            if (!response.ok) {
                throw new Error('Failed to fetch Hijri date');
            }

            const data = await response.json();
            return data.data.hijri;
        } catch (error) {
            console.error('Error fetching Hijri date:', error);
            throw error;
        }
    }

    getNextPrayer(timings) {
        const now = new Date();
        const prayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
        
        for (const prayer of prayers) {
            const [hours, minutes] = timings[prayer].split(':');
            const prayerTime = new Date();
            prayerTime.setHours(parseInt(hours), parseInt(minutes), 0);
            
            if (prayerTime > now) {
                return {
                    name: prayer,
                    time: timings[prayer],
                    timestamp: prayerTime.getTime()
                };
            }
        }

        // If all prayers for today have passed, return first prayer of next day
        return {
            name: 'Fajr',
            time: timings.Fajr,
            timestamp: new Date(now.getTime() + 24 * 60 * 60 * 1000).setHours(
                parseInt(timings.Fajr.split(':')[0]),
                parseInt(timings.Fajr.split(':')[1]),
                0
            )
        };
    }

    formatTime(time, use24Hour = true) {
        if (!time) return '--:--';
        
        const [hours, minutes] = time.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        
        return use24Hour 
            ? time 
            : date.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit', 
                hour12: true 
            });
    }
}

export { PrayerTimes, CALCULATION_METHODS, MADHAB }; 