import { useState} from "react";
import {KeyboardAvoidingView, StyleSheet, Text, ScrollView, Pressable, Alert, Platform, View} from "react-native";
import GrayRectangle from "../Components/GreyRectangle";
import BackButton from "../Components/BackButton";
import Montserrat from "../assets/MontSerratFonts";
import { useNavigation } from '@react-navigation/native';
import CreateEventForm from "../Components/Event/CreateEventForm";


export default function CreateEventScreen() {
    const navigation = useNavigation();
    const [sports, setSports] = useState([]);

    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <GrayRectangle>
                <Text style={[styles.textProfile, { fontFamily: fontStyles.bold }]}>Création de l'événement</Text>
            </GrayRectangle>
            <BackButton style={styles.backButton} color={'#46494c'} onPress={() => navigation.goBack()}>
            </BackButton>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <CreateEventForm/>
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
    textBack: {
        fontSize: 15,
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
