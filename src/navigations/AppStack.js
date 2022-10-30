import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import BottomTab from './BottomTab';
import QRGenerator from '../screens/QRGenerator';
import QRScannerScreen from '../screens/QRScannerScreen';
import ProductDetails from '../screens/ProductDetails';
import MealPlannerScreen from '../screens/MealPlannerScreen';
import MealDetailsScreen from '../screens/MealDetailsScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={BottomTab}>
      <Stack.Screen name="BottomTab" component={BottomTab} options={{ presentation: 'card' }} />
      <Stack.Screen name="QRScannerScreen" component={QRScannerScreen} options={{ ...TransitionPresets.ModalPresentationIOS }} />
      <Stack.Screen name="QRGenerator" component={QRGenerator} options={{ presentation: 'modal' }} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ ...TransitionPresets.ModalPresentationIOS }} />
    </Stack.Navigator>
  )
}

const QRScannerStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={QRScannerScreen}>
      <Stack.Screen name="QRScannerScreen" component={QRScannerScreen} options={{ presentation: 'card' }} />
    </Stack.Navigator>
  )
}

const MealPlannerStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={MealPlannerScreen}>
      <Stack.Screen name="MealPlannerScreen" component={MealPlannerScreen} options={{ presentation: 'card' }} />
      <Stack.Screen name="MealDetailsScreen" component={MealDetailsScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
    </Stack.Navigator>
  )
}

export { HomeStack, QRScannerStack, MealPlannerStack };