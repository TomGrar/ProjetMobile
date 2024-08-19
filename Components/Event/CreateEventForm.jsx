import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Pressable, Platform, View, Alert } from 'react-native';
import Montserrat from "../../assets/MontSerratFonts";
import FieldForms from "../FieldForms";
import DateTimePicker from "@react-native-community/datetimepicker";
import ButtonRectangle from "../ButtonRectangle";
import api from "../../utils/api";
import { useNavigation } from '@react-navigation/native';
import {Picker} from "@react-native-picker/picker";
import {useSelector} from "react-redux";

export default function CreateEventForm() {
    const fontStyles = Montserrat();
    const navigation = useNavigation();
    const [sports, setSports] = useState([]);
    const [showPicker, setShowPicker] = useState(false);
    const [eventDate, setEventDate] = useState(new Date());
    const userId = useSelector((state) => state.user.userId);

    const [eventState, setEventState] = useState({
        name: "",
        sportId: "",
        description: "",
        date: new Date(),
        city: "",
        postalcode: "",
        street: "",
        number: "",
        country: ""
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

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

    function handleChange(field, value) {
        setEventState(prevState => ({
            ...prevState,
            [field]: value
        }));
    }

    function onChangeDate(event, selectedDate) {
        if (selectedDate) {
            setEventDate(selectedDate);
            handleChange('date', selectedDate);
            if (Platform.OS === "android") {
                setShowPicker(false);
            }
        }
    }

    function formatDateText() {
        const date = new Date(eventState.date || Date.now());
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day} / ${month} / ${year}`;
    }

    function toggleDatePicker() {
        setShowPicker(!showPicker);
    }

    async function handleSave() {
        const validationErrors = validateEvent(eventState);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);
            try {
                const response = await api.post(`/app/event/add`, {
                    ...eventState,
                    creatorId: Number(userId)
                });
                if (response.status === 201) {
                    Alert.alert('Succès', 'L\'événement a été créé avec succès.', [{ text: 'OK', onPress: () => navigation.navigate('Home') }]);
                } else {
                    Alert.alert('Erreur', 'Une erreur est survenue lors de la création de l\'événement. Veuillez réessayer.', [{ text: 'OK' }]);
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

    function validateEvent(event) {
        const newErrors = {};
        if (!event.name) newErrors.name = "Nom de l'événement est requis.";
        if (!event.sportId) newErrors.sport = "Sport est requis.";
        if (!event.city) newErrors.city = "Ville est requise.";
        if (!event.date) newErrors.date = "Date de l'événement est requise.";
        if (!event.street) newErrors.street = "Rue est requise.";
        if (!event.number) newErrors.streetnumber = "Numéro est requis.";
        if (!event.postalcode) newErrors.postalcode = "Code postal est requis.";
        if (!event.country) newErrors.country = "Les pays est requis.";
        return newErrors;
    }

    if (!fontStyles) {
        return null;
    }

    return (
        <View>
            <FieldForms
                title={"Nom de l'événement"}
                value={eventState.name || ''}
                onChangeText={(text) => handleChange('name', text)}
                error={errors.name}
            />
            <Text style={[styles.pickerTitle, { fontFamily: fontStyles.bold }]}>Sport</Text>
            <Picker
                selectedValue={eventState.sportId}
                onValueChange={(value) => handleChange('sportId', value)}
                style={styles.picker}
            >
                <Picker.Item label="Sélectionnez un sport" value="" />
                {sports.map((sport) => (
                    <Picker.Item key={sport.id} label={sport.name} value={sport.id} />
                ))}
            </Picker>
            {errors.sport && <Text style={styles.errorText}>{errors.sport}</Text>}
            <FieldForms
                title={"Description"}
                multiline={true}
                numberOfLines={4}
                value={eventState.description || ''}
                onChangeText={(text) => handleChange('description', text)}
            />
            <Pressable onPress={toggleDatePicker} style={styles.dateFieldContainer}>
                <FieldForms
                    title={"Date de l'événement"}
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
                    value={eventDate}
                    onChange={onChangeDate}
                    minimumDate={new Date()}
                />
            )}
            <FieldForms
                title={"Ville"}
                value={eventState.city || ''}
                onChangeText={(text) => handleChange('city', text)}
                error={errors.city}
            />
            <FieldForms
                title={"Code Postal"}
                inputMode={"numeric"}
                style={styles.fieldHalfWidth}
                value={(eventState.postalcode || '').toString()}
                onChangeText={(text) => handleChange('postalcode', text)}
                error={errors.postalcode}
            />
            <FieldForms
                title={"Rue"}
                value={eventState.street || ''}
                onChangeText={(text) => handleChange('street', text)}
                error={errors.street}
            />
            <FieldForms
                title={"Numéro de Rue"}
                inputMode={"numeric"}
                style={styles.fieldHalfWidth}
                value={(eventState.number || '').toString()}
                onChangeText={(text) => handleChange('number', text)}
                error={errors.streetnumber}
            />
            <FieldForms
                title={"Pays"}
                value={eventState.country || ''}
                onChangeText={(text) => handleChange('country', text)}
                error={errors.country}
            />
            <ButtonRectangle onPress={handleSave} style={styles.button}>
                <Text style={[styles.textConfirm, { fontFamily: fontStyles.bold }]}>Créer</Text>
            </ButtonRectangle>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f7fb',
    },
    scrollViewContent: {
        padding: 20,
    },
    textProfile: {
        color: 'white',
        fontSize: 23,
    },
    backButton: {
        position: 'relative',
        alignSelf: 'flex-start',
        width: '53%',
        marginTop: '7%',
        justifyContent: 'space-between',
        paddingLeft: "2%",
    },
    pickerTitle: {
        fontSize: 16,
        color: "#46494c",
        marginBottom: 5,
    },
    picker: {
        height: 50,
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 5,
        paddingHorizontal: 10,
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
    textConfirm: {
        fontSize: 18,
        color: 'white',
    },
    dateFieldContainer: {
        marginBottom: 20,
    },
    fieldHalfWidth: {
        width: '48%',
        marginBottom: 20,
    },
});
