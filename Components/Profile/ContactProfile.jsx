import {View, StyleSheet, Text, Dimensions} from "react-native";
import Montserrat from "../../assets/MontSerratFonts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

export default function ContactProfile({style, email}){
    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }
    return(
        <View style={[styles.container, style]}>
            <View style={styles.infoPart}>
                <Icon name={'email-outline'} size={Dimensions.get('window').width * 0.08} color={'#e8871e'}/>
                <Text style={[styles.textContact, {fontFamily: fontStyles.bold}]}>{email}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '17%'
    },

    infoPart:{
        flexDirection: 'row',
    },

    textContact:{
        marginLeft: '10%',
        fontSize: 14,
        color: '#e8871e',
        alignSelf: 'center'
    }
})