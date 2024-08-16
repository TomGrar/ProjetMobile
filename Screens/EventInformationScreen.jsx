import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View} from 'react-native';
import GrayRectangle from "../Components/GreyRectangle";
import BackButton from "../Components/BackButton";
import { useNavigation } from '@react-navigation/native';
import Montserrat from "../assets/MontSerratFonts";
import ButtonRectangle from "../Components/ButtonRectangle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ProfileButton from "../Components/Profile/ProfileButtonList";
import api from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export default function EventInformation({ route }) {
    const { event } = route.params;
    const navigation = useNavigation();
    const [participants, setParticipants] = useState([]);
    const [creator, setCreator] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState(null);
    const fontStyles = Montserrat();

    useEffect(() => {
        const getEventData = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                setCurrentUserId(Number(userId));

                // Fetch participants
                const participantsResponse = await api.get(`/app/member/allParticipants/${event.id}`);
                setParticipants(participantsResponse.data);

                // Fetch creator
                const creatorResponse = await api.get(`/app/member/profile/${event.creatorid}`);
                setCreator(creatorResponse.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getEventData();
    }, [event.id]);

    const handleRegister = async () => {
        try {
            await api.post('/app/appointment/register', {
                memberId: currentUserId,
                eventId: event.id
            });
            const participantsResponse = await api.get(`/app/member/allParticipants/${event.id}`);
            setParticipants(participantsResponse.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUnregister = async () => {
        try {
            await api.post('/app/appointment/unregister', {
                memberId: currentUserId,
                eventId: event.id
            });
            const participantsResponse = await api.get(`/app/member/allParticipants/${event.id}`);
            setParticipants(participantsResponse.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditEvent = () => {
        navigation.navigate('EditEvent', { event });
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#e8871e" />;
    }

    if (!fontStyles) {
        return null;
    }

    const isCreator = currentUserId === event.creatorid;
    const isParticipant = participants.some(participant => participant.id === currentUserId);

    return (
        <View style={styles.container}>
            <GrayRectangle>
                <Text style={[styles.textEvent, { fontFamily: fontStyles.bold }]}>Événement</Text>
                <BackButton style={styles.backButton} />
            </GrayRectangle>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.eventDetails}>
                    <Text style={[styles.eventTitle, { fontFamily: fontStyles.bold }]}>{event.name}</Text>
                    <View style={styles.eventRow}>
                        <Icon name="run" style={styles.icon} />
                        <Text style={styles.eventText}>{event.sport}</Text>
                    </View>
                    <View style={styles.eventRow}>
                        <Icon name="map-marker" style={styles.icon} />
                        <Text style={styles.eventText}>{event.city}</Text>
                    </View>
                    <View style={styles.eventRow}>
                        <Icon name="calendar" style={styles.icon} />
                        <Text style={styles.eventText}>{formatDate(event.date)}</Text>
                    </View>
                    <Text style={styles.descriptionText}>{event.description}</Text>
                </View>

                {creator && (
                    <View style={styles.creatorSection}>
                        <Text style={[styles.sectionTitle, { fontFamily: fontStyles.bold }]}>Créateur de l'événement</Text>
                        <ProfileButton profile={creator} />
                    </View>
                )}

                <View style={styles.participantsSection}>
                    <Text style={[styles.sectionTitle, { fontFamily: fontStyles.bold }]}>Participants</Text>
                    {participants
                        .filter(participant => participant.id !== currentUserId)  // Exclut le participant avec l'ID currentUserId
                        .map((participant) => (
                            <ProfileButton key={participant.id} profile={participant} />
                        ))
                    }
                </View>
            </ScrollView>

            <View style={styles.buttonContainer}>
                {isCreator ? (
                    <ButtonRectangle style={styles.buttonEdit} onPress={handleEditEvent}>
                        <Icon name="pencil" color="white" size={25} />
                        <Text style={[styles.textEdit, { fontFamily: fontStyles.bold }]}>Modifier l'événement</Text>
                    </ButtonRectangle>
                ) : isParticipant ? (
                    <ButtonRectangle style={styles.buttonConfirm} onPress={handleUnregister}>
                        <Icon name="minus-thick" color="white" size={25} />
                        <Text style={[styles.textConfirm, { fontFamily: fontStyles.bold }]}>Ne plus participer</Text>
                    </ButtonRectangle>
                ) : (
                    <ButtonRectangle style={styles.buttonConfirm} onPress={handleRegister}>
                        <Icon name="plus-thick" color="white" size={25} />
                        <Text style={[styles.textConfirm, { fontFamily: fontStyles.bold }]}>S'inscrire à l'événement</Text>
                    </ButtonRectangle>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f7fb',
    },
    textEvent: {
        color: 'white',
        fontSize: 23,
    },
    backButton: {
        left: '5%',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
        paddingBottom: 80, // Espace pour le bouton en bas
    },
    eventDetails: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
        marginBottom: 20,
        alignItems: "center"
    },
    eventTitle: {
        fontSize: 24,
        marginBottom: 15,
        color: '#333',
    },
    eventRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    eventText: {
        fontSize: 18,
        marginLeft: 10,
        color: '#555',
    },
    icon: {
        fontSize: 20,
        color: '#E8871E',
    },
    descriptionText: {
        fontSize: 18,
        marginTop: 15,
        color: '#666',
    },
    creatorSection: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
        marginBottom: 20,
        alignItems: "center"

    },
    participantsSection: {
        marginTop: 20,
        alignItems: 'center'
    },
    sectionTitle: {
        fontSize: 20,
        marginBottom: 10,
        color: '#333',

    },
    buttonContainer: {
        bottom: '3%',
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    buttonConfirm: {
        backgroundColor: '#E8871E',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonEdit: {
        backgroundColor: '#E8871E',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 10,
    },
    textConfirm: {
        fontSize: 18,
        color: 'white',
        marginLeft: 10,
    },
    textEdit: {
        fontSize: 18,
        color: 'white',
        marginLeft: 10,
    },
});
