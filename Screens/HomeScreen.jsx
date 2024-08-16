import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, ActivityIndicator } from 'react-native';
import SearchButtons from "../Components/Home/SearchButtons";
import ListEvents from "../Components/Home/ListEvents";
import GrayRectangle from "../Components/GreyRectangle";
import Logo from "../Components/Logo";
import RoundButton from "../Components/RoundButton";
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import api from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
    const navigation = useNavigation();
    const [eventsData, setEventsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getEventsData = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                const response = await api.get(`/app/event/all/${userId}`);
                setEventsData(response.data);
            } finally {
                setLoading(false);
            }
        };

        getEventsData();

        const refresh = navigation.addListener('focus', () => {
            getEventsData(); // Recharger les événements lorsque l'écran devient actif
        });

        return refresh;
    }, [navigation]);

    const goToProfile= () => {
        navigation.navigate('MyProfile');
    }

    const goToMyEvents= () => {
        navigation.navigate('MyEvents');
    }

    if (loading) {
        return <ActivityIndicator size="large" color="#e8871e" />;
    }

    return (
        <View style={styles.container}>
            <GrayRectangle>
                <Logo />
                <RoundButton style={styles.profilButton} onPress={goToProfile}>
                    <Icon name={'account-outline'} size={Dimensions.get('window').width * 0.09} color={'#46494c'} />
                </RoundButton>
            </GrayRectangle>
            <SearchButtons style={{ height: '30%' }} />
            <ListEvents events={eventsData} />
            <RoundButton style={styles.eventButton} onPress={goToMyEvents}>
                <Icon name={'calendar'} size={Dimensions.get('screen').width * 0.09} color={'white'} />
            </RoundButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
    },
    eventButton: {
        bottom: '5%',
        right: '5%',
    },
    profilButton: {
        bottom: '5%',
        right: '5%',
        width: '10%',
        backgroundColor: '#ECEAEA'
    },
});
