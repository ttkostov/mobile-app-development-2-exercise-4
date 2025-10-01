import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';


export default function Header({title, toggleTheme, showAboutDialog, showBackButton, navigation}) {
    return (
        <Appbar.Header
            style={styles.heatherContainer}
            statusBarHeight={0} // disables the safe-area padding, as we are already using SafeAreaView in the app
        >

            <Appbar.Content title={title}/>
            {
                showBackButton ? <Appbar.BackAction onPress={() => navigation.goBack()}/> : <></>
            }
            {
                toggleTheme ? <Appbar.Action icon='theme-light-dark' onPress={toggleTheme}/> : <></>
            }
            {
                showAboutDialog ? <Appbar.Action icon='information' onPress={showAboutDialog}/> : <></>
            }
        </Appbar.Header>

    )
}

const styles = StyleSheet.create({
    heatherContainer: {
        borderRadius: 20,
    },
    text: {
        fontSize: 30
    }
});