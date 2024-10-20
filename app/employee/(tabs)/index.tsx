import { View, Pressable, ScrollView, Dimensions, TouchableOpacity, FlatList, } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Image, Platform } from 'react-native';

import { useColorScheme } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { images } from '@/constants/images';
import { Link, LinkProps } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ThemeContext } from '@/components/ThemeContext';
import { useContext } from 'react';
import SearchField from '@/components/SearchField';
import Slider from '@/components/slider';
import { carouselItems } from '@/data/orderData';

const screenWidth = Dimensions.get('window').width;

// Define threshold for tablet size (768px as an example)
const isTablet = screenWidth >= 768;





const dataFeatures = [
  {
    text: "Account\nList",
    image: require("../../../assets/images/maccount.png"), // Update with actual path
    color: '#23ACE340', // 15% Blue transparency
    link: "/admin/account-list",
  },
  {
    text: "Order\nList",
    image: require("../../../assets/images/morder.png"), // Update with actual path
    color: "#FAC44140",
    link: "/admin/order-list", // 15% Orange transparency
  },
  {
    text: "Vendor\nList",
    image: require("../../../assets/images/mpayment.png"), // Update with actual path
    color: "#FC366B40", // 15% Pink transparency
    link: "/admin/vendor-list",
  },
  {
    text: "Product\nList",
    image: require("../../../assets/images/mproduct.png"), // Update with actual path
    color: "#8153BC40", // 15% Purple transparency
    link: "/admin/product-list",
  },
];

const dataTask = [
  {
    text: "No current activity",
    image: require("../../../assets/images/taskcolored.png"), // Update with actual path
    color: "#00ADEF", // Blue background for the first item
  },
  {
    text: "No current activity",
    image: require("../../../assets/images/taskgreyed.png"), // Update with actual path
    color: "rgba(100, 100, 100, 0.15)", // 15% Purple transparency
  },
  {
    text: "No current activity",
    image: require("../../../assets/images/taskgreyed.png"), // Update with actual path
    color: "rgba(100, 100, 100, 0.15)", // 15% Purple transparency
  },
  {
    text: "No current activity",
    image: require("../../../assets/images/taskgreyed.png"), // Update with actual path
    color: "rgba(100, 100, 100, 0.15)", // 15% Purple transparency
  },
];

const HomeScreen = () => {
  const { theme } = useContext(ThemeContext); // Get theme from context

  const backgroundColor = theme === 'dark' ? Colors.dark.background : Colors.light.background;
  const cardBackgroundColor = theme === 'dark' ? Colors.dark.card : Colors.light.card; // Card background color for dark mode
  const detailBackgroundColor = theme === 'dark' ? Colors.dark.detail : Colors.light.detail; //
  const seperateColor = theme === 'dark' ? '#FFFFFF' : '#000000'; //

  return (
    <SafeAreaView style={{ backgroundColor }}>

      <View className="my-3  space-y-2">
        <View className='   px-5 md:px-12 justify-between items-end flex-row mb-6' >

          <ThemedText className="text-lg md:text-xl font-oregular text-gray-400">
            Welcome, Lanjar Samadi!
          </ThemedText>


          <Image
            source={images.personimage}
            className="w-12 h-12 md:w-16 md:h-16"
          />

        </View>

        <View className="px-5 md:px-12">

          <View className='flex-row -mt-6'>
            <ThemedText className="text-3xl font-obold">Let's </ThemedText>
            <ThemedText className="text-3xl font-obold text-originblue">manage</ThemedText>
          </View>
          <ThemedText className="text-3xl font-obold">tasks efficiently!</ThemedText>
        </View>

        {/* end of overview */}
        <View className='mx-2'>

          <SearchField placeholder='Search a task...' />
        </View>

        <ThemedText className="text-2xl md:text-3xl font-osemibold px-5 md:px-12">
          Features
        </ThemedText>


        <View className='flex-row justify-between mx-5'>

        <Link href="/employee/newjob" asChild>
          <TouchableOpacity style={{ width: '47%' }}>
            <View className='p-5 rounded-3xl' style={[{ backgroundColor: detailBackgroundColor }]}>
              <View className='mt-3 rounded-full p-3 bg-[#23ACE340]'
                style={{
                  width: 50, // or any size you prefer
                  height: 50, // same as width to keep it circular
                  borderRadius: 25, // half of width/height
                  borderColor: Colors.colorful.blue,
                  borderWidth: 1,
                  justifyContent: 'center', // centers child element vertically
                  alignItems: 'center', // centers child element horizontally
                  alignSelf: 'center' // centers the circle within the parent container
                }}>
                <Image source={require("../../../assets/images/fejob.png")} className="w-8 h-8 md:w-16 md:h-16" />
              </View>
              <ThemedText className="text-center text-sm md:text-xl font-omedium mt-2">New Job</ThemedText>
            </View>
          </TouchableOpacity>
          </Link>

          <Link href="/employee/order-list" asChild>
            <TouchableOpacity style={{ width: '47%' }}>
              <View className='p-5 rounded-3xl' style={[{ backgroundColor: detailBackgroundColor }]}>
                <View className='mt-3 rounded-full p-3 bg-[#FC366B40]'
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    borderColor: Colors.colorful.red,
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center'
                  }}>
                  <Image source={require("../../../assets/images/feorder.png")} className="w-8 h-8 md:w-16 md:h-16" />
                </View>
                <ThemedText className="text-center text-sm md:text-xl font-omedium mt-2">Order List</ThemedText>
              </View>
            </TouchableOpacity>
          </Link>

        </View>


        <ThemedText className="text-2xl md:text-3xl py-3 font-osemibold px-5 md:px-12">
          Recently
        </ThemedText>


        <Slider itemList={carouselItems} />

        <View className='h-40'></View>

      </View>




    </SafeAreaView>

  )
}

export default HomeScreen



