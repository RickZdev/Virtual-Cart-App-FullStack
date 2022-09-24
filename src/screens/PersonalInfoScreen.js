import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomTextInput from '../components/CustomTextInput'
import COLORS from '../global/COLORS'
import { CameraIcon } from 'react-native-heroicons/outline'

const PersonalInfoScreen = ({ navigation }) => {
  return (
    <ScrollView className='flex-1 bg-primary'>
        {/* Header */}
      <View className='flex-1 px-10 pt-5 justify-between pb-3 bg-white'>
        <Text className='text-primary font-NunitoBold text-2xl'>Getting Started...</Text>
        <Text className='text-primary font-NunitoBold text-xl text-center'>Set-Up your Profile</Text>
      </View>
      {/* Content */}
      <View className='flex-1 bg-primary items-center pt-8 px-10'>
        <View className='justify-center items-center w-32 h-32 rounded-lg p-2 bg-white'> 
            <Image
                source={require('../assets/images/avatar.png')}
                resizeMode='cover'
                className='w-full h-full'
            />
            <View className='bg-primary rounded-full border-2 border-white p-2 absolute -bottom-3 -right-2'>
              <CameraIcon size={15} color={COLORS.white}/>
            </View>
        </View>
        <View className='w-full mt-5'>
          <CustomTextInput title={'Last Name'}/>
          <CustomTextInput title={'First Name'}/>
          <CustomTextInput title={'Birthdate'}/>
          <View className='flex-1 justify-end mt-10'>
            <TouchableOpacity onPress={() => navigation.navigate('ContactInfoScreen')} className='mt-4 rounded-3xl bg-white justify-center items-center py-3 mx-10'>
              <Text className='text-primary text-2xl font-NunitoBold'>Continue</Text>
            </TouchableOpacity>
            <Text className='text-right font-NunitoBold text-2xl text-white mt-10'>Skip</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default PersonalInfoScreen

const styles = StyleSheet.create({})