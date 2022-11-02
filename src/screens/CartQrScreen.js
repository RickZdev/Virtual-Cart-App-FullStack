import React, { useState } from 'react';
import { View, Platform, PermissionsAndroid, ToastAndroid, Text, TouchableOpacity } from 'react-native';
import RNFS from "react-native-fs";
import CameraRoll from "@react-native-community/cameraroll";
import QRCode from 'react-native-qrcode-svg';
import { useDispatch, useSelector } from 'react-redux';

const CartQrScreen = ({ route, navigation }) => {
  const cart = useSelector((state) => state.cartListReducer.cartList)
  
  const [item, setItem] = useState(JSON.stringify(cart));
  const [productQRref, setProductQRref] = useState();

  const saveQrToDisk = async () => {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      ToastAndroid.show('Allow permission in storage to use camera roll to save!', ToastAndroid.SHORT);
      return;
    }

    if (productQRref) {
      productQRref.toDataURL((data) => {
        let filePath = RNFS.CachesDirectoryPath + `/${item.name}.png`;
        console.log(filePath, data);
        RNFS.writeFile(filePath, data, 'base64')
          .then((success) => {
            return CameraRoll.save(filePath, 'photo')
          })
          .then(() => {
            ToastAndroid.show('QRCode saved to gallery', ToastAndroid.LONG);
          }).catch(err => {
            console.log(err.message)
            ToastAndroid.show(err.message, ToastAndroid.LONG);
          }) 
      });
    }
  }

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  return (
    <View className='flex-1'>
      <View className='mt-10 justify-center items-center'>
        <Text className=' text-black text-4xl font-PoppinsBold'>QR CODE</Text>
      </View>
      <View className='flex-1 justify-center items-center'>
        <Text className=' text-black text-base font-PoppinsMedium mb-5'>Here's your Cart QR Code</Text>
        <QRCode
          value={item}
          getRef={(ref) => setProductQRref(ref)}
          size={250}
          color="black"
          backgroundColor="white"
        />
      </View>

      <View className='flex-1 justify-center items-center px-10'>
        <Text className='text-base text-center text-black font-PoppinsMedium'>Present this QR Code to pay in the Cashier</Text>
      </View>

      <TouchableOpacity onPress={saveQrToDisk} className='p-4 bg-primary justify-center items-center mx-5 rounded-3xl mb-10'>
        <Text className='text-white text-base capitalize'>Save to Gallery</Text>
      </TouchableOpacity>
    </View>
  )
}
export default CartQrScreen