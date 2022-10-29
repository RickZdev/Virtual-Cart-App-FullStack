import React, { useRef } from 'react'
import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView, Animated } from 'react-native'
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const AuthenticationScreen = () => {
  const { width } = Dimensions.get('window');
  const scrollRef = useRef();

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)
  const animation = useRef(new Animated.Value(0)).current;

  const signInButton = animation.interpolate({
    inputRange: [0, width],
    outputRange: ['#fff', '#1D2639']
  })

  const signUpButton = animation.interpolate({
    inputRange: [0, width],
    outputRange: ['#1D2639', '#fff']
  })

  return (
    <View className=' flex-1 bg-white'>
      {/* header - logo */}
      <View className='flex-1 justify-center items-center'>
        <Image
          source={require('../assets/images/logo.png')}
          resizeMode='cover'
        />
      </View>
      {/* auth form */}
      <View className='flex-1 bg-primary'>
        {/* buttons */}
        <View className='flex-row justify-center items-center'>
          <AnimatedTouchable onPress={() => scrollRef.current.scrollTo({ x: 0 })} activeOpacity={1} className='justify-center items-center bg-primary py-5 border-b-[1px]' style={{ width: width / 2, borderColor: signInButton }}>
            <Text className='text-white font-PoppinsRegular text-xl'>Sign in</Text>
          </AnimatedTouchable>
          <AnimatedTouchable onPress={() => scrollRef.current.scrollTo({ x: width * 2 })} activeOpacity={1} className='justify-center items-center bg-primary py-5 border-b-[1px]' style={{ width: width / 2, borderColor: signUpButton }}>
            <Text className='text-white font-PoppinsRegular text-xl'>Register</Text>
          </AnimatedTouchable>
        </View>
        <ScrollView
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          pagingEnabled={true}
          indicatorStyle={'white'}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: animation } } }],
            { useNativeDriver: false })}
        >
          <SignIn />
          <SignUp />
        </ScrollView>
      </View>
    </View>
  )
}

export default AuthenticationScreen