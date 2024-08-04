import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import Logo from '../Components/Logo'
import Login from '../Components/Login/Login'
function LoginScreen(){
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.rectangleOrange}>
                <Logo />
            </View>
            <View style={styles.rectangleGrey} />
            <Login />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f6f7fb',
        flex: 1
    },

    rectangleOrange: {
        backgroundColor: '#e8871e',
        height: '25%',
        width: '100%',
        alignItems: 'center',
        justifyContent :'center',
    },

    rectangleGrey: {
        backgroundColor: '#46494c',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        height: '7%',
        width: '100%',
    }
});
export default LoginScreen;