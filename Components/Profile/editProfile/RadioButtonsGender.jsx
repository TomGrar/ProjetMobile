import {RadioButton} from "react-native-paper";
import {View, StyleSheet} from "react-native";
import React, {useState} from "react";
import Icon from "react-native-vector-icons/FontAwesome5"
export default function RadioButtonGender({style, genderProfile}){
    const [profilGender, setProfilGender] = useState(genderProfile);
    return(
        <View style={[styles.radioButtons, style]}>
            <View style={styles.gender}>
                <Icon name={'mars'} color={'#e8871e'} size={30}/>
                <RadioButton color={'#e8871e'} value={"male"} status={profilGender === 'male' ? 'checked':'unchecked'} onPress={() => setProfilGender('male') }/>
            </View>
            <View style={styles.gender}>
                <Icon name={'venus'} color={'#e8871e'} size={30}/>
                <RadioButton color={'#e8871e'} value={"female"} status={profilGender === 'female' ? 'checked':'unchecked'} onPress={() => setProfilGender('female') }/>
            </View>
            <View style={styles.gender}>
                <Icon name={'genderless'} color={'#e8871e'} size={30}/>
                <RadioButton color={'#e8871e'} value={"other"} status={profilGender === 'other' ? 'checked':'unchecked'} onPress={() => setProfilGender('other') }/>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    radioButtons:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%',
    },
    gender:{
        flexDirection: 'column',
        alignItems: 'center',
    }
})