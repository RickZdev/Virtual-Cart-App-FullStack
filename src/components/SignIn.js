import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { LockClosedIcon, UserIcon } from 'react-native-heroicons/outline'

const SignIn = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');

  return (
    <View style={{ width: width }} className='px-8'>
      <Text className='mt-9 font-PoppinsRegular text-xl text-white text-center'>Login to your account</Text>
      <View className='mt-8 space-y-5'>
        <View>
          <UserIcon color='#1D2639' size={27} style={{ position: 'absolute', zIndex: 1000, top: 10, left: 15 }} />
          <TextInput
            className='w-full bg-white rounded-xl pl-16 font-NunitoRegular text-base text-black'
            placeholder='Username'
            placeholderTextColor={'#DADADA'}
          />
        </View>

        <View>
          <LockClosedIcon color='#1D2639' size={27} style={{ position: 'absolute', zIndex: 1000, top: 10, left: 15 }} />
          <TextInput
            className='w-full bg-white rounded-xl pl-16 pr-5 font-NunitoRegular text-base text-black'
            placeholder='Password'
            placeholderTextColor={'#DADADA'}
          />
        </View>
      </View>

      <Text className='font-PoppinsRegular text-base text-white text-center mt-4'>Forgot Password</Text>
      <TouchableOpacity onPress={() => navigation.navigate('PersonalInfoScreen')} className='mt-4 rounded-3xl bg-white justify-center items-center py-3 mx-10'>
        <Text className='text-primary text-2xl font-NunitoBold'>Login</Text>
      </TouchableOpacity>

      <View className='flex-1 justify-center items-center'>
        <View className='w-full'>
          <View className='w-full bg-white border-[1px] border-white' />
          <View className='justify-center items-center'>
            <Text className='text-white font-PoppinsRegular text-base bg-primary px-3 -top-3'>or continue with </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('HomeStack')} className='flex-row space-x-3 rounded-3xl bg-[#FF3434] w-full justify-center items-center py-3'>
          <Image
            source={require('../assets/images/huawei-logo.png')}
            resizeMode='cover'
          />
          <Text className='text-white text-2xl font-NunitoBold'>Huawei ID</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignIn