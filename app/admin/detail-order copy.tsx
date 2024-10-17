import { useLocalSearchParams } from 'expo-router'; // Correct import
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { images } from '@constants/images';
import { Colors } from '@/constants/Colors';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Link } from 'expo-router';
import { ThemeContext } from '@/components/ThemeContext';



const DetailOrderScreen = () => {
  const { theme } = useContext(ThemeContext); // Get theme from context
  const cardBackgroundColor = theme === 'dark' ? Colors.dark.card : Colors.light.card; // Card background color for dark mode
  const detailBackgroundColor = theme === 'dark' ? Colors.dark.detail : Colors.light.detail; // Card background color for dark mode
  const backgroundColor = theme === 'dark' ? Colors.dark.background : Colors.light.background;
  // Use useLocalSearchParams to get the route params
  const { orderId, title, status } = useLocalSearchParams();

  // Handle the case where the parameters are missing
  if (!orderId || !title || !status) {
    return (
      <View style={styles.container }>
        <ThemedText className="font-osemibold text-xl">Error: Missing order details</ThemedText>
      </View>
    );
  }

  const statusSteps = getStatusSteps(status);  // Determine status steps based on status

  return (
    <View className="px-5 pt-5" style={{ flex: 1, backgroundColor }}>
      {/* Order Header */}


      <View className="py-3" style={[styles.orderCard, { backgroundColor: cardBackgroundColor }]}>
          {/* Status indicator */}
          <View style={[styles.statusIndicator,]} />
          <View className="px-3" style={styles.orderDetails}>
            <ThemedText className="font-omedium text-xl mt-3">{title}</ThemedText>
            <ThemedText className="font-olight text-sm">Due to {getDueDate(status)}</ThemedText>
            <View className='flex-row my-4 space-x-2 items-center'>
                <Image source={require('../../assets/images/profilplaceholder.png')} className='w-10 h-10' />
                <View className=''>
                    <ThemedText className="font-olight text-base">Lanjar Samadi</ThemedText>
                    <ThemedText className="font-olight text-base">AA 3857 BK</ThemedText>
                </View>
            </View>
          </View>
          <Image source={require('../../assets/images/tiang.png')} className='rounded-xl mr-5 mt-5 w-24 h-24' />
        </View>   


      {/* Status Timeline */}
      <View className="mt-12" style={styles.timeline}>
        {statusSteps.map((step, index) => (
          <View key={index} style={styles.timelineStep}>
            <Image source={step.icon} style={styles.icon} />
            <View className="p-3 flex-1 item-center flex-row justify-between rounded-xl" style={[{ backgroundColor: detailBackgroundColor}]}>
              <View>
                <ThemedText className="font-osemibold text-base">{step.label}</ThemedText>
                <ThemedText className="font-oregular text-sm">{step.Location}</ThemedText>
              </View>
              <View>
                <ThemedText className="font-omedium text-sm text-right">{step.time}</ThemedText>
                <ThemedText className="font-oregular text-sm">{step.date}</ThemedText>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Check Payment Button */}
      <TouchableOpacity style={styles.paymentButton}>
        <ThemedText className="font-osemibold text-white text-center">Check Payment Status</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

export default DetailOrderScreen;

// Helper functions to generate the timeline and due date
const getStatusSteps = (status) => {
  const steps = [
    {
      label: 'Order Received',
      date: '24/09/2024',
      time: '11:30',
      Location: 'Gejayan Street',
      icon: require('../../assets/images/order-received.png'),
    },
  ];

  if (status === 'On-Going' || status === 'Completed') {
    steps.push(
      {
        label: 'Departure',
        date: '23/09/2024',
        time: '23:30',
      Location: 'Gejayan Street',
        icon: require('../../assets/images/departure.png'),
      },
      {
        label: 'Order Has Arrived',
        date: '24/09/2024',
        time: '07:30',
        Location: 'Gejayan Street',
        icon: require('../../assets/images/arrived.png'),
      }
    );
  }

  if (status === 'Completed') {
    steps.push({
      label: 'Completed Installation',
      date: '24/09/2024',
      time: '11:30',
      Location: 'Gejayan Street',
      icon: require('../../assets/images/completed.png'),
    });
  }

  return steps;
};

const getDueDate = (status) => {
  switch (status) {
    case 'Completed':
      return '24 September 2024';
    case 'On-Going':
      return '23 September 2024';
    default:
      return '22 September 2024';
  }
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },

  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  orderCard: {
    flexDirection: 'row',
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
    backgroundColor: '#00ADEF',
  },
  orderDetails: {
    marginLeft: 15,
    flex: 1,
  },
  
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  timeline: {
    flexDirection: 'column',
    marginVertical: 10,
  },
  timelineStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  paymentButton: {
    backgroundColor: '#00ADEF',
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
  },
});
