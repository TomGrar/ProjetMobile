import {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    KeyboardAvoidingView,
    TouchableOpacity, Alert
} from 'react-native';
import GrayRectangle from '../Components/GreyRectangle';
import BackButton from '../Components/BackButton';
import Montserrat from '../assets/MontSerratFonts';
import FieldForms from "../Components/FieldForms";
import {Picker} from "@react-native-picker/picker";
import api from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export default function SearchEventScreenInvitation({route}) {
    const {profileId} = route.params;
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
            const userId = await AsyncStorage.getItem('userId');
            const response = await api.get(`/app/event/all/${userId}`);
            setEventsData(response.data.filter(event => event.creatorid !== profileId));

            // Extraire les sports uniques
            const uniqueSports = new Set(response.data.map(event => event.sport));
            setSports([...uniqueSports]);

            // Extraire les localités uniques
            const uniqueLocalities = new Set(response.data.map(event => event.city));
            setLocalities([...uniqueLocalities]);
        } catch (error) {}
    }

    const handleInvitation = async (eventId) => {
        try {
            await api.post('/app/appointment/register', {
                memberId: profileId,
                eventId
            });
            Alert.alert('Succès', 'Invitation envoyée avec succès.');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                Alert.alert('Conflit', 'Ce membre est déjà inscrit à cet événement.');
            } else {
                Alert.alert('Erreur', 'Une erreur est survenue lors de l\'envoi de l\'invitation. Veuillez réessayer.');
            }
        }
    };

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
                    Inviter à un événement
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
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.containerButton}  onPress={() => handleInvitation(item.id)}>
                        <View style={[styles.columnButton]}>
                            <Text style={{ textAlign:'center', width: '80%', fontFamily: fontStyles.bold}}>{item.name}</Text>
                            <Text style={{ fontFamily: fontStyles.medium}}>{item.sport}</Text>
                        </View>
                        <View style={[styles.columnButton, {flex: 1}]}>
                            <Text style={{ fontFamily: fontStyles.medium}}>{item.city}</Text>
                            <Text style={{ fontFamily: fontStyles.regular}}>{formatDate(item.date)}</Text>
                        </View>
                    </TouchableOpacity>
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
    },

    containerButton: {
        backgroundColor: 'white',
        borderRadius: 5,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '2%',
        marginBottom: '2%'
    },
    columnButton: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '60%'
    },
});