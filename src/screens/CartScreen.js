import { View, Text, TouchableOpacity, FlatList, Image, ToastAndroid, RefreshControl, } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
  const [cart, setCart] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getCart();
  }, [])

  const getCart = async () => {
    const value = await AsyncStorage.getItem('cart');
    if (value !== null) {
      setCart(JSON.parse(value));
    } else {
      setCart([])
    }
  }

  const handleRemoveCartStorage = async () => {
    await AsyncStorage.removeItem('cart');
    ToastAndroid.show('Remove Cart Successfully!', ToastAndroid.LONG);
  }

  const onRefresh = () => {
    ToastAndroid.show('Refreshing...', ToastAndroid.SHORT);
    getCart();
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 200)
  }

  return (
    <View className='flex-1 pt-10'>
      <TouchableOpacity onPress={handleRemoveCartStorage}>
        <Text className='font-PoppinsBold text-2xl text-primary pl-5'>Your Virtual Cart</Text>
      </TouchableOpacity>
      <View className='flex-1 px-5 pt-5'>
        <FlatList
          data={cart}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({ item }) => <Card data={item} />}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
            />}
        />
      </View>
    </View>
  )
}

const Card = ({ data }) => {
  return (
    <View className='bg-[#ECF0F9] rounded-xl mb-3'>
      <View className='flex-row space-x-2 p-2'>
        <View className='justify-center items-center space-y-3 w-20'>
          <Text className='font-PoppinsMedium text-primary text-sm'>Qty</Text>
          <View className='items-start'>
            <View className='px-3 py-1 bg-white rounded-md'>
              <Text className='font-PoppinsBold text-primary text-base'>{data.quantity}</Text>
            </View>
          </View>
          <Text className='font-PoppinsBold text-primary text-sm'>P{data.amount}.00</Text>
        </View>
        <View className='bg-black h-full w-[1px]' />
        <View className='items-center flex-row justify-between space-x-2'>
          <View className='justify-center items-center w-16 h-16'>
            <Image
              source={require('../assets/images/fresh-milk.png')}
              resizeMode='contain'
              className='w-full h-full'
            />
          </View>
          <View className='space-y-2'>
            <Text className='font-PoppinsBold text-primary text-base w-36' numberOfLines={1}>{data.productName}</Text>
            <Text className='font-PoppinsRegular text-primary text-base'>{data?.productDesc ?? 'Lorem ipsum '}</Text>
          </View>
        </View>
      </View>
    </View>

  )
}

export default CartScreen