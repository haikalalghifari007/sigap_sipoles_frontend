import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/ThemedText'; // Assuming ThemedText is imported
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function DetailOrderUnprocessed() {
    const [activeTab, setActiveTab] = useState('Information'); // Default tab adalah Information

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Gambar dan Header tetap statis */}
            <Image source={require('../../assets/images/latar_detail.png')} style={styles.backgroundImage} />


            {/* Tabs tetap statis */}
            <View style={styles.orderContainer}>
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={activeTab === 'Information' ? styles.tabButtonActive : styles.tabButtonInactive}
                        onPress={() => setActiveTab('Information')}
                    >
                        <ThemedText style={activeTab === 'Information' ? styles.tabTextActive : styles.tabTextInactive}>
                            Information
                        </ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={activeTab === 'Order List' ? styles.tabButtonActive : styles.tabButtonInactive}
                        onPress={() => setActiveTab('Order List')}
                    >
                        <ThemedText style={activeTab === 'Order List' ? styles.tabTextActive : styles.tabTextInactive}>
                            Order List
                        </ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={activeTab === 'Location' ? styles.tabButtonActive : styles.tabButtonInactive}
                        onPress={() => setActiveTab('Location')}
                    >
                        <ThemedText style={activeTab === 'Location' ? styles.tabTextActive : styles.tabTextInactive}>
                            Location
                        </ThemedText>
                    </TouchableOpacity>
                </View>

                {/* Konten untuk masing-masing tab */}
                {activeTab === 'Information' && (
                    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
                        <View style={styles.informationContainer}>
                            <View style={styles.logoContainer}>
                                <Image source={require('../../assets/images/logo_wika.png')} style={styles.logo} />
                                <ThemedText style={styles.ptName}>PT SURYA ANUGRAH MEDIA</ThemedText>
                            </View>

                            <View style={styles.orderInfo}>
                                <View style={styles.row}>
                                    <View style={styles.leftColumn}>
                                        <ThemedText style={styles.label}>ULP</ThemedText>
                                        <ThemedText style={styles.value}>Pasuruan</ThemedText>
                                    </View>
                                    <View style={styles.rightColumn}>
                                        <ThemedText style={styles.label}>Due Date</ThemedText>
                                        <ThemedText style={styles.value}>22-09-2024</ThemedText>
                                    </View>
                                </View>
                                <View style={styles.row}>
                                    <View style={styles.fullWidthColumn}>
                                        <ThemedText style={styles.label}>Nomor KR</ThemedText>
                                        <ThemedText style={styles.value}>0526.PJ/DAN.01.01/F04000000/2024</ThemedText>
                                    </View>
                                </View>
                                <View style={styles.row}>
                                    <View style={styles.fullWidthColumn}>
                                        <ThemedText style={styles.label}>Nomor PK/WO</ThemedText>
                                        <ThemedText style={styles.value}>1547/DAN.01.03/F04000000/2024</ThemedText>
                                    </View>
                                </View>
                            </View>

                            {/* Pilih Driver */}
                            <View style={styles.selectionContainer}>
                                <TouchableOpacity style={styles.selectionRow}>
                                    <Image source={require('../../assets/images/psname.png')} style={styles.avatarIcon} />
                                    <View style={styles.selectionTextContainer}>
                                        <ThemedText style={styles.selectionLabel}>Pilih Driver</ThemedText>
                                        <ThemedText style={styles.selectionValue}>Lanjar Samadi</ThemedText>
                                    </View>
                                    
                                    
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.selectionRow} >
                                    <Image source={require('../../assets/images/psname.png')} style={styles.avatarIcon} />
                                    <View style={styles.selectionTextContainer}>
                                        <ThemedText style={styles.selectionLabel}>Pilih Installer</ThemedText>
                                        <ThemedText style={styles.selectionValue}>Lanjar Samadi</ThemedText>
                                    </View>
                                    
                                    
                                </TouchableOpacity>
                            </View>

                            {/* Button Lanjutkan Tugas */}
                            <TouchableOpacity style={styles.continueButton}>
                                <ThemedText style={styles.continueButtonText}>Lanjutkan Tugas</ThemedText>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                )}

                {/* Tab Order List */}
                {activeTab === 'Order List' && (
                    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
                        <View style={styles.orderListContainer}>
                            {/* Contoh item order */}
                            <View style={styles.orderItem}>
                                <Image source={require('../../assets/images/tiang.png')} style={styles.orderImage} />
                                <View style={styles.orderDetails}>
                                    <ThemedText style={styles.itemName}>Power Pole Large</ThemedText>
                                    <ThemedText style={styles.itemCompany}>PT WIJAYA KARYA BETON Tbk.</ThemedText>
                                    <View style={styles.itemInfo}>
                                        <ThemedText style={styles.itemType}>Type 682-T32</ThemedText>
                                        <ThemedText style={styles.itemQuantity}>Quantity: 2</ThemedText>
                                    </View>
                                </View>
                            </View>

                            {/* Tambahkan lebih banyak item order di sini */}
                            <View style={styles.orderItem}>
                                <Image source={require('../../assets/images/tiang.png')} style={styles.orderImage} />
                                <View style={styles.orderDetails}>
                                    <ThemedText style={styles.itemName}>Power Pole Large</ThemedText>
                                    <ThemedText style={styles.itemCompany}>PT WIJAYA KARYA BETON Tbk.</ThemedText>
                                    <View style={styles.itemInfo}>
                                        <ThemedText style={styles.itemType}>Type 682-T32</ThemedText>
                                        <ThemedText style={styles.itemQuantity}>Quantity: 2</ThemedText>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Tombol Lanjutkan Tugas */}
                        <TouchableOpacity style={styles.continueButton}>
                            <ThemedText style={styles.continueButtonText}>Lanjutkan Tugas</ThemedText>
                        </TouchableOpacity>
                    </ScrollView>
                )}

                {activeTab === 'Location' && (
                    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
                        <View style={styles.locationContainer}>
                            {/* ULP Section */}
                            <View style={styles.locationRow}>
                                <ThemedText style={styles.labellocation}>ULP</ThemedText>
                                <ThemedText style={styles.valuelocation}>Pasuruan</ThemedText>
                            </View>

                            {/* Destination Section */}
                            <View style={styles.locationRow}>
                                <ThemedText style={styles.labellocation}>Destination</ThemedText>
                                <ThemedText style={styles.valuelocation}>
                                    Jl. Lempongsari No.353, Jongkang, Sariharjo, Kec. Ngaglik, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55581
                                </ThemedText>
                            </View>

                            {/* Map Image */}
                            <Image source={require('../../assets/images/map.png')} style={styles.mapImage} />

                            {/* Button Lanjutkan Tugas */}
                            <TouchableOpacity style={styles.continueButton}>
                                <ThemedText style={styles.continueButtonText}>Lanjutkan Tugas</ThemedText>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        marginTop: -100,
        backgroundColor: '#fff',
    },
    content: {
        alignItems: 'center',
        paddingBottom: 16,
    },
    backgroundImage: {
        width: width,
        height: width * 0.8,
        resizeMode: 'cover',
    },
    orderContainer: {
        width: width,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -20,
        padding: 16,
        elevation: 3,
        flex: 1, // Menambah flex: 1 untuk memastikan container mengisi layar
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
        marginHorizontal: 5,
    },
    tabButtonInactive: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 20,
        marginHorizontal: 5,
    },
    tabTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    },
    tabTextInactive: {
        fontSize: width * 0.04,
        color: '#585858',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    informationContainer: {
        paddingHorizontal: 16,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginRight: 16,
    },
    ptName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    orderInfo: {
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    leftColumn: {
        flex: 1,
        marginRight: 10,
    },
    rightColumn: {
        flex: 1,
    },
    fullWidthColumn: {
        width: '100%',
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        color: '#414141',
    },
    value: {
        color: '#585858',
        marginTop: 5,
    },
    selectionContainer: {
        marginBottom: 20,
    },
    selectionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    avatarIcon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    selectionTextContainer: {
        flex: 1,
    },
    selectionLabel: {
        color: '#585858',
    },
    selectionValue: {
        fontWeight: 'bold',
    },
    extendIcon: {
        width: 24,
        height: 24,
    },
    continueButton: {
        backgroundColor: '#23ACE3',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    continueButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    orderListContainer: {
        padding: 16,
    },
    orderItem: {
        backgroundColor: '#F5F5F5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderImage: {
        width: 50,
        height: 50,
        marginRight: 15,
        borderRadius: 5,
    },
    orderDetails: {
        flex: 1,
    },
    itemName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#414141',
    },
    itemCompany: {
        fontSize: 12,
        color: '#585858',
        marginBottom: 5,
    },
    itemInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemType: {
        fontSize: 12,
        color: '#585858',
    },
    itemQuantity: {
        fontSize: 12,
        color: '#585858',
    },
    locationContainer: {
        paddingHorizontal: 16,
    },
    rowlocation: {
        marginBottom: 10,
    },
    locationRow: {
        marginBottom: 10,
        flexDirection: 'column', // Pastikan teks ada di bawah judul
        alignItems: 'flex-start', // Supaya tetap rata kiri
      },
    labellocation: {
        fontWeight: 'bold',
        color: '#414141',
    },
    valuelocation: {
        color: '#585858',
        marginTop: 5,
    },
    mapImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
        marginVertical: 20,
    },
});
