import {Dimensions, StyleSheet, Text, View} from 'react-native';
import GrayRectangle from "../Components/GreyRectangle";
import RoundButton from "../Components/RoundButton";
import ImageProfile from "../Components/Profile/ImageProfile";
import BackButton from "../Components/BackButton";
import { useNavigation } from '@react-navigation/native';
import ProfileInformation from "../Components/Profile/ProfileInformation";
import Montserrat from "../assets/MontSerratFonts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

export default function MyProfileScreen() {
    const profile = {
        firstname: "Antoine",
        lastname: "Lefevre",
        description: "Passionné de sports et de voyage, Antoine aime explorer de nouveaux horizons. Sa devise : 'Le sport, un mode de vie'. Il trouve l'équilibre entre le travail et le bien-être grâce à une routine sportive régulière.",
        birthday: new Date("1995-08-27"),
        gender: "masculin",
        country: "Belgique",
        street: "Rue de la Tour",
        number: "45",
        locality: "Chimay",
        postalCode: "12345",
        phoneNumber: "123456789",
        mail: 'antoine.lefevre@mail.com',
        sports: [
            { id: 30, name: "Basketball", level: "Amateur" },
            { id: 31, name: "Course à pied", level: "Pro" }
        ]
    };

    const navigation = useNavigation();
    function goToEditing(){
        navigation.navigate('EditingProfile');
    }

    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }

    return (
        <View style={styles.container}>
            <GrayRectangle>
                <Text style={[styles.textProfile, {fontFamily: fontStyles.bold}]}>Mon Profile</Text>
                <BackButton style={styles.backButton}/>
            </GrayRectangle>
            <ImageProfile/>
            <ProfileInformation profile={profile}/>
            <RoundButton style={styles.moreButton} onPress={goToEditing}>
                <Icon name={'dots-horizontal'} size={Dimensions.get('window').width * 0.08} color={'black'}/>
            </RoundButton>
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
})