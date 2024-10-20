import { View, Text, Switch, Dimensions,TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Image, Platform } from 'react-native';
import { FlatList,  GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { images } from '@/constants/images';
import { Colors } from '@/constants/Colors';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { ThemeContext } from '@/components/ThemeContext';
import { useContext } from 'react';

const screenWidth = Dimensions.get('window').width; 
const isTablet = screenWidth >= 768;  

const ReportScreen = () => {  
  const { theme, toggleTheme } = useContext(ThemeContext); // Access theme and toggle function from context
  const isDarkMode = theme === 'dark';
  
  const cardBackgroundColor = theme === 'dark' ? Colors.dark.card : Colors.light.card; // Card background color for dark mode

  const backgroundColor = theme === 'dark' ? Colors.dark.background : Colors.light.background;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <View className="px-5 md:px-12 my-6  space-y-6  " >
        <View>
            <ThemedText className="text-2xl md:text-4xl font-osemibold text-center md:mb-8">
              Report an Issue
            </ThemedText>
        </View>

        <TouchableOpacity>
        <View style={[styles.orderCard, { backgroundColor: cardBackgroundColor }]}>
          {/* Status indicator */}
          <View style={[styles.statusIndicator, { backgroundColor: Colors.colorful.blue}]} />
          <View style={styles.orderDetails}>
            <ThemedText className="font-omedium text-xl md:text-3xl mt-3 md:mt-6">Masalah Perjalanan</ThemedText>
            <ThemedText className="font-olight text-gray-400 text-lg md:text-2xl " style={{ marginTop: isTablet ? 10 : 0 }}>Wika Beton</ThemedText>
          </View>
          <View className='' style={[{ backgroundColor: Colors.colorful.blue, borderRadius: 9999, margin: isTablet ? 30 : 20, padding: isTablet ? 20 : 10}]}>
            <Ionicons name="call" size={24} color={cardBackgroundColor}/>
          </View>
        </View>     
        </TouchableOpacity>

        <TouchableOpacity>
        <View style={[styles.orderCard, { backgroundColor: cardBackgroundColor }]}>
          {/* Status indicator */}
          <View style={[styles.statusIndicator, { backgroundColor: Colors.colorful.yellow}]} />
          <View style={styles.orderDetails}>
            <ThemedText className="font-omedium text-xl md:text-3xl mt-3 md:mt-6">Masalah Pemasangan</ThemedText>
            <ThemedText className="font-olight text-gray-400 text-lg md:text-2xl " style={{ marginTop: isTablet ? 10 : 0 }}>Surabaya</ThemedText>
          </View>
          <View className='' style={[{ backgroundColor: Colors.colorful.yellow, borderRadius: 9999, margin: isTablet ? 30 : 20, padding: isTablet ? 20 : 10}]}>
            <Ionicons name="call" size={24} color={cardBackgroundColor}/>
          </View>
        </View>     
        </TouchableOpacity>

        <TouchableOpacity>
        <View style={[styles.orderCard, { backgroundColor: cardBackgroundColor }]}>
          {/* Status indicator */}
          <View style={[styles.statusIndicator, { backgroundColor: Colors.colorful.red}]} />
          <View style={styles.orderDetails}>
            <ThemedText className="font-omedium text-xl md:text-3xl mt-3 md:mt-6">Masalah Aplikasi</ThemedText>
            <ThemedText className="font-olight text-gray-400 text-lg md:text-2xl " style={{ marginTop: isTablet ? 10 : 0 }}>Sleman</ThemedText>
          </View>
          <View className='' style={[{ backgroundColor: Colors.colorful.red, borderRadius: 9999, margin: isTablet ? 30 : 20, padding: isTablet ? 20 : 10}]}>
            <Ionicons name="call" size={24} color={cardBackgroundColor}/>
          </View>
        </View>     
        </TouchableOpacity>

        <TouchableOpacity>
        <View style={[styles.orderCard, { backgroundColor: cardBackgroundColor }]}>
          {/* Status indicator */}
          <View style={[styles.statusIndicator, { backgroundColor: Colors.colorful.purple}]} />
          <View style={styles.orderDetails}>
            <ThemedText className="font-omedium text-xl md:text-3xl mt-3 md:mt-6">Masalah Lainnya</ThemedText>
            <ThemedText className="font-olight text-gray-400 text-lg md:text-2xl " style={{ marginTop: isTablet ? 10 : 0 }}>Semarang</ThemedText>
          </View>
          <View className='' style={[{ backgroundColor: Colors.colorful.purple, borderRadius: 9999, margin: isTablet ? 30 : 20, padding: isTablet ? 20 : 10}]}>
            <Ionicons name="call" size={24} color={cardBackgroundColor}/>
          </View>
        </View>     
        </TouchableOpacity>

        
      </View>
    </SafeAreaView>
    
  )
}

export default ReportScreen

const styles = StyleSheet.create({

    orderCard: {
      flexDirection: 'row',
      marginHorizontal: isTablet? 25 : 0,
      paddingVertical: 10,
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
      width: isTablet? 10 : 7,
      borderRadius: 10,
    },
    orderDetails: {
      marginLeft: isTablet? 40 : 15,
      flex: 1,
    },
  });


