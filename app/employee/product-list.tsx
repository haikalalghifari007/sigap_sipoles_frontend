import React, { useContext, useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, useColorScheme, Image, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Ionicons } from '@expo/vector-icons';
import { black, white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import SearchField from '@/components/SearchField';
import { ThemeContext } from '@/components/ThemeContext';
import { productData } from '@/data/productData';

const screenWidth = Dimensions.get('window').width;
const isTablet = screenWidth >= 768;

// Mock data for orders




const ProductListScreen = () => {
  const { theme } = useContext(ThemeContext); // Get theme from context
  const cardBackgroundColor = theme === 'dark' ? Colors.dark.card : Colors.light.card; // Card background color for dark mode
  const textSearchBackgroundColor = theme === 'dark' ? Colors.dark.text : Colors.light.text;
  const outlineColor = theme === 'dark' ? Colors.dark.outline : Colors.light.outline; // Card background color for dark mode
  const backgroundColor = theme === 'dark' ? Colors.dark.background : Colors.light.background;
  const [searchText, setSearchText] = useState('');

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1, backgroundColor }}>
    <SearchField placeholder = 'Search product name here'/>

    <FlatList
      data={productData}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={[styles.orderCard, { backgroundColor: backgroundColor }]}>
          {/* Status indicator */}
          <View style={[styles.statusIndicator, { backgroundColor: cardBackgroundColor }]} >
              <Image className='w-20 h-20 md:w-28 md:h-28 rounded-lg'
              source={item.image}
              
              resizeMode="contain"
            />
          </View>
          <View style={styles.orderDetails}>
            <ThemedText className="font-omedium text-lg md:text-2xl">{item.name}</ThemedText>
            <ThemedText className="font-oregular text-base md:text-xl" style={styles.description}>Type {item.type}</ThemedText>
            <View style={styles.statusContainer}>
              <TouchableOpacity style={[{ backgroundColor: outlineColor }]} className='flex flex-row space-x-1 items-center p-1 rounded-md'>
                <ThemedText className="font-oregular text-xs md:text-base text-[#FAC441]">
                  Edit product
                </ThemedText>
                  <Ionicons name="create-outline" size={16} color={'#FAC441'} />
              </TouchableOpacity>
              <TouchableOpacity style={[{ backgroundColor: outlineColor }]} className='flex flex-row space-x-1 ml-2 items-center p-1 rounded-md'>
                <ThemedText className="font-oregular text-xs md:text-base text-redalert">
                  Delete product
                </ThemedText>
                  <Ionicons name="trash-outline" size={16} color={'#Fc366b'} />
              </TouchableOpacity>
              
            </View>
          </View>
        </View>
      )}
    />
    <Link href='/admin/product-add' asChild>
    <TouchableOpacity className='absolute bottom-10 right-5'>
      <View style={[{backgroundColor: cardBackgroundColor, borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 4,}]}>
      <Ionicons name="add" size={isTablet ? 80 : 50} color="#23ACE3" />

      </View>
    </TouchableOpacity>
    </Link>
    </SafeAreaView>
  );
};

export default ProductListScreen

// Styles
const styles = StyleSheet.create({

  searchInput: {
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  orderCard: {
    flexDirection: 'row',
    marginHorizontal: isTablet? 40 : 15,  
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
    
  },
  statusIndicator: {
    justifyContent: 'center',

    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderDetails: {
    marginLeft: 10,
    flex: 1,
  },
  description: {
    color: '#666',
  },
  statusContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 10,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.07,
    // shadowRadius: 4,
    // elevation: 3,
  },
  editText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: '600',
    marginBottom: 15,
    color: "#FAC441",
  },

  deleteText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: '600',
    marginBottom: 15,
    color: "#FC366B",
  },

  orderId: {
    marginTop: 10,
    color: '#999',
  },
});
