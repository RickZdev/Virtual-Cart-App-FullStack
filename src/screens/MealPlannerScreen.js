import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { getMealCategories } from '../api/mealPlannerApi';
import MealPlannerSection from '../components/MealPlannerSection';
import COLORS from '../global/COLORS';

const MealPlannerScreen = () => {
  const [mealCategories, setMealCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Beef');
  useEffect(() => {
    getMealCategories(setMealCategories);
  }, [])

  return (
    <View className='bg-white flex-1' >
      {/* header */}
      <View className='py-4 px-6 space-y-5'>
        <Text className='text-3xl font-PoppinsBold text-primary text-center'>Meal Planner</Text>
        <View className='flex-row items-center space-x-3'>
          <TextInput 
            className='flex-1 border-2 border-[#E6EBF2] rounded-2xl pl-14 pr-4 text-sm font-PoppinsRegular -bottom-[2px] text-black' 
            placeholder='Search your meal plan...'
          />
          <View className='absolute w-full h-full left-2 justify-center'>
            <MagnifyingGlassIcon size={26} color={COLORS.black} />
          </View>
          <TouchableOpacity 
            className='bg-primary p-1 rounded-xl mt-2 justify-center items-center'
          >
            <AntDesign name='enter' size={26} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* categories */}
      <View className='mb-5'>
        <FlatList 
          data={mealCategories}
          keyExtractor={(_item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity 
              onPress={() => setSelectedCategory(item.strCategory)} 
              className={`w-[118px] h-[50px] bg-primary mr-3 rounded-3xl justify-center items-center ${index === 0 && 'ml-6'}`} 
            >
              <Text className='text-white'>{item.strCategory}</Text>
            </TouchableOpacity>
          )}
        />
      </View>


      {/* content */}
      <MealPlannerSection selectedCategory={selectedCategory}/>
    </View>
  )
};

export default MealPlannerScreen;
