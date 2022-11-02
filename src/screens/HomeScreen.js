import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { BellIcon } from 'react-native-heroicons/outline'

import SaleSection from '../components/SaleSection'
import FeaturedSection from '../components/FeaturedSection'
import COLORS from '../global/COLORS'
import { useColorScheme } from "nativewind";

const HomeScreen = ({ navigation }) => {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <ScrollView>
      <View className='flex-1 pb-8 dark:bg-primary'>
        {/* header */}
        <View className='flex-row justify-between items-center pt-5 px-5'>
          <View className='flex-row space-x-3'>
            <TouchableOpacity onPress={() => navigation.navigate('QRGenerator')} className='w-12 h-12'>
              <Image
                source={require('../assets/images/avatar1.jpg')}
                resizeMode='contain'
                className='w-full h-full rounded-full'
              />
            </TouchableOpacity>
            <View>
              <Text className='text-primary text-base font-PoppinsBold'>Welcome!</Text>
              <Text className='text-primary text-base font-PoppinsMedium'>Frederick Castaneda Jr.</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setColorScheme(colorScheme === "light" ? "dark" : "light")}
          >
            <BellIcon size={32} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        {/* sale section */}
        <SaleSection />
        {/* featured section */}
        <FeaturedSection />
      </View>
    </ScrollView>
  )
}

export default HomeScreen