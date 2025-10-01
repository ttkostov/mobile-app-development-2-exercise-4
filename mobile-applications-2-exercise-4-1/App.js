import {StatusBar, Text, View} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {LightTheme, DarkTheme} from "./theme/AppTheme";
import {useState} from "react";
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator} from '@react-navigation/drawer';
import ForecastScreen from "./screens/ForecastScreen";
import CurrentWeatherScreen from "./screens/CurrentWeatherScreen";
import {MOCK_WEATHER_WITH_FORECAST} from "./utils/mockWeather";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
    const [isThemeDark, setIsThemeDark] = useState(false);

    const toggleTheme = () => {
        isThemeDark ? setIsThemeDark(false) : setIsThemeDark(true);
    }

    const theme = isThemeDark ? DarkTheme : LightTheme;

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                {
                    <Tab.Navigator id='main-tab-navigator'
                                   screenOptions={{
                                       headerShown: false,
                                       tabBarIconStyle: {marginBottom: 7},
                                       tabBarLabelStyle: {fontSize: 15, color: theme.colors.primary},
                                       tabBarStyle: {backgroundColor: theme.colors.surface},
                                       tabBarActiveTintColor: theme.colors.background,
                                   }}
                    >
                        <Tab.Screen name={"Home"}
                                    tabBarIcon
                                    children={(props) => (
                                        <CurrentWeatherScreen {...props} toggleTheme={toggleTheme}/>
                                    )}
                                    options={{
                                        tabBarIcon: ({color, size}) => (
                                            <Text style={{color: color, fontSize: size}}>🌥️</Text>
                                        )
                                    }}/>
                        <Tab.Screen
                            name="Forecast"
                            component={ForecastScreen}
                            initialParams={{weatherForecastData: MOCK_WEATHER_WITH_FORECAST[0]}}
                            options={{
                                tabBarIcon: ({color, size}) => (
                                    <Text style={{color: color, fontSize: size}}>📅️</Text>
                                )
                            }}
                        />
                    </Tab.Navigator>
                }

                {/*
                        <Stack.Navigator id='main-stack-navigator'>
                            <Stack.Screen
                                name="Home"
                                children={(props) => (
                                    <CurrentWeatherScreen {...props} toggleTheme={toggleTheme}/>
                                )}
                                options={{headerShown: false}}
                            />
                            <Stack.Screen
                                name="Forecast"
                                component={ForecastScreen}
                                initialParams={{weatherForecastData: MOCK_WEATHER_WITH_FORECAST[0]}}
                                options={{headerShown: false}}
                            />
                        </Stack.Navigator>
                    */}
            </NavigationContainer>
            <StatusBar barStyle='light-content' backgroundColor={theme.colors.background}/>
        </PaperProvider>
    );
}
