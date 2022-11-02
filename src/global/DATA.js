import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import COLORS from './COLORS'

const size = 27;

export default DATA = {
  nutrients: [
    {
      id: 0,
      title: '65g carbs',
      icon: <MaterialCommunityIcons name='fruit-grapes-outline' size={size} color={COLORS.black}/>
    },
    {
      id: 1,
      title: '27g proteins',
      icon: <MaterialCommunityIcons name='fruit-watermelon' size={size} color={COLORS.black}/>
    },
    {
      id: 2,
      title: '120 Kcal',
      icon: <SimpleLineIcons name='fire' size={size} color={COLORS.black}/>
    },
    {
      id: 3,
      title: '91g fats',
      icon: <Ionicons name='pizza-outline' size={22} color={COLORS.black}/>
    }
  ],
  paymentOptionList: [
    {
      id: 0,
      paymentOption: 'Over-the-Counter (Cash)',
      icon: <MaterialCommunityIcons name='cash-register' size={size} color={COLORS.black}/>
    },
    {
      id: 1,
      paymentOption: 'Card',
      icon: <SimpleLineIcons name='credit-card' size={size} color={COLORS.black}/>
    },
  ],
  modeOfPayment: [
    {
      id: 0,
      mode: 'Pick-up',
      icon: <MaterialCommunityIcons name='storefront-outline' size={size} color={COLORS.white}/>
    },
    {
      id: 1,
      mode: 'Delivery',
      icon: <MaterialCommunityIcons name='truck-delivery-outline' size={size} color={COLORS.white}/>
    },
  ]
}