import React from 'react'
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeIcon, ShoppingCartIcon, ClockIcon, QrCodeIcon, UserIcon } from "react-native-heroicons/outline";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from '../screens/HomeScreen'
import OrderHistoryScreen from '../screens/OrderHistoryScreen'
import CartScreen from '../screens/CartScreen'
import ProfileScreen from '../screens/ProfileScreen'
import COLORS from '../global/COLORS'
import { QRScannerStack } from './AppStack';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName={HomeScreen}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.white,
          height: 65,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.black,
        tabBarInactiveTintColor: COLORS.primary,
        tabBarHideOnKeyboard: true,
        tabBarIconStyle: { size: 42 }
      }}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <HomeIcon color={color} size={size} fill={ focused ? COLORS.primary : null}/>
          ),
          tabBarItemStyle: { borderTopColor: 2 }
        }}
      />

      <Tab.Screen name="OrderHistoryScreen" component={OrderHistoryScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons name='history' color={color} size={size} fill={ focused ? COLORS.primary : null}/>
          ),
        }}
      />

      <Tab.Screen name="QRScannerStack" component={QRScannerStack}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View className='bg-primary w-16 h-16 justify-center items-center rounded-full -top-7' style={{ elevation: 10 }}>
              <MaterialCommunityIcons name='line-scan' color={COLORS.white} size={40} fill={ focused ? COLORS.primary : null}/>
            </View>
          ),
        }}
      />

      <Tab.Screen name="CartScreen" component={CartScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <ShoppingCartIcon color={color} size={size} fill={ focused ? COLORS.primary : null}/>
          ),
        }}
      />

      <Tab.Screen name="ProfileScreen" component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <UserIcon color={color} size={size} fill={ focused ? COLORS.primary : null}/>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTab