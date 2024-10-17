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
import { recapData } from '@/data/recapData';

const screenWidth = Dimensions.get('window').width;

// Define threshold for tablet size (768px as an example)
const isTablet = screenWidth >= 768;



// Tab navigation setup
const TabRoutes = {
    All: () => <RecapList filter="All" />,
    2024: () => <RecapList filter="2024" />,
    2025: () => <RecapList filter="2025" />,
    2026: () => <RecapList filter="2026" />,
};


const DocumentRecapScreen = () => {
    const { theme } = useContext(ThemeContext); // Get theme from context
    const backgroundColor = theme === 'dark' ? Colors.dark.background : Colors.light.background; // Adjusted for dark mode
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'All', title: 'All' },
        { key: '2024', title: '2024' },
        { key: '2025', title: '2025' },
        { key: '2026', title: '2026' },
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

                            width: Math.min(Dimensions.get('window').width / 4), // Set a fixed width for each tab item
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

// RecapList Component
const RecapList = ({ filter }) => {
    const { theme } = useContext(ThemeContext);
    const outlineColor = theme === 'dark' ? Colors.dark.outline : Colors.light.outline; // example color adjustments
    const backgroundColor = theme === 'dark' ? Colors.dark.background : Colors.light.background; // Adjusted for dark mode
    const textColor = theme === 'dark' ? Colors.dark.text : Colors.light.text;

    const [filteredRecaps, setFilteredRecaps] = useState(
        recapData.filter(recap =>
            filter === 'All' ? true : recap.year === filter
        )
    );

    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1, backgroundColor }}>

            <SearchField placeholder='Search Recap name here' />
            <FlatList

                data={filteredRecaps}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (

                    <TouchableOpacity>
                        <View>
                            <View style={[styles.orderCard, { backgroundColor: backgroundColor }]}>

                                <Image className='w-14 h-14 md:w-16 md:h-16 rounded-lg'
                                    source={require('../../assets/images/excellogo.png')}

                                    resizeMode="contain"
                                />

                                <View style={styles.orderDetails}>
                                    <ThemedText className="font-omedium text-xl md:text-2xl" numberOfLines={1} ellipsizeMode="tail">Rekap {item.month} {item.year}</ThemedText>
                                    <ThemedText className="font-oregular text-base md:text-lg" style={styles.description}>{item.size} Mb</ThemedText>

                                </View>

                                <View className='mr-5 md:mr-10'>
                                    <Ionicons name="download-outline" size={isTablet ? 40 : 35} style={styles.description} />
                                </View>
                            </View>
                            <View className='rounded-full  bg-gray-200' style={[{ flex: 1, height: 1, marginLeft: isTablet ? 60 : 70, marginRight: isTablet ? 40 : 20 }]} />
                        </View>
                    </TouchableOpacity>


                )}
            />
        </SafeAreaView>
    );
};



export default DocumentRecapScreen;

// Styles
const styles = StyleSheet.create({
    searchInput: {
        marginHorizontal: isTablet ? 0 : 15,
        marginVertical: 10,
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: Colors.light.background,
    },
    orderCard: {
        flexDirection: 'row',
        marginHorizontal: isTablet ? 30 : 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',

        marginTop: 10,
    },
    statusIndicator: {
        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 10,
    },
    orderDetails: {
        marginLeft: 5,
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
