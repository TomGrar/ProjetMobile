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
                    value={"masculin"}
                    status={profilGender === 'masculin' ? 'checked':'unchecked'}
                    onPress={() => handlePress('masculin')}
                />
            </View>
            <View style={styles.gender}>
                <Icon name={'venus'} color={'#e8871e'} size={30}/>
                <RadioButton
                    color={'#e8871e'}
                    value={"féminin"}
                    status={profilGender === 'féminin' ? 'checked':'unchecked'}
                    onPress={() => handlePress('féminin')}
                />
            </View>
            <View style={styles.gender}>
                <Icon name={'genderless'} color={'#e8871e'} size={30}/>
                <RadioButton
                    color={'#e8871e'}
                    value={"autre"}
                    status={profilGender === 'autre' ? 'checked':'unchecked'}
                    onPress={() => handlePress('autre')}
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
