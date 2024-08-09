import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, TextInput, ScrollView } from "react-native";
import api from "../../../utils/api";
import Montserrat from "../../../assets/MontSerratFonts"; // Importation de la police Montserrat
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Pour l'icône de suppression
import { Picker } from '@react-native-picker/picker';

export default function SportDropDown({ profileId }) {
    const [sports, setSports] = useState([]);
    const [sportLists, setSportLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSportId, setSelectedSportId] = useState(null);
    const [newSportLevel, setNewSportLevel] = useState(""); // Champ de texte pour le niveau du sport
    const [editSportId, setEditSportId] = useState(null); // ID du sport en cours de modification
    const [editSportLevel, setEditSportLevel] = useState(""); // Nouveau niveau du sport en cours de modification
    const fontStyles = Montserrat(); // Utilisation de la police Montserrat

    useEffect(() => {
        const fetchSportsAndUserSports = async () => {
            try {
                const sportsResponse = await api.get('/app/sport/all');
                setSports(sportsResponse.data);

                const userSportsResponse = await api.get(`/app/member/sports/${profileId}`);
                setSportLists(userSportsResponse.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSportsAndUserSports();
    }, [profileId]);

    const handleDelete = async (sportUserId) => {
        if (sportLists.length <= 1) {
            Alert.alert(
                "Suppression impossible",
                "Vous devez avoir au moins un sport associé.",
                [{ text: "OK" }]
            );
            return;
        }

        Alert.alert(
            "Confirmation de suppression",
            "Êtes-vous sûr de vouloir supprimer ce sport ?",
            [
                {
                    text: "Annuler",
                    style: "cancel"
                },
                {
                    text: "Supprimer",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await api.delete(`/app/member/sports/${sportUserId}`);
                            // Recharger la liste des sports après suppression
                            const updatedUserSportsResponse = await api.get(`/app/member/sports/${profileId}`);
                            setSportLists(updatedUserSportsResponse.data);
                        } catch (error) {
                            console.error('Error deleting sport:', error);
                        }
                    }
                }
            ]
        );
    };

    const handleAddSport = async () => {
        if (selectedSportId === null) {
            Alert.alert("Sélectionnez un sport", "Veuillez sélectionner un sport à ajouter.");
            return;
        }

        // Vérifiez si le sport est déjà associé
        const isSportAlreadyAdded = sportLists.some(sport => sport.sportid === selectedSportId);
        if (isSportAlreadyAdded) {
            Alert.alert("Sport déjà associé", "Vous avez déjà associé ce sport.");
            return;
        }

        const level = parseInt(newSportLevel, 10);
        if (isNaN(level) || level <= 0) {
            Alert.alert("Niveau invalide", "Veuillez entrer un nombre d'années valide supérieur à zéro.");
            return;
        }

        try {
            await api.post('/app/member/addSport', {
                memberId: profileId,
                sportId: selectedSportId,
                level
            });
            // Recharger la liste des sports après ajout
            const updatedUserSportsResponse = await api.get(`/app/member/sports/${profileId}`);
            setSportLists(updatedUserSportsResponse.data);
            setSelectedSportId(null); // Réinitialiser la sélection
            setNewSportLevel(""); // Réinitialiser le niveau
        } catch (error) {
            console.error('Error adding sport:', error);
        }
    };

    const handleUpdateSportLevel = async () => {
        const level = parseInt(editSportLevel, 10);
        if (isNaN(level) || level <= 0) {
            Alert.alert("Niveau invalide", "Veuillez entrer un nombre d'années valide supérieur à zéro.");
            return;
        }

        try {
            await api.patch('app/member/sportsLevel', {
                sportUserId: editSportId,
                newLevel: level
            });
            // Recharger la liste des sports après modification
            const updatedUserSportsResponse = await api.get(`/app/member/sports/${profileId}`);
            setSportLists(updatedUserSportsResponse.data);
            setEditSportId(null); // Réinitialiser l'ID du sport modifié
            setEditSportLevel(""); // Réinitialiser le niveau modifié
        } catch (error) {
            console.error('Error updating sport level:', error);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#e8871e" />;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {sportLists.length === 0 ? (
                <Text style={[styles.message, { fontFamily: fontStyles.medium }]}>Aucun sport ajouté.</Text>
            ) : (
                sportLists.map((sportProfile) => (
                    <View key={sportProfile.sportuserid} style={styles.sportContainer}>
                        <Text style={[styles.sportName, { fontFamily: fontStyles.bold }]}>
                            {sportProfile.name || 'Non spécifié'}
                        </Text>
                        {editSportId === sportProfile.sportuserid ? (
                            <View>
                                <TextInput
                                    style={styles.textInput}
                                    keyboardType="numeric"
                                    value={editSportLevel}
                                    onChangeText={(text) => setEditSportLevel(text)}
                                    placeholder="Entrez le nouveau niveau en années"
                                />
                                <View style={styles.editButtonsContainer}>
                                    <TouchableOpacity
                                        style={styles.saveButton}
                                        onPress={handleUpdateSportLevel}
                                    >
                                        <Text style={[styles.buttonText, { fontFamily: fontStyles.medium }]}>Sauvegarder</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.cancelButton}
                                        onPress={() => {
                                            setEditSportId(null);
                                            setEditSportLevel("");
                                        }}
                                    >
                                        <Text style={[styles.buttonText, { fontFamily: fontStyles.medium }]}>Annuler</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            <Text style={[styles.sportLevel, { fontFamily: fontStyles.medium }]}>
                                {sportProfile.level} ans
                            </Text>
                        )}
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDelete(sportProfile.sportuserid)}
                        >
                            <Icon name="delete" size={24} color="#e8871e" />
                        </TouchableOpacity>
                        {editSportId === null && (
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => {
                                    setEditSportId(sportProfile.sportuserid);
                                    setEditSportLevel(sportProfile.level.toString());
                                }}
                            >
                                <Icon name="pencil" size={24} color="#e8871e" />
                            </TouchableOpacity>
                        )}
                    </View>
                ))
            )}

            <View style={styles.addSportContainer}>
                <Text style={[styles.label, { fontFamily: fontStyles.medium }]}>Sélectionnez un sport</Text>
                <Picker
                    selectedValue={selectedSportId}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedSportId(itemValue)}
                >
                    <Picker.Item label="Sélectionnez un sport" value={null} />
                    {sports.map((sport) => (
                        <Picker.Item key={sport.id} label={sport.name} value={sport.id} />
                    ))}
                </Picker>
                <Text style={[styles.label, { fontFamily: fontStyles.medium }]}>Niveau (années)</Text>
                <TextInput
                    style={styles.textInput}
                    keyboardType="numeric"
                    value={newSportLevel}
                    onChangeText={(text) => setNewSportLevel(text)}
                    placeholder="Entrez le niveau en années"
                />
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAddSport}
                >
                    <Text style={[styles.buttonText, { fontFamily: fontStyles.medium }]}>Ajouter le sport</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1, // Assure que le container occupe tout l'espace disponible
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    message: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
    },
    sportContainer: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        position: 'relative', // Pour positionner le bouton de suppression
    },
    sportName: {
        fontSize: 20,
        color: '#333',
        textAlign: 'center',
    },
    sportLevel: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginTop: 5,
    },
    deleteButton: {
        position: 'absolute',
        top: 15,
        right: 15,
    },
    editButton: {
        position: 'absolute',
        top: 15,
        left: 15,
    },
    addSportContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    editButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    picker: {
        height: 50,
        width: '100%',
        marginVertical: 10,
    },
    label: {
        fontSize: 18,
        color: '#333',
        marginBottom: 5,
    },
    textInput: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    addButton: {
        backgroundColor: '#e8871e',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    },
});
