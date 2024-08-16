import {Text, View, StyleSheet, ScrollView, FlatList, Alert, ActivityIndicator} from "react-native";
import Montserrat from "../../assets/MontSerratFonts";
import Event from "./EventButtonList";
import React from "react";
i

export default function Events({events}) {
    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.text, {fontFamily: fontStyles.extraBold}]}>Vos prochains événements</Text>
            <FlatList
                data={events}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <Event
                    event={item}
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