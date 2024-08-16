import React, { useState } from "react";
import { ScrollView, Pressable, Text, StyleSheet, Platform, View, Alert } from "react-native";
import FieldForms from "../FieldForms";
import Montserrat from "../../assets/MontSerratFonts";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from '@react-navigation/native';
import api from "../../utils/api";
import ButtonRectangle from "../ButtonRectangle";

export default function EventEditForm({ event }) {
    const navigation = useNavigation();
    const [showPicker, setShowPicker] = useState(false);
    const [eventDate, setEventDate] = useState(new Date(event.date || Date.now()));

    const [eventState, setEventState] = useState({
        ...event,
        date: new Date(event.date) || new Date()
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    function handleChange(field, value) {
        setEventState(prevState => {
            const updatedState = { ...prevState, [field]: value };
            validateEvent(updatedState);
            return updatedState;
        });
    }

    function onChangeDate(event, selectedDate) {
        if (selectedDate) {
            setEventDate(selectedDate);
            setEventState(prevState => {
                const updatedState = { ...prevState, date: selectedDate };
                validateEvent(updatedState);
                return updatedState;
            });
            if (Platform.OS === "android") {
                toggleDatePicker();
            }
        }
    }

    function formatDateText() {
        let date = new Date(eventState.date || Date.now());
        let day = date.getDate();
        let month = date.getMonth() + 1; // Months are zero-based
        let year = date.getFullYear();
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
                const response = await api.patch(`/app/event/update`, {
                    ...eventState,
                    date: eventState.date.toISOString()
                });
                if (response.status === 200) {
                    Alert.alert('Succès', 'L\'événement a été mis à jour avec succès.', [{ text: 'OK', onPress: () => navigation.navigate('Home')}]);
                } else {
                    Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour de l\'événement. Veuillez réessayer.', [{ text: 'OK' }]);
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
        if (!event.city) newErrors.city = "Ville est requise.";
        if (!event.date) newErrors.date = "Date de l'événement est requise.";
        if (!event.description) newErrors.description = "Description est requise.";
        return newErrors;
    }

    const fontStyles = Montserrat();

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
            <FieldForms
                title={"Sport"}
                value={eventState.sport || ''}
                editable={false} // Le champ sport est en lecture seule
            />
            <FieldForms
                title={"Description"}
                multiline={true}
                numberOfLines={4}
                value={eventState.description || ''}
                onChangeText={(text) => handleChange('description', text)}
                error={errors.description}
            />
            <Pressable onPress={toggleDatePicker} style={styles.datePickerWrapper}>
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
                    maximumDate={new Date()}
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
                style={styles.inputHalfWidth}
                value={(eventState.postalcode || '').toString()}
                onChangeText={(text) => handleChange('postalcode', text)}
            />
            <FieldForms
                title={"Rue"}
                value={eventState.street || ''}
                onChangeText={(text) => handleChange('street', text)}
            />
            <FieldForms
                title={"Numéro de Rue"}
                inputMode={"numeric"}
                style={styles.inputHalfWidth}
                value={(eventState.number || '').toString()}
                onChangeText={(text) => handleChange('number', text)}
            />
            <FieldForms
                title={"Pays"}
                value={eventState.country || ''}
                onChangeText={(text) => handleChange('country', text)}
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
        paddingBottom: 80,
    },
    datePickerWrapper: {
        width: "100%",
    },

    inputHalfWidth: {
        width: "50%",
    },
});
