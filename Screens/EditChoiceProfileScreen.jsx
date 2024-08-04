import {Dimensions, StyleSheet, Text, View} from 'react-native';
import GrayRectangle from "../Components/GreyRectangle";
import ImageProfile from "../Components/Profile/ImageProfile";
import BackButton from "../Components/BackButton";
import { useNavigation } from '@react-navigation/native';
import Montserrat from "../assets/MontSerratFonts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import ButtonRectangle from "../Components/ButtonRectangle";
import React from "react";

export default function EditingChoiceScreen() {
    const navigation = useNavigation();

    function goEditPassword(){
        navigation.navigate('EditPassword')
    }

    function goEditMainInformation(){
        navigation.navigate('EditMainInformation')
    }

    function goEditSports(){
        navigation.navigate('EditSports')
    }

    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }

    return (
        <View style={styles.container}>
            <GrayRectangle>
                <Text style={[styles.textProfile, {fontFamily: fontStyles.bold}]}>Modification du profile</Text>
                <BackButton style={styles.backButton}/>
                </GrayRectangle>
                <ImageProfile style={styles.imageProfile}/>
                <View style={styles.listButtons}>
                    <ButtonRectangle onPress={goEditPassword} style={styles.button}>
                        <Icon name={'key-outline'} color={'#46494c'} size={Dimensions.get('window').width * 0.06}/>
                        <Text style={[styles.textButton,{ fontFamily: fontStyles.bold}]}>Mon Compte</Text>
                        <Icon name={'chevron-right'} size={Dimensions.get('window').width * 0.08} color={'#46494c'}/>
                    </ButtonRectangle>
                    <ButtonRectangle onPress={goEditMainInformation} style={styles.button}>
                        <Icon name={'account-details-outline'} color={'#46494c'} size={Dimensions.get('window').width * 0.07}/>
                        <Text style={[styles.textButton,{ fontFamily: fontStyles.bold}]}>Mes informations</Text>
                        <Icon name={'chevron-right'} size={Dimensions.get('window').width * 0.08} color={'#46494c'}/>
                    </ButtonRectangle>
                    <ButtonRectangle style={styles.button} onPress={goEditSports}>
                        <Icon name={'soccer'} color={'#46494c'} size={Dimensions.get('window').width * 0.06}/>
                        <Text style={[styles.textButton,{ fontFamily: fontStyles.bold}]}>Mes Sports</Text>
                        <Icon name={'chevron-right'} size={Dimensions.get('window').width * 0.08} color={'#46494c'}/>
                    </ButtonRectangle>
                    <ButtonRectangle style={styles.button}>
                        <Icon name={'logout'} color={'#46494c'} size={Dimensions.get('window').width * 0.06}/>
                        <Text style={[styles.textButton,{ fontFamily: fontStyles.bold}]}>Se déconnecter</Text>
                        <Icon name={'chevron-right'} size={Dimensions.get('window').width * 0.08} color={'#46494c'}/>
                    </ButtonRectangle>
                </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f7fb',
    },

    overContainer: {
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    textProfile:{
        color: 'white',
        fontSize: 23,
    },

    backButton:{
        left: '5%'
    },

    textButton:{
        fontSize: 17,
        color: '#46494c'
    },

    listButtons:{
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '10%',
        height: '45%'
    },

    button:{
        justifyContent: 'space-around',
        paddingLeft: '2%',
        height: '15%'
    }

})