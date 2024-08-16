import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, TextInput, ScrollView } from "react-native";
import api from "../../utils/api";
import Montserrat from "../../assets/MontSerratFonts";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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

                const userSportsResponse = await api.get(`/app/sport/sports/${profileId}`);
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
                            await api.delete(`/app/sport/${sportUserId}`);
                            // Recharger la liste des sports après suppression
                            const updatedUserSportsResponse = await api.get(`/app/sport/sports/${profileId}`);
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
            await api.post('/app/sport/addForUser', {
                memberId: profileId,
                sportId: selectedSportId,
                level
            });
            // Recharger la liste des sports après ajout
            const updatedUserSportsResponse = await api.get(`/app/sport/sports/${profileId}`);
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
            await api.patch('app/sport/changeLevel', {
                sportUserId: editSportId,
                newLevel: level
            });
            // Recharger la liste des sports après modification
            const updatedUserSportsResponse = await api.get(`/app/sport/sports/${profileId}`);
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
                            <View style={styles.editSection}>
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
                        <View style={styles.actionsContainer}>
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
        flexGrow: 1,
        padding: 15,
        backgroundColor: '#f6f7fb',
    },
    message: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
    sportContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
        width: '90%', // Réduit la largeur
        alignSelf: 'center', // Centre le conteneur
        height: 'auto', // Ajuster la hauteur au contenu
        minHeight: 120, // Hauteur minimale pour éviter un conteneur trop petit
    },
    sportName: {
        fontSize: 22,
        color: '#333',
    },
    sportLevel: {
        fontSize: 18,
        color: '#555',
        marginVertical: 10,
    },
    editSection: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 10, // Ajouter un espace en bas pour les boutons
    },
    textInput: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        padding: 10,
        marginBottom: 10,
    },
    editButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    saveButton: {
        backgroundColor: '#e8871e',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    cancelButton: {
        backgroundColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    deleteButton: {
        marginRight: 10, // Espacement entre les boutons
    },
    editButton: {
        marginLeft: 10, // Espacement entre les boutons
    },
    addSportContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginTop: 20,
        width: '90%', // Réduit la largeur
        alignSelf: 'center', // Centre le conteneur
    },
    label: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
    },
    picker: {
        width: '100%',
        marginBottom: 15,
    },
    addButton: {
        backgroundColor: '#e8871e',
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: 'center',
    },
});
