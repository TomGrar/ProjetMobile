import {RadioButton} from "react-native-paper";
import {View, StyleSheet} from "react-native";
import React, {useState} from "react";
import Icon from "react-native-vector-icons/FontAwesome5"

export default function RadioButtonGender({style, genderProfile, onChangeGender}){
    const [profilGender, setProfilGender] = useState(genderProfile);

    const handlePress = (gender) => {
        setProfilGender(gender);
        onChangeGender(gender);
    }

    return(
        <View style={[styles.radioButtons, style]}>
            <View style={styles.gender}>
                <Icon name={'mars'} color={'#e8871e'} size={30}/>
                <RadioButton
                    color={'#e8871e'}
                    value={"male"}
                    status={profilGender === 'male' ? 'checked':'unchecked'}
                    onPress={() => handlePress('male')}
                />
            </View>
            <View style={styles.gender}>
                <Icon name={'venus'} color={'#e8871e'} size={30}/>
                <RadioButton
                    color={'#e8871e'}
                    value={"female"}
                    status={profilGender === 'female' ? 'checked':'unchecked'}
                    onPress={() => handlePress('female')}
                />
            </View>
            <View style={styles.gender}>
                <Icon name={'genderless'} color={'#e8871e'} size={30}/>
                <RadioButton
                    color={'#e8871e'}
                    value={"other"}
                    status={profilGender === 'other' ? 'checked':'unchecked'}
                    onPress={() => handlePress('other')}
                />
            </View>
        </View>
    );
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
});
