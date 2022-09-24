import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import QRScanner from '../screens/QRScanner';
import QRGenerator from '../screens/QRGenerator';
import BottomTab from './BottomTab';
import QRScannerScreen from '../screens/QRScannerScreen';
import ProductDetails from '../screens/ProductDetails';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={BottomTab}>
      <Stack.Screen name="BottomTab" component={BottomTab} options={{ presentation: 'card' }} />
      <Stack.Screen name="QRScanner" component={QRScanner} options={{ presentation: 'transparentModal' }} />
      <Stack.Screen name="QRGenerator" component={QRGenerator} options={{ presentation: 'modal' }} />
    </Stack.Navigator>
  )
}

const QRScannerStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={QRScannerScreen}>
      <Stack.Screen name="QRScannerScreen" component={QRScannerScreen} options={{ presentation: 'card' }} />
      <Stack.Screen name="QRScanner" component={QRScanner} options={{ presentation: 'transparentModal' }} />
      <Stack.Screen name="QRGenerator" component={QRGenerator} options={{ presentation: 'modal' }} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ presentation: 'modal' }} />
    </Stack.Navigator>
  )
}




export { HomeStack, QRScannerStack };