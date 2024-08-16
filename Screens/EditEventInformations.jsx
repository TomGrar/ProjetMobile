import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity, ScrollView
} from 'react-native';
import GrayRectangle from "../Components/GreyRectangle";
import BackButton from "../Components/BackButton";
import Montserrat from "../assets/MontSerratFonts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import EventEditForm from "../Components/Event/EventEditForm";
import { useNavigation } from '@react-navigation/native';
import api from "../utils/api";

export default function EditEventInformationScreen({ route }) {
    const { event } = route.params;
    const navigation = useNavigation();
    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }

    const handleDelete = () => {
        Alert.alert(
            "Supprimer l'événement",
            "Êtes-vous sûr de vouloir supprimer cet événement ?",
            [
                {
                    text: "Annuler",
                    style: "cancel"
                },
                {
                    text: "Supprimer",
                    onPress: async () => {
                        try {
                           const response = await api.delete(`/app/event/delete/${event.id}`);
                           if(response.status === 200) {
                               Alert.alert('Succès', 'L\'événement a été supprimer avec succès.', [{
                                   text: 'OK',
                                   onPress: () => navigation.navigate('Home')
                               }]);
                           }
                        } catch (error) {
                            Alert.alert("Erreur", "Une erreur est survenue lors de la suppression de l'événement.");
                        }
                    }
                }
            ]
        );
    };

    return (
        <KeyboardAvoidingView
            behavior={"height"} style={styles.container} keyboardVerticalOffset={-250}>
            <GrayRectangle>
                <Text style={[styles.textProfile, { fontFamily: fontStyles.bold }]}>Édition de l'événement</Text>
            </GrayRectangle>
            <BackButton style={styles.backButton} color={'#46494c'}>
                <Icon name={'pencil'} color={'#46494c'} size={20} />
                <Text style={[styles.textBack, { fontFamily: fontStyles.medium }]}>L'événement</Text>
            </BackButton>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <EventEditForm event={event} />
            </ScrollView>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDelete}
            >
                <Icon name={'delete'} color={'#fff'} size={24} />
                <Text style={[styles.deleteText, {fontFamily: fontStyles.bold}]}>Supprimer l'événement</Text>
            </TouchableOpacity>
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
        paddingLeft: "2%"
    },
    deleteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ff4d4d',
        borderRadius: 5,
        marginTop: 20,
        bottom: "3%",
        padding: 10,
        width: '80%',
        alignSelf: 'center'
    },
    deleteText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 10,
    },
});
