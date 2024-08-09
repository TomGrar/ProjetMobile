import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        return token;
    } catch (error) {
        console.error("Erreur lors de la récupération du token:", error);
        return null;
    }
};