import { View, Text, Switch, TouchableOpacity, } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Image, Platform } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { images } from '@constants/images';
import { Colors } from '@/constants/Colors';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Link } from 'expo-router';
import { ThemeContext } from '@/components/ThemeContext';
import { useContext } from 'react';


const ProfilesScreen = () => {  
  const { theme } = useContext(ThemeContext); // Get theme from context
  const cardBackgroundColor = theme === 'dark' ? Colors.dark.card : Colors.light.card; // Card background color for dark mode

  const backgroundColor = theme === 'dark' ? Colors.dark.background : Colors.light.background;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <View className="px-5 my-6  space-y-6  " >
        <View className="bg-originblue rounded-3xl  p-5">
          <View className='items-center'>
            <Image
              source={require("../../../assets/images/profilplaceholder.png")}
              className="w-24 h-24 mt-10"
            />
            <ThemedText className="text-xl mt-5 font-oextrabold text-white">
              LANJAR SAMADI
            </ThemedText>
            <ThemedText className="text-lg font-omedium text-white">
              SUPER ADMIN
            </ThemedText>

          </View>

          <View className='flex-row justify-between px-5 my-10'>
              <View>
                <ThemedText className="text-xl font-omedium text-center text-white">
                  100
                </ThemedText>
                <ThemedText className="text-sm font-omedium text-white ">
                  Total Order
                </ThemedText>
              </View>

         

              <View>
              <ThemedText className="text-xl font-omedium text-center text-white">
                  9
                </ThemedText>
                <ThemedText className="text-sm font-omedium text-white ">
                  On-going
                </ThemedText>
              </View>

          

              <View>
              <ThemedText className="text-xl font-omedium text-center text-white">
                  91
                </ThemedText>
                <ThemedText className="text-sm font-omedium text-white ">
                  Complete
                </ThemedText>
              </View>

            </View>
        </View>

        
            <ThemedText className="text-xl font-omedium text-gray-500">
              GENERAL
            </ThemedText>

            <Link href="/admin/profile-settings" asChild>
            <TouchableOpacity>
            <View className="flex-row  items-center shadow-sm shadow-grey  px-2 py-1.5" style={[{ backgroundColor: cardBackgroundColor, borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 4, elevation: 4, }]}>
              <View className='bg-[#DEF3FB] p-2 rounded-lg'>
              <Ionicons name="create-outline" size={30} color="#23ACE3" />
              </View>
              <View className='flex-row justify-between flex-1 py-1 items-center'>

                <View className=''>
                  <ThemedText className=" mx-3 text-base font-omedium">
                    Profile Settings
                  </ThemedText>
                  <ThemedText className=" mx-3 text-base font-oregular text-gray-400">
                  Update and modify your profile
                  </ThemedText>
                
                </View>
                <Ionicons name="chevron-forward-outline" size={30} color="#9ca3af" />
              </View>
              
            </View>
            </TouchableOpacity>
            </Link>

            <Link href="index" asChild>
            <TouchableOpacity>
            <View className="flex-row  items-center shadow-sm shadow-grey  px-2 py-1.5" style={[{ backgroundColor: cardBackgroundColor, borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 4, elevation: 4, }]}>
              <View className='bg-[#FFE1E9] p-2 rounded-lg'>
              <Ionicons name="log-out" size={30} color="#FC366B" />
              </View>
              <View className='flex-row justify-between flex-1 py-1 items-center'>

                <View className=''>
                  <ThemedText className=" mx-3 text-base font-omedium">
                    Log Out
                  </ThemedText>
                  <ThemedText className=" mx-3 text-base font-oregular text-gray-400">
                  Are you sure you want to log out?
                  </ThemedText>
                
                </View>
                <Ionicons name="chevron-forward-outline" size={30} color="#9ca3af" />
              </View>
              
            </View>
            </TouchableOpacity>
            </Link>
        

        
      </View>
    </SafeAreaView>
    
  )
}

export default ProfilesScreen


