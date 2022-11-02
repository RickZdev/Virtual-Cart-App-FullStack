import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import BottomTab from './BottomTab';
import QRGenerator from '../screens/QRGenerator';
import QRScannerScreen from '../screens/QRScannerScreen';
import ProductDetails from '../screens/ProductDetails';
import MealPlannerScreen from '../screens/MealPlannerScreen';
import MealDetailsScreen from '../screens/MealDetailsScreen';
import PaymentOptionScreen from '../screens/PaymentOptionScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import CartQrScreen from '../screens/CartQrScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={BottomTab}>
      <Stack.Screen name="BottomTab" component={BottomTab} options={{ presentation: 'card' }} />
      <Stack.Screen name="QRScannerScreen" component={QRScannerScreen} options={{ ...TransitionPresets.ModalPresentationIOS }} />
      <Stack.Screen name="QRGenerator" component={QRGenerator} options={{ presentation: 'modal' }} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ ...TransitionPresets.ModalPresentationIOS }} />
      <Stack.Screen name="PaymentOptionScreen" component={PaymentOptionScreen} options={{ presentation: 'transparentModal' }} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
      <Stack.Screen name="CartQrScreen" component={CartQrScreen} options={{ ...TransitionPresets.ModalSlideFromBottomIOS }} />
    </Stack.Navigator>
  )
}

const CartStack = () => {
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={CartScreen}>
      <Stack.Screen name="CartScreen" component={CartScreen} options={{ presentation: 'modal' }} />
    </Stack.Navigator>
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

export { HomeStack, CartStack, QRScannerStack, MealPlannerStack };