import React, { useState } from 'react';
import {StyleSheet, Text, View, TextInput, FlatList, KeyboardAvoidingView} from 'react-native';
import GrayRectangle from '../Components/GreyRectangle';
import BackButton from '../Components/BackButton';
import { useNavigation } from '@react-navigation/native';
import Montserrat from '../assets/MontSerratFonts';
import Event from '../Components/Home/EventButtonList';
import FieldForms from "../Components/FieldForms";
import {Picker} from "@react-native-picker/picker";

export default function SearchEventScreen() {
    const navigation = useNavigation();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSport, setSelectedSport] = useState('');
    const [selectedLocality, setSelectedLocality] = useState('');

    const sports =['Football', 'Basketball', 'Danse', 'Tennis', 'Athlétisme', 'Formule 1', 'Boxe', 'Échecs', 'Surf','Hockey sur glace', 'Golf'];

    const localities=['Paris', 'Lyon', 'Monaco', 'Barcelone', 'Geneve']

    const eventsData = [
        { id: 1, title: 'Match de football', sport: 'Football', city: 'Paris', date: '2023-11-15' },
        { id: 2, title: 'Tournoi de tennis', sport: 'Tennis', city: 'Lyon', date: '2023-11-20' },
        { id: 3, title: 'Course de formule 1', sport: 'Formule 1', city: 'Monaco', date: '2023-11-22' },
        { id: 4, title: 'Match de basket-ball', sport: 'Basketball', city: 'Barcelone', date: '2023-11-25' },
        { id: 5, title: 'Compétition de golf', sport: 'Golf', city: 'Geneve', date: '2023-11-28' },
        { id: 6, title: 'Marathon', sport: 'Athlétisme', city: 'Berlin', date: '2023-12-02' },
        { id: 7, title: 'Match de hockey sur glace', sport: 'Hockey sur glace', city: 'Stockholm', date: '2023-12-05' },
        { id: 8, title: 'Rencontre de boxe', sport: 'Boxe', city: 'New York', date: '2023-12-08' },
        { id: 9, title: 'Compétition de surf', sport: 'Surf', city: 'Sydney', date: '2023-12-12' },
        { id: 10, title: 'Tournoi d\'échecs', sport: 'Échecs', city: 'Moscou', date: '2023-12-15' },
    ];

    const filteredEvents = eventsData.filter(
        (event) =>
            (selectedSport === '' || event.sport === selectedSport) &&
            (selectedLocality === '' || event.city === selectedLocality) &&
            (event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.city.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }

    return (
        <KeyboardAvoidingView
            behavior={"height"} style={styles.container} keyboardVerticalOffset={-250}>
            <GrayRectangle>
                <Text style={[styles.textTitle, { fontFamily: fontStyles.bold }]}>
                    Chercher un événement
                </Text>
                <BackButton style={styles.backButton}/>
            </GrayRectangle>
            <FieldForms
                style={styles.searchInput}
                placeholder="Rechercher un événement"
                value={searchTerm}
                onChangeText={(text) => setSearchTerm(text)}
            />
            <View style={styles.containerPicker}>
                <Picker
                    selectedValue={selectedSport}
                    onValueChange={(itemValue)=> {setSelectedSport(itemValue)}}
                    mode={'dialog'}
                    style={styles.picker}>
                    <Picker.Item label="Sport" value={''} style={{ color: 'gray', fontSize: 17}}/>
                    {sports.map((sport, index) =>(
                        <Picker.Item key={index} label={sport} value={sport}/>
                ))}
                </Picker>
                <Picker
                    selectedValue={selectedLocality}
                    onValueChange={(itemValue)=> {setSelectedLocality(itemValue)}}
                    mode={'dialog'}
                    style={styles.picker}>
                    <Picker.Item label="Localité" value={''} style={{ color: 'gray', fontSize: 17}}/>
                    {localities.map((locality, index) =>(
                        <Picker.Item key={index} label={locality} value={locality}/>
                    ))}
                </Picker>
        </View>
            <FlatList
                data={filteredEvents}
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
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f7fb',
        alignItems: 'center'
    },
    textTitle: {
        color: 'white',
        fontSize: 21,
    },
    backButton: {
        left: '5%',
    },
    searchInput: {
        width: '90%',
        marginBottom: '0%'
    },
    listEvents: {
        width: '85%',
        marginTop: '3%',
        maxHeight: '60%',
    },
    picker:{
        backgroundColor: 'white',
        marginTop: "3%",
        width: '45%',
    },
    containerPicker:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%'
    }
});