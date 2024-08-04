import {Dimensions, StyleSheet, View} from 'react-native';
import SearchButtons from "../Components/Home/SearchButtons";
import ListEvents from "../Components/Home/ListEvents";
import GrayRectangle from "../Components/GreyRectangle";
import Logo from "../Components/Logo";
import RoundButton from "../Components/RoundButton";
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import React from "react";
export default function HomeScreen(){
    const navigation = useNavigation();
    function goToProfile(){
        navigation.navigate('MyProfile');
    }

    return (
        <View style={styles.container}>
            <GrayRectangle>
                <Logo/>
                <RoundButton style={styles.profilButton} onPress={goToProfile}>
                    <Icon name={'account-outline'} size={Dimensions.get('window').width * 0.09} color={'#46494c'}/>
                </RoundButton>
            </GrayRectangle>
            <SearchButtons style={{height: '30%'}}/>
            <ListEvents/>
            <RoundButton style={styles.eventButton}>
                <Icon name={'calendar'} size={Dimensions.get('screen').width * 0.09} color={'white'}/>
            </RoundButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
    },

    eventButton: {
        bottom: '5%',
        right: '5%',
    },

    profilButton:{
        bottom: '5%',
        right: '5%',
        width: '10%',
        backgroundColor: '#ECEAEA'
    },

    grayRectangle: {
        width: '100%',
        height: '50%'
    },
});