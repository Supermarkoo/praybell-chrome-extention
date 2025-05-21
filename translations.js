const countryCategories = {
    middleEast: {
        ar: 'الشرق الأوسط',
        en: 'Middle East',
        countries: [
            { code: 'JO', lat: 31.9454, lng: 35.9284, flag: '🇯🇴' },
            { code: 'SA', lat: 24.7136, lng: 46.6753, flag: '🇸🇦' },
            { code: 'AE', lat: 25.2048, lng: 55.2708, flag: '🇦🇪' },
            { code: 'KW', lat: 29.3759, lng: 47.9774, flag: '🇰🇼' },
            { code: 'QA', lat: 25.2867, lng: 51.5333, flag: '🇶🇦' },
            { code: 'BH', lat: 26.0667, lng: 50.5577, flag: '🇧🇭' },
            { code: 'OM', lat: 23.5880, lng: 58.3829, flag: '🇴🇲' },
            { code: 'YE', lat: 15.3694, lng: 44.1910, flag: '🇾🇪' },
            { code: 'IQ', lat: 33.3152, lng: 44.3661, flag: '🇮🇶' },
            { code: 'LB', lat: 33.8938, lng: 35.5018, flag: '🇱🇧' },
            { code: 'PS', lat: 31.9522, lng: 35.2332, flag: '🇵🇸' },
            { code: 'SY', lat: 33.5138, lng: 36.2765, flag: '🇸🇾' }
        ]
    },
    northAfrica: {
        ar: 'شمال أفريقيا',
        en: 'North Africa',
        countries: [
            { code: 'EG', lat: 30.0444, lng: 31.2357, flag: '🇪🇬' },
            { code: 'LY', lat: 32.8872, lng: 13.1913, flag: '🇱🇾' },
            { code: 'TN', lat: 36.8065, lng: 10.1815, flag: '🇹🇳' },
            { code: 'DZ', lat: 36.7538, lng: 3.0588, flag: '🇩🇿' },
            { code: 'MA', lat: 34.0209, lng: -6.8416, flag: '🇲🇦' },
            { code: 'SD', lat: 15.5007, lng: 32.5599, flag: '🇸🇩' }
        ]
    },
    asia: {
        ar: 'آسيا',
        en: 'Asia',
        countries: [
            { code: 'PK', lat: 33.6844, lng: 73.0479, flag: '🇵🇰' },
            { code: 'AF', lat: 34.5553, lng: 69.2075, flag: '🇦🇫' },
            { code: 'IR', lat: 35.6892, lng: 51.3890, flag: '🇮🇷' },
            { code: 'TR', lat: 39.9334, lng: 32.8597, flag: '🇹🇷' },
            { code: 'ID', lat: -6.2088, lng: 106.8456, flag: '🇮🇩' },
            { code: 'MY', lat: 3.1390, lng: 101.6869, flag: '🇲🇾' },
            { code: 'BD', lat: 23.8103, lng: 90.4125, flag: '🇧🇩' }
        ]
    },
    europe: {
        ar: 'أوروبا',
        en: 'Europe',
        countries: [
            { code: 'GB', lat: 51.5074, lng: -0.1278, flag: '🇬🇧' },
            { code: 'FR', lat: 48.8566, lng: 2.3522, flag: '🇫🇷' },
            { code: 'DE', lat: 52.5200, lng: 13.4050, flag: '🇩🇪' },
            { code: 'NL', lat: 52.3676, lng: 4.9041, flag: '🇳🇱' },
            { code: 'BE', lat: 50.8503, lng: 4.3517, flag: '🇧🇪' },
            { code: 'ES', lat: 40.4168, lng: -3.7038, flag: '🇪🇸' },
            { code: 'IT', lat: 41.9028, lng: 12.4964, flag: '🇮🇹' }
        ]
    }
};

