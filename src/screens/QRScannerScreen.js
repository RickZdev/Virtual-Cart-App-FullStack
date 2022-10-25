import { Text, ToastAndroid, View } from 'react-native'
import React from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner'

const QRScannerScreen = ({ navigation }) => {
  const handleOnRead = (qrData) => {
    if(qrData.data.includes('virtualCartUid' || 'virtualCartTagUid')) {
      navigation.navigate('ProductDetails', qrData)
  } else {
      ToastAndroid.show('Invalid QR Code!', ToastAndroid.LONG);
    }
  }

  return (
    <View className='bg-white flex-1'>
      <View className='ml-10 mt-36 mb-20'>
        <View className='w-72 h-[280px]'>
          <QRCodeScanner
            onRead={(qrData) => handleOnRead(qrData)}
            showMarker
            reactivate={true}
            reactivateTimeout={5000}
            fadeIn={true}
            cameraStyle={{ width: '100%', height: '100%'}}
            
          />
        </View>
      </View>
      <View className='pb-24 space-y-3 px-4'>
        <Text className='font-PoppinsBold text-2xl text-primary text-center'>SCAN QR CODE HERE</Text>
        <Text className='font-PoppinsRegular text-xs text-primary text-center'>Scan the QR code placed in the product to view product details.</Text>
      </View>
    </View >
  )
}

export default QRScannerScreen