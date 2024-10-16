import React, { useContext, useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, useColorScheme, Image, Dimensions, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Link } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchField from '@/components/SearchField';
import { ThemeContext } from '@/components/ThemeContext';
import { accountData } from '@/data/accountData';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useFonts } from 'expo-font';

const screenWidth = Dimensions.get('window').width;

// Define threshold for tablet size (768px as an example)
const isTablet = screenWidth >= 768;



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
    const { theme } = useContext(ThemeContext);
    const outlineColor = theme === 'dark' ? Colors.dark.outline : Colors.light.outline; // example color adjustments
    const backgroundColor = theme === 'dark' ? Colors.dark.background : Colors.light.background; // Adjusted for dark mode
    const textColor = theme === 'dark' ? Colors.dark.text : Colors.light.text;

    const [filteredAccounts, setFilteredAccounts] = useState(
        accountData.filter(account =>
            filter === 'All' ? account.verified : account.verified && account.status === filter
        )
    );

    const [showAlert, setShowAlert] = useState(false);
    const [selectedAccountId, setSelectedAccountId] = useState(null);

    const handleDeleteAccount = (id) => {
        setSelectedAccountId(id);  // Store the account ID to be deleted
        setShowAlert(true);  // Show the alert
    };

    const confirmDeleteAccount = () => {
        const updatedAccounts = filteredAccounts.filter(account => account.id !== selectedAccountId);
        setFilteredAccounts(updatedAccounts);
        setShowAlert(false);  // Hide the alert after deletion
    };





    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1, backgroundColor }}>

            <SearchField placeholder='Search account name here' />
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
                            <ThemedText className="font-omedium text-xl md:text-2xl" numberOfLines={1} ellipsizeMode="tail">{item.name}</ThemedText>
                            <ThemedText className="font-oregular text-lg md:text-xl" style={styles.description}>{item.status}</ThemedText>
                            <View style={styles.statusContainer}>
                                <TouchableOpacity
                                    style={[{ backgroundColor: outlineColor }]}
                                    className="flex flex-row space-x-1 items-center p-1 rounded-md"
                                    onPress={() => handleDeleteAccount(item.id)} // Trigger deletion on press
                                >
                                    <ThemedText className="font-oregular text-xs md:text-base text-redalert">
                                        Delete Account
                                    </ThemedText>
                                    <Ionicons name="trash" color="#ef4444" />
                                </TouchableOpacity>
                                <ThemedText className="font-olight text-xs md:text-base" style={styles.orderId}>last seen 25 minutes ago</ThemedText>
                            </View>
                        </View>
                    </View>

                )}
            />

            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                contentContainerStyle={[{ backgroundColor: backgroundColor, borderRadius: 20 }]}
                customView={
                    <View className='items-center'>
                        <View className='p-3 rounded-full' style={{ backgroundColor: Colors.colorful.redtr }}>
                            <Image source={require('../../assets/images/cautions.png')} className='w-6 h-6' resizeMode='contain' />
                        </View>
                        <ThemedText className="font-omedium text-lg md:text-xl my-2">Delete Account</ThemedText>
                        <ThemedText className="font-oregular text-sm md:text-base text-gray-600">Are you sure you want to delete this account?</ThemedText>
                        <ThemedText className="font-oregular text-sm md:text-base text-gray-600">This action cannot be undone.</ThemedText>
                    </View>}
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Cancel"
                cancelButtonTextStyle={{ color: textColor, fontFamily: 'Outfit-Regular', paddingHorizontal: 30, paddingVertical: 10 }}
                cancelButtonStyle={{ backgroundColor: outlineColor, borderRadius: 10, }}
                confirmText="Delete"
                confirmButtonTextStyle={{ fontFamily: 'Outfit-Regular', paddingHorizontal: 30, paddingVertical: 10 }}
                confirmButtonStyle={{ backgroundColor: Colors.colorful.red, borderRadius: 10,  }}
                onCancelPressed={() => setShowAlert(false)}  // Hide alert on cancel
                onConfirmPressed={confirmDeleteAccount}  // Confirm deletion
            />
        </SafeAreaView>
    );
};

