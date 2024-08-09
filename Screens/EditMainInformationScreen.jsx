import {
    KeyboardAvoidingView,
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
import ProfileForm from "../Components/Profile/editProfile/ProfileForm";

export default function EditMainInformationScreen({route}) {
    const {profile} = route.params;
    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }

    return (
        <KeyboardAvoidingView
            behavior={"height"} style={styles.container} keyboardVerticalOffset={-250}>
            <GrayRectangle>
                <Text style={[styles.textProfile, {fontFamily: fontStyles.bold}]}>Edition du profile</Text>
            </GrayRectangle>
            <ImageProfile/>
            <BackButton style={styles.backButton} color={'#46494c'}>
                <Icon name={'account-details-outline'} color={'#46494c'} size={20}/>
                <Text style={[styles.textBack,{fontFamily: fontStyles.medium}]}>Mes informations</Text>
            </BackButton>
            <ProfileForm profile={profile}/>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f7fb',
        alignItems: "center",
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