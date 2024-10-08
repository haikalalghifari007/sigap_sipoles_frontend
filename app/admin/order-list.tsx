import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, useColorScheme, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';

// Mock data for orders
const orders = [
  { id: '28293837', name: 'Power Pole Extra', status: 'Completed', description: 'Installation was successful on 26/09/24.', statusColor: '#00ADEF' },
  { id: '00287423', name: 'Power Pole Large', status: 'On-Going', description: 'In the process of shipping.', statusColor: '#FF9B2F' },
  { id: '00287127', name: 'Power Pole Medium', status: 'In Trouble', description: 'Unexpected problems occurred.', statusColor: '#FC366B' },
  { id: '09287427', name: 'Power Pole Small', status: 'Unprocessed', description: 'Order not yet processed by vendor.', statusColor: '#8153BC' },
  { id: '09227427', name: 'Power Pole Small', status: 'In Trouble', description: 'Got Accident.', statusColor: '#FC366B' },
  { id: '21293837', name: 'Power Pole Extra', status: 'Completed', description: 'Installation was successful on 20/09/24.', statusColor: '#00ADEF' },
];

// Tab navigation setup
const TabRoutes = {
  All: () => <OrderList filter="All" />,
  Unprocessed: () => <OrderList filter="Unprocessed" />,
  OnGoing: () => <OrderList filter="On-Going" />,
  Completed: () => <OrderList filter="Completed" />,
  OrderIssues: () => <OrderList filter="In Trouble" />,
};

const OrderListScreen = () => {  
  const colorScheme = useColorScheme(); // Get the current color scheme
  const backgroundColor = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background; 
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
                        indicatorStyle={{ backgroundColor: '#00ADEF' }} // Indicator color for selected tab
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
                                className={` flex-1 w-full font-osemibold text-sm ${focused ? 'text-blue-500' : 'text-gray-500'
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
  const colorScheme = useColorScheme(); // Get the current color scheme
  const textSearchBackgroundColor = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;
  const cardBackgroundColor = colorScheme === 'dark' ? Colors.dark.card : Colors.light.card; // Card background color for dark mode
  const outlineColor = colorScheme === 'dark' ? Colors.dark.outline : Colors.light.outline; // Card background color for dark mode
  const [searchText, setSearchText] = useState('');
  const backgroundColor = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background; 

  const filteredOrders = orders.filter(order =>
    filter === 'All' ? true : order.status === filter
  );

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1, backgroundColor }}>
    <View className={`flex-row items-center border space-x-1 rounded-lg m-3 px-3 py-1`} style={{ borderColor: outlineColor }}>
            <Ionicons name="search-outline" size={24} color='#D1D1D1FF' />
                <TextInput
                    style={{ flex: 1, marginTop: -4, color: textSearchBackgroundColor }}
                    className="text-base py-2 font-olight"
                    placeholder="Search order id here"
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>
    
    <FlatList 
      data={filteredOrders}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Link href={{ pathname: "/admin/detail-order", params: { id: item.id, name: item.name, status: item.status } }} asChild>
            <TouchableOpacity>
        <View style={[styles.orderCard, { backgroundColor: cardBackgroundColor }]}>
          {/* Status indicator */}
          <View style={[styles.statusIndicator, { backgroundColor: item.statusColor }]} />
          <View style={styles.orderDetails}>
            <ThemedText className="font-omedium text-xl mt-3">{item.name}</ThemedText>
            <ThemedText className="font-oregular text-xs" style={styles.description}>{item.description}</ThemedText>
            <View style={styles.statusContainer}>
                <ThemedText className="font-oregular text-xs" style={[styles.statusText, { color: item.statusColor }, { backgroundColor: outlineColor }]}>
                  {item.status}
                </ThemedText>
              <ThemedText className="font-olight text-xs" style={styles.orderId}>#ID {item.id}</ThemedText>
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
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