// RequestList Component for Unverified Accounts
const RequestList = () => {
    const { theme } = useContext(ThemeContext);
    const outlineColor = theme === 'dark' ? Colors.dark.outline : Colors.light.outline; // example color adjustments
    const backgroundColor = theme === 'dark' ? Colors.dark.background : Colors.light.background; // Adjusted for dark mode
    const textColor = theme === 'dark' ? Colors.dark.text : Colors.light.text;

    // State for filtered accounts
    const [filteredAccounts, setFilteredAccounts] = useState(
        accountData.filter(account => !account.verified) // Initially showing unverified accounts
    );

    // State for showing AwesomeAlert and storing the account being processed
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState(''); // Either 'delete' or 'verify'
    const [selectedAccountId, setSelectedAccountId] = useState(null);

    // Handle alert for both delete and verify actions
    const triggerAlert = (id, type) => {
        setSelectedAccountId(id);
        setAlertType(type);
        setShowAlert(true);
    };

    // Confirm deletion
    const confirmDeleteAccount = () => {
        const updatedAccounts = filteredAccounts.filter(account => account.id !== selectedAccountId);
        setFilteredAccounts(updatedAccounts);
        setShowAlert(false);
    };

    // Confirm verification
    const confirmVerifyAccount = () => {
        // Update the original accountData with verified status
        const updatedAccountIndex = accountData.findIndex(account => account.id === selectedAccountId);
        if (updatedAccountIndex > -1) {
            accountData[updatedAccountIndex].verified = true;
        }

        // Update the filtered list to show unverified accounts
        const updatedAccounts = accountData.filter(account => !account.verified);
        setFilteredAccounts(updatedAccounts);
        setShowAlert(false); // Hide the alert after verification
    };

    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1, backgroundColor }}>
            <SearchField placeholder="Search account name here" />
            <FlatList
                data={filteredAccounts}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.orderCard, { backgroundColor }]}>
                        <View style={styles.statusIndicator}>
                            <Image
                                className="w-20 h-20 md:w-28 md:h-28 rounded-lg"
                                source={item.image}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={styles.orderDetails}>
                            <Text style={[{ color: textColor }]} className="font-omedium text-xl md:text-2xl" numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                            <Text className="font-oregular text-lg md:text-xl" style={styles.description}>
                                {item.status}
                            </Text>
                            <View className="flex-row">
                                <Text className="font-olight text-xs md:text-base" style={styles.orderId}>
                                    Request account 25 minutes ago
                                </Text>
                                <View className="flex-row flex-1 space-x-2 md:space-x-11 justify-end">
                                    {/* First Touchable: Delete Account */}
                                    <TouchableOpacity onPress={() => triggerAlert(item.id, 'delete')}>
                                        <View className="bg-redalert rounded-lg p-1">
                                            <Ionicons name="close" size={isTablet ? 35 : 24} color={"#FFFFFF"} />
                                        </View>
                                    </TouchableOpacity>

                                    {/* Second Touchable: Verify Account */}
                                    <TouchableOpacity onPress={() => triggerAlert(item.id, 'verify')}>
                                        <View className="bg-[#21D475] rounded-lg p-1">
                                            <Ionicons name="checkmark" size={isTablet ? 35 : 24} color={"#FFFFFF"} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            />

            {/* AwesomeAlert for Deletion and Verification */}
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                contentContainerStyle={[{ backgroundColor: backgroundColor, borderRadius: 20 }]}
                customView={
                    <View className='items-center'>
                        <View className='p-3 rounded-full' style={{ backgroundColor: alertType === 'delete' ? Colors.colorful.redtr : Colors.colorful.greentr }}>
                            {alertType === 'delete' ? <Image source={alertType === 'delete' ? require('../../assets/images/cautions.png') : require('../../assets/images/fejob.png')} className='w-6 h-6' resizeMode='contain' /> : <Ionicons name="checkmark" size={isTablet ? 35 : 24} color ={Colors.colorful.green} />}

                            
                        </View>
                        <ThemedText className="font-omedium text-lg md:text-xl my-2">
                            {alertType === 'delete' ? 'Reject Account' : 'Verify Account'}
                        </ThemedText>
                        <ThemedText className="font-oregular text-sm md:text-base text-gray-600 text-center">
                            {alertType === 'delete'
                                ? 'Are you sure you want to reject this account? This action cannot be undone.'
                                : 'Are you sure you want to verify this account?'}
                        </ThemedText>
                    </View>
                }
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Cancel"
                cancelButtonTextStyle={{ color: alertType === 'delete' ? textColor : 'white', fontFamily: 'Outfit-Regular', paddingHorizontal: 30, paddingVertical: 10 }}
                cancelButtonStyle={{ backgroundColor: alertType === 'delete' ? outlineColor :  Colors.colorful.red, borderRadius: 10 }}
                confirmText={alertType === 'delete' ? "Delete" : "Verify"}
                confirmButtonTextStyle={{ fontFamily: 'Outfit-Regular', paddingHorizontal: 30, paddingVertical: 10 }}
                confirmButtonStyle={{ backgroundColor: alertType === 'delete' ? Colors.colorful.red : Colors.colorful.green, borderRadius: 10 }}
                onCancelPressed={() => setShowAlert(false)}  // Hide alert on cancel
                onConfirmPressed={alertType === 'delete' ? confirmDeleteAccount : confirmVerifyAccount}  // Confirm action based on alert type
            />
        </SafeAreaView>
    );
};


export default AccountListScreen;

// Styles
const styles = StyleSheet.create({
    searchInput: {
        marginHorizontal: isTablet ? 40 : 15,
        marginVertical: 10,
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: Colors.light.background,
    },
    orderCard: {
        flexDirection: 'row',
        marginHorizontal: isTablet ? 40 : 15,
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
