import { Link, Stack } from 'expo-router';
import { StyleSheet, Image, TouchableOpacity, View, Dimensions } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const dimensions = Dimensions.get('window');
const isTablet = dimensions.width >= 768;

export default function NotFoundScreen() {
  return (
    <>
      
      <ThemedView style={styles.container}>
        <Image source={require('../assets/images/error.png')} style={{ width: isTablet ? 400 : 200, height: isTablet ? 400 :  200 }} />
        <ThemedText className='font-osemibold text-2xl md:text-4xl text-originblue'>Something went wrong</ThemedText>
        <ThemedText className='font-oregular text-sm md:text-xl text-center mt-2'>Sorry, we’re having some technical issues (as you can see) back to main menu!</ThemedText>
        <Link href="/">
        <TouchableOpacity>

          <View className="mt-4 py-2 md:py-5 px-24 md:px-52 rounded-xl items-center bg-originblue">
            <ThemedText className="mb-1 text-white font-oregular text-lg md:text-2xl">Back to main Menu</ThemedText>
            
          </View>
        </TouchableOpacity>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: isTablet ? 40 : 20,
  },
});
