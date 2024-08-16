import {ActivityIndicator, Dimensions, StyleSheet, Text, View} from 'react-native';
import GrayRectangle from "../Components/GreyRectangle";
import RoundButton from "../Components/RoundButton";
import ImageProfile from "../Components/Profile/ImageProfile";
import BackButton from "../Components/BackButton";
import { useNavigation } from '@react-navigation/native';
import ProfileInformation from "../Components/Profile/ProfileInformation";
import Montserrat from "../assets/MontSerratFonts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import api from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useEffect, useState} from "react";

export default function MyProfileScreen() {
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(true);
    const fontStyles = Montserrat();
    const navigation = useNavigation();

    function goToEditing(){
        navigation.navigate('EditingProfile', {profile: profile});
    }

    useEffect(() => {
        const getProfileDatas = async () => {
            const userId = await AsyncStorage.getItem('userId');
            try {
                const response = await api.get(`/app/member/profile/${userId}`);
                setProfile(response.data);  // Assurez-vous que la structure est correcte

            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
            } finally {
                setLoading(false);
            }
        };
        getProfileDatas();

        const refresh = navigation.addListener('focus', () => {
            getProfileDatas(); // Recharger les événements lorsque l'écran devient actif
        });
    }, [navigation]);


    if (loading) {
        return <ActivityIndicator size="large" color="#e8871e" />;
    }


    if (!fontStyles) {
        return null;
    }

    return (
        <View style={styles.container}>
            <GrayRectangle>
                <Text style={[styles.textProfile, {fontFamily: fontStyles.bold}]}>Mon Profile</Text>
                <BackButton style={styles.backButton}/>
            </GrayRectangle>
            <ImageProfile/>
            <ProfileInformation profile={profile} />
            <RoundButton style={styles.moreButton} onPress={goToEditing}>
                <Icon name={'dots-horizontal'} size={Dimensions.get('window').width * 0.08} color={'black'}/>
            </RoundButton>
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

    textProfile:{
        color: 'white',
        fontSize: 23,
    },

    backButton:{
        left: '5%'
    },
})