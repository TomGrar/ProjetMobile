import {StyleSheet, Text, View} from 'react-native';
import GrayRectangle from "../Components/GreyRectangle";
import ImageProfile from "../Components/Profile/ImageProfile";
import BackButton from "../Components/BackButton";
import { useNavigation } from '@react-navigation/native';
import ProfileInformation from "../Components/Profile/ProfileInformation";
import Montserrat from "../assets/MontSerratFonts";
import ButtonRectangle from "../Components/ButtonRectangle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ProfileScreen({route}) {
    const {profile} = route.params;
    const navigation = useNavigation();

    const goEventScreenInvitation = () => {
        navigation.navigate('EventInvitation', { profileId: profile.id });
    };

    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }

    return (
        <View style={styles.container}>
            <GrayRectangle>
                <Text style={[styles.textProfile, {fontFamily: fontStyles.bold}]}>Profile</Text>
                <BackButton style={styles.backButton}/>
            </GrayRectangle>
            <ImageProfile/>
            <ProfileInformation profile={profile}/>
            <ButtonRectangle style={styles.button} onPress={goEventScreenInvitation}>
                <Icon name={'plus-thick'} color={'white'} size={25}/>
                <Text style={[styles.textConfirm, {fontFamily: fontStyles.bold}]}>Inviter à un événement</Text>
            </ButtonRectangle>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f7fb'
    },

    moreButton:{
        top: '15%',
        right: '5%',
        backgroundColor: '#ECEAEA'
    },

    textProfile:{
        color: 'white',
        fontSize: 23,
    },

    backButton:{
        left: '5%'
    },

    button: {
        backgroundColor: '#E8871E',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 20,
        alignSelf: 'center',
        bottom: '10%'
    },
    textConfirm: {
        fontSize: 18,
        color: 'white',
    },
})