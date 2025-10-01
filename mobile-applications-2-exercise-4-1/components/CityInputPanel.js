import {View, StyleSheet} from 'react-native';
import PrimaryButton from "./PrimaryButton";
import CityInput from "./CityInput";
import {useTheme} from "react-native-paper";

export default function CityInputPanel({cityValue, onRefresh, onClearCityInput, onChangeCity}) {
    const theme = useTheme();

    const styles = StyleSheet.create({
        panelContainer: {
            alignSelf: 'stretch',
            borderRadius: 20,
            backgroundColor: theme.colors.surface,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexGrow: 0,
            paddingVertical: 30,
            gap: 30
        },

    });

    return (
        <View style={styles.panelContainer}>
            <CityInput value={cityValue} onChangeText={onChangeCity} onClear={onClearCityInput}/>
            <PrimaryButton
                text='Update Forecast'
                icon='refresh'
                onPress={onRefresh}/>
        </View>
    );
}


