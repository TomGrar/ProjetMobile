import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Montserrat from "../../assets/MontSerratFonts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import React from "react";
import {useNavigation} from "@react-navigation/native";

export default function SearchButtons({style}){
    const navigation = useNavigation();
    function goToSearchEvents(){
        navigation.navigate('SearchEvents')
    }

    function goToSearchProfiles(){
        navigation.navigate('SearchProfiles')
    }

    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }

    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity style={styles.buttonSearch} onPress={goToSearchProfiles}>
                <Icon name={'account-search-outline'} size={Dimensions.get('window').width * 0.13} color={'white'}/>
                <Text style={[styles.textSearch, {fontFamily: fontStyles.extraBold} ]}>Rechercher un partenaire</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSearch} onPress={goToSearchEvents}>
                <Icon name={'calendar-month-outline'} size={Dimensions.get('window').width * 0.13} color={'white'}/>
                <Text style={[styles.textSearch, {fontFamily: fontStyles.extraBold} ]}>Rechercher un événement</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent:'space-around',
        alignContent: 'space-around',
        width: "90%"
    },

    buttonSearch:{
        backgroundColor: '#E8871E',
        height: '65%',
        width: '40%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'

    },

    textSearch:{
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    }

});