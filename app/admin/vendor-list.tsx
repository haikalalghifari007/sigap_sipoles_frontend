import React, { useContext, useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, useColorScheme, Image, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import SearchField from '@/components/SearchField';
import { ThemeContext } from '@/components/ThemeContext';

// Mock data for orders
const vendors = [
  { id: '28293837', date: 'August 22, 2024', name: 'PT RAWRR KRAKATAW', description: 'Ngaglik, Kab Sleman',  image: require("../../assets/images/pt_wika.png")},
  { id: '00287423', date: 'August 22, 2024', name: 'CV LANCAR JAYA',  description: 'Magelang, Jawa Tengah',  image: require("../../assets/images/pt_wika.png")},
  { id: '00287127', date: 'August 22, 2024', name: 'PT ANGGAJAYA',  description: 'Surabaya, Jawa Timur',  image: require("../../assets/images/pt_wika.png")},
  { id: '09287427', date: 'August 22, 2024', name: 'PT SEJAHTERA ABADI', description: 'Semarang, Jawa Tengah',  image: require("../../assets/images/pt_wika.png")},
  { id: '12345678', date: 'September 15, 2024', name: 'PT BINA MANDIRI', description: 'Bandung, Jawa Barat', image: require("../../assets/images/pt_wika.png")},
{ id: '87654321', date: 'September 15, 2024', name: 'CV MITRA KARYA', description: 'Yogyakarta, DI Yogyakarta', image: require("../../assets/images/pt_wika.png")},
{ id: '11223344', date: 'September 15, 2024', name: 'PT CIPTA KARYA', description: 'Denpasar, Bali', image: require("../../assets/images/pt_wika.png")},
{ id: '44332211', date: 'September 15, 2024', name: 'PT SUMBER REJEKI', description: 'Jakarta Selatan, DKI Jakarta', image: require("../../assets/images/pt_wika.png")},
{ id: '99887766', date: 'September 15, 2024', name: 'CV BERSAMA JAYA', description: 'Malang, Jawa Timur', image: require("../../assets/images/pt_wika.png")},

];

const screenWidth = Dimensions.get('window').width;
const isTablet = screenWidth >= 768;

const VendorListScreen = () => {
  const { theme } = useContext(ThemeContext); // Get theme from context
  const cardBackgroundColor = theme === 'dark' ? Colors.dark.card : Colors.light.card; // Card background color for dark mode
  const outlineColor = theme === 'dark' ? Colors.dark.outline : Colors.light.outline; // Card background color for dark mode
  const backgroundColor = theme === 'dark' ? Colors.dark.background : Colors.light.background;

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1, backgroundColor }}> 
    <SearchField placeholder = 'Search vendor name here'/>

    <FlatList
      data={vendors}
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
            <ThemedText className="font-omedium text-lg md:text-xl">{item.name}</ThemedText>
            <ThemedText className="font-oregular text-base md:text-lg" style={styles.description}>{item.description}</ThemedText>
            <View style={styles.statusContainer}>
            <TouchableOpacity style={[{ backgroundColor: outlineColor }]} className='mt-2 flex flex-row space-x-1 items-center p-1 rounded-md'>
                <ThemedText className="font-oregular text-xs md:text-base text-[#FAC441]">
                  Edit product
                </ThemedText>
                  <Ionicons name="create-outline" size={16} color={'#FAC441'} />
              </TouchableOpacity>
              <ThemedText className="font-olight text-xs md:text-base" style={styles.orderId}>Registered on {item.date}</ThemedText>
            </View>
          </View>
        </View>
      )}
    />
    <Link href='/admin/vendor-add' asChild>
    <TouchableOpacity className='absolute bottom-10 md:bottom-14 right-5 md:right-8'>
      <View style={[{backgroundColor: cardBackgroundColor, borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 4,}]}>
      <Ionicons name="add" size={isTablet ? 80 : 50} color="#23ACE3" />

      </View>
    </TouchableOpacity>
    </Link>
    </SafeAreaView>
  );
};

export default VendorListScreen

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
    alignItems: 'center',
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: '600',
    marginBottom: 15,
    color: "#FAC441",
  },
  orderId: {
    marginTop: 10,
    color: '#999',
  },
});
