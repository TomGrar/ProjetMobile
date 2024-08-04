import {Image, Text, View, StyleSheet} from "react-native";
import {useFonts, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat"
export default function Logo(){
    let [fontsLoaded] = useFonts({
        Montserrat_600SemiBold
    });

    if (!fontsLoaded) {
        return null;
    }

    return(
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/Mediamodifier-Design-Template.png')}/>
            <Text style={[styles.textLogo, {fontFamily: 'Montserrat_600SemiBold'}]}>SportWithMe</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    logo: {
        marginRight: 10,
        height: '200%',
        width: '20%',
    },
    textLogo: {
        color: '#ffffff',
        fontSize: 30,
    },
})