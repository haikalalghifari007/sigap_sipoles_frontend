import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { carouselItemType } from '@/data/orderData'
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width; // Get screen width
type Props = {
    items: carouselItemType[];
    paginationIndex: number;
    scrollX: SharedValue<number>;
}

const pagination = ({ items, paginationIndex, scrollX }: Props) => {
  return (
    <View className='flex-row h-10 justify-center items-center'>
      {items.map((_, index) => {
          const pgAnimationStyle = useAnimatedStyle(() => {
              const dotWidth = interpolate(
                scrollX.value % (items.length * screenWidth),  
                  [(index - 1) * screenWidth, index * screenWidth, (index + 1) * screenWidth],
                  [8, 20, 8],
                  Extrapolation.CLAMP
              );

              return {
                width: dotWidth,
              }
          })
          return (
            <Animated.View key={index} style={[pgAnimationStyle,{backgroundColor: index === paginationIndex ? '#222' : '#aaa' }]} className=' w-2 h-2 rounded-full mx-1'>

            </Animated.View>
          );
      })}
    </View>
  )
}

export default pagination