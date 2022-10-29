import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View className='flex-1 bg-white '>
      <Text className='text-4xl text-center pt-28 text-primary font-NunitoBold'>WELCOME TO</Text>
      <View className='flex-1 justify-center items-center'>
        <Image
          source={require('../assets/images/logo.png')}
          resizeMode='cover'
        />
        <Text className='text-xl text-primary mt-3 font-PoppinsMedium'> Your Virtual Cart </Text>
      </View>
      <View className='flex-1 justify-center items-center space-y-4 px-[75px]'>
        <TouchableOpacity onPress={() => navigation.navigate('AuthenticationScreen')} className='rounded-3xl bg-primary w-full justify-center items-center py-3'>
          <Text className='text-white text-2xl font-NunitoBold'>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AuthenticationScreen')} className='rounded-3xl bg-white w-full justify-center items-center py-3 border-[1px]'>
          <Text className='text-primary text-2xl font-NunitoBold'>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default WelcomeScreen