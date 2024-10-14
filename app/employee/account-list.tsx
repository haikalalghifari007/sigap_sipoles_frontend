import React, { useContext, useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, useColorScheme, Image, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Link } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchField from '@/components/SearchField';
import { ThemeContext } from '@/components/ThemeContext';

const screenWidth = Dimensions.get('window').width;

// Define threshold for tablet size (768px as an example)
const isTablet = screenWidth >= 768;

// Mock data for accounts
const accounts = [
    { id: '28293837', name: 'Lanjar Samadi', status: 'Admin', verified: true, image: require("../../assets/images/gupong.png") },
    { id: '00287423', name: 'Hasan wes kecekel', status: 'Employees', verified: true, image: require("../../assets/images/gupong.png") },
    { id: '00287127', name: 'Gilang Semangka', status: 'Admin', verified: true, image: require("../../assets/images/gupong.png") },
    { id: '09287427', name: 'Haikal Al Ghifari', status: 'Drivers', verified: true, image: require("../../assets/images/gupong.png") },
    { id: '00287271', name: 'Pak Min', status: 'Employees', verified: false, image: require("../../assets/images/gupong.png") },
    { id: '09265427', name: 'Kak Gem', status: 'Drivers', verified: false, image: require("../../assets/images/gupong.png") },
    { id: '09287127', name: 'Ghufron Akbar', status: 'Drivers', verified: true, image: require("../../assets/images/gupong.png") },
    { id: '00187271', name: 'Rendy Septiaji', status: 'Employees', verified: true, image: require("../../assets/images/gupong.png") },
    { id: '09215427', name: 'Raden Kurniawan Mangunkusumo', status: 'Drivers', verified: true, image: require("../../assets/images/gupong.png") },
    { id: '18293837', name: 'Akhtar Saputra', status: 'Admin', verified: true, image: require("../../assets/images/gupong.png") },
];

// Tab navigation setup
const TabRoutes = {
    All: () => <AccountList filter="All" />,
    Request: () => <RequestList />,
    Admin: () => <AccountList filter="Admin" />,
    Employees: () => <AccountList filter="Employees" />,
    Drivers: () => <AccountList filter="Drivers" />,
};


const AccountListScreen = () => {
    const { theme } = useContext(ThemeContext); // Get theme from context
    const backgroundColor = theme === 'dark' ? Colors.dark.background : Colors.light.background; // Adjusted for dark mode
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'All', title: 'All' },
        { key: 'Request', title: 'Request' },
        { key: 'Admin', title: 'Admin' },
        { key: 'Employees', title: 'Employees' },
        { key: 'Drivers', title: 'Drivers' },
    ]);

    // Render method for the tabs
    const renderScene = SceneMap(TabRoutes);

    return (
        <View style={{ flex: 1, backgroundColor }}>
            {/* Tabs */}
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: 400 }}
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
};

// AccountList Component
const AccountList = ({ filter }) => {
    const { theme } = useContext(ThemeContext); // Get theme from context
    const outlineColor = theme === 'dark' ? Colors.dark.outline : Colors.light.outline; // Card background color for dark mode
    const backgroundColor = theme === 'dark' ? Colors.dark.background : Colors.light.background; // Adjusted for dark mode
    
    const [searchText, setSearchText] = useState('');

    const filteredAccounts = accounts.filter(account =>
        filter === 'All' ? account.verified : account.verified && account.status === filter
    );

    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1, backgroundColor }}>
            
            <SearchField placeholder = 'Search account name here'/>
            <FlatList
            
                data={filteredAccounts}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (

                    <View style={[styles.orderCard, { backgroundColor: backgroundColor }]}>
                        <View style={styles.statusIndicator}>
                            <Image className='w-20 h-20 md:w-28 md:h-28 rounded-lg'
                                source={item.image}
                                
                                resizeMode="contain"
                            />
                        </View>
                        <View style={styles.orderDetails}>
                            <ThemedText className="font-omedium text-xl md:text-2xl"  numberOfLines={1}ellipsizeMode="tail">{item.name}</ThemedText>
                            <ThemedText className="font-oregular text-lg md:text-xl" style={styles.description}>{item.status}</ThemedText>
                            <View style={styles.statusContainer}>
                                <TouchableOpacity style={[{ backgroundColor: outlineColor }]} className='flex flex-row space-x-1 items-center p-1 rounded-md'>
                                    <ThemedText className="font-oregular text-xs md:text-base text-redalert" >
                                        Delete Account
                                    </ThemedText>
                                    <Ionicons name='trash' color={"#ef4444"}/>
                                </TouchableOpacity>
                                <ThemedText className="font-olight text-xs md:text-base" style={styles.orderId}>last seen 25 minutes ago</ThemedText>
                            </View>
                        </View>
                    </View>

                )}
            />
        </SafeAreaView>
    );
};

// RequestList Component for Unverified Accounts
const RequestList = () => {
    const { theme } = useContext(ThemeContext); // Get theme from context
    
    const backgroundColor = theme === 'dark' ? Colors.dark.background : Colors.light.background; // Adjusted for dark mode
    const [searchText, setSearchText] = useState('');

    const filteredAccounts = accounts.filter(account => !account.verified);

    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1, backgroundColor }}>
            
            <SearchField placeholder = 'Search account name here'/>
            <FlatList
                data={filteredAccounts}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.orderCard, { backgroundColor: backgroundColor }]}>
                        <View style={styles.statusIndicator}>
                            <Image className='w-20 h-20 md:w-28 md:h-28 rounded-lg'
                                source={item.image}
                                
                                resizeMode="contain"
                            />
                        </View>
                        <View style={styles.orderDetails}>
                            <ThemedText className="font-omedium text-xl md:text-2xl">{item.name}</ThemedText>
                            <ThemedText className="font-oregular text-lg md-text-xl" style={styles.description}>{item.status}</ThemedText>
                            <View className='flex-row'>
                                <ThemedText className="font-olight text-xs md:text-base" style={styles.orderId}>Request account 25 minutes ago</ThemedText>
                                <View className='flex-row flex-1 space-x-2 md:space-x-11 justify-end'>
                                    <TouchableOpacity>
                                        <View className='bg-redalert rounded-lg p-1'>
                                            <Ionicons name="close" size={isTablet? 35: 24} color={"#FFFFFF"} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <View className='bg-[#28A745] rounded-lg p-1'>
                                            <Ionicons name="checkmark" size={isTablet? 35: 24} color={"#FFFFFF"} />
                                        </View>
                                        
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default AccountListScreen;

// Styles
const styles = StyleSheet.create({
    searchInput: {
        marginHorizontal: isTablet? 40 : 15,
        marginVertical: 10,
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: Colors.light.background,
    },
    orderCard: {
        flexDirection: 'row',
        marginHorizontal: isTablet? 40 : 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 10,
    },
    statusIndicator: {
        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 10,
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
        paddingTop: 10,
        borderRadius: 10,
    },
    statusText: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontWeight: '600',
        marginBottom: 15,
        color: '#FC366B',
        borderRadius: 10,
    },
    orderId: {
        marginTop: 10,
        color: '#999',
    },
});
