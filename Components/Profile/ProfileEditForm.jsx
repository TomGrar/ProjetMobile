import React, { useEffect, useState } from "react";
import {ScrollView, Pressable, Text, StyleSheet, Platform, View, Alert, KeyboardAvoidingView} from "react-native";
import FieldForms from "../FieldForms";
import Montserrat from "../../assets/MontSerratFonts";
import DateTimePicker from "@react-native-community/datetimepicker";
import RadioButtonGender from "./RadioButtonsGender";
import { useNavigation } from '@react-navigation/native';
import api from "../../utils/api";
import ButtonRectangle from "../ButtonRectangle";

export default function ProfileEditForm({ profile }) {
    const navigation = useNavigation();
    const [showPicker, setShowPicker] = useState(false);
    const [birthday, setBirthday] = useState(new Date(profile.birthday || Date.now()));

    const [profileState, setProfileState] = useState({
        ...profile,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setProfileState({
            ...profile,
        });
    }, [profile]);

    function handleChange(field, value) {
        setProfileState(prevState => {
            const updatedState = { ...prevState, [field]: value };
            validateProfile(updatedState);
            return updatedState;
        });
    }

    function OnChangeBirthday(event, selectedDate) {
        if (selectedDate) {
            setBirthday(selectedDate);
            setProfileState(prevState => {
                const updatedState = { ...prevState, birthday: selectedDate };
                validateProfile(updatedState);
                return updatedState;
            });
            if (Platform.OS === "android") {
                toggleDatePicker();
            }
        }
    }

    function formatDateText() {
        let date = new Date(profileState.birthday || Date.now());
        let day = date.getDate();
        let month = date.getMonth() + 1; // Months are zero-based
        let year = date.getFullYear();
        return `${day} / ${month} / ${year}`;
    }

    function toggleDatePicker() {
        setShowPicker(!showPicker);
    }

    async function handleSave() {
        const validationErrors = validateProfile(profileState);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);
            try {
                const response = await api.patch(`/app/member/updateProfile`, {
                    ...profileState,
                });
                if (response.status === 200) {
                    Alert.alert('Succès', 'Votre profil a été mis à jour avec succès.', [{ text: 'OK' , onPress: () => navigation.navigate('MyProfile')}]);
                } else {
                    Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour du profil. Veuillez réessayer.', [{ text: 'OK' }]);
                }
            } catch (error) {
                Alert.alert('Erreur', 'Une erreur réseau est survenue. Veuillez réessayer.', [{ text: 'OK' }]);
            } finally {
                setLoading(false);
            }
        } else {
            Alert.alert('Erreur', 'Veuillez corriger les erreurs dans le formulaire.');
        }
    }

    function validateProfile(profile) {
        const newErrors = {};
        if (!profile.firstname) newErrors.firstname = "Prénom est requis.";
        if (!profile.lastname) newErrors.lastname = "Nom est requis.";
        if (!profile.street) newErrors.street = "Rue est requise.";
        if (!profile.streetnumber || isNaN(profile.streetnumber)) newErrors.streetnumber = "Numéro de rue est requis et doit être un nombre.";
        if (!profile.postalcode || isNaN(profile.postalcode)) newErrors.postalcode = "Code postal est requis et doit être un nombre.";

        // Validation des informations d'adresse
        if (!profile.street) newErrors.street = "Rue est requise.";
        if (!profile.streetnumber) newErrors.streetnumber = "Numéro est requis.";
        if (!profile.city) newErrors.city = "Localité est requise.";
        if (!profile.postalcode) newErrors.postalcode = "Code postal est requis.";
        return newErrors;
    }

    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <FieldForms
                title={"Prénom"}
                value={profileState.firstname || ''}
                onChangeText={(text) => handleChange('firstname', text)}
                error={errors.firstname}
            />
            <FieldForms
                title={"Nom"}
                value={profileState.lastname || ''}
                onChangeText={(text) => handleChange('lastname', text)}
                error={errors.lastname}
            />
            <FieldForms
                title={"Description"}
                multiline={true}
                numberOfLines={4}
                value={profileState.description || ''}
                onChangeText={(text) => handleChange('description', text)}
            />
            <Pressable onPress={toggleDatePicker} style={{ width: "100%" }}>
                <FieldForms
                    title={"Date de naissance"}
                    editable={false}
                    placeholder={formatDateText()}
                    textColor={"#46494c"}
                />
            </Pressable>
            {showPicker && (
                <DateTimePicker
                    mode="date"
                    display={"spinner"}
                    textColor="#46494c"
                    value={birthday}
                    onChange={OnChangeBirthday}
                    maximumDate={new Date()}
                />
            )}
            <RadioButtonGender
                style={styles.fieldComponent}
                genderProfile={profileState.gender}
                onChangeGender={(gender) => handleChange('gender', gender)}
            />
            <Text style={{ fontFamily: fontStyles.bold, fontSize: 17, color: "#46494c", marginBottom: "5%" }}>Domicile</Text>
            <FieldForms
                title={"Pays"}
                placeholder={"Belgique"}
                textColor={"gray"}
                editable={false}
                value={profileState.country || ''}
            />
            <FieldForms
                title={"Rue"}
                value={profileState.street || ''}
                onChangeText={(text) => handleChange('street', text)}
                error={errors.street}
            />
            <FieldForms
                title={"N°"}
                inputMode={"numeric"}
                style={{ width: "50%" }}
                value={(profileState.streetnumber || '').toString()}
                onChangeText={(text) => handleChange('streetnumber', text)}
                error={errors.streetnumber}
            />
            <FieldForms
                title={"Localité"}
                value={profileState.city || ''}
                onChangeText={(text) => handleChange('city', text)}
            />
            <FieldForms
                title={"Code Postal"}
                inputMode={"numeric"}
                style={{ width: "50%" }}
                value={(profileState.postalcode || '').toString()}
                onChangeText={(text) => handleChange('postalcode', text)}
                error={errors.postalcode}
            />
            <ButtonRectangle onPress={handleSave} style={styles.button}>
                <Text style={[styles.buttonText, { fontFamily: fontStyles.bold }]}>Sauvegarder</Text>
            </ButtonRectangle>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    fieldComponent: {
        alignSelf: "center",
        marginBottom: "10%",
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
    buttonText: {
        fontSize: 18,
        color: 'white',
    },
});
