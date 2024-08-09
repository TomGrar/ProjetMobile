import React, {useState} from 'react';
import LoginScreen from "./Screens/LoginScreen";
import HomeScreen from "./Screens/HomeScreen";
import MyProfileScreen from "./Screens/MyProfileScreen";
import EditProfileScreen from "./Screens/EditChoiceProfileScreen"
import EditPassword from "./Screens/EditPassword"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from "@react-navigation/native";
import EditMainInformationScreen from "./Screens/EditMainInformationScreen";
import EditSports from "./Screens/SportsProfileEditScreen";
import SearchEventScreen from "./Screens/SearchEventScreen";
import SearchProfileScreen from "./Screens/SearchProfileScreen";
import ProfileScreen from "./Screens/ProfileScreen";

export default function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="MyProfile" component={MyProfileScreen} options={{ animation: 'fade_from_bottom'}}/>
                <Stack.Screen name="EditingProfile" component={EditProfileScreen} options={{ animation: 'fade_from_bottom'}}/>
                <Stack.Screen name="EditPassword" component={EditPassword}/>
                <Stack.Screen name="EditMainInformation" component={EditMainInformationScreen}/>
                <Stack.Screen name="EditSports" component={EditSports}/>
                <Stack.Screen name="SearchEvents" component={SearchEventScreen}/>
                <Stack.Screen name="SearchProfiles" component={SearchProfileScreen} options={{ animation: 'slide_from_left' }}/>
                <Stack.Screen name='ProfileScreen' component={ProfileScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
      );
}