import { View, Text, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import { carouselItemType } from '@/data/orderData'
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { ThemeContext } from './ThemeContext';

const screenWidth = Dimensions.get('window').width; // Get screen width
type Props = {
    items: carouselItemType[];
    paginationIndex: number;
    scrollX: SharedValue<number>;
}

const pagination = ({ items, paginationIndex, scrollX }: Props) => {
  const { theme } = useContext(ThemeContext); // Get theme from context
    const paginationAColor = theme === 'dark' ? '#FFF' : '#222';
    const paginationBColor = theme === 'dark' ? '#999' : "#aaa";
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
            <Animated.View key={index} style={[pgAnimationStyle,{backgroundColor: index === paginationIndex ? paginationAColor : paginationBColor }]} className=' w-2 h-2 rounded-full mx-1'>

            </Animated.View>
          );
      })}
    </View>
  )
}

export default pagination