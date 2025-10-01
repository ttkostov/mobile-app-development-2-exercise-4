import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { Button } from 'react-native-paper';
import { Accelerometer } from 'expo-sensors';

export default function App() {
    const [color, setColor] = useState('darkgray');
    const [accelerometerData, setAccelerometerData] = useState({
        xReading: 0,
        yReading: 0,
        zReading: 0,
    });
    const [accelerometerDataReceived, setAccelerometerDataReceived] =
        useState(false);

    const [flat, setFlat] = useState(false);

    const setBackgroundColor = (accelerometerReading) => {
        if (Math.abs(accelerometerReading.zReading) > 0.9) {
            setFlat(true);
            setColor('green');
        } else if (Math.abs(accelerometerReading.yReading) > 0.7) {
            setFlat(false);
            setColor('lightblue'); // portrait
        } else if (Math.abs(accelerometerReading.xReading) > 0.7) {
            setFlat(false);
            setColor('orange'); // landscape
        } else {
            setFlat(false);
            setColor('darkgray'); // some tilt
        }
    };
    const onPush = () => {
        Accelerometer.addListener((accelerometer) => {
            const data = {
                xReading: accelerometer.x,
                yReading: accelerometer.y,
                zReading: accelerometer.z,
            };
            setAccelerometerData(data);
            setAccelerometerDataReceived(true);
            setBackgroundColor(data);
        });
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color,
            alignItems: 'center',
            justifyContent: 'center',
        },
        flatText: {
            alignContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 100,
        },
    });

    return (
        <View style={styles.container}>
            {flat ? <Text style={styles.flatText}>FLAT</Text> : <></>}
            {accelerometerDataReceived ? (
                <></>
            ) : (
                <Button mode="outlined" onPress={onPush}>
                    Read data
                </Button>
            )}
        </View>
    );
}
