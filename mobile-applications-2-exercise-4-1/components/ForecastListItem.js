import {Tooltip, useTheme} from "react-native-paper";
import {StyleSheet, Text, View} from 'react-native';
import {getWeatherDescription, getWeatherEmoji} from "../utils/weatherCodeMap";


export default function ForecastListItem({forecastDataItem}) {
    const theme = useTheme();

    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: 20,
            marginVertical: 10,
            backgroundColor: theme.colors.inverseOnSurface,
            borderRadius: 20,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
            width: "100%",
        },
        forecastContainer: {
            flexDirection: 'row',
            gap: 30,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',

        },
        weatherCondition: {
            fontSize: 45,
        },
        weatherDetailsContainer: {
            gap: 10,
        },
        temperatureContainer: {
            gap: 20,
            flexDirection: 'row',
        },
        day: {
            color: theme.colors.onSurface,
            fontWeight: "bold"
        },
        hour: {
            color: theme.colors.onSurface,
            fontStyle: 'italic'
        },
        details: {
            color: theme.colors.onSurface,
        }
    })

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.day}>{forecastDataItem.day}</Text>
                <Text style={styles.hour}>{forecastDataItem.hour}</Text>
            </View>

            <View style={styles.forecastContainer}>
                <Tooltip title={getWeatherDescription(forecastDataItem.code)}>
                    <Text style={styles.weatherCondition}>{getWeatherEmoji(forecastDataItem.code)}</Text>
                </Tooltip>
                <View style={styles.weatherDetailsContainer}>
                    <View style={styles.temperatureContainer}>
                        <Text style={styles.details}>↓{forecastDataItem.temperatureMinC} °C</Text>
                        <Text style={styles.details}>↑{forecastDataItem.temperatureMaxC} °C</Text>
                    </View>
                    <Text style={styles.details}>💨 {forecastDataItem.windKmh} km/h</Text>
                    <Text style={styles.details}>☂️ {forecastDataItem.precipitationProbability}%</Text>
                </View>
            </View>
        </View>

    )

}


