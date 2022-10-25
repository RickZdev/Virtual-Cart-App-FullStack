import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import WelcomeScreen from './WelcomeScreen';

const OnSplashScreen = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, [])
    
  return (
    <WelcomeScreen />
  )
}

export default OnSplashScreen