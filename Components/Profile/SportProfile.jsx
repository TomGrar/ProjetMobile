import {Text, View, StyleSheet, ScrollView} from "react-native";
import Montserrat from "../../assets/MontSerratFonts";

export default function SportProfile({style, sports}){
    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }

    return(
        <View style={[styles.container, style]}>
            <View style={styles.splitRectangle}>
                <Text style={[styles.sportTitle, {fontFamily: fontStyles.extraBold}]}>Sports</Text>
            </View>
            <ScrollView style={styles.listsSport}>
                {sports.map((sport, index) => (
                    <View key={sport.id || index} style={styles.sport}>
                        <Text style={[styles.sportText, {fontFamily: fontStyles.bold}]}>{sport.name}</Text>
                        <Text style={[styles.levelText, {fontFamily: fontStyles.regular}]}>{sport.nbYears} ans</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%'
    },

    splitRectangle:{
        backgroundColor: '#ECEAEA',
        height: '30%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    sportTitle:{
        fontSize: 17,
        color:'#46494c',

    },

    listsSport:{
        margin: '2%',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        alignSelf: 'center',
        width: '68%'
    },

    sport:{
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        margin: '2%'
    },

    sportText:{
        fontSize: 16,
        color:'#46494c'
    },

    levelText:{
        fontSize: 16,
        color:'#46494c'
    }
})