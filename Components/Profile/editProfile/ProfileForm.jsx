import React, { useState } from "react";
import {ScrollView, Pressable, Text, StyleSheet, Platform} from "react-native";
import FieldForms from "../../FieldForms";
import Montserrat from "../../../assets/MontSerratFonts";
import DateTimePicker from "@react-native-community/datetimepicker";
import RadioButtonGender from "./RadioButtonsGender";

export default function ProfileForm() {
    const [showPicker, setShowPicker] = useState(false);
    const [birthday, setBirthday] = useState(new Date());
    const [profile, setProfile] = useState({
        firstname: "John",
        lastname: "Doe",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        birthday: new Date("2002-19-11"),
        gender: "male",
            country: "Belgium",
            street: "Sample Street",
            streetNumber: "123",
            locality: "Sample Locality",
            postalCode: "12345",
        phoneNumber: "123456789",
        mail: 'john.doe@mail.com',
        sports:[{id: 1, name: "Basketball", level: "Intermediate"}, {id: 2, name: "Running", level: "Advanced"}]
    });



    function OnChangeBirthday({ type }, selectedDate) {
        if (type === "set") {
            if (Platform.OS === "android") {
                toggleDatePicker();
                setBirthday(selectedDate);
            } else {
                toggleDatePicker();
            }
        }
    }
    function formatDateText() {
        let date = new Date(profile.birthday);
        let day = date.getDate();
        let month = date.getMonth() + 1; // Months are zero-based
        let year = date.getFullYear();

        return `${day} / ${month} / ${year}`;
    }

    function toggleDatePicker() {
        setShowPicker(!showPicker);
    }

    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }

    return (
        <ScrollView style={styles.fields}>
            <FieldForms title={"Prénom"} value={profile.firstname} onChangeText={(text)=>{setProfile({...profile, firstname: text})}} />
            <FieldForms title={"Nom"} value={profile.lastname} onChangeText={(text)=>{setProfile({...profile, lastname: text})}} />
            <FieldForms title={"Description"} multiline={true} numberOfLines={4} value={profile.description} onChangeText={(text)=>{setProfile({...profile, description: text})}} />

            <Pressable onPress={toggleDatePicker} style={{ width: "100%" }}>
                <FieldForms title={"Date de naissance"} editable={false} placeholder={formatDateText()} textColor={"#46494c"} />
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
            <RadioButtonGender style={styles.fieldComponent} genderProfile={profile.gender} />
            <Text style={{ fontFamily: fontStyles.bold, fontSize: 17, color: "#46494c", marginBottom: "5%" }}>Domicile</Text>
            <FieldForms title={"Pays"} placeholder={"Belgique"} textColor={"gray"} editable={false} value={profile.country} />
            <FieldForms title={"Rue"} value={profile.street} onChangeText={(text)=>{setProfile({...profile, street: text})}}/>
            <FieldForms title={"N°"} inputMode={"numeric"} style={{ width: "50%" }} value={profile.streetNumber} onChangeText={(text)=>{setProfile({...profile, streetNumber: text})}}/>
            <FieldForms title={"Localité"} value={profile.locality} onChangeText={(text)=>{setProfile({...profile, locality: text})}} />
            <FieldForms title={"Code Postal"} inputMode={"numeric"} style={{ width: "50%" }} value={profile.postalCode} onChangeText={(text)=>{setProfile({...profile, postalCode: text})}} />
            <FieldForms title={"N° de téléphone"} inputMode={"numeric"} style={{ marginTop: "8%" }} value={profile.phoneNumber} onChangeText={(text)=>{setProfile({...profile, phoneNumber: text})}}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    fields: {
        width: "80%",
        maxHeight: "45%",
        marginTop: "5%",
    },

    fieldComponent: {
        alignSelf: "center",
        marginBottom: "10%",
    },
    addressContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "10%",
    },
});