import React from 'react';
import { StyleSheet,TouchableOpacity,} from 'react-native';
import Montserrat from "../assets/MontSerratFonts";

export default function ButtonRectangle({children, onPress, style}) {
    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }

    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            {children}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 5,
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '85%'
    },
});