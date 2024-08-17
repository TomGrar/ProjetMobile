import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Montserrat from "../../assets/MontSerratFonts";
import FieldForms from "../FieldForms";
import ButtonRectangle from "../ButtonRectangle";
import api from "../../utils/api";
import {useSelector} from "react-redux";

export default function PasswordChangeForm() {
    const navigation = useNavigation();

    const fontStyles = Montserrat();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const userId = useSelector((state) => state.user.userId);

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
                    id: userId,
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
            <View>
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
                <ButtonRectangle onPress={handleSave} style={styles.button}>
                    <Text style={[styles.textConfirm, { fontFamily: fontStyles.bold }]}>Modifier</Text>
                </ButtonRectangle>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f7fb',
        alignItems: "center",
    },

    textProfile: {
        color: 'white',
        fontSize: 23,
    },

    button: {
        backgroundColor: '#E8871E',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 20,
        alignSelf: 'center',
        bottom: '3%'
    },
    textConfirm: {
        fontSize: 18,
        color: 'white',
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
