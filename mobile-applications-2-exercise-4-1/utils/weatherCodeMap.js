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