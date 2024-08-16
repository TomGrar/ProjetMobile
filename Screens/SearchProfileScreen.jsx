import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, KeyboardAvoidingView, ActivityIndicator} from 'react-native';
import GrayRectangle from '../Components/GreyRectangle';
import BackButton from '../Components/BackButton';
import { useNavigation } from '@react-navigation/native';
import Montserrat from '../assets/MontSerratFonts';
import FieldForms from "../Components/FieldForms";
import {Picker} from "@react-native-picker/picker";
import ProfileButton from "../Components/Profile/ProfileButtonList";
import api from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SearchProfileScreen() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSport, setSelectedSport] = useState('');
    const [profilesData, setProfilesData] = useState([]);
    const [sports, setSports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState(null);
    const fontStyles = Montserrat();

    const filteredProfiles = (profilesData || []).filter((profile) => {
        const sportFilter =
            selectedSport !== '' &&
            profile.sports && profile.sports.some((sport) => sport.name === selectedSport);

        const searchFilter =
            (profile.firstname || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (profile.lastname || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (profile.country || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (profile.postalCode || '').toLowerCase().includes(searchTerm.toLowerCase());

        return (selectedSport === '' || sportFilter) && searchFilter;
    });

    useEffect(() => {
        const currentUserId = async () => {
            const userId = await AsyncStorage.getItem('userId');
            setCurrentUserId(userId);
            try {
                const response = await api.get(`/app/member/all/${userId}`);
                setProfilesData(response.data);

                // Extraire la liste des sports pour le Picker
                const uniqueSports = new Set(response.data.flatMap(profile => profile.sports.map(sport => sport.name)));
                setSports([...uniqueSports]);

            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
            } finally {
                setLoading(false);
            }
        };
        currentUserId();
    }, []);



    if (loading) {
        return <ActivityIndicator size="large" color="#e8871e" />;
    }

    if (!fontStyles) {
        return null;
    }

    return (
        <KeyboardAvoidingView
            behavior={"height"} style={styles.container} keyboardVerticalOffset={-250}>
            <GrayRectangle>
                <Text style={[styles.textTitle, { fontFamily: fontStyles.bold }]}>
                    Chercher un partenaire
                </Text>
                <BackButton style={styles.backButton} right={true} />
            </GrayRectangle>
            <FieldForms
                style={styles.searchInput}
                placeholder="Rechercher un partenaire"
                value={searchTerm}
                onChangeText={(text) => setSearchTerm(text)}
            />
            <View style={styles.containerPicker}>
                <Picker
                    selectedValue={selectedSport}
                    onValueChange={(itemValue) => setSelectedSport(itemValue)}
                    mode={'dialog'}
                    style={styles.picker}>
                    <Picker.Item label="Sport" value="" style={{ color: 'gray', fontSize: 17 }} />
                    {sports.map((sport, index) => (
                        <Picker.Item key={index} label={sport} value={sport} />
                    ))}
                </Picker>
            </View>
            <FlatList
                data={filteredProfiles}
                renderItem={({ item }) => (
                    <ProfileButton profile={item} />
                )}
                keyExtractor={(item) => item.id.toString()}
                style={styles.listProfiles}
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
        right: '5%',
    },
    searchInput: {
        width: '90%',
        marginBottom: '0%'
    },
    listProfiles: {
        width: '90%',
        marginTop: '3%',
        maxHeight: '60%',
    },

    containerPicker:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%'
    },

    picker:{
        backgroundColor: 'white',
        marginTop: "3%",
        width: '45%'
    },
});