import { View, Text, TouchableOpacity } from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import React, { useMemo, useRef, useState } from 'react'
import DATA from '../global/DATA'
import { useNavigation } from '@react-navigation/native'

const PaymentOptionScreen = ({ navigation }) => {
  const [paymentOption, setPaymentOption] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bottomSheetHeight, setBottomSheetHeight] = useState('50%')
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [bottomSheetHeight], [isConfirmed]);

  const handleConfirm = () => {
    setIsConfirmed(!isConfirmed);
    setBottomSheetHeight('30%');
  }
  return (
    <View className='flex-1'>
      <View className='absolute w-full h-full bg-black opacity-50'/>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onClose={() => navigation.goBack()}
          animateOnMount={true}
        >
          <View className='flex-1 bg-white py-6 px-5'>
            <View className={`flex-1 ${isConfirmed && 'justify-center '}`}>
              { !isConfirmed ?
                DATA.paymentOptionList.map((item, index) => (
                  <PaymentCard item={item} index={index} paymentOption={paymentOption} setPaymentOption={setPaymentOption}/>
                )) :
                DATA.modeOfPayment.map((item, index) => (
                  <ModeCard item={item} index={index} />
                ))
              }
            </View>
            
            {
              !isConfirmed &&
              <TouchableOpacity 
                onPress={() => handleConfirm()}
                className='items-center justify-center bg-primary py-4 rounded-md'
              >
                <Text className='text-white font-PoppinsBold text-base'>Select payment method</Text>
              </TouchableOpacity>
            }
          </View>
        </BottomSheet>
    </View>
  )
}

const PaymentCard = ({ item, index, paymentOption, setPaymentOption }) => {
  return (
    <TouchableOpacity 
      key={index}
      activeOpacity={1}
      onPress={() => setPaymentOption(index)}
      className='flex-row items-center space-x-3 mb-3 bg-[#ECF0F9] px-4 py-5 rounded-md'
    >
      {item.icon}
      <Text className='flex-1 font-NunitoBold text-primary text-base'>{item.paymentOption}</Text>
      <View className='w-5 h-5 rounded-full  border-primary border-[2px]'>
        {
          paymentOption === index &&  
          <View className='w-full h-full bg-primary border-white border-[1px] rounded-full'/>
        }
      </View>
    </TouchableOpacity>
  )
}

const ModeCard = ({ item, index }) => {
  const navigation = useNavigation();

  const handleSelectMode = (item) => {
    item === 'Pick-up' ? navigation.navigate('CheckoutScreen') : null
  }

  return (
    <TouchableOpacity 
      key={index}
      onPress={() => handleSelectMode(item.mode)}
      activeOpacity={.5}
      className='flex-row justify-center items-center space-x-3 mb-3 bg-primary px-4 py-5 rounded-md'
    >
    {item.icon}
    <Text className='font-NunitoBold text-white text-base'>{item.mode}</Text>
  </TouchableOpacity>
  )
}

export default PaymentOptionScreen