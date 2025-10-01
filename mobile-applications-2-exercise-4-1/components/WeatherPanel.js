import {View, StyleSheet, Text} from 'react-native';
import WeatherDetails from "./WeatherDetails";
import {useTheme} from "react-native-paper";
import PrimaryButton from "./PrimaryButton";

export default function WeatherPanel({navigation, forecastData}) {
    const theme = useTheme();

    const styles = StyleSheet.create({
        panelContainer: {
            flex: 1,
            borderRadius: 20,
            backgroundColor: theme.colors.surface,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            gap: 20,
            padding: 10
        },
        noCityFoundText: {
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
        },

    });

    return (

        <View style={styles.panelContainer}>
            {
                !forecastData
                    ? <Text style={styles.noCityFoundText}>No forecast data for this city found!</Text>
                    : <>
                        <WeatherDetails forecastData={forecastData}/>
                        <PrimaryButton text='Open Forecast' onPress={() => {
                            navigation.navigate('Forecast', {weatherForecastData: forecastData});
                        }}/>
                    </>

            }
        </View>
    );
}


