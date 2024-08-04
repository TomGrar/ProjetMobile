import {Text, View, StyleSheet, Dimensions} from "react-native";
import Montserrat from "../../assets/MontSerratFonts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
export default function MainInfoProfile({style, profile}){
    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }

    return(
        <View style={[styles.container, style]}>
            <View style={styles.infoPart}>
                <Icon name={'cake-variant-outline'} size={Dimensions.get('window').width * 0.08} color={'#e8871e'}/>
                <Text style={[styles.textInfo, {fontFamily: fontStyles.medium}]}>{new Date().getFullYear() - profile.birthday.getFullYear()}</Text>
            </View>
            <View style={styles.infoPart}>
                <Icon name={'home-variant-outline'} size={Dimensions.get('window').width * 0.08} color={'#e8871e'}/>
                <Text style={[styles.textInfo, {fontFamily: fontStyles.medium}]}>{profile.locality}</Text>
            </View>
            <View style={styles.infoPart}>
                <Icon name={'gender-male'} size={Dimensions.get('window').width * 0.08} color={'#e8871e'}/>
                <Text style={[styles.textInfo, {fontFamily: fontStyles.medium}]}>{profile.gender}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'80%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',

    },

    infoPart:{
        flexDirection: 'column',
        alignItems: 'center',
    },

    textInfo:{
        color:'#46494c',
    }
})