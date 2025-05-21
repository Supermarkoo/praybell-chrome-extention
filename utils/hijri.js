class HijriDate {
    constructor() {
        this.baseUrl = 'https://api.aladhan.com/v1';
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

    formatHijriDate(hijriDate, language = 'en') {
        const months = {
            en: {
                1: 'Muharram',
                2: 'Safar',
                3: 'Rabi al-Awwal',
                4: 'Rabi al-Thani',
                5: 'Jumada al-Awwal',
                6: 'Jumada al-Thani',
                7: 'Rajab',
                8: 'Sha\'ban',
                9: 'Ramadan',
                10: 'Shawwal',
                11: 'Dhu al-Qadah',
                12: 'Dhu al-Hijjah'
            },
            ar: {
                1: 'محرم',
                2: 'صفر',
                3: 'ربيع الأول',
                4: 'ربيع الثاني',
                5: 'جمادى الأولى',
                6: 'جمادى الآخرة',
                7: 'رجب',
                8: 'شعبان',
                9: 'رمضان',
                10: 'شوال',
                11: 'ذو القعدة',
                12: 'ذو الحجة'
            }
        };

        const month = months[language][parseInt(hijriDate.month.number)];
        return `${hijriDate.day} ${month} ${hijriDate.year} AH`;
    }

    async getRamadanInfo() {
        try {
            const date = new Date();
            const response = await fetch(
                `${this.baseUrl}/calendar/${date.getFullYear()}?adjustment=1`
            );
            
            if (!response.ok) {
                throw new Error('Failed to fetch Ramadan info');
            }

            const data = await response.json();
            const ramadanData = data.data.find(month => month.month.number === 9);
            
            if (!ramadanData) {
                return null;
            }

            return {
                startDate: ramadanData.firstDay,
                endDate: ramadanData.lastDay,
                totalDays: ramadanData.totalDays
            };
        } catch (error) {
            console.error('Error fetching Ramadan info:', error);
            throw error;
        }
    }

    isRamadan(hijriDate) {
        return parseInt(hijriDate.month.number) === 9;
    }
}

export default HijriDate; 