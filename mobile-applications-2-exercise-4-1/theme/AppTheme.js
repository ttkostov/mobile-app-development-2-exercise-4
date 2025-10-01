import {MD3DarkTheme, MD3LightTheme} from 'react-native-paper';
import {Platform} from "react-native";

export const LightTheme = {
    ...MD3LightTheme,
    myOwnProperty: true,
    colors: {
        ...MD3LightTheme.colors,
        primary:
            Platform.select({
                ios: 'sienna',
                android: 'darkslategray',
                web: 'saddlebrown',
                default: 'darkblue',
            }),
        background: Platform.select({
            ios: 'navajowhite',
            android: 'darkseagreen',
            web: 'chocolate',
            default: 'darkslateblue',
        }),
    },
};

export const DarkTheme = {
    ...MD3DarkTheme,
    myOwnProperty: true,
    colors: {
        ...MD3DarkTheme.colors,
        primary:
            Platform.select({
                ios: 'peru',
                android: 'darkseagreen',
                web: 'chocolate',
                default: 'darkslateblue',
            }),
        onPrimary:
            'white',
        background: Platform.select({
            ios: 'sienna',
            android: 'darkslategray',
            web: 'saddlebrown',
            default: 'darkblue',
        }),
    },
};