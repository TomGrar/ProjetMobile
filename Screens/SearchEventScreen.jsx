import {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, KeyboardAvoidingView} from 'react-native';
import GrayRectangle from '../Components/GreyRectangle';
import BackButton from '../Components/BackButton';
import { useNavigation } from '@react-navigation/native';
import Montserrat from '../assets/MontSerratFonts';
import Event from '../Components/Home/EventButtonList';
import FieldForms from "../Components/FieldForms";
import {Picker} from "@react-native-picker/picker";
import api from "../utils/api";

export default function SearchEventScreen() {
    const navigation = useNavigation();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSport, setSelectedSport] = useState('');
    const [selectedLocality, setSelectedLocality] = useState('');
    const [eventsData, setEventsData] = useState([]);
    const [sports, setSports] = useState([]);
    const [localities, setLocalities] = useState([]);

    useEffect(() => {
        getAPI();
    }, []);

    const getAPI = async () => {
        try {
            const response = await api.get(`/app/event/all`);
            setEventsData(response.data);

            // Extraire les sports uniques
            const uniqueSports = new Set(response.data.map(event => event.sport));
            setSports([...uniqueSports]);

            // Extraire les localités uniques
            const uniqueLocalities = new Set(response.data.map(event => event.city));
            setLocalities([...uniqueLocalities]);
        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
        }
    }

    const filteredEvents = eventsData.filter(
        (event) =>
            (selectedSport === '' || event.sport === selectedSport) &&
            (selectedLocality === '' || event.city === selectedLocality) &&
            (event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                        event={item}
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