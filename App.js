import LoginScreen from "./Screens/LoginScreen";
import HomeScreen from "./Screens/HomeScreen";
import MyProfileScreen from "./Screens/MyProfileScreen";
import EditProfileScreen from "./Screens/EditChoiceProfileScreen"
import EditPasswordScreen from "./Screens/EditPasswordScreen"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from "@react-navigation/native";
import EditMainInformationScreen from "./Screens/EditMainInformationScreen";
import EditSports from "./Screens/SportsProfileEditScreen";
import SearchEventScreen from "./Screens/SearchEventScreen";
import SearchProfileScreen from "./Screens/SearchProfileScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import InfoEventScreen from "./Screens/EventInformationScreen";
import EventInvitationScreen from "./Screens/SearchEventScreenInvitation";
import MyEventsScreen from "./Screens/SearchMyEventsScreen";
import EventEditScreen from "./Screens/EditEventInformations";
import CreateEventScreen from "./Screens/CreateEventScreen";
import RegisterScreen from "./Screens/RegisterScreen";

export default function App() {

    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="MyProfile" component={MyProfileScreen} options={{ animation: 'fade_from_bottom'}}/>
                <Stack.Screen name="EditingProfile" component={EditProfileScreen} options={{ animation: 'fade_from_bottom'}}/>
                <Stack.Screen name="EditPassword" component={EditPasswordScreen}/>
                <Stack.Screen name="EditMainInformation" component={EditMainInformationScreen}/>
                <Stack.Screen name="EditSports" component={EditSports}/>
                <Stack.Screen name="SearchEvents" component={SearchEventScreen}/>
                <Stack.Screen name="SearchProfiles" component={SearchProfileScreen} options={{ animation: 'slide_from_left' }}/>
                <Stack.Screen name='ProfileScreen' component={ProfileScreen}/>
                <Stack.Screen name='EventInformation' component={InfoEventScreen} options={{ animation: 'slide_from_right'}}/>
                <Stack.Screen name='EventInvitation' component={EventInvitationScreen} options={{ animation: 'fade_from_bottom'}}/>
                <Stack.Screen name='MyEvents' component={MyEventsScreen} options={{ animation: 'fade_from_bottom'}}/>
                <Stack.Screen name='EditEvent' component={EventEditScreen} options={{ animation: 'fade_from_bottom'}}/>
                <Stack.Screen name='CreateEvent' component={CreateEventScreen} options={{ animation: 'fade_from_bottom'}}/>
                <Stack.Screen name='Register' component={RegisterScreen} options={{ animation: 'fade_from_bottom'}}/>
            </Stack.Navigator>
        </NavigationContainer>
      );
}