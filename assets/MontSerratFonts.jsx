import {useFonts, Montserrat_100Thin} from "@expo-google-fonts/montserrat";
import {Montserrat_200ExtraLight} from "@expo-google-fonts/montserrat";
import {Montserrat_300Light} from "@expo-google-fonts/montserrat";
import {Montserrat_400Regular} from "@expo-google-fonts/montserrat";
import {Montserrat_500Medium} from "@expo-google-fonts/montserrat";
import {Montserrat_600SemiBold} from "@expo-google-fonts/montserrat";
import {Montserrat_700Bold} from "@expo-google-fonts/montserrat";
import {Montserrat_800ExtraBold} from "@expo-google-fonts/montserrat";
import {Montserrat_900Black} from "@expo-google-fonts/montserrat";

export default function Montserrat() {
    let [fontsLoaded] = useFonts({
        Montserrat_100Thin,
        Montserrat_200ExtraLight,
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_600SemiBold,
        Montserrat_700Bold,
        Montserrat_800ExtraBold,
        Montserrat_900Black
    });

    if (!fontsLoaded) {
        return null;
    }

    return {
        thin: 'Montserrat_100Thin',
        extraLight: 'Montserrat_200ExtraLight',
        light: 'Montserrat_300Light',
        regular: 'Montserrat_400Regular',
        medium: 'Montserrat_500Medium',
        semiBold: 'Montserrat_600SemiBold',
        bold: 'Montserrat_700Bold',
        extraBold: 'Montserrat_800ExtraBold',
        black: 'Montserrat_900Black'
    };
}