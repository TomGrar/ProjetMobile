import React from 'react';
import {StyleSheet, Image} from 'react-native';
export default function ImageProfile ({ source, style}) {
    const defaultSource = require('../../assets/ImageProfileDefault.png');
    return (
        <Image source={source || defaultSource}
            style={[styles.profileImage, style]}
        />
    );
}
const styles = StyleSheet.create({
    profileImage: {
        alignSelf: "center",
        marginTop: "-12 %",
        width: '27%',
        height: undefined, // Indique que la hauteur doit être calculée en fonction de la largeur
        borderRadius: 99999,
        aspectRatio: 1,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
    },
});