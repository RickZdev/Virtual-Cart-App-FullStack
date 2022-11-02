import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, ToastAndroid, StyleSheet, RefreshControl } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view';
import { useSelector, useDispatch } from 'react-redux';
import { PlusIcon, MinusIcon  } from 'react-native-heroicons/outline'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import { cartListAction,  } from '../redux/features/cartSlice'
import COLORS from '../global/COLORS';

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartListReducer.cartList)
  const cartTotal = useSelector((state) => state.cartListReducer.cartList.reduce((total, item) => 
    total += item.total, 0));
  const cartTotalItems = useSelector((state) => state.cartListReducer.cartList.reduce((total, item) => 
    total += item.quantity, 0));
  const [refreshing, setRefreshing] = useState(false);

  const handleRemoveItem = (item) => {
    dispatch(cartListAction.removeItemToCart(item.virtualCartUid))
  }

  const onRefresh = () => {
    ToastAndroid.show('Refreshing...', ToastAndroid.SHORT);
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
      <TouchableOpacity>
        <Text className='font-PoppinsBold text-2xl text-primary pl-5'>Your Virtual Cart</Text>
      </TouchableOpacity>
      <View className='px-5 pt-5 mb-24'>
        <SwipeListView
          data={cart}
          keyExtractor={(_item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          rightOpenValue={-75}
          closeOnRowPress={true}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
            />
          }
          renderHiddenItem={(data) => hiddenItem(data)}
          renderItem={({ item }) => <Card data={item} />}
        />
      </View>
      {
        cartTotalItems !== 0 && 
        <View className='absolute bottom-3 w-full'>
          <TouchableOpacity
            onPress={() => navigation.navigate('PaymentOptionScreen')}
            activeOpacity={.6}
            className='bg-[#70B9BE] mx-3 rounded-lg h-14 px-2 py-1 flex-row items-center justify-between' 
            style={{ elevation: 3}}
          >
            <View className='flex-row items-center space-x-1'>
              <View className='justify-center items-center bg-primary w-10 h-10 rounded-lg'>
                <Text className='text-white text-base font-PoppinsBold'>{cartTotalItems}</Text>
              </View>
              <Text className='text-white text-base font-PoppinsBold'>{cartTotalItems > 1 ? 'Items' : 'Item'}</Text>
            </View>
            <Text className='text-white text-base font-PoppinsBold'>Total: ₱{cartTotal.toLocaleString('en-US')}</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  )
}

const Card = ({ data }) => {
  const dispatch = useDispatch();
  const cartTotal = useSelector((state) => state.cartListReducer.cartList.reduce((total, item) => 
  item.price * item.quantity, 0));

  const handleAddQuantity = () => {
    dispatch(cartListAction.addItemQuantity(data.virtualCartUid))
  }

  const handleRemoveQuantity = () => {
    dispatch(cartListAction.removeItemQuantity(data.virtualCartUid))
  }

  return (
    <View className='bg-[#ECF0F9] rounded-xl mb-3'>
      <View className='flex-row space-x-5 p-4'>
        {/* quantity */}
        <View className='justify-center items-center space-y-3 w-20'>
          <Text className='font-PoppinsMedium text-primary text-sm'>Qty</Text>
          <View className='items-center flex-row space-x-2'>
            <TouchableOpacity 
              onPress={() => handleRemoveQuantity()}
              disabled={data.quantity === 1 ? true : false }
              className='justify-center items-center bg-primary rounded-md p-[2px]'
            >
              <MinusIcon size={15} color={COLORS.white} />
            </TouchableOpacity>
            <View className='px-3 py-1 bg-white rounded-md'>
              <Text className='font-PoppinsBold text-primary text-base'>{data.quantity}</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleAddQuantity()}
              className='justify-center items-center bg-primary rounded-md p-[2px]'
            >
              <PlusIcon size={15} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <Text className='font-PoppinsBold text-primary text-[12px]'>₱{data.total.toLocaleString('en-US')}.00</Text>
        </View>
        <View className='bg-black h-full w-[1px]' />
        {/* product details */}
        <View className='items-center flex-row flex-1 space-x-2'>
          {/* image */}
          <View className='justify-center items-center w-14 h-14'>
            <Image
              source={require('../assets/images/fresh-milk.png')}
              resizeMode='cover'
              className='w-full h-full'
            />
          </View>
          {/* details */}
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