const cityLocations = {
  JO: {
    Amman: { lat: 31.9539, lng: 35.9106 },
    Irbid: { lat: 32.5560, lng: 35.8478 },
    Zarqa: { lat: 32.0728, lng: 36.0870 },
    Aqaba: { lat: 29.5328, lng: 35.0060 },
    Salt: { lat: 32.0369, lng: 35.7272 },
    Mafraq: { lat: 32.3408, lng: 36.2064 },
    Jerash: { lat: 32.2757, lng: 35.9019 },
    Madaba: { lat: 31.7157, lng: 35.7975 },
    Karak: { lat: 31.1809, lng: 35.7048 },
    Tafilah: { lat: 30.8375, lng: 35.6042 }
  },
  SA: {
    Riyadh: { lat: 24.7136, lng: 46.6753 },
    Jeddah: { lat: 21.4858, lng: 39.1925 },
    Mecca: { lat: 21.3891, lng: 39.8579 },
    Medina: { lat: 24.5247, lng: 39.5692 },
    Dammam: { lat: 26.4207, lng: 50.0888 },
    Tabuk: { lat: 28.3833, lng: 36.5667 }
  },
  EG: {
    Cairo: { lat: 30.0444, lng: 31.2357 },
    Alexandria: { lat: 31.2001, lng: 29.9187 },
    Giza: { lat: 30.0131, lng: 31.2089 },
    "Sharm El Sheikh": { lat: 27.9158, lng: 34.3290 },
    Luxor: { lat: 25.6872, lng: 32.6396 },
    Aswan: { lat: 24.0889, lng: 32.8998 }
  }
};

