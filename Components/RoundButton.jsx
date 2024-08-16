import {TouchableOpacity, StyleSheet} from "react-native";
export default function RoundButton({children, style, onPress}){
    return(
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        width: '16%', // Utilisez une unité relative, par exemple %
        aspectRatio: 1, // Maintient le rapport hauteur/largeur à 1:1
        borderRadius: 9999,
        backgroundColor: '#E8871E',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
    }
})