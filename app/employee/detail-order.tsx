import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ScrollView, Button, Dimensions, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText'; // Assuming ThemedText is imported
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function DetailOrder() {
  const router = useRouter();

  // State to manage which track is clicked
  const [clickedTrack, setClickedTrack] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('Track Order'); // Track Order or Information
  const [isExpandedSurya, setIsExpandedSurya] = useState(false); // State for PT SURYA ANUGRAH MEDIA dropdown
  const [isExpandedSejahtera, setIsExpandedSejahtera] = useState(false); // State for PT SEJAHTERA ABADI dropdown

  // Track order options
  const trackOrders = [
    { key: 'orderRecieve', label: 'Order Recieve' },
    { key: 'departure', label: 'Departure' },
    { key: 'orderHasArrived', label: 'Order Has Arrived' },
    { key: 'Installation', label: 'Installation', time: '16.00 WIB', date: '26/09/2024', status: 'Sedang memasang' },
    { key: 'completeInstallation', label: 'Complete Installation' }
  ];

  const handleTrackClick = (trackKey: string) => {
    // Set clicked track; only one can be active at a time
    setClickedTrack(clickedTrack === trackKey ? null : trackKey);
  };

  const handleToggleSurya = () => {
    setIsExpandedSurya(!isExpandedSurya);
  };

  const handleToggleSejahtera = () => {
    setIsExpandedSejahtera(!isExpandedSejahtera);
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      {/* Scrollable Content Area */}
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={require('../../assets/images/latar_detail.png')} style={styles.backgroundImage} />

        {/* Custom Header */}
        

        {/* Order Information Container */}
        <View style={styles.orderContainer}>
          <View style={styles.tabContainer}>
            {/* Tab Navigation */}
            <TouchableOpacity
              style={activeTab === 'Track Order' ? styles.tabButtonActive : styles.tabButtonInactive}
              onPress={() => setActiveTab('Track Order')}
            >
              <ThemedText className='text-xl lg:text-3xl' style={activeTab === 'Track Order' ? styles.tabTextActive : styles.tabTextInactive}>
                Track Order
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={activeTab === 'Information' ? styles.tabButtonActive : styles.tabButtonInactive}
              onPress={() => setActiveTab('Information')}
            >
              <ThemedText className='text-xl lg:text-3xl font-oregular' style={activeTab === 'Information' ? styles.tabTextActive : styles.tabTextInactive}>
                Information
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Content Based on Active Tab */}
          {activeTab === 'Track Order' ? (
            trackOrders.map((track, index) => (
              <View key={track.key} style={styles.trackWrapper}>
                {/* Left Circle & Line Container */}
                <View style={styles.leftContainer}>
                  <View style={[styles.circle, clickedTrack === track.key && styles.circleActive]} />
                  {index !== trackOrders.length - 1 && <View style={styles.verticalLine} />}
                </View>

                {/* Track Content */}
                <TouchableOpacity
                  onPress={() => handleTrackClick(track.key)}
                  style={clickedTrack === track.key ? styles.trackContainerActive : styles.trackContainerInactive}
                >
                  {/* Main Track Content */}
                  <View style={styles.trackContent}>
                    {/* Left Content: Title and Subtext */}
                    <View style={styles.trackInfo}>
                      <ThemedText className='text-xl lg:text-4xl' style={styles.orderText}>{track.label}</ThemedText>
                      <ThemedText className='text-sm lg:text-xl' style={styles.orderSubText}>Belum Di Proses</ThemedText>
                    </View>

                    {/* Right Content: Time and Date */}
                    <View style={styles.dateTimeContainer}>
                      <ThemedText className='text-sm lg:text-2xl' style={styles.timeText}>11.00 WIB</ThemedText>
                      <ThemedText className='text-sm lg:text-2xl' style={styles.dateText}>24/09/2024</ThemedText>
                    </View>
                  </View>

                  {/* Button Add Image (when clicked) */}
                  {clickedTrack === track.key && (
                    <View style={styles.activeTrackContent}>
                      <TouchableOpacity style={styles.addImageButton}>
                        <ThemedText style={styles.addImageText}>ADD IMAGE</ThemedText>
                      </TouchableOpacity>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <>
              {/* PT SURYA ANUGRAH MEDIA */}
              <TouchableOpacity style={styles.infoContainer} onPress={handleToggleSurya}>
                <View style={styles.infoHeader}>
                  {/* WIKA Logo */}
                  <Image source={require('../../assets/images/logo_wika.png')} style={styles.logo} />

                  {/* PT Name and Status */}
                  <View style={styles.textContainer}>
                    <ThemedText style={styles.ptName}>PT SURYA ANUGRAH MEDIA</ThemedText>
                    <View style={styles.statusContainer}>
                      <ThemedText style={styles.statusText}>Selesai</ThemedText>
                    </View>
                  </View>

                  {/* Dropdown Icon */}
                  <Image
                    source={isExpandedSurya ? require('../../assets/images/backup.png') : require('../../assets/images/down.png')}
                    style={styles.dropdownIcon}
                  />
                </View>

                {/* Expanded Content for PT SURYA ANUGRAH MEDIA */}
                {isExpandedSurya && (
                  <View style={styles.expandedContent}>
                    <View style={styles.row}>
                      <View style={styles.column}>
                        <ThemedText style={styles.label}>Nama Driver:</ThemedText>
                        <ThemedText style={styles.value}>Lanjar Samadi</ThemedText>
                      </View>
                      <View style={styles.column}>
                        <ThemedText style={styles.label}>Nomor Kendaraan:</ThemedText>
                        <ThemedText style={styles.value}>AB 3763 EA</ThemedText>
                      </View>
                    </View>

                    <View style={styles.row}>
                      <View style={styles.column}>
                        <ThemedText style={styles.label}>ULP:</ThemedText>
                        <ThemedText style={styles.value}>Pasuruan</ThemedText>
                      </View>
                      <View style={styles.column}>
                        <ThemedText style={styles.label}>Due Date:</ThemedText>
                        <ThemedText style={styles.value}>22-09-2024</ThemedText>
                      </View>
                    </View>

                    <View style={styles.row}>
                      <View style={styles.columnFull}>
                        <ThemedText style={styles.label}>Nomor KR:</ThemedText>
                        <ThemedText style={styles.value}>0526.PJ/DAN.01.01/F04000000/2024</ThemedText>
                      </View>
                    </View>

                    <View style={styles.row}>
                      <View style={styles.columnFull}>
                        <ThemedText style={styles.label}>Nomor PK/WO:</ThemedText>
                        <ThemedText style={styles.value}>1547/DAN.01.03/F04000000/2024</ThemedText>
                      </View>
                    </View>

                    {/* Detail Order Section */}
                    <ThemedText style={styles.detailsHeader}>Details Order</ThemedText>

                    {/* Order Item */}
                    <View style={styles.orderItem}>
                      <Image source={require('../../assets/images/tiang.png')} style={styles.orderImage} />
                      <View style={styles.orderDetails}>
                        <ThemedText style={styles.itemName}>Power Pole Large</ThemedText>
                        <ThemedText style={styles.itemCompany}>PT SURYA ANUGRAH MEDIA</ThemedText>
                        <View style={styles.itemInfo}>
                          <ThemedText style={styles.itemType}>Type 682-T32</ThemedText>
                          <ThemedText style={styles.itemQuantity}>Quantity: 2</ThemedText>
                        </View>
                      </View>
                    </View>

                    {/* Add more items here if needed */}
                  </View>
                )}
              </TouchableOpacity>

              {/* PT SEJAHTERA ABADI */}
              <TouchableOpacity style={styles.infoContainer} onPress={handleToggleSejahtera}>
                <View style={styles.infoHeader}>
                  {/* WIKA Logo */}
                  <Image source={require('../../assets/images/logo_wika.png')} style={styles.logo} />

                  {/* PT Name and Status */}
                  <View style={styles.textContainer}>
                    <ThemedText style={styles.ptName}>PT SEJAHTERA ABADI</ThemedText>
                    <View style={styles.statusContainerYellow}>
                      <ThemedText style={styles.statusTextYellow}>Proses</ThemedText>
                    </View>
                  </View>

                  {/* Dropdown Icon */}
                  <Image
                    source={isExpandedSejahtera ? require('../../assets/images/backup.png') : require('../../assets/images/down.png')}
                    style={styles.dropdownIcon}
                  />
                </View>

                {/* Expanded Content for PT SEJAHTERA ABADI */}
                {isExpandedSejahtera && (
                  <View style={styles.expandedContent}>
                    <View style={styles.row}>
                      <View style={styles.column}>
                        <ThemedText style={styles.label}>Nama Driver:</ThemedText>
                        <ThemedText style={styles.value}>Andi Santoso</ThemedText>
                      </View>
                      <View style={styles.column}>
                        <ThemedText style={styles.label}>Nomor Kendaraan:</ThemedText>
                        <ThemedText style={styles.value}>AB 1234 CD</ThemedText>
                      </View>
                    </View>

                    <View style={styles.row}>
                      <View style={styles.column}>
                        <ThemedText style={styles.label}>ULP:</ThemedText>
                        <ThemedText style={styles.value}>Malang</ThemedText>
                      </View>
                      <View style={styles.column}>
                        <ThemedText style={styles.label}>Due Date:</ThemedText>
                        <ThemedText style={styles.value}>23-09-2024</ThemedText>
                      </View>
                    </View>

                    <View style={styles.row}>
                      <View style={styles.columnFull}>
                        <ThemedText style={styles.label}>Nomor KR:</ThemedText>
                        <ThemedText style={styles.value}>0527.PJ/DAN.01.01/F04000000/2024</ThemedText>
                      </View>
                    </View>

                    <View style={styles.row}>
                      <View style={styles.columnFull}>
                        <ThemedText style={styles.label}>Nomor PK/WO:</ThemedText>
                        <ThemedText style={styles.value}>1548/DAN.01.03/F04000000/2024</ThemedText>
                      </View>
                    </View>

                    {/* Detail Order Section */}
                    <ThemedText style={styles.detailsHeader}>Details Order</ThemedText>

                    {/* Order Item */}
                    <View style={styles.orderItem}>
                      <Image source={require('../../assets/images/tiang.png')} style={styles.orderImage} />
                      <View style={styles.orderDetails}>
                        <ThemedText style={styles.itemName}>Power Pole Medium</ThemedText>
                        <ThemedText style={styles.itemCompany}>PT SEJAHTERA ABADI</ThemedText>
                        <View style={styles.itemInfo}>
                          <ThemedText style={styles.itemType}>Type 682-T31</ThemedText>
                          <ThemedText style={styles.itemQuantity}>Quantity: 3</ThemedText>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -100,
    backgroundColor: '#fff',
  },
  content: {
    alignItems: 'center',
    paddingBottom: 16,
  },
  backgroundImage: {
    width: width, // Using screen width
    height: height * 0.4, // Dynamic height based on screen size
    resizeMode: 'cover',
  },
  overlayHeader: {
    position: 'absolute',
    top: 40, // Position header over the image
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10, // Make sure the header stays on top of the image
  },
  backButton: {
    position: 'absolute',
    left: 10, // Position the back icon to the left
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerText: {
    fontWeight: '900',
    color: '#414141',
    fontSize: width * 0.06, // Adjust the size based on screen width
  },
  orderContainer: {
    width: width, // Full width of the screen
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    padding: 16,
    elevation: 3,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  tabButtonActive: {
    backgroundColor: '#23ACE3',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  tabButtonInactive: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  tabTextActive: {
    color: '#fff', // White text for active tab
    fontWeight: 'bold',
  },
  tabTextInactive: {
    fontSize: width * 0.04, // Adjust tab text size based on screen width
    color: '#585858', // Grey text for inactive tab
  },
  trackWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  leftContainer: {
    width: '15%', // Take 15% width for the left side
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: '#23ACE3',
    backgroundColor: '#fff',
  },
  circleActive: {
    backgroundColor: '#23ACE3',
  },
  verticalLine: {
    position: 'absolute',
    top: 25,
    bottom: -90,
    width: 2,
    backgroundColor: '#23ACE3',
  },
  trackContent: {
    flexDirection: 'row', // Ensures content is aligned horizontally
    justifyContent: 'space-between', // Spaces out the content within the container
    alignItems: 'center', // Centers items vertically
  },
  trackInfo: {
    flexDirection: 'column', // Align title and subtext vertically
  },
  dateTimeContainer: {
    flexDirection: 'column', // Align time and date vertically
    alignItems: 'flex-end', // Align to the right side
  },
  timeText: {
    color: '#A0A0A0', // Grey color for time
  },
  dateText: {
    color: '#A0A0A0', // Grey color for date
  },
  activeTrackContent: {
    marginTop: 10, // Add margin to push the button below the text
    alignItems: 'center', // Align button to the center
  },
  trackContainerActive: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#23ACE3',
    padding: 15,
    borderRadius: 10,
  },
  trackContainerInactive: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
  },
  orderText: {
    fontWeight: 'bold',
    color: '#585858',
  },
  orderSubText: {
    color: '#A0A0A0',
  },
  addImageButton: {
    width: '100%', // Make the button span 100% width
    backgroundColor: '#23ACE3',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  addImageText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  informationContent: {
    paddingVertical: 10,
  },
  informationText: {
    fontSize: width * 0.04, // Adjust the size dynamically
    color: '#585858',
  },
  infoContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  ptName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#414141',
  },
  statusContainer: {
    backgroundColor: '#28A745', // Green for "Selesai"
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 15,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
  },
  statusContainerYellow: {
    backgroundColor: '#FFC107', // Yellow for "Proses"
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 15,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  statusTextYellow: {
    color: '#fff',
    fontSize: 12,
  },
  dropdownIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  expandedContent: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  column: {
    flex: 1,
  },
  columnFull: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#414141',
  },
  value: {
    marginTop: 5,
    color: '#585858',
  },
  detailsHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#414141',
    marginBottom: 10,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  orderImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  orderDetails: {
    flex: 1,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemCompany: {
    fontSize: 12,
    color: '#585858',
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  itemType: {
    fontSize: 12,
    color: '#585858',
  },
  itemQuantity: {
    fontSize: 12,
    color: '#585858',
  },
});
