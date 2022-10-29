import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons'

import { getMealItem } from '../api/mealPlannerApi';
import COLORS from '../global/COLORS';

const MealPlannerSection = ({ selectedCategory }) => {
  const [mealItem, setMealItem] = useState([]);

  useEffect(() => {
    getMealItem(selectedCategory, setMealItem);
  }, [selectedCategory])

  return (
    <FlatList
      data={mealItem}
      keyExtractor={item => item.idMeal}
      initialNumToRender={5}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => (
        <View className='flex-row justify-between items-center px-6 mb-3'>
          <Text className='font-PoppinsBold text-primary text-xl'>Editor's Choice</Text>
          <Text className='font-PoppinsBold text-[#70B9BE] text-base'>View All</Text>
        </View>
      )}
      renderItem={({ item }) => <Card data={item}/>}
    />
  )
}

const Card = ({ data }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('MealDetailsScreen', {idMeal: data.idMeal, strMealThumb: data.strMealThumb})} 
      className='bg-white mb-4 flex-row items-center pl-4 pr-5 space-x-3 mx-6 py-3 rounded-3xl'
      style={{ elevation: 3}}
    >
      <View className='w-[100px] h-[84px] rounded-2xl overflow-hidden'>
        <Image
          source={{ uri: data.strMealThumb }}
          resizeMode='cover'
          className='w-full h-full'
        />
      </View>
      <View className='flex-1'>
        <Text className='text-primary text-sm font-PoppinsBold' numberOfLines={2}>{data.strMeal}</Text>
      </View>
      <View className='bg-primary w-8 h-8 rounded-xl justify-center items-center'>
        <Octicons name='arrow-right' size={20} color={COLORS.white} />
      </View>
    </TouchableOpacity>
  )
}

export default MealPlannerSection