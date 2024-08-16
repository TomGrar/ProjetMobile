import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, Platform } from 'react-native';
import GrayRectangle from "../Components/GreyRectangle";
import BackButton from "../Components/BackButton";
import { useNavigation } from '@react-navigation/native';
import Montserrat from "../assets/MontSerratFonts";
import RegisterForm from "../Components/Profile/RegisterForm";

export default function RegisterScreen() {
    const fontStyles = Montserrat();
    const navigation = useNavigation();

    if (!fontStyles) {
        return null;
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <GrayRectangle>
                <Text style={[styles.textProfile, {fontFamily: fontStyles.bold}]}>Inscription</Text>
            </GrayRectangle>
            <BackButton style={styles.backButton} color={'#46494c'} onPress={() => navigation.goBack()} />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <RegisterForm />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f7fb',
    },
    scrollViewContent: {
        padding: 20,
    },
    textProfile: {
        color: 'white',
        fontSize: 23,
    },
    backButton: {
        position: 'relative',
        alignSelf: 'flex-start',
        width: '53%',
        marginTop: '7%',
        justifyContent: 'space-between',
        paddingLeft: "2%",
    },
});
