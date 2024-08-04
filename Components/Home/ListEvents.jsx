import {Text, View, StyleSheet, ScrollView, FlatList} from "react-native";
import Montserrat from "../../assets/MontSerratFonts";
import Event from "./EventButtonList";

export default function Events() {
    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }

    const eventsData = [
        { id: 1, title: 'Match de football', sport: 'Football', city: 'Paris', date: '2023-11-15' },
        { id: 2, title: 'Tournoi de tennis', sport: 'Tennis', city: 'Lyon', date: '2023-11-20' },
        { id: 4, title: 'Course à pied', sport: 'Athlétisme', city: 'Marseille', date: '2023-11-25' },
        { id: 5, title: 'Course à pied', sport: 'Athlétisme', city: 'Marseille', date: '2023-11-25' },
        { id: 6, title: 'Course à pied', sport: 'Athlétisme', city: 'Marseille', date: '2023-11-25' },
        // Add more events as needed
    ];

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
                    date={item.date}
                />
            )}
                style={styles.listEvents}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        alignItems : 'center'
    },

    text: {
        fontSize: 23,
        color: '#46494c',
    },

    listEvents: {
        flexDirection: 'column',
        maxHeight: '60%',
        width: '85%',
    },
});