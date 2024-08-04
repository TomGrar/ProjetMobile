import {useState} from "react";
import {StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';
import CheckBox from 'expo-checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";

export default function Login(){
    const [stayConnect, setStayConnect] = useState(false);

    const changeStayConnect = () => {
        setStayConnect(!stayConnect);
    }
    return (
        <View>
            <View style={styles.containerField}>
                <View style={styles.adresseMail}>
                    <FontAwesomeIcon icon={faEnvelope} color={'#46494C'}/>
                    <Text style={styles.adresseMailText}>Adresse Mail</Text>
                </View>
                <TextInput style={styles.field} placeholder="monadressemail@gmail.com" placeholderTextColor={'#CBCFD2'}/>
                <View style={styles.password}>
                    <FontAwesomeIcon icon={faLock} color={'#46494C'} />
                    <Text style={styles.passwordText}>Mot de passe</Text>
                </View>
                <TextInput secureTextEntry={true} style={styles.field}></TextInput>
            </View>
            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.buttonLogin}>
                    <Text style={styles.buttonTextLogin}>Connexion</Text>
                </TouchableOpacity>
                <View style={styles.containerCheck}>
                    <CheckBox value={stayConnect} onValueChange={changeStayConnect} style={{marginRight: 10,}}/>
                    <Text>Rester connecter</Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.textRegister}>Créer un compte</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    containerField: {
        alignSelf: "center",
        height: '40%',
        width: '90%',
        justifyContent: 'center',
        marginBottom: '5%'
    },

    containerButton: {
        alignSelf: "center",
        height: '35%',
        width: '90%',
        justifyContent: 'center'
    },

    adresseMail: {
        flexDirection: 'row',
        alignItems: "center",
    },
    adresseMailText: {
        marginLeft: 5,
        color: "#46494C",
        fontSize: 20,
        fontFamily: 'normal',
        fontWeight: '700',
    },
    password: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: "center",

    },
    passwordText:{
        marginLeft: 5,
        color: "#46494C",
        fontSize: 20,
        fontFamily: 'normal',
        fontWeight: '700',
    },

    field:{
        height: '15%',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 5,
        borderStyle : 'solid',
        borderColor: '#46494C',
    },

    buttonLogin:{
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        width: '65%',
        height: '15%',
        backgroundColor: '#E8871E',
        borderRadius: 5,
    },

    buttonTextLogin:{
        color: 'white',
        fontSize: 20,
        fontWeight: "bold"
    },

    textRegister:{
        alignSelf: 'center',
        color:'#e8871e',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 25,
    },
    containerCheck:{
        height: '20%',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    }

})