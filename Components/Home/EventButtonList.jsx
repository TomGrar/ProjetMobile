import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Montserrat from "../../assets/MontSerratFonts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

export default function Event({ title, sport, city, date }) {
    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }

    return (
        <TouchableOpacity style={styles.container}>
            <View style={[styles.column]}>
                <Text style={{ textAlign:'center', width: '80%', fontFamily: fontStyles.bold}}>{title}</Text>
                <Text style={{ fontFamily: fontStyles.medium}}>{sport}</Text>
            </View>
            <View style={[styles.column, {flex: 1}]}>
                <Text style={{ fontFamily: fontStyles.medium}}>{city}</Text>
                <Text style={{ fontFamily: fontStyles.regular}}>{date}</Text>
            </View>
            <View style={[styles.column, {flex: 0.7}]}>
                <Icon name={'chevron-right'} size={Dimensions.get('window').width * 0.08} color={'#46494c'}/>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 5,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '2%',
        marginBottom: '2%'
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '60%'
    },
});