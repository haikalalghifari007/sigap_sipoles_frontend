import { View, Text, Switch, TouchableOpacity, Dimensions, } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Image, Platform } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { images } from '@/constants/images';
import { Colors } from '@/constants/Colors';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Link } from 'expo-router';
import { ThemeContext } from '@/components/ThemeContext';
import { useContext } from 'react';

const screenWidth = Dimensions.get('window').width;

// Define threshold for tablet size (768px as an example)
const isTablet = screenWidth >= 768;


const ProfilesScreen = () => {  
  const { theme } = useContext(ThemeContext); // Get theme from context
  const cardBackgroundColor = theme === 'dark' ? Colors.dark.card : Colors.light.card; // Card background color for dark mode

  const backgroundColor = theme === 'dark' ? Colors.dark.background : Colors.light.background;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <View className="px-5 md:px-12 my-6 md:my-10  space-y-6  " >
        <View className="bg-originblue rounded-3xl  p-5 md:px-16">
          <View className='items-center'>
            <Image
              source={require("../../../assets/images/profilplaceholder.png")}
              className="w-24 md:w-32 h-24 md:h-32 mt-10"
            />
            <ThemedText className="text-xl md:text-3xl mt-5 font-oextrabold text-white">
              LANJAR SAMADI
            </ThemedText>
            <ThemedText className="text-lg md:text-2xl font-omedium text-white">
              SUPER ADMIN
            </ThemedText>

          </View>

          <View className='flex-row justify-between px-5 my-10'>
              <View>
                <ThemedText className="text-xl md:text-2xl font-omedium text-center text-white">
                  100
                </ThemedText>
                <ThemedText className="text-sm md:text-xl font-omedium text-white ">
                  Total Order
                </ThemedText>
              </View>

         

              <View>
              <ThemedText className="text-xl md:text-2xl font-omedium text-center text-white">
                  9
                </ThemedText>
                <ThemedText className="text-sm md:text-xl font-omedium text-white ">
                  On-going
                </ThemedText>
              </View>

          

              <View>
              <ThemedText className="text-xl md:text-2xl font-omedium text-center text-white">
                  91
                </ThemedText>
                <ThemedText className="text-sm md:text-xl font-omedium text-white ">
                  Complete
                </ThemedText>
              </View>

            </View>
        </View>

        
            <ThemedText className="text-xl md:text-2xl font-omedium text-gray-500">
              GENERAL
            </ThemedText>

            <Link href="/vendor/profile-settings" asChild>
            <TouchableOpacity>
            <View className="flex-row  items-center shadow-sm shadow-grey  px-2 md:px-6 py-1.5 md:py-4" style={[{ backgroundColor: cardBackgroundColor, borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 4, elevation: 4, }]}>
              <View className='bg-[#70CAED40] p-2 rounded-lg'>
              <Ionicons name="create-outline" size={isTablet ? 50 : 30} color="#23ACE3" />
              </View>
              <View className='flex-row justify-between flex-1 py-1 items-center'>

                <View className=''>
                  <ThemedText className=" mx-3 md:mx-5 text-base md:text-xl font-omedium">
                    Profile Settings
                  </ThemedText>
                  <ThemedText className=" mx-3 md:mx-5 text-base md:text-xl font-oregular text-gray-400">
                  Update and modify your profile
                  </ThemedText>
                
                </View>
                <Ionicons name="chevron-forward-outline" size={isTablet ? 40 : 30} color="#9ca3af" />
              </View>
              
            </View>
            </TouchableOpacity>
            </Link>

            <Link href="index" asChild>
            <TouchableOpacity>
            <View className="flex-row  items-center shadow-sm shadow-grey  px-2 md:px-6 py-1.5 md:py-4" style={[{ backgroundColor: cardBackgroundColor, borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 4, elevation: 4, }]}>
              <View className='bg-[#FF88A840] p-2 rounded-lg'>
              <Ionicons name="log-out" size={isTablet ? 50 : 30} color="#FC366B" />
              </View>
              <View className='flex-row justify-between flex-1 py-1 items-center'>

                <View className=''>
                  <ThemedText className=" mx-3 md:mx-5 text-base md:text-xl font-omedium">
                    Log Out
                  </ThemedText>
                  <ThemedText className=" mx-3 md:mx-5 text-base md:text-xl font-oregular text-gray-400">
                  Are you sure you want to log out?
                  </ThemedText>
                
                </View>
                <Ionicons name="chevron-forward-outline" size={isTablet ? 40 : 30} color="#9ca3af" />
              </View>
              
            </View>
            </TouchableOpacity>
            </Link>
        

        
      </View>
    </SafeAreaView>
    
  )
}

export default ProfilesScreen


