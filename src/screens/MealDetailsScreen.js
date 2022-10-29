import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import Hyperlink from 'react-native-hyperlink'
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
import { XMarkIcon } from 'react-native-heroicons/outline';
import Ionicons from 'react-native-vector-icons/Ionicons'

import { getMealDetails } from '../api/mealPlannerApi';
import DATA from '../global/DATA';

const MealDetailsScreen = ({ route, navigation }) => {
  const { height } = Dimensions.get('window');
  const mealId = route.params.idMeal;
  const mealThumb = route.params.strMealThumb;
  const [mealDetails, setMealDetails] = useState([]);

  useEffect(() => {
    getMealDetails(mealId, setMealDetails);
  }, [])

  return (
    <ImageHeaderScrollView
        maxHeight={height / 2 - 100}
        minHeight={100}
        showsVerticalScrollIndicator={false}
        headerImage={{ uri: mealThumb }}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0}
        renderForeground={() => (
          <View className='flex-1 '>
            <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className='bg-white w-10 h-10 rounded-xl justify-center items-center mt-5 ml-5' 
            style={{ elevation: 10}}>
              <XMarkIcon size={25} color={COLORS.black}/>
            </TouchableOpacity>
          </View>
        )}
      >
        <TriggeringView className='bg-white'>
          {
            mealDetails.map((item, index) => (
              <Card data={item} index={index}/>
            ))
          }
        </TriggeringView>
      </ImageHeaderScrollView>
  )
}

const Card = ({ data, index }) => {
  const { width } = Dimensions.get('window');
  const [selectedButton, setSelectedButton] = useState(0);

  return (
        <View key={index}>
          {/* header */}
          <View className='px-6 py-5'>
            <View className='flex-row justify-between items-start space-x-7'>
              <Text className='text-primary font-PoppinsBold text-xl flex-1'>{data.strMeal}</Text>
              <View className='flex-row'>
                <Ionicons name='time-outline' size={20} color={'#70B9BE'}/>
                <Text className='text-sm font-NunitoRegular text-primary'>15 Min</Text>
              </View>
            </View>
            {
              data.strYoutube !== "" &&
              <View className='my-1'>
                <Text className='text-sm font-PoppinsMedium text-[#70B9BE]'>Watch video to learn more:</Text>
                <Hyperlink onPress={(url, text) => alert(url + ", " + text)} linkDefault={ true }>
                  <Text className='text-base font-PoppinsMedium text-black underline'>{data.strYoutube}</Text>
                </Hyperlink>
              </View>
            }
          </View>

          {/* nutrition facts */}
          <FlatList
            data={DATA.nutrients}
            key={item => item.id}
            numColumns={2}
            className='mb-4'
            renderItem={({ item }) => (
              <View className='flex-row mb-4 items-center space-x-3 px-6' style={{ width: width / 2 - 24}}>
                <View className='bg-[#F1F5F5] justify-center items-center w-12 h-12 rounded-xl'>
                  {item.icon}
                </View>
                <Text className='text-base text-primary font-NunitoBold'>{item.title}</Text>
              </View>
            )}
          />

          {/* button */}
          <View className='flex-row justify-center bg-[#F1F5F5] rounded-3xl items-center self-center py-1 px-1' style={{ width: width - 24}}>
            <TouchableOpacity onPress={() => setSelectedButton(0)} className={`justify-center items-center p-3 ${selectedButton === 0 && 'bg-primary rounded-3xl'}`} style={{ width: width / 2 - 12}}>
              <Text className={`text-black font-NunitoBold text-base ${selectedButton === 0 && 'text-white'}`}>Ingredients</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedButton(1)} className={`justify-center items-center p-3 ${selectedButton === 1 && 'bg-primary rounded-3xl'}`} style={{ width: width / 2 - 12}}>
              <Text className={`text-black font-NunitoBold text-base ${selectedButton === 1 && 'text-white'}`}>Instructions</Text>
            </TouchableOpacity>
          </View>

          {
            selectedButton === 0 && <IngredientsSection data={data} /> ||
            selectedButton === 1 && <InstructionsSection instruction={data.strInstructions} />
          }
        </View>
  )
}

const IngredientsSection = ({ data }) => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    let tempArr = [];
    for(let i = 1; i < 20; i++) {
      if(data["strIngredient" + i] === '' || data["strIngredient" + i] === null) {
        break;
      } else {
        tempArr.push({
          id: i,
          ["strIngredient" + i]: data["strIngredient" + i],
          ["strMeasure" + i]: data["strMeasure" + i]
        });
      }
    }

    setIngredients(tempArr);
  }, [])

  return (
    <View className='px-6 mt-4 mb-3'>
      {
        ingredients.map((item, index) => (
          <View className='flex-row items-center bg-white py-5 mb-4 px-5 rounded-2xl' style={{ elevation: 4}} key={index}>
            <View className='flex-row flex-1 space-x-5 items-center'>
              <View className='bg-[#F1F5F5] w-8 h-8 justify-center items-center rounded-lg'>
                <Text className='text-sm font-PoppinsMedium text-primary'>{item.id}</Text>
              </View>

              <Text className='text-primary font-PoppinsBold text-base'>{item["strIngredient" + (index + 1)]}</Text>
            </View>
            <Text className='text-[#70B9BE] font-NunitoBold text-sm'>{item["strMeasure" + (index + 1)]}</Text>
          </View>
        ))
      }
    </View>
  )
}

const InstructionsSection = ({ instruction }) => {
  return (
    <View className='px-6 py-6'>
      <Text className='text-black text-sm font-PoppinsRegular text-justify'>{instruction}</Text>
    </View>
  )
} 

export default MealDetailsScreen