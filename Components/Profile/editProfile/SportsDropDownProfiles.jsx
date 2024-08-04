import {Text, TouchableOpacity, View, StyleSheet, Alert} from "react-native";
import {Picker} from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, {useState} from "react";
import Montserrat from "../../../assets/MontSerratFonts";

export default function SportDropDown(){
    const [sportLists, setSportLists] = useState([
        { sport: 'Basketball', level: 'Débutant', editable : false },
    ]);

    const sports = [
        "Basketball",
        "Running",
        "Tennis",
        "Swimming",
        "Randonnée",
        "Yoga",
        "Football",
        "Golf",
        "Danse",
        "Tennis de table",
        "Badminton",
        "Cyclisme",
        "Escalade",
        "Volleyball",
        "Natation synchronisée",
        "Pilates",
        "Course à pied"
    ];

    const levels = ['Débutant', 'Amateur', 'Semi-Pro', 'Pro'];

    function onSportChange(index, value) {
        const updatedSportLists = [...sportLists];
        updatedSportLists[index].sport = value;
        setSportLists(updatedSportLists);
    }

    function onLevelChange(index, value) {
        const updatedSportLists = [...sportLists];
        updatedSportLists[index].level = value;
        setSportLists(updatedSportLists);
    }

    function toggleEditable(index){
        const updatedSportLists = [...sportLists];
        updatedSportLists[index].editable = !updatedSportLists[index].editable
        setSportLists(updatedSportLists);
    }

    function addSport() {
        if (sportLists.length < 3) {
            const newSport = { sport: null, level: null, editable: true };
            setSportLists([...sportLists, newSport]);
        }
    }

    function deleteSport(index) {
        Alert.alert(
            "Confirmation",
            "Voulez-vous vraiment supprimer ce sport ?",
            [
                {
                    text: "Annuler",
                    style: 'cancel'
                },
                {
                    text: "Supprimer",
                    style: 'destructive',
                    onPress: () => {
                        const updatedSportLists = [...sportLists];
                        updatedSportLists.splice(index, 1);
                        setSportLists(updatedSportLists);
                    },
                },
            ],
        );
    }

    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }

    return(
        <View style={styles.container}>
            {sportLists.map((sportProfile, index) => (
                <View style={styles.sportContainer}>
                    <View style={styles.sportsDropDown}>
                        <Picker
                            selectedValue={sportProfile.sport}
                            style={styles.picker}
                            onValueChange={(itemValue)=> {onSportChange(index, itemValue)}}
                            mode={'dropdown'}
                            enabled={sportProfile.editable}
                            dropdownIconColor={sportProfile.editable ? '#e8871e' : 'white'}>
                            <Picker.Item label="Sport" value={null} enabled={false} style={{ color: 'gray', fontSize: 20}}/>
                            {sports.map((sport, index) =>(
                                <Picker.Item key={index} label={sport} value={sport}/>
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={sportProfile.level}
                            style={styles.picker}
                            onValueChange={(itemValue)=> {onLevelChange(index, itemValue)}}
                            mode={'dropdown'}
                            prompt={'Selectionner un niveau'}
                            enabled={sportProfile.editable}
                            dropdownIconColor={sportProfile.editable ? '#e8871e' : 'white'}>
                            <Picker.Item label="Niveau" value={null} enabled={false} style={{ color: 'gray', fontSize: 20}}/>
                            {levels.map((level, index) =>(
                                <Picker.Item key={index} label={level} value={level}/>
                            ))}
                        </Picker>
                    </View>
                    <View style={styles.buttonEdit}>
                        <TouchableOpacity onPress={() => toggleEditable(index)}>
                            {sportProfile.editable &&
                                <Icon name={'checkbox-marked'} size={35} color={'#e8871e'}/>
                                ||<Icon name={'pencil-circle'} size={40} color={'#46494c'}/>
                            }
                        </TouchableOpacity>
                        {sportProfile.editable && sportLists.length > 1 &&
                            <TouchableOpacity onPress={() => deleteSport(index)}>
                                <Icon name={'minus-box'} size={35} color={'red'}/>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            ))}
            {sportLists.length < 3 &&
            <TouchableOpacity style={styles.buttonAdd} onPress={addSport}>
                <Icon name={'plus-circle'} size={60} color={'#e8871e'} />
                <Text style={{fontFamily: fontStyles.bold, fontSize: 15, color: '#46494c'}}>Ajouter un sport</Text>
            </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container:{
            flex: 0.9,
            justifyContent: 'flex-start',
        },

        sportContainer:{
            flexDirection: 'row',
            width: '100%',
            marginTop: '5%',
            marginBottom: '10%',
            justifyContent: 'center'
        },

        sportsDropDown:{
            flexDirection: 'column',
            width: '55%',
            justifyContent: 'space-evenly',
        },

        picker:{
            backgroundColor: 'white',
            marginTop: "10%",
            height: '7%',
            borderRadius: 20
        },

        buttonEdit:{
            flexDirection: 'row',
            alignItems: 'center',
            width: "30%",
            justifyContent: 'space-around'
        },

        buttonAdd:{
            alignSelf: 'center',
            alignItems: 'center',
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 3,
        }
    }
)