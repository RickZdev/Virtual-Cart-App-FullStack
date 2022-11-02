import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import Tts from 'react-native-tts';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { MinusIcon, PlusIcon } from 'react-native-heroicons/outline';

import { cartListAction } from '../redux/features/cartSlice'
import COLORS from '../global/COLORS';

const ProductDetails = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartListReducer.cartList)

  const data = JSON.parse(route.params?.data);
  const [amount, setAmount] = useState(data?.price);
  const [quantity, setQuantity] = useState(1);
  const [startSpeech, setStartSpeech] = useState(false);

  const imageName = 'fresh-milk';
  const rawImage = require(`../assets/images/${imageName}.png`)

  // quantity
  const handleAddQuantity = () => {
    setAmount(prev => prev += data.price)
    setQuantity(prev => prev += 1)
  }

  const handleRemoveQuantity = () => {
    if (quantity !== 1) {
      setAmount(prev => prev -= data.price)
      setQuantity(prev => prev -= 1)
    }
  }

  // add to cart
  const handleAddToCart = async () => {
    if(cart.some(item => item.virtualCartUid === data.virtualCartUid)) {
      ToastAndroid.show('Item already on the cart', ToastAndroid.SHORT);
    } else {
      const total = quantity * data.price;
      dispatch(cartListAction.addItemToCart({ ...data, quantity, total}))
      ToastAndroid.show('Added to cart successfully', ToastAndroid.LONG);
      handleCancel();
    }
  }

  // text-to-speech
  const handleStartSpeech = () => {
    Tts.setDefaultLanguage('en-IE');

    Tts.addEventListener('tts-finish', _event => setStartSpeech(false));

    if(startSpeech) {
      Tts.stop();
    } else {
      Tts.getInitStatus().then(() => {
        Tts.speak(
          `
            Product Details: .\n
            Product Name: ${data.productName}.\n
            Price: ${data.price} Pesos.\n
            Size: ${data.size}.\n
            Offer: ${data.offer}.\n
          `,
          {
            androidParams: {
              KEY_PARAM_PAN: -1,
              KEY_PARAM_VOLUME: 1,
              KEY_PARAM_STREAM: 'STREAM_MUSIC',
            },
          }
        )
      });
    }
    setStartSpeech(!startSpeech);
  }

  const handleCancel = () => {
    navigation.goBack();
    Tts.stop();
  }

  return (
    <View className='flex-1 bg-primary'>
      {/* details */}
      <Text className='flex-1 font-PoppinsBold text-2xl text-white text-center py-3 mt-4'>Product Details</Text>
      <View className='flex-1 justify-center items-center'>
        <View className='justify-center items-center w-44 h-44 bg-white p-5 rounded-2xl'>
          <Image
            source={rawImage}
            resizeMode='cover'
            className='w-full h-full'
          />
        </View>
        <Text className='text-white font-PoppinsRegular text-xl mt-4'>{data.productName} ({data.size})</Text>
        <Text className='text-white font-PoppinsBold text-xl '>Price: ₱{data.price.toLocaleString('en-US')}.00</Text>

        {/* quantity */}
        <View className='flex-row space-x-4 bg-primary border-[1px] border-white px-7 py-2 rounded-3xl my-5'>
          <TouchableOpacity onPress={handleRemoveQuantity} className='justify-center items-center'>
            <MinusIcon size={25} color={COLORS.white} />
          </TouchableOpacity>
          <View className='bg-white h-7 w-[30px] rounded-md justify-center items-center'>
            <Text className='font-PoppinsBold text-base text-primary'>{quantity}</Text>
          </View>
          <TouchableOpacity onPress={handleAddQuantity} className='justify-center items-center'>
            <PlusIcon size={25} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <Text className='font-PoppinsBold text-lg text-white'>Amount: ₱{amount.toLocaleString('en-US')}.00</Text>
      </View>
      
      {/* speech */}
      <View className='flex-1 justify-center items-center mt-3 space-y-2'>
        <TouchableOpacity onPress={handleStartSpeech} className='bg-white border-[1px] w-14 h-14 border-white rounded-full justify-center items-center'>
          {
            !startSpeech ?
            <SimpleLineIcons name='microphone' size={27} color={COLORS.primary} /> :
            <FontAwesome name='stop' size={27} color={COLORS.primary} /> 
          }
        </TouchableOpacity>
        <Text className='text-white font-NunitoBold text-sm'>Tap here to hear product details</Text>      
      </View>

      {/* buttons */}
      <View className='flex-1 justify-center'>
        <View className='flex-row justify-center items-end space-x-4'>
          <TouchableOpacity onPress={handleAddToCart} className='bg-white text-primary rounded-3xl w-32 h-12 justify-center items-center'>
            <Text className='text-primary font-NunitoBold text-sm'>Add to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCancel} className='bg-primary border-[1px] border-white  rounded-3xl w-32 h-12 justify-center items-center'>
            <Text className='text-white font-NunitoBold text-sm'>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ProductDetails