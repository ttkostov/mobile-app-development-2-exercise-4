import {View, StyleSheet, KeyboardAvoidingView, ActivityIndicator, ScrollView} from 'react-native';
import Header from '../components/Header.js';
import CustomFAB from '../components/CustomFAB';
import {Platform} from "react-native";
import AboutDialog from "../components/AboutDialog";
import {useState} from "react";
import CustomSnackbar from "../components/CustomSnackbar";
import CityInputPanel from "../components/CityInputPanel";
import {useTheme} from "react-native-paper";
import WeatherPanel from "../components/WeatherPanel";
import {MOCK_WEATHER_WITH_FORECAST} from "../utils/mockWeather";
import {SafeAreaView} from "react-native-safe-area-context";
import {
    convertApiCurrentWeatherToMockData,
    convertApiForecastWeatherToMockData, getForecastRequestUrl,
    getStationIdFromCity
} from "../utils/BrightSkyApiHelper";

export default function CurrentWeatherScreen({navigation, toggleTheme}) {

    const theme = useTheme();
    const styles = StyleSheet.create({
        screen: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'flex-start',
            gap: 20
        },
        weatherContainer: {
            gap: 20,
            flex: 3,
        },
        weatherDetailsContainer: {
            flex: 3
        },
        scrollViewContentContainer: {},
        scrollViewContainer: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        container: {
            flexDirection: 'column',
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'flex-start',
            padding: 20
        },
    });

    const [aboutDialogVisible, setAboutDialogVisible] = useState(false);
    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const showDialog = () => setAboutDialogVisible(true);
    const hideDialog = () => setAboutDialogVisible(false);

    const onToggleSnackbar = () => setSnackBarVisible(true);
    const onDismissSnackbar = () => setSnackBarVisible(false);

    const handleLoading = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }
    const updateWeather = () => {
        if (city === '')
            return;
        const cityIndex = MOCK_WEATHER_WITH_FORECAST.findIndex(entry => entry.city.toLowerCase() === city.toLowerCase());
        if (cityIndex >= 0) {
            setWeatherData(MOCK_WEATHER_WITH_FORECAST[cityIndex]);
        } else setWeatherData(undefined);
    }

    const updateWeatherFromAPI = async () => {
        try {
            setLoading(true);
            const response = await fetch(getForecastRequestUrl(city));
            if(response.status !== 200) {
                setWeatherData(null);
                setLoading(false);
                return;
            }
            const convertedWeatherData = convertApiForecastWeatherToMockData(await response.json());
            setWeatherData(convertedWeatherData);
            setLoading(false);
        } catch (error) {
            setWeatherData(null);
            setLoading(false);
            console.log(error);
        }
    }

    const clearCityInput = () => {
        setCity('');
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContentContainer}
                    style={styles.scrollViewContainer}>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                    <Header title='Current Weather' toggleTheme={toggleTheme} showAboutDialog={showDialog}/>
                    <View style={styles.weatherContainer}>
                        <CityInputPanel cityValue={city}
                                        onRefresh={updateWeatherFromAPI}
                                        onClearCityInput={clearCityInput}
                                        onChangeCity={setCity}
                                        onToggleSnackbar={hideDialog}/>
                        <View style={styles.weatherDetailsContainer}>
                            {
                                loading
                                    ? <ActivityIndicator size="large" color={theme.colors.primary}/>
                                    : <WeatherPanel navigation={navigation} forecastData={weatherData}/>
                            }

                        </View>

                    </View>
                    <AboutDialog onDismiss={hideDialog} visible={aboutDialogVisible}/>
                    {/*<CustomFAB onPress={onToggleSnackbar}/>*/}
                    <CustomSnackbar visible={snackBarVisible} onDismiss={onDismissSnackbar}/>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ScrollView>

    )

}

