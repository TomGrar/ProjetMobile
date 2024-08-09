import { NetworkInfo } from 'react-native-network-info';

export const getLocalIPAddress = () => {
    return new Promise((resolve, reject) => {
        NetworkInfo.getIPAddress().then(ip => {
            resolve(ip);
        }).catch(error => {
            reject(error);
        });
    });
};