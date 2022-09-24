import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeStack } from './AppStack'
import WelcomeScreen from '../screens/WelcomeScreen';
import AuthenticationScreen from '../screens/AuthenticationScreen';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';
import ContactInfoScreen from '../screens/ContactInfoScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={WelcomeScreen}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="AuthenticationScreen" component={AuthenticationScreen} />
      <Stack.Screen name="PersonalInfoScreen" component={PersonalInfoScreen} />
      <Stack.Screen name="ContactInfoScreen" component={ContactInfoScreen} />
      <Stack.Screen name="HomeStack" component={HomeStack} />
    </Stack.Navigator>
  )
}

export default AuthStack