import {StyleSheet, Text, View} from "react-native";
import {getWeatherEmoji} from "../utils/weatherCodeMap";
import {Card, useTheme} from "react-native-paper";

export default function WeatherDetails({forecastData}) {
    const theme = useTheme();

    const styles = StyleSheet.create({
        weatherContainer: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            borderRadius: 20,
        },
        cityText: {
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
        },

        icon: {
            fontSize: 150,
            textAlign: 'center',
        },
        detailsContainer: {
            flexDirection: 'column',
            gap: 10
        },
        detailsText: {
            fontSize: 20,
            textAlign: 'center',
            color: theme.colors.onSurface
        },
        temperatureText: {
            fontSize: 35,
            textAlign: 'center',
            fontWeight: 'bold',
            color: theme.colors.onSurface
        }
    });

    return (
        <Card style={styles.weatherContainer}>
            <Card.Title title={forecastData.city} titleStyle={styles.cityText}/>
            <Card.Content>
                <Text style={styles.icon}>{getWeatherEmoji(forecastData.current.code)}</Text>
                <View style={styles.detailsContainer}>
                    <Text style={styles.temperatureText}>{forecastData.current.temperatureC} °C</Text>
                    <Text style={styles.detailsText}>{forecastData.current.windKmh} km/h</Text>
                </View>
            </Card.Content>

        </Card>
    )
}

