// city station ids taken from:
// https://opendata.dwd.de/climate_environment/CDC/help/stations_list_CLIMAT_data.txt

import {getWeatherCode} from "./weatherCodeMap";

const apiUrl = 'https://api.brightsky.dev';
const currentWeatherApiEndpoint = '/current_weather';
const hourlyWeatherApiEndpoint = '/weather';
const stationIdQueryParam = 'wmo_station_id=';
const dateQueryParam = 'date=';

export function getForecastRequestUrl(city) {
    const now = new Date();
    return apiUrl + hourlyWeatherApiEndpoint + '?' + stationIdQueryParam + getStationIdFromCity(city.toLowerCase()) + '&' + dateQueryParam + now.toISOString().split("T")[0];
}

export function getCurrentWeatherRequestUrl(city) {
    return apiUrl + currentWeatherApiEndpoint + '?' + stationIdQueryParam + getStationIdFromCity(city.toLowerCase());
}

export function getStationIdFromCity(cityName) {
    const cityMap = {
        berlin: '10381',
        hamburg: '10147',
        bremen: '10224',
        frankfurt: '10637',
        hannover: '10338',
        stuttgart: '10738'
    }
    return cityMap[cityName] ?? '';

}

/**
 * Takes the json current weather data from the API and converts it into an object, matching the mock data used in the app
 * @param apiJson json received from the API
 * @returns Object
 */
export function convertApiCurrentWeatherToMockData(apiJson) {
    return {
        id: apiJson['weather']['source_id'],
        city: apiJson['sources'][0]['station_name'],
        current: {
            temperatureC: apiJson['weather']['temperature'],
            windKmh: apiJson['weather']['wind_speed_60'],
            code: getWeatherCode(apiJson['weather']['icon']),
        }
    }
}

/**
 * Takes the json data from the API and converts it into an object, matching the mock data used in the app
 * @param apiJson json received from the API
 * @returns Object
 * @author function was defined with the help of AI
 */
export function convertApiForecastWeatherToMockData(apiData) {
    const weather = apiData['weather'];


    const sources = apiData['sources'];

    // 1. Get the source ID for current conditions
    const currentSource = sources.find(s => s['observation_type'] === 'current');
    const forecastSource = sources.find(s => s['observation_type'] === 'forecast');

    const city = sources[0]['station_name'];

    // 2. Find latest current observation
    const currentWeather = weather
        .filter(w => w['source_id'] === currentSource['id'])
        .sort((a, b) => new Date(b['timestamp']) - new Date(a['timestamp']))[0];

    // 3. Convert current observation
    const current = {
        temperatureC: currentWeather['temperature'] ?? null,
        windKmh: currentWeather ? Math.round(currentWeather['wind_speed'] * 3.6) : null,
        code: getWeatherCode(currentWeather['icon'])
    };

    // 4. Get forecast entries from forecast source
    const forecastData = weather.filter(w => w['source_id'] === forecastSource['id']);

    // 5. Keep only next 24 hours, at 2-hour intervals
    const now = new Date();
    const forecast = forecastData
        .filter(w => new Date(w['timestamp']) >= now)
        .filter((_, idx) => idx % 2 === 0) // 2-hour steps
        .slice(0, 12) // 12 entries = 24h in 2h steps
        .map((w, idx) => {
            const date = new Date(w['timestamp']);
            return {
                id: idx + 1,
                hour: date.toLocaleTimeString("en-FI", {hour: "2-digit", minute: "2-digit"}),
                day: date.toLocaleDateString("en-FI", {weekday: "long"}),
                temperatureMinC: w['temperature'], // API doesn’t give min/max, so use same
                temperatureMaxC: w['temperature'],
                windKmh: Math.round(w['wind_speed'] * 3.6),
                code: getWeatherCode(w['icon']),
                precipitationProbability: w['precipitation_probability'] ?? 0
            };
        });


    // 6. Final result object
    return {
        id: forecastSource.id,
        city,
        current,
        forecast
    };
}
