import { Image, StyleSheet, Platform, View, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

export default function HomessScreen() {
  return (
    <ParallaxScrollView 
      headerBackgroundColor={{ light: '#F0F0F0', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('../assets/images/welcomeganteng.png')}
          style={styles.reactLogo}
        />
        
      }>
      <ThemedText type="title" className='text-center'>SIGN UP</ThemedText>
      <Link href="/admin" asChild>
        <TouchableOpacity>
          <View className=" p-2 rounded-xl items-center bg-originblue">
            <ThemedText className="mb-1 text-white font-oregular text-lg">Admin</ThemedText>
          </View>
        </TouchableOpacity>
      </Link>
      <Link href="/employee" asChild>
        <TouchableOpacity>
          <View className="mb-4 p-2 rounded-xl items-center bg-originblue">
            <ThemedText className="mb-1 text-white font-oregular text-lg">Employee</ThemedText>
          </View>
        </TouchableOpacity>
      </Link>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    resizeMode: 'contain',
    height: 700,
    top: 0,
    left: -60,
    position: 'absolute',
  },
});
