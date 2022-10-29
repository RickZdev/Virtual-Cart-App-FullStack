import 'react-native-gesture-handler'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox, StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import store from './src/redux/store';
import AuthStack from './src/navigations/AuthStack';

const App = () => {
  LogBox.ignoreAllLogs(true)
  StatusBar.setBarStyle('dark-content');
  StatusBar.setBackgroundColor('white');
  return (
    <NavigationContainer theme={{ colors: { background: 'white' } }}>
      <Provider store={store}>
        <AuthStack />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
