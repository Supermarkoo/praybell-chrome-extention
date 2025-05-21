class LocationManager {
    constructor() {
        this.baseUrl = 'https://nominatim.openstreetmap.org';
    }

    async getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by your browser'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                position => resolve(position),
                error => reject(error),
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        });
    }

    async getLocationFromCoordinates(latitude, longitude) {
        try {
            const response = await fetch(
                `${this.baseUrl}/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
            );
            
            if (!response.ok) {
                throw new Error('Failed to fetch location data');
            }

            const data = await response.json();
            return {
                country: data.address.country,
                countryCode: data.address.country_code.toUpperCase(),
                city: data.address.city || data.address.town || data.address.village,
                state: data.address.state,
                latitude,
                longitude
            };
        } catch (error) {
            console.error('Error fetching location data:', error);
            throw error;
        }
    }

    async searchLocation(query) {
        try {
            const response = await fetch(
                `${this.baseUrl}/search?format=json&q=${encodeURIComponent(query)}&limit=5`
            );
            
            if (!response.ok) {
                throw new Error('Failed to search location');
            }

            const data = await response.json();
            return data.map(item => ({
                displayName: item.display_name,
                country: item.address.country,
                countryCode: item.address.country_code.toUpperCase(),
                city: item.address.city || item.address.town || item.address.village,
                state: item.address.state,
                latitude: parseFloat(item.lat),
                longitude: parseFloat(item.lon)
            }));
        } catch (error) {
            console.error('Error searching location:', error);
            throw error;
        }
    }

    async saveLocation(location) {
        try {
            await chrome.storage.sync.set({
                latitude: location.latitude,
                longitude: location.longitude,
                country: location.country,
                countryCode: location.countryCode,
                city: location.city,
                state: location.state,
                autoLocation: false
            });
        } catch (error) {
            console.error('Error saving location:', error);
            throw error;
        }
    }

    async getSavedLocation() {
        try {
            return await chrome.storage.sync.get([
                'latitude',
                'longitude',
                'country',
                'countryCode',
                'city',
                'state',
                'autoLocation'
            ]);
        } catch (error) {
            console.error('Error getting saved location:', error);
            throw error;
        }
    }
}

export default LocationManager; 