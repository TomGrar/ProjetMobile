import { StyleSheet, View} from "react-native";
import React from "react";

export default function GrayRectangle({children}){
    return(
        <View style={styles.rectangleGrey}>
            {children}
        </View>
    )
}


const styles = StyleSheet.create({
    rectangleGrey: {
        height: '20%',
        backgroundColor: '#46494c',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        width: '100%',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 8,
    }
})