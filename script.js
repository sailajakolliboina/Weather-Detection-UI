class WeatherApp {
    constructor() {
        this.cityInput = document.getElementById('cityInput');
        this.checkWeatherBtn = document.getElementById('checkWeatherBtn');
        this.weatherDisplay = document.getElementById('weatherDisplay');
        this.loadingState = document.getElementById('loadingState');
        this.errorState = document.getElementById('errorState');
        
        this.cityName = document.getElementById('cityName');
        this.weatherIcon = document.getElementById('weatherIcon');
        this.tempValue = document.getElementById('tempValue');
        this.weatherDescription = document.getElementById('weatherDescription');
        this.feelsLike = document.getElementById('feelsLike');
        this.humidity = document.getElementById('humidity');
        this.windSpeed = document.getElementById('windSpeed');
        this.pressure = document.getElementById('pressure');
        this.errorMessage = document.getElementById('errorMessage');
        
        this.initEventListeners();
    }
    
    initEventListeners() {
        this.checkWeatherBtn.addEventListener('click', () => this.checkWeather());
        this.cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkWeather();
            }
        });
        
        this.cityInput.addEventListener('input', () => {
            this.hideError();
        });
    }
    
    async checkWeather() {
        const city = this.cityInput.value.trim();
        
        if (!city) {
            this.showError('Please enter a city name');
            return;
        }
        
        this.showLoading();
        this.hideWeather();
        this.hideError();
        
        try {
            await this.simulateApiCall();
            const weatherData = this.generateSimulatedWeatherData(city);
            this.displayWeather(weatherData);
        } catch (error) {
            this.showError('Unable to fetch weather data. Please try again.');
        } finally {
            this.hideLoading();
        }
    }
    
    generateSimulatedWeatherData(city) {
        const weatherConditions = [
            { condition: 'clear sky', icon: '☀️', tempRange: [20, 35] },
            { condition: 'few clouds', icon: '🌤️', tempRange: [18, 30] },
            { condition: 'scattered clouds', icon: '⛅', tempRange: [15, 28] },
            { condition: 'broken clouds', icon: '☁️', tempRange: [12, 25] },
            { condition: 'shower rain', icon: '🌦️', tempRange: [10, 22] },
            { condition: 'rain', icon: '🌧️', tempRange: [8, 20] },
            { condition: 'thunderstorm', icon: '⛈️', tempRange: [15, 25] },
            { condition: 'snow', icon: '🌨️', tempRange: [-5, 5] },
            { condition: 'mist', icon: '🌫️', tempRange: [5, 15] }
        ];
        
        const randomCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
        const baseTemp = randomCondition.tempRange[0] + Math.random() * (randomCondition.tempRange[1] - randomCondition.tempRange[0]);
        
        return {
            city: city,
            temperature: Math.round(baseTemp),
            feelsLike: Math.round(baseTemp + (Math.random() - 0.5) * 4),
            condition: randomCondition.condition,
            icon: randomCondition.icon,
            humidity: Math.round(30 + Math.random() * 60),
            windSpeed: (Math.random() * 20).toFixed(1),
            pressure: Math.round(990 + Math.random() * 40)
        };
    }
    
    displayWeather(data) {
        this.cityName.textContent = data.city;
        this.weatherIcon.textContent = data.icon;
        this.tempValue.textContent = data.temperature;
        this.weatherDescription.textContent = data.condition;
        this.feelsLike.textContent = `${data.feelsLike}°C`;
        this.humidity.textContent = `${data.humidity}%`;
        this.windSpeed.textContent = `${data.windSpeed} km/h`;
        this.pressure.textContent = `${data.pressure} hPa`;
        
        this.showWeather();
    }
    
    simulateApiCall() {
        return new Promise((resolve) => {
            const delay = 1000 + Math.random() * 1000;
            setTimeout(resolve, delay);
        });
    }
    
    showLoading() {
        this.loadingState.classList.remove('hidden');
    }
    
    hideLoading() {
        this.loadingState.classList.add('hidden');
    }
    
    showWeather() {
        this.weatherDisplay.classList.remove('hidden');
    }
    
    hideWeather() {
        this.weatherDisplay.classList.add('hidden');
    }
    
    showError(message) {
        this.errorMessage.textContent = message;
        this.errorState.classList.remove('hidden');
    }
    
    hideError() {
        this.errorState.classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});
