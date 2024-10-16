import React, { useContext, useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, useColorScheme, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import SearchField from '@/components/SearchField';
import { ThemeContext } from '@/components/ThemeContext';
import { carouselItems } from '@/data/orderData';

const screenWidth = Dimensions.get('window').width;

// Define threshold for tablet size (768px as an example)
const isTablet = screenWidth >= 768;

// Mock data for orders


// Tab navigation setup
const TabRoutes = {
  All: () => <OrderList filter="All" />,
  Unprocessed: () => <OrderList filter="Unprocessed" />,
  OnGoing: () => <OrderList filter="On-Going" />,
  Completed: () => <OrderList filter="Completed" />,
  OrderIssues: () => <OrderList filter="In Trouble" />,
};

const OrderListScreen = () => {  
  const { theme } = useContext(ThemeContext); // Get theme from context
  const backgroundColor = theme === 'dark' ? Colors.dark.background : Colors.light.background; 
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'All', title: 'All' },
    { key: 'Unprocessed', title: 'Unprocessed' },
    { key: 'OnGoing', title: 'On-Going' },
    { key: 'Completed', title: 'Completed' },
    { key: 'OrderIssues', title: 'In Trouble' },
  ]);


  // Render method for the tabs
  const renderScene = SceneMap(TabRoutes);

  return (
    <View style={{ flex: 1, backgroundColor }}>
      {/* Search Bar */}
      
      {/* Tabs */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: 100 }}
        renderTabBar={props => (
          <TabBar
                        {...props}
                        scrollEnabled
                        indicatorStyle={{ backgroundColor: Colors.colorful.blue }} // Indicator color for selected tab
                        style={{ backgroundColor }} // Background color of the tab bar
                        tabStyle={{
                            
                            width: Math.min(Dimensions.get('window').width / 4.5), // Set a fixed width for each tab item
                            justifyContent: 'center', // Center the content of each tab
                        }}
                        labelStyle={{
                            fontFamily: 'Outfit-Semibold', // Use the 'Outfit' font family
                            
                        }}
                        renderLabel={({ route, focused }) => (
                            <Text
                                className={` flex-1 w-full font-osemibold text-sm md:text-base ${focused ? 'text-originblue' : 'text-gray-500'
                                    }`}
                            >
                                {route.title}
                            </Text>
                        )}
                    />
        )}
        sceneContainerStyle={{ backgroundColor }} // Set background color for the scene container
        style={{ marginTop: 0 }} // Additional styling if needed
      />

      
    </View>
  );
}

// OrderList Component
const OrderList = ({ filter }) => {
  const { theme } = useContext(ThemeContext); // Get theme from context
  const textSearchBackgroundColor = theme === 'dark' ? Colors.dark.text : Colors.light.text;
  const cardBackgroundColor = theme === 'dark' ? Colors.dark.card : Colors.light.card; // Card background color for dark mode
  const outlineColor = theme === 'dark' ? Colors.dark.outline : Colors.light.outline; // Card background color for dark mode
  const [searchText, setSearchText] = useState('');
  const backgroundColor = theme === 'dark' ? Colors.dark.background : Colors.light.background; 

  const filteredOrders = carouselItems.filter(order =>
    filter === 'All' ? true : order.status === filter
  );

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1, backgroundColor }}>
    <SearchField placeholder = 'Search order id here'/>
    
    <FlatList 
      data={filteredOrders}
      keyExtractor={item => item.orderId}
      renderItem={({ item }) => (
        <Link href={{ pathname: "/employee/detail-order", params: { orderId: item.orderId, title: item.title, status: item.status } }} asChild>
            <TouchableOpacity>
        <View style={[styles.orderCard, { backgroundColor: cardBackgroundColor }]}>
          {/* Status indicator */}
          <View style={[styles.statusIndicator, { backgroundColor: item.statusColor }]} />
          <View style={styles.orderDetails}>
            <ThemedText className="font-omedium text-xl md:text-2xl mt-3">{item.title}</ThemedText>
            <ThemedText className="font-oregular text-xs md:text-base" style={styles.description}>{item.description}</ThemedText>
            <View style={styles.statusContainer}>
                <ThemedText className="font-oregular text-xs md:text-base" style={[styles.statusText, { color: item.statusColor }, { backgroundColor: outlineColor }]}>
                  {item.status}
                </ThemedText>
              <ThemedText className="font-olight text-xs md:text-base" style={styles.orderId}>#ID {item.orderId}</ThemedText>
            </View>
          </View>
        </View>     
        </TouchableOpacity>
        </Link>
      )}
    />

    </SafeAreaView>
  );
};

export default OrderListScreen

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
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusIndicator: {
    marginVertical: 15,
    width: 7,
    borderRadius: 10,
  },
  orderDetails: {
    marginLeft: 15,
    flex: 1,
  },
  description: {
    color: '#666',
    marginTop: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statusText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  orderId: {
    marginRight: 15,
    color: '#999',
  },
});
