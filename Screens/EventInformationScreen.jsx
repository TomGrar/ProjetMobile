import {StyleSheet, Text, View} from 'react-native';
import GrayRectangle from "../Components/GreyRectangle";
import ImageProfile from "../Components/Profile/ImageProfile";
import BackButton from "../Components/BackButton";
import { useNavigation } from '@react-navigation/native';
import ProfileInformation from "../Components/Profile/ProfileInformation";
import Montserrat from "../assets/MontSerratFonts";
import ButtonRectangle from "../Components/ButtonRectangle";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function EventInformation({route}) {
    const {event} = route.params;
    const navigation = useNavigation();

    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }

    return (
        <View style={styles.container}>
            <GrayRectangle>
                <Text style={[styles.textHeader, {fontFamily: fontStyles.bold}]}>Evenements</Text>
                <BackButton style={styles.backButton}/>
            </GrayRectangle>
            <ImageProfile/>
            <ProfileInformation profile={profile}/>
            <ButtonRectangle style={styles.buttonConfirm}>
                <Icon name={'plus-thick'} color={'white'} size={25}/>
                <Text style={[styles.textConfirm, {fontFamily: fontStyles.bold}]}>Inviter à un événement</Text>
            </ButtonRectangle>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f7fb'
    },

    moreButton:{
        top: '15%',
        right: '5%',
        backgroundColor: '#ECEAEA'
    },

    textHeader:{
        color: 'white',
        fontSize: 23,
    },

    backButton:{
        left: '5%'
    },

    textConfirm:{
        fontSize: 18,
        color: 'white',
    },

    buttonConfirm:{
        backgroundColor: '#E8871E',
        alignSelf: 'center',
        height: '6%',
    },
})