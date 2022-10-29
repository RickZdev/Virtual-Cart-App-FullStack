import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ToastAndroid, StyleSheet } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import { cartListAction,  } from '../redux/features/cartSlice'
import COLORS from '../global/COLORS';

const CartScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartListReducer.cartList)
  const cartTotal = useSelector((state) => state.cartListReducer.cartList.reduce((total, item) => 
    total += item.amount,
  0));

  const [refreshing, setRefreshing] = useState(false);

  const getCart = async () => {
    const value = await AsyncStorage.getItem('cart');
    if (value !== null) {
      setCart(JSON.parse(value));
      setNumberOfItems(cart.length);

      let subtotal = 0;
      cart.map((item) => {
        subtotal += item.amount 
      })

      setSubtotal(subtotal)
    } else {
      setCart([])
    }
  }

  useEffect(() => {
  }, [cart])

  const handleRemoveCartStorage = async () => {
    await AsyncStorage.removeItem('cart');
    ToastAndroid.show('Remove Cart Successfully!', ToastAndroid.LONG);
  }

  const handleRemoveItem = (item) => {
    dispatch(cartListAction.removeItemToCart(item.virtualCartUid))
  }

  const onRefresh = () => {
    ToastAndroid.show('Refreshing...', ToastAndroid.SHORT);
    // getCart();
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 200)
  }

  const hiddenItem = (data) => {
    return (
      <View style={styles.rowBack} >
        <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={() => handleRemoveItem(data.item)}>
          <FontAwesome5 name="trash" size={28} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View className='flex-1 pt-10'>
      <TouchableOpacity onPress={handleRemoveCartStorage}>
        <Text className='font-PoppinsBold text-2xl text-primary pl-5'>Your Virtual Cart</Text>
      </TouchableOpacity>
      <View className='px-5 pt-5 mb-8'>
      <SwipeListView
        data={cart}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item }) => <Card data={item} />}
        renderHiddenItem={(data) => hiddenItem(data)}
        rightOpenValue={-75}
        closeOnRowPress={true}
      />
      </View>
      <View className='absolute bottom-0 w-full bg-white'>
        <Text className='text-[#DFDFDF] text-sm font-PoppinsBold'>{cart.length} items</Text>
        <Text className='text-black text-lg font-PoppinsBold'>Subtotal: {cartTotal}</Text>
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

const styles = StyleSheet.create({
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 23
  },
  backRightBtnRight: {
    backgroundColor: COLORS.primary,
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
})

export default CartScreen