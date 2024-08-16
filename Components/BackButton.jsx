import {TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';

export default function BackButton({style, onPress, color, children, right}){
    const navigation = useNavigation();

    return(
    <TouchableOpacity style={[{position:"absolute", flexDirection: 'row', alignItems: 'center'}, style]} onPress={onPress || navigation.goBack}>
        {right && (
            <Icon name={'chevron-right'} color={color ? color : 'white'} size={25}/>
        ) ||
        <Icon name={'chevron-left'} color={color ? color : 'white'} size={25}/>
        }
        {children}
    </TouchableOpacity>
    );
}
