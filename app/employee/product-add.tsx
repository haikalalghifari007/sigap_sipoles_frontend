import { View, Text, ScrollView, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Image, Platform, TextInput,TouchableOpacity } from 'react-native';
import { FlatList,  GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { images } from '@constants/images';
import { styled } from 'nativewind';
import React, { useContext, useState } from 'react';
import { ThemeContext } from '@/components/ThemeContext';
import { Colors } from '@/constants/Colors';


const AddProductScreen = () => {  
  const { theme } = useContext(ThemeContext); // Get theme from context

  const backgroundColor = theme === 'dark' ? Colors.dark.background : Colors.light.background;
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
  

  return (
    
      <ScrollView
        style={{ flex: 1, minHeight: Dimensions.get('window').height, backgroundColor: backgroundColor }}
      >

    <View className="px-5">
        <View className='flex-row mt-4'>
          <ThemedText className="text-3xl font-obold">Yuk, </ThemedText>
          <ThemedText className="text-3xl font-obold text-originblue">isi detail</ThemedText>
        </View>
        <ThemedText className="text-3xl font-obold">produk baru disini!</ThemedText>

        
      {/* product Name Field */}
      <View className="my-4">
        <ThemedText className="mb-1 text-originblue font-olight text-sm">Nama Produk</ThemedText>
        <TextInput
          className={`border rounded-md px-4 py-3 ${getBorderColor('productName')}`}
          onFocus={() => handleFocus('productName')}
          onBlur={handleBlur}
          placeholder=""
        />
      </View>

      {/* product Address Field */}
      <View className="mb-4">
        <ThemedText className="mb-1 text-gray-500 font-olight text-sm">Tipe Produk</ThemedText>
        <TextInput
          className={`border rounded-md px-4 py-3 ${getBorderColor('productType')}`}
          inputAccessoryViewID="next"
          onFocus={() => handleFocus('productType')}
          onBlur={handleBlur}
          placeholder=""
        />
      </View>

      {/* Person in Charge Field */}
      <View className="mb-4">
        <ThemedText className="mb-1 text-gray-500 font-olight text-sm">Ukuran Produk</ThemedText>
        <TextInput
          className={`border rounded-md px-4 py-3 ${getBorderColor('productSize')}`}
          onFocus={() => handleFocus('productSize')}
          onBlur={handleBlur}
          placeholder=""
        />
      </View>

      {/* Phone Number Field */}
      <View className="mb-4">
        <ThemedText className="mb-1 text-gray-500 font-olight text-sm">Harga Produk</ThemedText>
        <TextInput
          className={`border rounded-md px-4 py-3 ${getBorderColor('productPrice')}`}
          onFocus={() => handleFocus('productPrice')}
          onBlur={handleBlur}
          placeholder=""
          keyboardType="phone-pad"
        />
      </View>

      <View className="mb-4">
        <ThemedText className="mb-1 text-gray-500 font-olight text-sm">Foto produk</ThemedText>
        <TouchableOpacity>

        <View className='border rounded-md px-14 py-8 items-center border-gray-400'>
          <Image source={require('../../assets/images/addgallery.png')} className="w-14 h-14" />
          <ThemedText className="text-gray-500 font-olight text-xs text-center">Upload a profile photo with 
          a maximum size of 5MB in PNG or JPEG format</ThemedText>
          </View>
        </TouchableOpacity>
      </View>
      

      <TouchableOpacity>

      <View className="mb-4 p-2 rounded-lg items-center bg-originblue">
        <ThemedText className="mb-1 text-white font-oregular text-lg">Lanjutkan</ThemedText>
        
      </View>
      </TouchableOpacity>
    

    </View>
      </ScrollView>
    
  )
}

export default AddProductScreen



