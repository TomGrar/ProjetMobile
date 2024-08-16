import {KeyboardAvoidingView, StyleSheet, Text, View, Alert, Platform, ScrollView} from 'react-native';
import GrayRectangle from "../Components/GreyRectangle";
import BackButton from "../Components/BackButton";
import { useNavigation } from '@react-navigation/native';
import Montserrat from "../assets/MontSerratFonts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PasswordChangeForm from "../Components/Profile/PasswordChangeForm";

export default function EditPasswordScreen({ route }) {
    const navigation = useNavigation();
    const { profileId } = route.params;

    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <GrayRectangle>
                <Text style={[styles.textProfile, { fontFamily: fontStyles.bold }]}>Édition du mot de passe</Text>
            </GrayRectangle>
            <BackButton style={styles.backButton} color={'#46494c'}>
                <Icon name={'key-outline'} color={'#46494c'} size={20} />
                <Text style={[styles.textBack, { fontFamily: fontStyles.medium }]}>Mon compte</Text>
            </BackButton>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <PasswordChangeForm profileId = {profileId}/>
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

    textConfirm: {
        fontSize: 18,
        color: 'white',
    },

    textBack: {
        fontSize: 15,
    },

    backButton: {
        position: 'relative',
        alignSelf: 'flex-start',
        width: '45%',
        marginTop: '7%',
        justifyContent: 'space-between',
        paddingLeft: "2%"
    }
});
