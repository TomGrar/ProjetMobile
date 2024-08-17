import {Text, View, StyleSheet, Dimensions} from "react-native";
import Montserrat from "../../assets/MontSerratFonts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

export default function MainInfoProfile({style, profile}){
    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }

    const calculateAge = (birthday) => {
        const today = new Date();
        const birthDate = new Date(birthday);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    return(
        <View style={[styles.container, style]}>
            <View style={styles.infoPart}>
                <Icon name={'cake-variant-outline'} size={Dimensions.get('window').width * 0.08} color={'#e8871e'}/>
                <Text style={[styles.textInfo, { fontFamily: fontStyles.medium }]}>{calculateAge(profile.birthday)}</Text>
            </View>
            <View style={styles.infoPart}>
                <Icon name={'home-variant-outline'} size={Dimensions.get('window').width * 0.08} color={'#e8871e'}/>
                <Text style={[styles.textInfo, {fontFamily: fontStyles.medium}]}>{profile.city}</Text>
            </View>
            <View style={styles.infoPart}>
                <Icon name={'gender-male-female'} size={Dimensions.get('window').width * 0.08} color={'#e8871e'}/>
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