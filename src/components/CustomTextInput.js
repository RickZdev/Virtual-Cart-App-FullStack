import { View, Text, TextInput } from 'react-native'
import React from 'react'

const CustomTextInput = ({title}) => {
  return (
    <View className='w-full mt-5'>
    <View className='absolute -top-2.5 left-5 bg-primary z-30 px-2'>
      <Text className='text-white'>{title}</Text>
    </View>
    <TextInput className='border-white border-[1px] rounded-xl'/>
  </View>
  )
}

export default CustomTextInput