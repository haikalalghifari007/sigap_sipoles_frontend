import { View, Text, ScrollView, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Image, Platform, TextInput,TouchableOpacity } from 'react-native';
import { FlatList,  GestureHandlerRootView } from 'react-native-gesture-handler';

import React, { useContext, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { ThemeContext } from '@/components/ThemeContext';

const screenWidth = Dimensions.get('window').width;
const isTablet = screenWidth >= 768;
const ProfileSettingScreen = () => {  
  const { theme } = useContext(ThemeContext); // Get theme from context

  const backgroundColor = theme === 'dark' ? Colors.dark.background : Colors.light.background;
  const lineColor = theme === 'dark' ? '#FFFFFF' : '#000000';
  const [focusedField, setFocusedField] = useState('');

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  const getBorderColor = (field) => {
    return focusedField === field ? 'border-originblue' : 'border-gray-400';
  };

  const cardBackgroundColor = theme === 'dark' ? Colors.dark.card : Colors.light.card; // Card background color for dark mode
  

  return (
      
      <ScrollView
        style={{ flex: 1, minHeight: Dimensions.get('window').height, backgroundColor: backgroundColor }}
      >

    <View className="px-5 md:px-12">
        <View className='flex-row mt-4 items-center'>
          <Image source={require("../../assets/images/profilplaceholder.png")} className="w-20 md:w-28 h-20 md:h-28" />
          <View className='ml-5 '>

          <ThemedText className="text-2xl md:text-3xl font-osemibold ">My Profile</ThemedText>
          <ThemedText className="text-base md:text-2xl font-oregular text-gray-400 ">Update and modify your profile.</ThemedText>
          </View>
        </View>

        <View className='px-8 md:px-14 my-5 pt-3 md:pt-6 pb-10 md:pb-14 space-y-5' style={[{backgroundColor: cardBackgroundColor, borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 4, }]}>
            <ThemedText className="text-2xl md:text-3xl font-osemibold ">Account</ThemedText>
            <View className='flex-row mt-4 items-center'>
                <Image source={require("../../assets/images/psname.png")} className="w-10 md:w-16 h-10 md:h-16 " />
                <View className='ml-3 md:ml-5 flex-1'>

                    <ThemedText className="text-lg md:text-2xl font-omedium">Full Name</ThemedText>
                    <View style={{borderBottomColor: lineColor, borderBottomWidth: 1, marginTop: isTablet ? 0 : -5, flex: 1, width: '100%'}}>
                        <TextInput className='font-olight text-base md:text-xl text-gray-400' defaultValue='Lanjar Samadi' />
                    </View>
                </View>
            </View>

            <View className='flex-row mt-4 items-center'>
                <Image source={require("../../assets/images/psnik.png")} className="w-10 md:w-16 h-10 md:h-16" />
                <View className='ml-3 md:ml-5 flex-1'>

                    <ThemedText className="text-lg md:text-2xl font-omedium">NIK</ThemedText>
                    <View style={{borderBottomColor: lineColor, borderBottomWidth: 1, marginTop: isTablet ? 0 : -5, flex: 1, width: '100%'}}>
                        <TextInput className='font-olight text-base md:text-xl text-gray-400' defaultValue='3372193992890022' />
                    </View>
                </View>
            </View>

            <View className='flex-row mt-4 items-center'>
                <Image source={require("../../assets/images/psemail.png")} className="w-10 md:w-16 h-10 md:h-16" />
                <View className='ml-3 md:ml-5 flex-1'>

                    <ThemedText className="text-lg md:text-2xl font-omedium">Email</ThemedText>
                    <View style={{borderBottomColor: lineColor, borderBottomWidth: 1, marginTop: isTablet ? 0 : -5, flex: 1, width: '100%'}}>
                        <TextInput className='font-olight text-base md:text-xl text-gray-400' defaultValue='lanjarsamadi11@gmail.com' />
                    </View>
                </View>
            </View>

            <View className='flex-row mt-4 items-center'>
                <Image source={require("../../assets/images/psphone.png")} className="w-10 h-10 md:w-16 md:h-16 " />
                <View className='ml-3 md:ml-5 flex-1'>

                    <ThemedText className="text-lg font-omedium md:text-2xl">Phone Number</ThemedText>
                    <View style={{borderBottomColor: lineColor, borderBottomWidth: 1, marginTop:isTablet ? 0 : -5, flex: 1, width: '100%'}}>
                        <TextInput className='font-olight text-base text-gray-400 md:text-xl' defaultValue='+62 855-1233-4847' />
                    </View>
                </View>
            </View>

            <View className='flex-row mt-4 items-center'>
                <Image source={require("../../assets/images/pspwd.png")} className="w-10 h-10 md:w-16 md:h-16" />
                <View className='ml-3 md:ml-5 flex-1'>

                    <ThemedText className="text-lg font-omedium md:text-2xl">Password</ThemedText>
                    <View style={{borderBottomColor: lineColor, borderBottomWidth: 1, marginTop:isTablet ? 0 : -5, flex: 1, width: '100%'}}>
                        <TextInput className='font-olight text-base md:text-xl text-gray-400' defaultValue='********' />
                    </View>
                </View>
            </View>
        </View>
        

        
      {/* Vendor Name Field */}
      

      
      

      <TouchableOpacity>

      <View className="mt-4 p-2 md:p-5 rounded-xl items-center bg-originblue">
        <ThemedText className="mb-1 text-white font-oregular text-lg md:text-2xl">Save Changes</ThemedText>
        
      </View>
      </TouchableOpacity>
    

    </View>
      </ScrollView>
    
  )
}

export default ProfileSettingScreen



