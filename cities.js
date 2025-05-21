const citiesData = {
    // Middle East Cities
    JO: {
        cities: [
            { name: { ar: 'عمان', en: 'Amman' }, lat: 31.9454, lng: 35.9284 },
            { name: { ar: 'إربد', en: 'Irbid' }, lat: 32.5556, lng: 35.8500 },
            { name: { ar: 'الزرقاء', en: 'Zarqa' }, lat: 32.0833, lng: 36.1000 },
            { name: { ar: 'العقبة', en: 'Aqaba' }, lat: 29.5267, lng: 35.0078 },
            { name: { ar: 'السلط', en: 'Salt' }, lat: 32.0392, lng: 35.7272 },
            { name: { ar: 'المفرق', en: 'Mafraq' }, lat: 32.3429, lng: 36.2020 },
            { name: { ar: 'جرش', en: 'Jerash' }, lat: 32.2808, lng: 35.8994 },
            { name: { ar: 'مادبا', en: 'Madaba' }, lat: 31.7160, lng: 35.7957 },
            { name: { ar: 'الكرك', en: 'Karak' }, lat: 31.1853, lng: 35.7047 },
            { name: { ar: 'الطفيلة', en: 'Tafilah' }, lat: 30.8375, lng: 35.6044 }
        ]
    },
    SA: {
        cities: [
            { name: { ar: 'الرياض', en: 'Riyadh' }, lat: 24.7136, lng: 46.6753 },
            { name: { ar: 'جدة', en: 'Jeddah' }, lat: 21.5433, lng: 39.1728 },
            { name: { ar: 'مكة المكرمة', en: 'Mecca' }, lat: 21.4225, lng: 39.8262 },
            { name: { ar: 'المدينة المنورة', en: 'Medina' }, lat: 24.4672, lng: 39.6150 },
            { name: { ar: 'الدمام', en: 'Dammam' }, lat: 26.4333, lng: 50.1000 },
            { name: { ar: 'تبوك', en: 'Tabuk' }, lat: 28.3835, lng: 36.5662 }
        ]
    },
    // Add more Middle East countries...

    // North Africa Cities
    EG: {
        cities: [
            { name: { ar: 'القاهرة', en: 'Cairo' }, lat: 30.0444, lng: 31.2357 },
            { name: { ar: 'الإسكندرية', en: 'Alexandria' }, lat: 31.2001, lng: 29.9187 },
            { name: { ar: 'الجيزة', en: 'Giza' }, lat: 30.0131, lng: 31.2089 },
            { name: { ar: 'شرم الشيخ', en: 'Sharm El Sheikh' }, lat: 27.9158, lng: 34.3300 },
            { name: { ar: 'الأقصر', en: 'Luxor' }, lat: 25.6872, lng: 32.6396 },
            { name: { ar: 'أسوان', en: 'Aswan' }, lat: 24.0889, lng: 32.8998 }
        ]
    },
};

// Helper function to get city data
function getCityData(countryCode, cityName, lang = 'ar') {
    const country = citiesData[countryCode];
    if (!country) return null;

    return country.cities.find(city => 
        city.name[lang].toLowerCase() === cityName.toLowerCase() ||
        Object.values(city.name).some(name => name.toLowerCase() === cityName.toLowerCase())
    );
}

// Helper function to get all cities for a country
function getCountryCities(countryCode, lang = 'ar') {
    const country = citiesData[countryCode];
    if (!country) return [];

    return country.cities.map(city => ({
        name: city.name[lang],
        lat: city.lat,
        lng: city.lng
    }));
}

// Export for use in other files
window.citiesData = citiesData;
window.getCityData = getCityData;
window.getCountryCities = getCountryCities; 