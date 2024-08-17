import React, { useState, useEffect } from "react";
import { ScrollView, Pressable, Text, StyleSheet, Platform, View, Alert, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import FieldForms from "../FieldForms";
import Montserrat from "../../assets/MontSerratFonts";
import DateTimePicker from "@react-native-community/datetimepicker";
import RadioButtonGender from "./RadioButtonsGender";
import ButtonRectangle from "../ButtonRectangle";
import api from "../../utils/api";
import { useNavigation } from '@react-navigation/native';

export default function RegisterForm() {
    const navigation = useNavigation();
    const [showPicker, setShowPicker] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [birthday, setBirthday] = useState(new Date());
    const [sports, setSports] = useState([]); // État pour les sports
    const [selectedSport, setSelectedSport] = useState(""); // État pour le sport sélectionné
    const [sportLevel, setSportLevel] = useState(""); // État pour le niveau du sport
    const [formData, setFormData] = useState({
        first_name: '',
        name: '',
        email: '',
        password: '',
        gender: '',
        birthdate: birthday,
        biography: '',
        location: {
            street: '',
            number: '',
            city: '',
            postalcode: '',
            country: 'Belgique'
        },
        sport: '',
        sportLevel: ''
    });
    const [errors, setErrors] = useState({});
    const fontStyles = Montserrat();

    useEffect(() => {
        async function fetchSports() {
            try {
                const response = await api.get("/app/sport/all");
                if (response.status === 200) {
                    setSports(response.data);
                } else {
                    Alert.alert('Erreur', 'Impossible de charger la liste des sports.');
                }
            } catch (error) {
                Alert.alert('Erreur', 'Une erreur réseau est survenue lors de la récupération des sports.');
            }
        }

        fetchSports();
    }, []);

    if (!fontStyles) {
        return null;
    }

    function handleChange(field, value) {
        setFormData(prevState => ({
            ...prevState,
            [field]: value
        }));
    }

    function handleLocationChange(field, value) {
        setFormData(prevState => ({
            ...prevState,
            location: {
                ...prevState.location,
                [field]: value
            }
        }));
    }

    function onChangeBirthday(event, selectedDate) {
        if (selectedDate) {
            setBirthday(selectedDate);
            handleChange('birthdate', selectedDate);
            if (Platform.OS === "android") {
                setShowPicker(false);
            }
        }
    }

    function formatDateText() {
        let date = new Date(formData.birthdate || Date.now());
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        return `${day} / ${month} / ${year}`;
    }

    function toggleDatePicker() {
        setShowPicker(!showPicker);
    }

    async function handleRegister() {
        const validationErrors = validateForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const dataToSend = {
                    ...formData,
                    sport: selectedSport,
                    sportLevel: parseInt(sportLevel, 10)
                };

                const response = await api.post(`/app/member/signUp`, dataToSend);

                if (response.status === 201) {
                    Alert.alert('Succès', `Inscription réussie. Bienvenue!`, [{ text: 'OK', onPress: () => navigation.navigate('Login') }]);
                } else {
                    Alert.alert('Erreur', 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.', [{ text: 'OK' }]);
                }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    Alert.alert('Erreur', 'Cet email est déjà utilisé. Veuillez en essayer un autre.', [{ text: 'OK' }]);
                } else {
                    Alert.alert('Erreur', 'Une erreur réseau est survenue. Veuillez réessayer.', [{ text: 'OK' }]);
                }
            }
        } else {
            Alert.alert('Erreur', 'Veuillez corriger les erreurs dans le formulaire.');
        }
    }

    function validateForm(formData) {
        const newErrors = {};
        // Validation des informations personnelles
        if (!formData.first_name) newErrors.first_name = "Prénom est requis.";
        if (!formData.name) newErrors.name = "Nom est requis.";
        if (!formData.email) newErrors.email = "Email est requis.";
        if (!formData.password) newErrors.password = "Mot de passe est requis.";
        if (formData.password !== confirmPassword) newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";

        // Validation des informations de sport
        if (!selectedSport) newErrors.sport = "Sport est requis.";
        const level = parseInt(sportLevel, 10);
        if (isNaN(level) || level <= 0) newErrors.sportLevel = "Veuillez entrer un nombre d'années valide supérieur à zéro.";

        // Validation des informations d'adresse
        if (!formData.location.street) newErrors.street = "Rue est requise.";
        if (!formData.location.number) newErrors.streetnumber = "Numéro est requis.";
        if (!formData.location.city) newErrors.city = "Localité est requise.";
        if (!formData.location.postalcode) newErrors.postalcode = "Code postal est requis.";

        return newErrors;
    }

    return (
            <View>
                <FieldForms
                    title={"Prénom"}
                    value={formData.first_name}
                    onChangeText={(text) => handleChange('first_name', text)}
                    error={errors.first_name}
                />
                <FieldForms
                    title={"Nom"}
                    value={formData.name}
                    onChangeText={(text) => handleChange('name', text)}
                    error={errors.name}
                />
                <FieldForms
                    title={"Email"}
                    value={formData.email}
                    onChangeText={(text) => handleChange('email', text)}
                    error={errors.email}
                />
                <FieldForms
                    title={"Mot de passe"}
                    secureTextEntry={true}
                    value={formData.password}
                    onChangeText={(text) => handleChange('password', text)}
                    error={errors.password}
                />
                <FieldForms
                    title={"Confirmer le mot de passe"}
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                    error={errors.confirmPassword}
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
                        onChange={onChangeBirthday}
                        maximumDate={new Date()}
                    />
                )}
                <RadioButtonGender
                    style={styles.fieldComponent}
                    genderProfile={formData.gender}
                    onChangeGender={(gender) => handleChange('gender', gender)}
                />
                <Text style={{ fontFamily: fontStyles.bold, fontSize: 17, color: "#46494c", marginVertical: 10 }}>Adresse</Text>
                <FieldForms
                    title={"Rue"}
                    value={formData.location.street}
                    onChangeText={(text) => handleLocationChange('street', text)}
                    error={errors.street}
                />
                <FieldForms
                    title={"N°"}
                    inputMode={"numeric"}
                    style={{ width: "50%" }}
                    value={formData.location.number}
                    onChangeText={(text) => handleLocationChange('number', text)}
                    error={errors.streetnumber}
                />
                <FieldForms
                    title={"Localité"}
                    value={formData.location.city}
                    onChangeText={(text) => handleLocationChange('city', text)}
                    error={errors.city}
                />
                <FieldForms
                    title={"Code Postal"}
                    inputMode={"numeric"}
                    style={{ width: "50%" }}
                    value={formData.location.postalcode}
                    onChangeText={(text) => handleLocationChange('postalcode', text)}
                    error={errors.postalcode}
                />
                <Text style={{ fontFamily: fontStyles.bold, fontSize: 17, color: "#46494c", marginVertical: 10 }}>Sport</Text>
                <Picker
                    selectedValue={selectedSport}
                    onValueChange={(value) => setSelectedSport(value)}
                    style={styles.picker}
                >
                    <Picker.Item label="Sélectionnez un sport" value="" />
                    {sports.map((sport) => (
                        <Picker.Item key={sport.id} label={sport.name} value={sport.id} />
                    ))}
                </Picker>
                {errors.sport && <Text style={styles.errorText}>{errors.sport}</Text>}
                <Text style={{ fontFamily: fontStyles.bold, fontSize: 17, color: "#46494c", marginVertical: 10 }}>Niveau (années)</Text>
                <TextInput
                    style={styles.textInput}
                    keyboardType="numeric"
                    value={sportLevel}
                    onChangeText={(text) => setSportLevel(text)}
                    placeholder="Entrez le niveau en années"
                />
                {errors.sportLevel && <Text style={styles.errorText}>{errors.sportLevel}</Text>}
                <FieldForms
                    title={"Biographie"}
                    multiline={true}
                    numberOfLines={4}
                    value={formData.biography}
                    onChangeText={(text) => handleChange('biography', text)}
                />
                <ButtonRectangle onPress={handleRegister} style={styles.button}>
                    <Text style={[styles.buttonText, { fontFamily: fontStyles.bold }]}>S'inscrire</Text>
                </ButtonRectangle>
            </View>
    );
}

const styles = StyleSheet.create({
    picker: {
        height: 50,
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    textInput: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        padding: 10,
        marginBottom: 10,
    },
    errorText: {
        color: "red",
        marginBottom: 10,
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

    fieldComponent: {
        alignSelf: "center",
        marginBottom: "10%",
    },
});
