import {Text, View, StyleSheet, ScrollView, FlatList, Alert, ActivityIndicator} from "react-native";
import Montserrat from "../../assets/MontSerratFonts";
import Event from "./EventButtonList";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../utils/api";

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export default function Events() {
    const fontStyles = Montserrat();
    const [eventsData, setEventsData] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentUserId = async () => {
            const userId = await AsyncStorage.getItem('userId');
            setCurrentUserId(userId);
            getAPI(userId); // Passer l'ID de l'utilisateur à la fonction getAPI
        };
        currentUserId();
    }, []);


    const getAPI = async (userId) => {
            try {
                const response = await api.get(`/app/event/all/${userId}`);
                setEventsData(response.data);
            } catch (err) {
                console.error('Erreur lors de la récupération des événements:', err);
                setError('Une erreur est survenue. Veuillez réessayer.');
            } finally {
                setLoading(false);
            }
    }

    if (loading) {
        return <ActivityIndicator size="large" color="#e8871e" />;
    }


    if (!fontStyles) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.text, {fontFamily: fontStyles.extraBold}]}>Vos prochains événements</Text>
            <FlatList
                data={eventsData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <Event
                    title={item.title}
                    sport={item.sport}
                    city={item.city}
                    date={formatDate(item.date)}
                />
            )}
                style={styles.listEvents}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Assure que le container occupe tout l'espace disponible
        alignItems: 'center',
        paddingTop: 20, // Ajoute un petit espace en haut
    },

    text: {
        fontSize: 23,
        color: '#46494c',
        marginBottom: 10, // Ajoute un espace sous le titre
    },

    listEvents: {
        width: '150%', // Ajuste la largeur de la liste
    },
});