import { View, Text, Image, Dimensions } from 'react-native'
import { useContext } from 'react';
import { carouselItemType } from '@/data/orderData'
import { ThemedText } from './ThemedText';
import { ThemeContext } from './ThemeContext';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width; // Get screen width
const isTablet = screenWidth >= 768;

type Props = {
    item: carouselItemType;
    index: number;
    scrollX: SharedValue<number>
}

const sliderItem = ({ item, index, scrollX }: Props) => {
    const { theme } = useContext(ThemeContext); // Get theme from context
    const rnAnimatedStyle = useAnimatedStyle(() => {
        return{
            transform: [
                {
                    translateX: interpolate(
                        scrollX.value,
                        [(index - 1) * screenWidth, index * screenWidth, (index + 1) * screenWidth],
                        [-screenWidth * 0.20, 0, screenWidth * 0.20],
                        Extrapolation.CLAMP
                    ),
                    
                },
                {
                    scale: interpolate(
                        scrollX.value,
                        [(index - 1) * screenWidth, index * screenWidth, (index + 1) * screenWidth],
                        [0.7, 1, 0.7],
                        Extrapolation.CLAMP
                    ),
                }
            ]
        }
    });
    return (
        <Animated.View  style={[rnAnimatedStyle, { paddingHorizontal: isTablet ? 40 : 20, width: screenWidth }]}>
            <View className={`px-4 md:px-12 py-5 md:py-10 rounded-2xl`} style={{ backgroundColor: item.backgroundColor }}>
                <View style={{ width: '60%' }}>
                    <ThemedText className="text-xl md:text-3xl font-osemibold text-redalert ">{item.title}</ThemedText>
                    <ThemedText className={`text-sm md:text-base font-omedium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Due to {item.dueDate}
                    </ThemedText>
                    <ThemedText className={`text-xs md:text-sm font-oregular ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {item.address}
                    </ThemedText>
                </View>
                <View className='p-1 md:p-3 bg-redalert rounded-lg mt-2 w-24 md:w-32'>
                    <ThemedText className="text-sm md:text-base font-oregular text-white text-center">More Details</ThemedText>
                </View>
            </View>
            <Image source={item.image} className="w-36 h-40 md:w-56 md:h-60 absolute right-5 md:right-12" />
        </Animated.View>
    )
}

export default sliderItem