const translations = {
    ar: {
        title: 'أوقات الصلاة',
        next: 'التالية',
        fajr: 'الفجر',
        sunrise: 'الشروق',
        dhuhr: 'الظهر',
        asr: 'العصر',
        maghrib: 'المغرب',
        isha: 'العشاء',
        loading: 'جاري التحميل...',
        autoDetect: 'تحديد الموقع تلقائياً',
        settings: 'الإعدادات',
        selectCountry: 'اختر الدولة',
        selectCity: 'اختر المدينة',
        cityPlaceholder: 'المدينة',
        noCity: 'لم يتم اختيار مدينة',
        countries: {
            // Middle East
            JO: 'الأردن',
            SA: 'السعودية',
            AE: 'الإمارات',
            KW: 'الكويت',
            QA: 'قطر',
            BH: 'البحرين',
            OM: 'عُمان',
            YE: 'اليمن',
            IQ: 'العراق',
            LB: 'لبنان',
            PS: 'فلسطين',
            SY: 'سوريا',
            // North Africa
            EG: 'مصر',
            LY: 'ليبيا',
            TN: 'تونس',
            DZ: 'الجزائر',
            MA: 'المغرب',
            SD: 'السودان',
            // Asia
            PK: 'باكستان',
            AF: 'أفغانستان',
            IR: 'إيران',
            TR: 'تركيا',
            ID: 'إندونيسيا',
            MY: 'ماليزيا',
            BD: 'بنغلاديش',
            // Europe
            GB: 'بريطانيا',
            FR: 'فرنسا',
            DE: 'ألمانيا',
            NL: 'هولندا',
            BE: 'بلجيكا',
            ES: 'إسبانيا',
            IT: 'إيطاليا'
        },
        cities: {
            JO: {
                'Amman': 'عمان',
                'Irbid': 'إربد',
                'Zarqa': 'الزرقاء',
                'Aqaba': 'العقبة',
                'Salt': 'السلط',
                'Mafraq': 'المفرق',
                'Jerash': 'جرش',
                'Madaba': 'مادبا',
                'Karak': 'الكرك',
                'Tafilah': 'الطفيلة'
            },
            SA: {
                'Riyadh': 'الرياض',
                'Jeddah': 'جدة',
                'Mecca': 'مكة المكرمة',
                'Medina': 'المدينة المنورة',
                'Dammam': 'الدمام',
                'Tabuk': 'تبوك'
            },
            EG: {
                'Cairo': 'القاهرة',
                'Alexandria': 'الإسكندرية',
                'Giza': 'الجيزة',
                'Sharm El Sheikh': 'شرم الشيخ',
                'Luxor': 'الأقصر',
                'Aswan': 'أسوان'
            }
        },
        notifications: {
            prayerTime: 'وقت الصلاة',
            nextPrayer: 'الصلاة القادمة',
            testTitle: 'تنبيه تجريبي',
            testMessage: 'هذا تنبيه تجريبي من إضافة الأذان'
        }
    },
    en: {
        title: 'Prayer Times',
        next: 'Next',
        fajr: 'Fajr',
        sunrise: 'Sunrise',
        dhuhr: 'Dhuhr',
        asr: 'Asr',
        maghrib: 'Maghrib',
        isha: 'Isha',
        loading: 'Loading...',
        autoDetect: 'Auto-detect location',
        settings: 'Settings',
        selectCountry: 'Select Country',
        selectCity: 'Select City',
        cityPlaceholder: 'City',
        noCity: 'No city selected',
        countries: {
            // Middle East
            JO: 'Jordan',
            SA: 'Saudi Arabia',
            AE: 'UAE',
            KW: 'Kuwait',
            QA: 'Qatar',
            BH: 'Bahrain',
            OM: 'Oman',
            YE: 'Yemen',
            IQ: 'Iraq',
            LB: 'Lebanon',
            PS: 'Palestine',
            SY: 'Syria',
            // North Africa
            EG: 'Egypt',
            LY: 'Libya',
            TN: 'Tunisia',
            DZ: 'Algeria',
            MA: 'Morocco',
            SD: 'Sudan',
            // Asia
            PK: 'Pakistan',
            AF: 'Afghanistan',
            IR: 'Iran',
            TR: 'Turkey',
            ID: 'Indonesia',
            MY: 'Malaysia',
            BD: 'Bangladesh',
            // Europe
            GB: 'United Kingdom',
            FR: 'France',
            DE: 'Germany',
            NL: 'Netherlands',
            BE: 'Belgium',
            ES: 'Spain',
            IT: 'Italy'
        },
        cities: {
            // Can be empty since we're using English as the base language for city names
        },
        notifications: {
            prayerTime: 'Prayer Time',
            nextPrayer: 'Next Prayer',
            testTitle: 'Test Notification',
            testMessage: 'This is a test notification from Athan Extension'
        }
    },
    tr: {
        title: 'Namaz Vakitleri',
        next: 'Sonraki',
        fajr: 'İmsak',
        sunrise: 'Güneş',
        dhuhr: 'Öğle',
        asr: 'İkindi',
        maghrib: 'Akşam',
        isha: 'Yatsı',
        loading: 'Yükleniyor...',
        autoDetect: 'Konumu otomatik algıla',
        settings: 'Ayarlar',
        selectCountry: 'Ülke Seç',
        selectCity: 'Şehir Seç',
        cityPlaceholder: 'Şehir',
        noCity: 'Şehir seçilmedi',
        countries: {
            // Add Turkish translations for country names
            JO: 'Ürdün',
            SA: 'Suudi Arabistan',
            AE: 'Birleşik Arap Emirlikleri',
            // Add more countries...
        }
    },
    ur: {
        title: 'اوقات نماز',
        next: 'اگلی',
        fajr: 'فجر',
        sunrise: 'طلوع آفتاب',
        dhuhr: 'ظہر',
        asr: 'عصر',
        maghrib: 'مغرب',
        isha: 'عشاء',
        loading: 'لوڈ ہو رہا ہے...',
        autoDetect: 'مقام کی خودکار شناخت',
        settings: 'ترتیبات',
        selectCountry: 'ملک منتخب کریں',
        selectCity: 'شہر منتخب کریں',
        cityPlaceholder: 'شہر',
        noCity: 'کوئی شہر منتخب نہیں',
        countries: {
            // Add Urdu translations for country names
            JO: 'اردن',
            SA: 'سعودی عرب',
            AE: 'متحدہ عرب امارات',
            // Add more countries...
        }
    },
    fr: {
        title: 'Heures de Prière',
        next: 'Suivant',
        fajr: 'Al Fajr',
        sunrise: 'Le Coucher du Soleil',
        dhuhr: 'Le Zhor',
        asr: 'L\'Aft',
        maghrib: 'Le Maghrib',
        isha: 'L\'Isha',
        loading: 'Chargement...',
        autoDetect: 'Détecter automatiquement la localisation',
        settings: 'Paramètres',
        selectCountry: 'Sélectionner le pays',
        selectCity: 'Sélectionner la ville',
        cityPlaceholder: 'Ville',
        noCity: 'Aucune ville sélectionnée',
        countries: {
            // Add French translations for country names
            JO: 'Jordanie',
            SA: 'Arabie Saoudite',
            AE: 'Émirats arabes unis',
            // Add more countries...
        }
    },
    id: {
        title: 'Waktu Sholat',
        next: 'Berikutnya',
        fajr: 'Fajr',
        sunrise: 'Matahari Terbit',
        dhuhr: 'Dhuhr',
        asr: 'Asr',
        maghrib: 'Maghrib',
        isha: 'Isha',
        loading: 'Memuat...',
        autoDetect: 'Deteksi lokasi otomatis',
        settings: 'Pengaturan',
        selectCountry: 'Pilih Negara',
        selectCity: 'Pilih Kota',
        cityPlaceholder: 'Kota',
        noCity: 'Tidak ada kota dipilih',
        countries: {
            // Add Indonesian translations for country names
            JO: 'Yordania',
            SA: 'Arab Saudi',
            AE: 'Uni Emirat Arab',
            // Add more countries...
        }
    },
    ms: {
        title: 'Waktu Solat',
        next: 'Seterusnya',
        fajr: 'Fajr',
        sunrise: 'Terbit Matahari',
        dhuhr: 'Dhuhr',
        asr: 'Asr',
        maghrib: 'Maghrib',
        isha: 'Isha',
        loading: 'Memuat...',
        autoDetect: 'Deteksi lokasi otomatis',
        settings: 'Tetapan',
        selectCountry: 'Pilih Negara',
        selectCity: 'Pilih Bandar',
        cityPlaceholder: 'Bandar',
        noCity: 'Tidak ada bandar dipilih',
        countries: {
            // Add Malay translations for country names
            JO: 'Yordania',
            SA: 'Arab Saudi',
            AE: 'Uni Emirat Arab',
            // Add more countries...
        }
    },
    fa: {
        title: 'زمان‌های صلوات',
        next: 'بعدی',
        fajr: 'فجر',
        sunrise: 'طلوع آفتاب',
        dhuhr: 'ظهر',
        asr: 'عصر',
        maghrib: 'مغرب',
        isha: 'عشاء',
        loading: 'در حال بارگذاری...',
        autoDetect: 'موقع را به صورت خودکار تشخیص دهد',
        settings: 'تنظیمات',
        selectCountry: 'انتخاب کشور',
        selectCity: 'انتخاب شهر',
        cityPlaceholder: 'شهر',
        noCity: 'شهری انتخاب نشده است',
        countries: {
            // Add Persian translations for country names
            JO: 'اردن',
            SA: 'عربستان سعودی',
            AE: 'امارات متحده عربی',
            // Add more countries...
        }
    },
    bn: {
        title: 'সালাতের সময়',
        next: 'পরবর্তী',
        fajr: 'ফজর',
        sunrise: 'সূর্যের উদয়ন',
        dhuhr: 'দুহর',
        asr: 'আসর',
        maghrib: 'মাগরিব',
        isha: 'ইশা',
        loading: 'লোড হচ্ছে...',
        autoDetect: 'অটোমেটিক অবস্থান খুঁজুন',
        settings: 'সেটিংস',
        selectCountry: 'দেশ নির্বাচন করুন',
        selectCity: 'শহর নির্বাচন করুন',
        cityPlaceholder: 'শহর',
        noCity: 'কোন শহর নির্বাচন করা হয়নি',
        countries: {
            // Add Bengali translations for country names
            JO: 'জরদান',
            SA: 'সাউদি আরব',
            AE: 'সংযুক্ত আরব আমিরাত',
            // Add more countries...
        }
    },
    hi: {
        title: 'सूरज के समय',
        next: 'अगला',
        fajr: 'फजर',
        sunrise: 'सूरज का उदय',
        dhuhr: 'दुहर',
        asr: 'आसर',
        maghrib: 'मगरिब',
        isha: 'इशा',
        loading: 'लोड हो रहा है...',
        autoDetect: 'स्थान को स्वयय पता लगाएं',
        settings: 'सेटिंग्स',
        selectCountry: 'देश चुनें',
        selectCity: 'शहर चुनें',
        cityPlaceholder: 'शहर',
        noCity: 'कोई शहर नहीं चुना गया',
        countries: {
            // Add Hindi translations for country names
            JO: 'जॉर्डन',
            SA: 'सौदी अरब',
            AE: 'संयुक्त अरब अमीरात',
            // Add more countries...
        }
    },
    de: {
        title: 'Gottesdienstzeiten',
        next: 'Nächste',
        fajr: 'Fajr',
        sunrise: 'Sonnenaufgang',
        dhuhr: 'Dhuhr',
        asr: 'Asr',
        maghrib: 'Maghrib',
        isha: 'Isha',
        loading: 'Lädt...',
        autoDetect: 'Standort automatisch erkennen',
        settings: 'Einstellungen',
        selectCountry: 'Land auswählen',
        selectCity: 'Stadt auswählen',
        cityPlaceholder: 'Stadt',
        noCity: 'Keine Stadt ausgewählt',
        countries: {
            // Add German translations for country names
            JO: 'Jordanien',
            SA: 'Saudi-Arabien',
            AE: 'Vereinigte Arabische Emirate',
            // Add more countries...
        }
    },
    es: {
        title: 'Tiempos de Oración',
        next: 'Siguiente',
        fajr: 'Fajr',
        sunrise: 'Salida del Sol',
        dhuhr: 'Dhuhr',
        asr: 'Asr',
        maghrib: 'Maghrib',
        isha: 'Isha',
        loading: 'Cargando...',
        autoDetect: 'Detectar ubicación automáticamente',
        settings: 'Ajustes',
        selectCountry: 'Seleccionar país',
        selectCity: 'Seleccionar ciudad',
        cityPlaceholder: 'Ciudad',
        noCity: 'No se ha seleccionado ninguna ciudad',
        countries: {
            // Add Spanish translations for country names
            JO: 'Jordania',
            SA: 'Arabia Saudita',
            AE: 'Emiratos Árabes Unidos',
            // Add more countries...
        }
    }
};

