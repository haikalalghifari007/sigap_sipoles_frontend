import { View, Text, ScrollView, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Image, Platform, TextInput,TouchableOpacity } from 'react-native';
import { FlatList,  GestureHandlerRootView } from 'react-native-gesture-handler';

import React, { useContext, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { ThemeContext } from '@/components/ThemeContext';


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

    <View className="px-5">
        <View className='flex-row mt-4 items-center'>
          <Image source={require("../../assets/images/profilplaceholder.png")} className="w-20 h-20" />
          <View className='ml-5 '>

          <ThemedText className="text-2xl font-osemibold ">My Profile</ThemedText>
          <ThemedText className="text-base font-oregular text-gray-400 ">Update and modify your profile.</ThemedText>
          </View>
        </View>

        <View className='px-8 my-5 pt-3 pb-10 space-y-5' style={[{backgroundColor: cardBackgroundColor, borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 4, }]}>
            <ThemedText className="text-2xl font-osemibold ">Account</ThemedText>
            <View className='flex-row mt-4 items-center'>
                <Image source={require("../../assets/images/psname.png")} className="w-10 h-10" />
                <View className='ml-3 flex-1'>

                    <ThemedText className="text-lg font-omedium">Full Name</ThemedText>
                    <View style={{borderBottomColor: lineColor, borderBottomWidth: 1, marginTop: -5, flex: 1, width: '100%'}}>
                        <TextInput className='font-olight text-base text-gray-400' defaultValue='Lanjar Samadi' />
                    </View>
                </View>
            </View>

            <View className='flex-row mt-4 items-center'>
                <Image source={require("../../assets/images/psnik.png")} className="w-10 h-10" />
                <View className='ml-3 flex-1'>

                    <ThemedText className="text-lg font-omedium">NIK</ThemedText>
                    <View style={{borderBottomColor: lineColor, borderBottomWidth: 1, marginTop: -5, flex: 1, width: '100%'}}>
                        <TextInput className='font-olight text-base text-gray-400' defaultValue='3372193992890022' />
                    </View>
                </View>
            </View>

            <View className='flex-row mt-4 items-center'>
                <Image source={require("../../assets/images/psemail.png")} className="w-10 h-10" />
                <View className='ml-3 flex-1'>

                    <ThemedText className="text-lg font-omedium">Email</ThemedText>
                    <View style={{borderBottomColor: lineColor, borderBottomWidth: 1, marginTop: -5, flex: 1, width: '100%'}}>
                        <TextInput className='font-olight text-base text-gray-400' defaultValue='lanjarsamadi11@gmail.com' />
                    </View>
                </View>
            </View>

            <View className='flex-row mt-4 items-center'>
                <Image source={require("../../assets/images/psphone.png")} className="w-10 h-10" />
                <View className='ml-3 flex-1'>

                    <ThemedText className="text-lg font-omedium">Phone Number</ThemedText>
                    <View style={{borderBottomColor: lineColor, borderBottomWidth: 1, marginTop: -5, flex: 1, width: '100%'}}>
                        <TextInput className='font-olight text-base text-gray-400' defaultValue='+62 855-1233-4847' />
                    </View>
                </View>
            </View>

            <View className='flex-row mt-4 items-center'>
                <Image source={require("../../assets/images/pspwd.png")} className="w-10 h-10" />
                <View className='ml-3 flex-1'>

                    <ThemedText className="text-lg font-omedium">Password</ThemedText>
                    <View style={{borderBottomColor: lineColor, borderBottomWidth: 1, marginTop: -5, flex: 1, width: '100%'}}>
                        <TextInput className='font-olight text-base text-gray-400' defaultValue='********' />
                    </View>
                </View>
            </View>
        </View>
        

        
      {/* Vendor Name Field */}
      

      
      

      <TouchableOpacity>

      <View className="mt-4 p-2 rounded-xl items-center bg-originblue">
        <ThemedText className="mb-1 text-white font-oregular text-lg">Save Changes</ThemedText>
        
      </View>
      </TouchableOpacity>
    

    </View>
      </ScrollView>
    
  )
}

export default ProfileSettingScreen



