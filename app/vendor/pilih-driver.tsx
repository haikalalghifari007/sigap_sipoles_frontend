import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ScrollView, TextInput, Dimensions, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/ThemedText'; // Assuming ThemedText is imported
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function PilihDriver() {
    const [selectedDriver, setSelectedDriver] = useState<number | null>(null); // State to track the selected driver

    const drivers = [
        { id: 1, name: 'Lanjar Samadi', phone: '33710222100002002', photo: require('../../assets/images/fotod.png') },
        { id: 2, name: 'Lanjar Samadi', phone: '33710222100002002', photo: require('../../assets/images/fotod.png') },
        { id: 3, name: 'Lanjar Samadi', phone: '33710222100002002', photo: require('../../assets/images/fotod.png') },
    ];

    const handleDriverSelect = (id: number) => {
        setSelectedDriver(id); // Set the selected driver
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Gambar dan Header tetap statis */}
            <Image source={require('../../assets/images/latar_detail.png')} style={styles.backgroundImage} />

            

            {/* Konten yang dapat di-scroll */}
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
                {/* Search bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchInputContainer}>
                        <Image source={require('../../assets/images/search.png')} style={styles.searchIcon} />
                        <TextInput
                            placeholder="Search Driver Here..."
                            style={styles.searchInput}
                        />
                    </View>
                </View>

                {/* Daftar Driver */}
                <View style={styles.driverListContainer}>
                    {drivers.map((driver) => (
                        <TouchableOpacity
                            key={driver.id}
                            style={styles.driverItem}
                            onPress={() => handleDriverSelect(driver.id)}
                        >
                            <Image source={driver.photo} style={styles.driverImage} />
                            <View style={styles.driverDetails}>
                                <ThemedText style={styles.driverName}>{driver.name}</ThemedText>
                                <ThemedText style={styles.driverPhone}>{driver.phone}</ThemedText>
                            </View>
                            <View style={styles.radioContainer}>
                                {selectedDriver === driver.id ? (
                                    <View style={styles.radioSelected} />
                                ) : (
                                    <View style={styles.radioUnselected} />
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Button Konfirmasi Pilih Driver */}
                <TouchableOpacity style={styles.confirmButton}>
                    <ThemedText style={styles.confirmButtonText}>Pilih Driver</ThemedText>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: -100,
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
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30, // Tambahkan radius pada bagian kiri atas
        borderTopRightRadius: 30, // Tambahkan radius pada bagian kanan atas
        marginTop: -20, // Agar container atas menyatu dengan gambar latar
        paddingTop: 20,
    },
    scrollContent: {
        paddingBottom: 20,
        paddingHorizontal: 16,
    },
    searchContainer: {
        marginVertical: 20,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 10,
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    searchInput: {
        flex: 1, // Supaya input text mengisi space yang tersedia
        fontSize: 16,
    },
    driverListContainer: {
        marginBottom: 20,
    },
    driverItem: {
        backgroundColor: '#F5F5F5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    driverImage: {
        width: 50,
        height: 50,
        marginRight: 15,
        borderRadius: 5,
    },
    driverDetails: {
        flex: 1,
    },
    driverName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#414141',
    },
    driverPhone: {
        fontSize: 12,
        color: '#585858',
        marginBottom: 5,
    },
    radioContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#23ACE3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioSelected: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#23ACE3',
    },
    radioUnselected: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#fff',
    },
    confirmButton: {
        backgroundColor: '#23ACE3',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
