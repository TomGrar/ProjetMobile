import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ImageProfile from "./Profile/ImageProfile";
import Montserrat from "../assets/MontSerratFonts";
import { useNavigation } from "@react-navigation/native";

export default function ProfileButton({ profile }) {
    const navigation = useNavigation();
    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }

    const goProfileScreenInformation = () => {
        navigation.navigate('ProfileScreen', { profile: profile });
    };

    return (
        <TouchableOpacity style={styles.container} onPress={goProfileScreenInformation}>
            <ImageProfile style={{ marginTop: 0, marginRight: '3%' }} />
            <View style={[styles.column, { flex: 1 }]}>
                <View style={{ flexDirection: 'column', height: '50%', justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontFamily: fontStyles.bold }}>
                        {profile.firstname} {profile.lastname}
                    </Text>
                </View>
                <View style={{ flexDirection: 'column', height: '50%', alignItems: 'center' }}>
                    <Text style={{ fontFamily: fontStyles.medium, fontSize: 11 }}>{profile.country}</Text>
                    <Text style={{ fontFamily: fontStyles.medium, fontSize: 13 }}>{profile.postalcode}</Text>
                </View>
            </View>
            <View style={[styles.column, { flex: 1 }]}>
                <View style={{ flexDirection: 'column', height: '80%', justifyContent: 'space-around', alignItems: 'center' }}>
                    {profile.sports.map((sport, index) => (
                        <Text
                            key={index}
                            style={{
                                fontFamily: fontStyles.regular,
                                fontSize: 12,
                                flexWrap: 'wrap',  // Ensure text wraps
                                textAlign: 'center', // Center align text for better readability
                            }}
                        >
                            {sport.name} - {sport.nbYears}
                        </Text>
                    ))}
                </View>
            </View>
            <View style={[styles.column, { flex: 0.4 }]}>
                <Icon name={'chevron-right'} size={24} color={'#46494c'} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 97,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '2%',
        marginBottom: '2%',
        borderBottomLeftRadius: 99999,
        borderTopLeftRadius: 99999,
        borderBottomRightRadius: 20000,
        borderTopRightRadius: 20000,
        paddingHorizontal: 10, // Added padding to avoid clipping
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '60%',
    },
});
