import {StyleSheet, Text, View, Platform} from 'react-native';
import {Button} from 'react-native-paper';
import * as Linking from 'expo-linking';

const sendEmail = async () => {
    const supported = await Linking.canOpenURL('mailto:toni.kostov@tuni.fi');
    if (supported) {
        await Linking.openURL('mailto:toni.kostov@tuni.fi');
    } else {
        console.log('could not send an email');
    }
}

const makeCall = async () => {
    const phoneNumber = 'tel:+358294520450';
    const supported = await Linking.canOpenURL(phoneNumber);

    if (supported) {
        await Linking.openURL(phoneNumber);

    } else {
        console.log('could not call');
    }
}

const openMap = async () => {
    const latitude = '61.503779227013474';
    const longitude = '23.808729910272294';
    const label = 'Tampere University of Applied Sciences (TAMK) - Main campus';
    const location = Platform.select({
            ios: `maps://?q=${label}&ll=${latitude},${longitude}`,
            android:`geo:${latitude},${longitude}?q=${latitude},${longitude}(${label})`,
            default:`https://maps.app.goo.gl/PTevN4KVApP8hBXF8`,
        }
    );
    const supported = await Linking.canOpenURL(location);
    if (supported) {
        await Linking.openURL(location);
    }
    else {
        console.log('could not open map');
    }
}

export default function App() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Please choose an action</Text>
            <View style={styles.buttonContainer}>
                <Button mode='outlined' onPress={sendEmail}>Send me an Email</Button>
                <Button mode='outlined' onPress={makeCall}>Call TAMK</Button>
                <Button mode='outlined' onPress={openMap}>Open TAMK location</Button>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: 10
    },
    buttonContainer: {
        gap: 20
    },
    text: {
        fontSize: 25,
    }
});
