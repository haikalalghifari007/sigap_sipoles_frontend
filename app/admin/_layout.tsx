import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useContext, useEffect } from 'react';
import 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { ThemeContext } from '@/components/ThemeContext';  // Use ThemeContext instead of ThemeProvider

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { theme } = useContext(ThemeContext); // Get theme from context
  const backgroundColor = theme === 'dark' ? Colors.dark.background : Colors.light.background; // Adjusted for dark mode

  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    'Outfit-Thin': require('../../assets/fonts/Outfit-Thin.ttf'),
    'Outfit-ExtraLight': require('../../assets/fonts/Outfit-ExtraLight.ttf'),
    'Outfit-Light': require('../../assets/fonts/Outfit-Light.ttf'),
    'Outfit-Regular': require('../../assets/fonts/Outfit-Regular.ttf'),
    'Outfit-Medium': require('../../assets/fonts/Outfit-Medium.ttf'),
    'Outfit-SemiBold': require('../../assets/fonts/Outfit-SemiBold.ttf'),
    'Outfit-Bold': require('../../assets/fonts/Outfit-Bold.ttf'),
    'Outfit-ExtraBold': require('../../assets/fonts/Outfit-ExtraBold.ttf'),
    'Outfit-Black': require('../../assets/fonts/Outfit-Black.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={({ route }) => ({
        headerTintColor: '#23ACE3',
        headerStyle: {
          backgroundColor: theme === 'dark' ? Colors.dark.background : Colors.light.background, // Dynamic background color
        },
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontFamily: 'Outfit-SemiBold',
          fontSize: 20,
        },
      })}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="order-list" options={{ title: 'Daftar Order' }} />
      <Stack.Screen name="vendor-list/index" options={{ title: 'Daftar Vendor' }} />
      <Stack.Screen name="vendor-list/[id]" options={{ title: 'Akun Vendor' }} />
      <Stack.Screen name="detail-order" options={{ title: 'Detail Order', headerTintColor: '#000000', headerStyle: { backgroundColor: 'transparent' }}} />
      <Stack.Screen name="product-list" options={{ title: 'Daftar Produk' }} />
      <Stack.Screen name="account-list" options={{ title: 'Daftar Akun' }} />
      <Stack.Screen name="documentrecap" options={{ title: 'Rekap Bulanan' }} />
      <Stack.Screen name="profile-settings" options={{ title: 'Profile Settings' }} />
      <Stack.Screen name="vendor-add" options={{ animation: 'slide_from_bottom', title: 'Tambah Vendor' }} />
      <Stack.Screen name="product-add" options={{ animation: 'slide_from_bottom', title: 'Add Product' }} />
      <Stack.Screen name="form-vendor" options={{ animation: 'slide_from_bottom'}} />
    </Stack>
  );
}
