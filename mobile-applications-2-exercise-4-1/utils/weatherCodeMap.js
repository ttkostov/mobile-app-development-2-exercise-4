 export function getWeatherEmoji(code) {
    const emojiMap = {
        1: '☁️',
        2: '☀️',
        3: '🌧️',
        4: '⛈️',
        5: '❄️',
        6: '🌫️',
    };

    return emojiMap[code] ?? '❓'; // fallback if unknown code
}

 export function getWeatherDescription(code) {
     const descriptionMap = {
         1: 'Overcast skies with lots of clouds',
         2: 'Clear and sunny conditions',
         3: 'Rain showers or steady rainfall',
         4: 'Thunderstorms with lightning and rain',
         5: 'Snowfall or wintry conditions',
         6: 'Foggy with reduced visibility',
     };

     return descriptionMap[code] ?? 'Weather conditions unavailable'; // fallback if unknown code
 }

 /**
  * Used to match the icons provided from the BrightSky API. More info on the possible icons in the link below.
  * @link https://brightsky.dev/docs/#/operations/getCurrentWeather
  * @param icon from the API
  */
 export function getWeatherCode(icon) {
     const conditionMap = {
         "clear-day": 2,
         "clear-night": 2,
         "partly-cloudy-day": 1,
         "partly-cloudy-night": 1,
         "cloudy": 1,
         "fog": 6,
         "wind": 1,
         "rain": 3,
         "sleet": 3,
         "snow": 5,
         "hail": 5,
         "thunderstorm": 4,
         "null": null
     };
     return conditionMap[icon] ?? 0;
 }