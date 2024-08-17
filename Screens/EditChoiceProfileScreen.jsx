import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import GrayRectangle from "../Components/GreyRectangle";
import ImageProfile from "../Components/Profile/ImageProfile";
import BackButton from "../Components/BackButton";
import { useNavigation } from '@react-navigation/native';
import Montserrat from "../assets/MontSerratFonts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import ButtonRectangle from "../Components/ButtonRectangle";
import {useDispatch} from "react-redux";
import {logout} from "../redux/Redux";

export default function EditingChoiceScreen({route}) {
    const navigation = useNavigation();
    const {profile} = route.params;
    const dispatch = useDispatch();

    function goEditPassword(){
        navigation.navigate('EditPassword')
    }

    function goEditMainInformation(){
        navigation.navigate('EditMainInformation', {profile : profile})
    }

    function goEditSports(){
        navigation.navigate('EditSports')
    }

    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }

    const handleLogout = () => {
        Alert.alert(
            "Déconnexion",
            "Êtes-vous sûr de vouloir vous déconnecter ?",
            [
                {
                    text: "Annuler",
                    style: "cancel"
                },
                {
                    text: "Déconnexion",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            // Dispatch the logout action
                            dispatch(logout());
                            // Rediriger vers l'écran de connexion
                            navigation.navigate("Login");
                        } catch (error) {
                            console.error(error);
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <GrayRectangle>
                <Text style={[styles.textProfile, {fontFamily: fontStyles.bold}]}>Modification du profile</Text>
                <BackButton style={styles.backButton}/>
                </GrayRectangle>
                <ImageProfile style={styles.imageProfile}/>
                <View style={styles.listButtons}>
                    <ButtonRectangle onPress={goEditPassword} style={styles.button}>
                        <Icon name={'key-outline'} color={'#46494c'} size={Dimensions.get('window').width * 0.06}/>
                        <Text style={[styles.textButton,{ fontFamily: fontStyles.bold}]}>Mon Compte</Text>
                        <Icon name={'chevron-right'} size={Dimensions.get('window').width * 0.08} color={'#46494c'}/>
                    </ButtonRectangle>
                    <ButtonRectangle onPress={goEditMainInformation} style={styles.button}>
                        <Icon name={'account-details-outline'} color={'#46494c'} size={Dimensions.get('window').width * 0.07}/>
                        <Text style={[styles.textButton,{ fontFamily: fontStyles.bold}]}>Mes informations</Text>
                        <Icon name={'chevron-right'} size={Dimensions.get('window').width * 0.08} color={'#46494c'}/>
                    </ButtonRectangle>
                    <ButtonRectangle style={styles.button} onPress={goEditSports}>
                        <Icon name={'soccer'} color={'#46494c'} size={Dimensions.get('window').width * 0.06}/>
                        <Text style={[styles.textButton,{ fontFamily: fontStyles.bold}]}>Mes Sports</Text>
                        <Icon name={'chevron-right'} size={Dimensions.get('window').width * 0.08} color={'#46494c'}/>
                    </ButtonRectangle>
                    <ButtonRectangle onPress={handleLogout} style={styles.button}>
                        <Icon name={'logout'} color={'#46494c'} size={Dimensions.get('window').width * 0.06}/>
                        <Text style={[styles.textButton,{ fontFamily: fontStyles.bold}]}>Se déconnecter</Text>
                        <Icon name={'chevron-right'} size={Dimensions.get('window').width * 0.08} color={'#46494c'}/>
                    </ButtonRectangle>
                </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f7fb',
    },

    overContainer: {
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    textProfile:{
        color: 'white',
        fontSize: 23,
    },

    backButton:{
        left: '5%'
    },

    textButton:{
        fontSize: 17,
        color: '#46494c'
    },

    listButtons:{
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '10%',
        height: '45%'
    },

    button:{
        justifyContent: 'space-around',
        paddingLeft: '2%',
        height: '15%'
    }

})