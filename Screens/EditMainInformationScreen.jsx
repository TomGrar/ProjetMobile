import {
    KeyboardAvoidingView, Platform, ScrollView,
    StyleSheet,
    Text
} from 'react-native';
import GrayRectangle from "../Components/GreyRectangle";
import ImageProfile from "../Components/Profile/ImageProfile";
import BackButton from "../Components/BackButton";
import { useNavigation } from '@react-navigation/native';
import Montserrat from "../assets/MontSerratFonts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import React from "react";
import ProfileEditForm from "../Components/Profile/ProfileEditForm";
import RegisterForm from "../Components/Profile/RegisterForm";

export default function EditMainInformationScreen({route}) {
    const {profile} = route.params;
    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <GrayRectangle>
                <Text style={[styles.textProfile, {fontFamily: fontStyles.bold}]}>Edition du profile</Text>
            </GrayRectangle>
            <BackButton style={styles.backButton} color={'#46494c'}>
                <Icon name={'account-details-outline'} color={'#46494c'} size={20}/>
                <Text style={[styles.textBack,{fontFamily: fontStyles.medium}]}>Mes informations</Text>
            </BackButton>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <ProfileEditForm profile={profile}/>
            </ScrollView>
        </KeyboardAvoidingView>
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

    textProfile:{
        color: 'white',
        fontSize: 23,
    },

    textConfirm:{
        fontSize: 18,
        color: 'white',
    },

    textBack:{
        fontSize: 15,
    },

    backButton:{
        position : 'relative',
        alignSelf: 'flex-start',
        width: '53%',
        marginTop: '7%',
        justifyContent: 'space-between',
        paddingLeft:"2%"
    },

})