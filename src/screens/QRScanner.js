import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { MicrophoneIcon } from 'react-native-heroicons/outline'
import COLORS from '../global/COLORS'

const QRScanner = ({ navigation }) => {
  const handleOnRead = (qrData) => {
    navigation.navigate('ProductDetails', qrData)
  }

  return (
    <View className='bg-white flex-1'>
      <QRCodeScanner
        onRead={(qrData) => handleOnRead(qrData)}
        showMarker
        reactivate={true}
        reactivateTimeout={5000}
        topContent={
          <Text>QRScanner</Text>
        }
        cameraContainerStyle={{ backgroundColor: 'red' }}
        // containerStyle={{ backgroundColor: 'yellow', top: -50, left: 20 }}
        cameraStyle={{ width: '90%', height: '50%', backgroundColor: 'yellow' }}
        bottomContent={
          <View className='pb-24'>
            <Text className='font-PoppinsBold text-2xl text-primary text-center'>SCAN QR CODE HERE</Text>
            <Text className='font-PoppinsRegular text-xs text-primary text-center'>Scan the QR code placed in the product to view product details.</Text>
            <View className='justify-center items-center'>
              <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { productName: 'Nestle Fresh Milk', offer: 'Limited Offer', size: '1L', image: require('../assets/images/fresh-milk.png'), price: 150.00 })} className='bg-primary p-4 rounded-full'>
                <MicrophoneIcon size={32} color={COLORS.white} />
              </TouchableOpacity>
              <Text className='font-PoppinsRegular text-xs text-primary text-center'>Tap here to hear product details</Text>
            </View>
          </View>
        }
      />

    </View >
  )
}

export default QRScanner