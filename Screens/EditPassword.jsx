import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, Alert } from 'react-native';
import GrayRectangle from "../Components/GreyRectangle";
import ImageProfile from "../Components/Profile/ImageProfile";
import BackButton from "../Components/BackButton";
import { useNavigation } from '@react-navigation/native';
import Montserrat from "../assets/MontSerratFonts";
import FieldForms from "../Components/FieldForms";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ButtonRectangle from "../Components/ButtonRectangle";
import api from "../utils/api";

export default function EditPassword({ route }) {
    const navigation = useNavigation();
    const { profileId } = route.params;

    const fontStyles = Montserrat();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    // Fonction pour gérer les modifications des champs de texte
    function handlePasswordChange(field, value) {
        if (field === 'password') {
            setPassword(value);
        } else if (field === 'confirmPassword') {
            setConfirmPassword(value);
        }
    }

    // Fonction pour valider les données du formulaire
    function validatePasswordForm() {
        const newErrors = {};

        if (!password) {
            newErrors.password = "Le mot de passe est requis.";
        } else if (password.length < 6) {
            newErrors.password = "Le mot de passe doit contenir au moins 6 caractères.";
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "La confirmation du mot de passe est requise.";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
        }

        setErrors(newErrors);
        return newErrors;
    }

    // Fonction pour gérer la soumission du formulaire
    async function handleSave() {
        const validationErrors = validatePasswordForm();

        if (Object.keys(validationErrors).length === 0) {
            // Préparez ici votre appel API pour mettre à jour le mot de passe
            try {
                const response = await api.patch(`/app/member/updatePassword`, {
                    id: profileId,
                    password: password
                });

                if (response.status === 200) {
                    Alert.alert('Succès', 'Votre mot de passe a été mis à jour avec succès.', [{ text: 'OK', onPress: () => navigation.navigate('Home') }]);
                } else {
                    Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour du mot de passe. Veuillez réessayer.', [{ text: 'OK' }]);
                }
            } catch (error) {
                console.error('Erreur lors de la mise à jour du mot de passe :', error);
                Alert.alert('Erreur', 'Une erreur réseau est survenue. Veuillez réessayer.', [{ text: 'OK' }]);
            }
        } else {
            Alert.alert('Erreur', 'Veuillez corriger les erreurs dans le formulaire.');
        }
    }

    if (!fontStyles) {
        return null;
    }

    return (
        <KeyboardAvoidingView behavior={"height"} style={styles.container} keyboardVerticalOffset={-250}>
            <GrayRectangle>
                <Text style={[styles.textProfile, { fontFamily: fontStyles.bold }]}>Édition du mot de passe</Text>
            </GrayRectangle>
            <ImageProfile />
            <BackButton style={styles.backButton} color={'#46494c'}>
                <Icon name={'key-outline'} color={'#46494c'} size={20} />
                <Text style={[styles.textBack, { fontFamily: fontStyles.medium }]}>Mon compte</Text>
            </BackButton>
            <View style={styles.fields}>
                <FieldForms
                    title={'Mot de passe'}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => handlePasswordChange('password', text)}
                    error={errors.password}
                />
                <FieldForms
                    title={'Confirmation du mot de passe'}
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={(text) => handlePasswordChange('confirmPassword', text)}
                    error={errors.confirmPassword}
                />
            </View>
            <ButtonRectangle style={styles.buttonConfirm} onPress={handleSave}>
                <Text style={[styles.textConfirm, { fontFamily: fontStyles.bold }]}>Modifier</Text>
            </ButtonRectangle>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f7fb',
        alignItems: "center",
    },

    fields: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '80%',
        height: '40%'
    },

    textProfile: {
        color: 'white',
        fontSize: 23,
    },

    textConfirm: {
        fontSize: 18,
        color: 'white',
    },

    buttonConfirm: {
        backgroundColor: '#E8871E',
        alignSelf: 'center',
        height: '6%',
        marginTop: "15%",
    },

    textBack: {
        fontSize: 15,
    },

    backButton: {
        position: 'relative',
        alignSelf: 'flex-start',
        width: '45%',
        marginTop: '7%',
        justifyContent: 'space-between',
        paddingLeft: "2%"
    }
});
