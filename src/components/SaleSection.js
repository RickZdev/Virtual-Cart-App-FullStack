import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'

const SaleSection = () => {
  const data = [
    {
      id: 0,
      image: require('../assets/images/sale.png')
    },
    {
      id: 1,
      image: require('../assets/images/sale.png')
    }
  ]

  return (
    <View className='mt-10 '>
      <Text className='pl-5 font-PoppinsBold text-base text-primary'>TODAY'S SALE</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <Card data={item} index={index} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const Card = ({ data, index }) => {
  return (
    <View className={`mr-2 mt-3 ${index === 0 && 'pl-5'}`}>
      <Image
        source={data.image}
        resizeMode='cover'
        style={{ borderRadius: 30 }
        }
      />
    </View >
  )
}

export default SaleSection