// Add more languages
const additionalLanguages = {
    tr: 'Türkçe',
    ur: 'اردو',
    fr: 'Français',
    id: 'Bahasa Indonesia',
    ms: 'Bahasa Melayu',
    fa: 'فارسی',
    bn: 'বাংলা',
    hi: 'हिन्दी',
    de: 'Deutsch',
    es: 'Español'
};

let currentLang = 'ar';

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.setAttribute('dir', ['ar', 'ur', 'fa'].includes(lang) ? 'rtl' : 'ltr');
    updateTranslations();
}

function updateTranslations() {
    const t = translations[currentLang];
    
    // Update static text
    document.getElementById('title').textContent = t.title;
    document.getElementById('next-prayer-name').textContent = t.next;
    
    // Update prayer names
    document.querySelectorAll('.prayer-name').forEach(el => {
        const prayerKey = el.getAttribute('data-en').toLowerCase();
        el.textContent = t[prayerKey];
    });
    
    // Update country select options with categories
    const countrySelect = document.getElementById('country-select');
    countrySelect.innerHTML = '';

    // Add categories and their countries
    Object.entries(countryCategories).forEach(([category, categoryData]) => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = categoryData[currentLang];
        
        categoryData.countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.code;
            option.textContent = `${country.flag} ${t.countries[country.code]}`;
            if (country.code === 'JO') option.selected = true;
            optgroup.appendChild(option);
        });
        
        countrySelect.appendChild(optgroup);
    });
    
    // Update tooltips
    document.getElementById('auto-location').title = t.autoDetect;
    document.getElementById('settings-btn').title = t.settings;
}

// Export for use in popup.js
window.translations = translations;
window.countryCategories = countryCategories;
window.setLanguage = setLanguage;
window.currentLang = currentLang;
window.additionalLanguages = additionalLanguages;
window.cityLocations = cityLocations;