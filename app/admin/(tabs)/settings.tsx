import { View, Text, Switch, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Image, Platform } from 'react-native';
import { FlatList, TouchableOpacity, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { images } from '@constants/images';
import { Colors } from '@/constants/Colors';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { ThemeContext } from '@/components/ThemeContext';
import { useContext } from 'react';

const screenWidth = Dimensions.get('window').width; 
const isTablet = screenWidth >= 768;  

const SettingsScreen = () => {  
  const { theme, toggleTheme } = useContext(ThemeContext); // Access theme and toggle function from context
  const isDarkMode = theme === 'dark';
  
  const cardBackgroundColor = theme === 'dark' ? Colors.dark.card : Colors.light.card; // Card background color for dark mode

  const backgroundColor = theme === 'dark' ? Colors.dark.background : Colors.light.background;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <View className="px-5 md:px-12 my-6  space-y-6  " >
        <View>
            <ThemedText className="text-2xl md:text-4xl font-osemibold text-center">
              Settings
            </ThemedText>
        </View>

        <View>
            <ThemedText className="text-xl md:text-3xl font-omedium md:mt-8">
              Preferences
            </ThemedText>
            <View className="flex-row my-2  items-center px-5 md:px-10 py-2 md:py-4" style={[{ backgroundColor: cardBackgroundColor, borderRadius: 30, shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.07, shadowRadius: 4, elevation: 4, }]}>
              <TabBarIcon name={'contrast'} size={isTablet ? 32 : 24} color={'#23ACE3'} />
              <View className='flex-1 justify-between flex-row items-center'>
                <ThemedText className=" mx-3 md:mx-5 my-1 text-base md:text-2xl font-oregular">
                  Dark Mode
                </ThemedText>
                <Switch value={isDarkMode} onValueChange={toggleTheme} />
              </View>
              
            </View>
        </View>

        <View>
            <ThemedText className="text-xl md:text-3xl font-omedium">
              Notification
            </ThemedText>
            <View className="flex-row my-2  items-center px-5 md:px-10 py-2 md:py-4" style={[{ backgroundColor: cardBackgroundColor, borderRadius: 30, shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.07, shadowRadius: 4, elevation: 4, }]}>
              <TabBarIcon name={'notifications-outline'} size={isTablet ? 32 : 24} color={'#23ACE3'} />
              <View className='flex-1 justify-between flex-row items-center'>
                <ThemedText className=" mx-3 md:mx-5 my-1 text-base md:text-2xl font-oregular">
                  Push Notification
                </ThemedText>
                <Switch>
                  
                </Switch>
              </View>
              
            </View>
        </View>

        <View>
            <ThemedText className="text-xl md:text-3xl font-omedium">
              About
            </ThemedText>
            <View className="flex-row my-2  items-center px-5 md:px-10 py-2 md:py-4" style={[{ backgroundColor: cardBackgroundColor, borderRadius: 30, shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.07, shadowRadius: 4, elevation: 4, }]}>
              <TabBarIcon name={'notifications-outline'} size={isTablet ? 32 : 24} color={'#23ACE3'} />
              <View className='flex-1 justify-between flex-row items-center'>
                <ThemedText className=" mx-3 md:mx-5 my-1 text-base md:text-2xl font-oregular">
                  About
                </ThemedText>
                <Switch>
                  
                </Switch>
              </View>
              
            </View>
        </View>

        
      </View>
    </SafeAreaView>
    
  )
}

export default SettingsScreen


