import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Montserrat from "../../assets/MontSerratFonts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation } from "@react-navigation/native";

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export default function Event({event}) {
    const navigation = useNavigation();
    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }

    const goEventScreenInformation = () => {
        navigation.navigate('EventInformation', { event: event });
    };

    return (
        <TouchableOpacity style={styles.container} onPress={goEventScreenInformation}>
            <View style={[styles.column]}>
                <Text style={{ textAlign:'center', width: '80%', fontFamily: fontStyles.bold}}>{event.name}</Text>
                <Text style={{ fontFamily: fontStyles.medium}}>{event.sport}</Text>
            </View>
            <View style={[styles.column, {flex: 1}]}>
                <Text style={{ fontFamily: fontStyles.medium}}>{event.city}</Text>
                <Text style={{ fontFamily: fontStyles.regular}}>{formatDate(event.date)}</Text>
            </View>
            <View style={[styles.column, {flex: 0.7}]}>
                <Icon name={'chevron-right'} size={Dimensions.get('window').width * 0.08} color={'#46494c'}/>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 5,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '2%',
        marginBottom: '2%'
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '60%'
    },
});