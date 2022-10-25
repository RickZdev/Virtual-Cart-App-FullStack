import { View, Text, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MicrophoneIcon, MinusIcon, PauseIcon, PlusIcon, StopIcon } from 'react-native-heroicons/outline';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';

import Tts from 'react-native-tts';
import COLORS from '../global/COLORS';

const ProductDetails = ({ route, navigation }) => {
  const data = JSON.parse(route.params?.data);
  const [amount, setAmount] = useState(data?.price);
  const [quantity, setQuantity] = useState(1);
  const [startSpeech, setStartSpeech] = useState(false);

  const imageName = 'fresh-milk';
  const rawImage = require(`../assets/images/${imageName}.png`)

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

  const handleAddToCart = async () => {
    try {
      const value = await AsyncStorage.getItem('cart');
      let tempArr = [];
      console.log(value);
      if (value !== null) {
        tempArr = [...JSON.parse(value)];
        tempArr.push({ ...data, quantity, amount })
        await AsyncStorage.setItem('cart', JSON.stringify(tempArr));
      } else {
        tempArr.push({ ...data, quantity, amount })
        await AsyncStorage.setItem('cart', JSON.stringify(tempArr));
      }
      ToastAndroid.show('Added to cart successfully', ToastAndroid.LONG);
      handleCancel();
    } catch (error) {
      console.log('Error cart: ', error);
    }
  }

  const handleStartSpeech = () => {
    Tts.setDefaultLanguage('en-IE');
    Tts.setDefaultRate(1, true);
    Tts.setDefaultPitch(2.0);

    Tts.addEventListener('tts-finish', event => setStartSpeech(false));

    if(startSpeech) {
      Tts.stop();
    } else {
      Tts.getInitStatus().then(() => {
        Tts.speak(
          `
            Product Details: \n
            Product Name: ${data.productName}\n
            Price: ${data.price} Pesos\n
            Size: ${data.size}\n
            Offer: ${data.offer}\n
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
    console.log(startSpeech)
  }

  const handleCancel = () => {
    navigation.goBack();
    Tts.stop();
  }

  return (
    <View className='flex-1 bg-primary'>
      {/* details */}
      <Text className='font-PoppinsBold text-2xl text-white text-center py-3'>Product Details</Text>
      <View className='justify-center items-center'>
        <View className='flex-1 justify-center items-center w-48 h-48 bg-white p-5 rounded-2xl'>
          <Image
            source={rawImage}
            resizeMode='cover'
            className='w-full h-full'
          />
        </View>
        <Text className='text-white font-PoppinsBold text-xl mt-4'>Price: ₱{data.price.toLocaleString('en-US')}.00</Text>
        <Text className='text-white font-PoppinsRegular text-xl'>{data.productName}</Text>
        <Text className='text-white font-PoppinsRegular text-xl'>{data.offer}</Text>
        <Text className='text-white font-PoppinsRegular text-xl'>{data.size}</Text>

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
      <View className='justify-center items-center mt-3 space-y-2'>
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
            <Text className='tex-primary font-NunitoBold text-sm'>Add to Cart</Text>
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