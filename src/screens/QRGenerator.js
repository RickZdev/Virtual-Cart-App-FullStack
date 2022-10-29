import React, { useState } from 'react';
import { View, Platform, PermissionsAndroid, ToastAndroid, Text, TouchableOpacity } from 'react-native';
import RNFS from "react-native-fs";
import CameraRoll from "@react-native-community/cameraroll";
import QRCode from 'react-native-qrcode-svg';

const QRGenerator = () => {
  const initialItemState = {
    virtualCartUid: Math.random(1, 200) + 'virtualProduct',
    productName: 'Iced Coffee',
    offer: 'Limited Offer',
    size: '22oz',
    image: 'fresh-milk',
    price: 2000.00
  }
  
  const [item, setItem] = useState(JSON.stringify(initialItemState));
  const [productQRref, setProductQRref] = useState();

  const saveQrToDisk = async () => {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
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

  const handleGenerateQR = async () => {
    setItem(JSON.stringify({
      virtualCartUid: Math.random(1, 200) + 'virtualProduct',
      productName: 'Iced Coffee',
      offer: 'Limited Offer',
      size: '22oz',
      image: 'fresh-milk',
      price: 2000.00
    }))
  }

  return (
    <View className='flex-1 bg-white justify-center items-center'>
      <Text className='-top-5 text-black text-lg font-bold'>QR Code</Text>
        <QRCode
          value={item}
          getRef={(ref) => setProductQRref(ref)}
          size={250}
          color="black"
          backgroundColor="white"
        />
        <TouchableOpacity
          onPress={handleGenerateQR}
          className='items-center mb-8 bg-[#273746] rounded-3xl p-4 absolute bottom-16 w-[90%] justify-center'>
          <Text className='text-white text-base capitalize'>Generate QR Code</Text>
        </TouchableOpacity>
      
        <TouchableOpacity
          onPress={saveQrToDisk}
          className='items-center mb-8 bg-[#273746] rounded-3xl p-4 absolute bottom-0 w-[90%] justify-center'>
          <Text className='text-white text-base capitalize'>Save to Gallery</Text>
        </TouchableOpacity>
    </View>
  )
}
export default QRGenerator;