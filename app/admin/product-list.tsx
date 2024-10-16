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
import AwesomeAlert from 'react-native-awesome-alerts';

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

  const [filteredProducts, setFilteredProducts] = useState(productData); // Manage filtered product list
  const [showAlert, setShowAlert] = useState(false); // For displaying AwesomeAlert
  const [selectedProductId, setSelectedProductId] = useState(null); // Store the selected product ID for deletion

  // Trigger alert to confirm deletion
  const handleDeleteProduct = (id) => {
    setSelectedProductId(id);
    setShowAlert(true);
  };

  // Confirm deletion of product
  const confirmDeleteProduct = () => {
    const updatedProducts = filteredProducts.filter(product => product.id !== selectedProductId);
    setFilteredProducts(updatedProducts);
    setShowAlert(false); // Hide the alert after deletion
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1, backgroundColor }}>
      <SearchField placeholder='Search product name here' />

      <FlatList
        data={filteredProducts}
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
                <View style={[{ backgroundColor: outlineColor }]} className='rounded-md'>
                  <Link href={{ pathname: '/admin/add-edit', params: { type: 'product', mode: 'edit', item: item, name: item.name, typeP: item.type, price: item.price, size: item.size } }} asChild>
                    <TouchableOpacity className='flex flex-row space-x-1 items-center p-1'>
                      <ThemedText className="font-oregular text-xs md:text-base text-[#FAC441]">
                        Edit product
                      </ThemedText>
                      <Ionicons name="create-outline" size={16} color={'#FAC441'} />
                    </TouchableOpacity>
                  </Link>
                </View>
                <TouchableOpacity
                  style={[{ backgroundColor: outlineColor }]}
                  className='flex flex-row space-x-1 ml-2 items-center p-1 rounded-md'
                  onPress={() => handleDeleteProduct(item.id)} // Trigger delete alert on press
                >
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
      <Link href={{ pathname: '/admin/add-edit', params: { type: 'product', mode: 'add' } }} asChild>
        <TouchableOpacity className='absolute bottom-10 right-5'>
          <View style={[{ backgroundColor: cardBackgroundColor, borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 4, }]}>
            <Ionicons name="add" size={isTablet ? 80 : 50} color="#23ACE3" />

          </View>
        </TouchableOpacity>
      </Link>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        contentContainerStyle={[{ backgroundColor: backgroundColor, borderRadius: 20 }]}
        customView={
          <View className='items-center'>
            <View className='p-3 rounded-full' style={{ backgroundColor: Colors.colorful.redtr }}>
              <Image source={require('../../assets/images/cautions.png')} className='w-6 h-6' resizeMode='contain' />
            </View>
            <ThemedText className="font-omedium text-lg md:text-xl my-2">Delete Product</ThemedText>
            <ThemedText className="font-oregular text-sm md:text-base text-gray-600">Are you sure you want to delete this product?</ThemedText>
            <ThemedText className="font-oregular text-sm md:text-base text-gray-600">This action cannot be undone.</ThemedText>
          </View>
        }
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancel"
        cancelButtonTextStyle={{ color: Colors.light.text, fontFamily: 'Outfit-Regular', paddingHorizontal: 30, paddingVertical: 10 }}
        cancelButtonStyle={{ backgroundColor: outlineColor, borderRadius: 10 }}
        confirmText="Delete"
        confirmButtonTextStyle={{ fontFamily: 'Outfit-Regular', paddingHorizontal: 30, paddingVertical: 10 }}
        confirmButtonStyle={{ backgroundColor: Colors.colorful.red, borderRadius: 10 }}
        onCancelPressed={() => setShowAlert(false)}  // Hide alert on cancel
        onConfirmPressed={confirmDeleteProduct}  // Confirm deletion
      />
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
    marginHorizontal: isTablet ? 40 : 15,
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
