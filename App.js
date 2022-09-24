import 'react-native-gesture-handler'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigations/AuthStack';
import { StatusBar } from 'react-native';

const App = () => {
  StatusBar.setBarStyle('dark-content');
  StatusBar.setBackgroundColor('white');
  return (
    <NavigationContainer theme={{ colors: { background: 'white' } }}>
      <AuthStack />
    </NavigationContainer>
  );
};

export default App;
