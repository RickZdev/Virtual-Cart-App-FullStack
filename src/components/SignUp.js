import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native'
import { LockClosedIcon, UserIcon } from 'react-native-heroicons/outline'

const SignUp = () => {
  const navigation = useNavigation();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const { width } = Dimensions.get('window');

  return (
    <View style={{ width: width }} className='px-8'>
      <View className='flex-1 justify-center items-center'>
        <Text className='font-PoppinsRegular text-xl text-white text-center'>Create your account</Text>
      </View>
      <View className='space-y-5'>
        <View>
          <UserIcon color='#1D2639' size={27} style={{ position: 'absolute', zIndex: 1000, top: 10, left: 15 }} />
          <TextInput
            className='w-full bg-white rounded-xl pl-16 font-NunitoRegular text-base text-black'
            placeholder='Email'
            placeholderTextColor={'#DADADA'}
          />
        </View>

        <View>
          <LockClosedIcon color='#1D2639' size={27} style={{ position: 'absolute', zIndex: 1000, top: 10, left: 15 }} />
          <TextInput
            className='w-full bg-white rounded-xl pl-16 pr-5 font-NunitoRegular text-base text-black'
            placeholder='Create Password'
            placeholderTextColor={'#DADADA'}
          />
        </View>

        <View>
          <LockClosedIcon color='#1D2639' size={27} style={{ position: 'absolute', zIndex: 1000, top: 10, left: 15 }} />
          <TextInput
            className='w-full bg-white rounded-xl pl-16 pr-5 font-NunitoRegular text-base text-black'
            placeholder='Confirm Password'
            placeholderTextColor={'#DADADA'}
          />
        </View>
      </View>
      <View className='flex-row space-x-2 items-center justify-center px-5'>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(toggle) => setToggleCheckBox(toggle)}
          tintColors={{ true: 'white', false: 'white' }}
          style={{ top: 5 }}
        />
        <Text className='font-PoppinsRegular text-[10px] text-white text-left mt-4'>
          By creating an account you agree to Huawei {'\n'}
          <Text className='font-PoppinsBold'>Terms of Use</Text> and <Text className='font-PoppinsBold'>Privacy Policy</Text>.
        </Text>
      </View>

      <TouchableOpacity className='mt-4 rounded-3xl bg-white justify-center items-center py-3 mx-10'>
        <Text className='text-primary text-2xl font-NunitoBold'>Join us</Text>
      </TouchableOpacity>

      <View className='flex-1 justify-center items-center'>
        <View className='w-full'>
          <View className='w-full bg-white border-[1px] border-white' />
          <View className='justify-center items-center'>
            <Text className='text-white font-PoppinsRegular text-base bg-primary px-3 -top-3'>or Sign up using </Text>
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

export default SignUp