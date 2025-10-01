import {Snackbar} from 'react-native-paper';

export default function CustomSnackbar({visible, onDismiss}) {

    return (
        <Snackbar
            duration={1500}
            visible={visible}
            onDismiss={onDismiss}>
            The content reload was simulated!
        </Snackbar>
    );
}
