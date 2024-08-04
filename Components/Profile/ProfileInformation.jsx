import {View, StyleSheet, Text} from "react-native";
import MainInfoProfile from "./MainInfoProfile";
import ContactProfile from "./ContactProfile";
import SportProfile from "./SportProfile";
import Montserrat from "../../assets/MontSerratFonts";
export default function ProfileInformation({profile}){
    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }

    return(
        <View style={styles.container}>
            <Text style={[styles.profileName, {fontFamily: fontStyles.extraBold}]}>{profile.firstname + ' ' + profile.lastname }</Text>
            <MainInfoProfile  profile={profile}/>
            <Text style={[styles.bio,{fontFamily: fontStyles.medium}]}>{profile.description}</Text>
            <ContactProfile  email={profile.mail} phone={profile.phoneNumber}/>
            <SportProfile style={{height:  '25%'}} sports={profile.sports}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '65%'
    },

    profileName:{
        color: '#46494c',
        fontSize: 23,
    },

    bio:{
        width: '90%',
        color: '#46494c',
    }
})