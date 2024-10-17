import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import HomessScreen from './homepage'; // Import HomessScreen from homepage.tsx
import { ThemedText } from '@/components/ThemedText';

export default function Index() {
  const [showHomeScreen, setShowHomeScreen] = useState(false); // To control when to show HomessScreen
  const opacity = useSharedValue(0); // Shared value for animation

  useEffect(() => {
    // Trigger the animation
    opacity.value = withTiming(1, { duration: 2000 });

    // Delay the transition after the animation completes
    const timer = setTimeout(() => {
      setShowHomeScreen(true); // Safely update state after a delay
    }, 3000); // The delay accounts for the animation duration + additional delay (500ms)

    return () => clearTimeout(timer); // Clean up timer
  }, []);

  // Animated styles for the image fade-in effect
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!showHomeScreen) {
    // Show the animated image first, keeping the background static
    return (
      <View className='flex-1 justify-center items-center bg-originblue'>
        <Animated.Image
          source={require('../assets/images/splashwika.png')} // Replace with your image path
          style={[ animatedStyle]} className='w-60 h-60' // Apply the animation to the image
          resizeMode="contain"
        />
        <View className='flex-row mx-5 space-x-3 absolute bottom-10'>
          <Image
            source={require('../assets/images/wikalogowhite.png')} // Replace with your image path
            className='w-12 h-12'// Apply the animation to the image
            resizeMode="contain"
          />
          <ThemedText className='text-white font-oregular text-xs flex-1'>PT Wijaya Karya Tbk (WIKA) berizin dan diawasi oleh Kementerian PUPR serta mengikuti regulasi yang ditetapkan oleh BUMN untuk memastikan standar kualitas dan kepatuhan.</ThemedText>
        </View>
      </View>
    );
  }

  // After animation and transition delay, show the HomessScreen
  return <HomessScreen />;
}

;
