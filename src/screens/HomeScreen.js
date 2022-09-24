import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BellIcon } from 'react-native-heroicons/outline'
import COLORS from '../global/COLORS'
import SaleSection from '../components/SaleSection'
import FeaturedSection from '../components/FeaturedSection'

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <View className='flex-1 pb-8'>
        {/* header */}
        <View className='flex-row justify-between items-center pt-5 px-5'>
          <View className='flex-row space-x-3'>
            <View className='w-12 h-12'>
              <Image
                source={require('../assets/images/avatar.png')}
                resizeMode='contain'
                className='w-full h-full rounded-full'
              />
            </View>
            <View>
              <Text className='text-primary text-base font-PoppinsBold'>Welcome!</Text>
              <Text className='text-primary text-base font-PoppinsMedium'>Ben Ten</Text>
            </View>
          </View>
          <BellIcon size={32} color={COLORS.primary} />
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