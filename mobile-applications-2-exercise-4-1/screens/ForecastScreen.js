import {View, StyleSheet, KeyboardAvoidingView, ActivityIndicator, ScrollView} from 'react-native';
import Header from '../components/Header.js';
import {Platform} from "react-native";
import {useTheme} from "react-native-paper";
import {SafeAreaView} from "react-native-safe-area-context";
import ForecastPanel from "../components/ForecastPanel";

export default function ForecastScreen({route, navigation}) {

    const {weatherForecastData} = route.params;
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
        scrollViewContentContainer: {
            flexGrow: 1,
        },
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

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContentContainer}
                    style={styles.scrollViewContainer}>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                    <Header navigation={navigation} title='Hourly forecast' showBackButton={true}/>
                    <View style={styles.weatherContainer}>
                        <View style={styles.weatherDetailsContainer}>
                            <ForecastPanel forecastData={weatherForecastData}/>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ScrollView>

    )

}

