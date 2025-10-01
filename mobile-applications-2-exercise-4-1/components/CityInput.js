import {View, StyleSheet} from 'react-native';
import PrimaryButton from "./PrimaryButton";
import {HelperText, TextInput, useTheme} from 'react-native-paper'

export default function CityInput({value, onChangeText, onClear, onSubmit}) {
    const theme = useTheme()
    const styles = StyleSheet.create({
        container: {
            flexWrap: 'wrap',
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20
        },
        textInput: {
            maxWidth: 200,
            flex: 1,
            backgroundColor: theme.colors.surface
        },
    })

    return (
        <View style={styles.container}>
            <View>
                <TextInput
                    mode="flat"
                    style={styles.textInput}
                    label='City'
                    placeholder='Helsinki'
                    onChangeText={onChangeText}
                    onSubmitEditing={onSubmit}
                    value={value}
                />
                <HelperText type="error" visible={value.length === 0}>
                    Please enter a valid city.
                </HelperText>
            </View>

            <PrimaryButton
                text='Clear'
                onPress={onClear}
            />
        </View>

    )
}

