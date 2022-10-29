import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { MealPlannerStack, QRScannerStack } from './AppStack';
import HomeScreen from '../screens/HomeScreen'
import CartScreen from '../screens/CartScreen'
import GroceryListScreen from '../screens/GroceryListScreen';
import COLORS from '../global/COLORS'

const Tab = createBottomTabNavigator();

const BottomTab = ({ navigation }) => {
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
            focused ?
            <MaterialCommunityIcons name='home-search' color={color} size={size} /> :
            <MaterialCommunityIcons name='home-search-outline' color={color} size={size} /> 
          ),
        }}
      />

      <Tab.Screen name="CartScreen" component={CartScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            focused ?
            <Ionicons name='ios-cart' color={color} size={size} /> :
            <Ionicons name='ios-cart-outline' color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen name="QRScannerStack" component={QRScannerStack}
        options={{
          tabBarIcon: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('QRScannerScreen')}
              className='bg-primary w-16 h-16 justify-center items-center rounded-full -top-7' 
              style={{ elevation: 10 }}
            >
              <MaterialCommunityIcons name='line-scan' color={COLORS.white} size={40} />
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen name="GroceryListScreen" component={GroceryListScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            focused ? 
            <MaterialCommunityIcons name='clipboard-text' color={color} size={size} /> :
            <MaterialCommunityIcons name='clipboard-text-outline' color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen name="MealPlannerStack" component={MealPlannerStack}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            focused ?
            <Ionicons name='ios-fast-food' color={color} size={size} /> :
            <Ionicons name='ios-fast-food-outline' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTab