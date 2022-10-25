import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeStack } from './AppStack'
import WelcomeScreen from '../screens/WelcomeScreen';
import AuthenticationScreen from '../screens/AuthenticationScreen';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';
import ContactInfoScreen from '../screens/ContactInfoScreen';
import OnSplashScreen from '../screens/OnSplashScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={OnSplashScreen}>
      <Stack.Screen name="OnSplashScreen" component={OnSplashScreen} options={{ presentation: 'card' }} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ presentation: 'modal' }}/>
      <Stack.Screen name="AuthenticationScreen" component={AuthenticationScreen} options={{ presentation: 'modal' }}/>
      <Stack.Screen name="PersonalInfoScreen" component={PersonalInfoScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="ContactInfoScreen" component={ContactInfoScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="HomeStack" component={HomeStack} options={{ presentation: 'card' }}/>
    </Stack.Navigator>
  )
}

export default AuthStack