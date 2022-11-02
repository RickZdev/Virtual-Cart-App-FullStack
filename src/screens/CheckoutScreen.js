import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import COLORS from '../global/COLORS'

const CheckoutScreen = ({ navigation }) => {
  const cart = useSelector((state) => state.cartListReducer.cartList)
  const cartTotal = useSelector((state) => state.cartListReducer.cartList.reduce((total, item) => 
  total += item.total, 0));

  return (
    <View className='flex-1 bg-white pb-28'>
      {/* header */}
      <View className='flex-row justify-between items-center bg-primary py-8 px-6' style={{ elevation: 10}}>

        <FontAwesome5 name='arrow-left' size={22} color={COLORS.white} onPress={() => navigation.goBack()}/>
        <Text className='font-PoppinsBold text-white text-2xl'>CHECKOUT</Text>
        <View />
      </View>

      <FlatList
        data={cart}
        keyExtractor={item => item.virtualCartUid}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <Header />}
        renderItem={({ item }) => <Card data={item}/>}
      />

      {/* amount & confirm */}
      <View className='absolute bottom-0 bg-white w-full border-[#eeeeee] border-t-[1px]' style={{ elevation: 10}}>
        <View className='flex-row items-center px-6 py-4'>
          <Text className='flex-1 text-black text-sm font-NunitoBold'>TOTAL AMOUNT</Text>
          <Text className='text-black font-NunitoBold text-lg'>₱{cartTotal.toLocaleString('en-US')}</Text>
        </View>
        <TouchableOpacity 
          onPress={() => navigation.navigate('CartQrScreen')}
          className='bg-[#70B9BE] justify-center items-center py-3'
        >
          <Text className='text-white py-2 font-PoppinsBold'>CONFIRM & PAY</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const Card = ({data}) => {
  const imageName = 'fresh-milk';
  const rawImage = require(`../assets/images/${imageName}.png`)
  return (
    <View className='flex-row items-center space-x-5 py-5 px-5 border-t-[2px] border-[#eeeeee]'>
      <View className='w-14 h-14'>
        <Image
          source={rawImage}
          resizeMode='contain'
          className='w-full h-full'
        />
      </View>

      <View className='flex-1 space-y-1'>
        <Text className='text-black font-NunitoBold text-base'>{data.productName}</Text>
        <Text className='flex-1 font-PoppinsMedium text-sm'>{data.size}</Text>
        <Text className='text-black font-NunitoBold text-sm'>₱{data.total.toLocaleString('en-US')}</Text>
      </View>
      <View>
        <Text className='text-black font-NunitoBold text-sm'>x{data.quantity}</Text>
      </View>
    </View>
  )
}

const Header = () => {
  return (
    <View className='py-5 pl-5'>
      <Text className='text-primary font-PoppinsBold text-base'>You virtual cart items</Text>
    </View>
  )
}

export default CheckoutScreen