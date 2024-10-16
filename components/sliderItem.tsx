import { View, Text, Image, Dimensions, Touchable, TouchableOpacity } from 'react-native'
import { useContext } from 'react';
import { carouselItemType } from '@/data/orderData'
import { ThemedText } from './ThemedText';
import { ThemeContext } from './ThemeContext';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { Link } from 'expo-router';

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
        return {
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
        <Animated.View style={[rnAnimatedStyle, { paddingHorizontal: isTablet ? 40 : 20, width: screenWidth }]}>
            <View className={`px-4 md:px-12 justify-between py-5 md:py-10 rounded-2xl`} style={{ backgroundColor: item.backgroundColor, minHeight: isTablet ? 200 : 175 }}>
                <View style={{ width: '60%' }}>
                    <ThemedText style={{ color: item.statusColor }} className="text-xl md:text-3xl font-osemibold ">{item.title}</ThemedText>
                    <ThemedText className={`text-sm md:text-base font-omedium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Due to {item.dueDate}
                    </ThemedText>
                    <ThemedText className={`text-xs md:text-sm font-oregular ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {item.address}
                    </ThemedText>
                </View>
                <Link href={{ pathname: "/employee/detail-order", params: { orderId: item.orderId, title: item.title, status: item.status } }} asChild>
                    <TouchableOpacity>
                        <View style={{ backgroundColor: item.statusColor }} className='p-2 md:p-3 rounded-lg  w-24 md:w-32'>
                            <ThemedText className="text-sm md:text-base font-oregular text-white text-center">More Details</ThemedText>
                        </View>
                    </TouchableOpacity>
                </Link>
            </View>
            <Image source={item.image} className="w-40 h-40 md:w-60 md:h-60 absolute right-2 md:right-10 bottom-0 " resizeMode="contain" />
        </Animated.View>
    )
}

export default sliderItem