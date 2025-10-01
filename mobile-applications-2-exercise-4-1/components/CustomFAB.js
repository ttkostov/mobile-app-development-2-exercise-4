import { FAB, useTheme } from 'react-native-paper';
import {StyleSheet} from "react-native";

// custom FAB to
export default function PrimaryFAB({onPress}) {
    const theme = useTheme();

    const styles = StyleSheet.create({
        fab: {
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
            backgroundColor: theme.colors.primary,
        },
    });

    return (
        <FAB
            mode='contained'
            icon='refresh'
            style={styles.fab}
            color={theme.colors.onPrimary}
            onPress={onPress}
        />
    );
}

