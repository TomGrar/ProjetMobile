import {StyleSheet, Text, View} from 'react-native';
import GrayRectangle from "../Components/GreyRectangle";
import ImageProfile from "../Components/Profile/ImageProfile";
import BackButton from "../Components/BackButton";
import Montserrat from "../assets/MontSerratFonts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import React, {useState} from "react";
import SportDropDown from "../Components/Profile/editProfile/SportsDropDownProfiles";

export default function EditSports({route}) {
    const {profileId} = route.params;
    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }

    return (
        <View style={styles.container}>
            <GrayRectangle>
                <Text style={[styles.textProfile, {fontFamily: fontStyles.bold}]}>Modifier vos sports</Text>
            </GrayRectangle>
            <ImageProfile/>
            <BackButton style={styles.backButton} color={'#46494c'}>
                <Icon name={'key-outline'} color={'#46494c'} size={20}/>
                <Text style={[styles.textBack,{fontFamily: fontStyles.medium}]}>Mes sports</Text>
            </BackButton>
            <SportDropDown profileId={profileId}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f7fb',
        alignItems: "center",
        width: '100%'
    },

    fields: {
        alignItems: 'center',
        justifyContent:'space-evenly',
        width: '80%',
        height: '40%'
    },

    textProfile:{
        color: 'white',
        fontSize: 23,
    },

    textConfirm:{
        fontSize: 18,
        color: 'white',
    },

    buttonConfirm:{
        backgroundColor: '#E8871E',
        alignSelf: 'center',
        height: '6%',
        marginTop: "15%",
    },

    textBack:{
        fontSize: 15,
    },

    backButton:{
        position : 'relative',
        alignSelf: 'flex-start',
        width: '45%',
        marginTop: '7%',
        justifyContent: 'space-between',
        paddingLeft:"2%"
    }

})