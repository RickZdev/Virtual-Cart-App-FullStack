import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import { useSelector, useDispatch } from 'react-redux';
import { CheckCircleIcon, MagnifyingGlassIcon, PlusIcon, TrashIcon } from 'react-native-heroicons/outline'

import { groceryListAction } from '../redux/features/groceryListSlice'
import COLORS from '../global/COLORS'

const GroceryListScreen = () => {
  const dispatch = useDispatch();
  const groceryList = useSelector((state) => state.groceryListReducer.groceryList);
  const [item, setItem] = useState();
  
  const handleAddItem = async() => {
    dispatch(groceryListAction.addGrocery(item))
    setItem('');
  }

  return (
    <View className='bg-white flex-1'>
      {/* header */}
      <View className=' py-4 px-6 space-y-5'>
        <Text className='text-3xl font-PoppinsBold text-primary text-center'>Grocery List</Text>
        
        {/* search/add */}
        <View className='flex-row justify-between items-center space-x-3'>
          <TextInput 
            className='flex-1 border-2 border-[#E6EBF2] rounded-2xl pl-14 pr-2 text-sm font-PoppinsRegular -bottom-[2px] z-50' 
            placeholder='Add or Search Item...'
            onChangeText={(text) => setItem({id: Math.random(0, 100), item: text})}
            value={item}
          />
          <TouchableOpacity className='absolute w-full h-full left-2 justify-center'>
            <MagnifyingGlassIcon size={26} color={COLORS.black} />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => handleAddItem()}
            className='bg-primary p-1 rounded-xl mt-2'
          >
            <PlusIcon size={26} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* item */}
      <FlatList
        data={groceryList}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Card data={item}/>}
      />
    </View>
  )
}

const Card = ({ data }) => {
  const dispatch = useDispatch();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [item, setItem] = useState(data)

  const handleEditItem = async (text) => {
    setItem(text)
    dispatch(groceryListAction.editGrocery({id: data.id, text}))
  }

  const handleDeleteItem = () => {
    dispatch(groceryListAction.removeGrocery(item.id))
  }

  return (
    <View className='flex-row space-x-3 items-center px-6'>
      <CheckBox
        disabled={false}
        value={toggleCheckBox}
        onValueChange={toggle => setToggleCheckBox(toggle)}
        tintColors={{true: COLORS.primary, false: 'black'}}
      />
      <TextInput 
        value={item.item}
        onChangeText={(text) => handleEditItem(text)}
        className={`${toggleCheckBox ? 'line-through text-gray-400' : 'text-black'}  font-PoppinsRegular text-xl flex-1`}
        editable={!toggleCheckBox}
        onFocus={() => setIsEdit(!isEdit)}
        onEndEditing={() => setIsEdit(!isEdit)}
      />
      {
        !isEdit ?
          <TouchableOpacity onPress={() => handleDeleteItem()}>
            <TrashIcon size={26} color={'red'} />
          </TouchableOpacity> :
          <TouchableOpacity onPress={() => handleEditItem(changeText)}>
            <CheckCircleIcon size={26} color={'green'} />
          </TouchableOpacity>
      }
  </View>
  )
}

export default GroceryListScreen