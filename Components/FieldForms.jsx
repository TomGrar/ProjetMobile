
import {Text, TextInput, View, StyleSheet} from "react-native";
import Montserrat from "../assets/MontSerratFonts";
export default function FieldForms({title, style, multiline, numberOfLines, editable, placeholder, textColor, inputMode, value, onChangeText, error}){
    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }

    return(
        <View style={[styles.container, style]}>
            <Text style={[styles.titleText,{fontFamily: fontStyles.bold} ]}>{title}</Text>
            <TextInput inputMode={inputMode}
                       style={[styles.field,{fontFamily: fontStyles.medium}]}
                       placeholderTextColor={textColor || '#46494c'}
                       multiline={multiline}
                       numberOfLines={numberOfLines}
                       editable={editable}
                       placeholder={placeholder}
                       value={value}
                       onChangeText={onChangeText}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        marginBottom: '10%'
    },

    titleText:{
        fontSize: 16,
        color: '#46494c',
    },

    field:{
        marginTop: '2%',
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: '#46494C',
        fontSize: 14,
        paddingHorizontal: 10,

    }

})