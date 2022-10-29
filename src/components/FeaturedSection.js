import React from 'react'
import { View, Text, Image } from 'react-native'

const FeaturedSection = () => {
  const data = [
    {
      id: 0,
      productName: 'Quaker Oats',
      productDesc: 'Lorem ipsum Lorem\nipsum',
      image: require('../assets/images/quaker-oats.png')
    },
    {
      id: 1,
      productName: 'Fresh Milk',
      productDesc: 'Lorem ipsum  Lorem\nipsum',
      image: require('../assets/images/fresh-milk.png')
    },
    {
      id: 2,
      productName: 'Ferrero Chocolate',
      productDesc: 'Lorem ipsum  Lorem\nipsum',
      image: require('../assets/images/ferrero.png')
    },
  ]

  return (
    <View className='mt-[30px] px-5'>
      <Text className='font-PoppinsMedium text-base text-primary mb-2'>Featured Products</Text>
      {data.map((item) => (
        <Card data={item} key={item.id} />
      ))}
    </View>
  )
}

const Card = ({ data }) => {
  return (
    <View className='bg-[#ECF0F9] rounded-3xl flex-row mb-3 py-2 px-2 space-x-4'>
      <View className='w-24 h-24'>
        <Image
          source={data.image}
          resizeMode='contain'
          className='w-full h-full rounded-2xl'
        />
      </View>
      <View>
        <Text className='text-primary font-PoppinsBold text-base'>{data.productName}</Text>
        <Text className='text-primary font-NunitoRegular text-base'>{data.productDesc}</Text>
      </View>
    </View>
  )
}

export default FeaturedSection