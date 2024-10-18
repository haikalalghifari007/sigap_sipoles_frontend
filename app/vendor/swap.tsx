import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText'; // Assuming ThemedText is imported
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function Swap() {
    const [activeTab, setActiveTab] = useState('Driver'); // Default to Driver tab

    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.safeArea}>
            {/* Container untuk Pilih Pesanan dengan margin top */}
            <View style={styles.topContainer}>
                <TouchableOpacity style={styles.dropdownButton}>
                    <View style={styles.dropdownContent}>
                        <ThemedText style={styles.pilihPesananText}>Pilih Pesanan</ThemedText>
                        <ThemedText style={styles.dropdownText}>JUDUL TUGAS</ThemedText>
                        <View style={styles.line} />
                    </View>
                    <Image source={require('../../assets/images/down.png')} style={styles.dropdownIcon} />
                </TouchableOpacity>
            </View>

            {/* Container untuk tab dan isi */}
            <View style={styles.tabContentContainer}>
                {/* Tabs untuk Driver dan Installer */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={activeTab === 'Driver' ? styles.tabButtonActive : styles.tabButtonInactive}
                        onPress={() => setActiveTab('Driver')}
                    >
                        <ThemedText style={activeTab === 'Driver' ? styles.tabTextActive : styles.tabTextInactive}>
                            Driver
                        </ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={activeTab === 'Installer' ? styles.tabButtonActive : styles.tabButtonInactive}
                        onPress={() => setActiveTab('Installer')}
                    >
                        <ThemedText style={activeTab === 'Installer' ? styles.tabTextActive : styles.tabTextInactive}>
                            Installer
                        </ThemedText>
                    </TouchableOpacity>
                </View>

                {/* Konten tab untuk Driver */}
                {activeTab === 'Driver' && (
                    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
                        {/* Driver Sebelum */}
                        <TouchableOpacity style={styles.driverItem}>
                            <Image source={require('../../assets/images/avatar.png')} style={styles.avatarIcon} />
                            <View style={styles.driverDetails}>
                                <ThemedText style={styles.driverTitle}>Driver Sebelum</ThemedText>
                                <ThemedText style={styles.driverName}>Lanjar Samadi</ThemedText>
                            </View>
                            <Image source={require('../../assets/images/extend.png')} style={styles.extendIcon} />
                        </TouchableOpacity>

                        {/* Swap Icon */}
                        <Image source={require('../../assets/images/swap.png')} style={styles.swapIcon} />

                        {/* Driver Sesudah */}
                        <TouchableOpacity style={styles.driverItem}>
                            <Image source={require('../../assets/images/avatar.png')} style={styles.avatarIcon} />
                            <View style={styles.driverDetails}>
                                <ThemedText style={styles.driverTitle}>Driver Sesudah</ThemedText>
                                <ThemedText style={styles.driverName}>Widi Dwi Astuti</ThemedText>
                            </View>
                            <Image source={require('../../assets/images/extend.png')} style={styles.extendIcon} />
                        </TouchableOpacity>

                        {/* Button Pilih Driver */}
                        <TouchableOpacity style={styles.confirmButton}>
                            <ThemedText style={styles.confirmButtonText}>Ubah Driver</ThemedText>
                        </TouchableOpacity>
                    </ScrollView>
                )}

                {/* Konten tab untuk Installer */}
                {activeTab === 'Installer' && (
                    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
                        {/* Installer Sebelum */}
                        <TouchableOpacity style={styles.driverItem}>
                            <Image source={require('../../assets/images/avatar.png')} style={styles.avatarIcon} />
                            <View style={styles.driverDetails}>
                                <ThemedText style={styles.driverTitle}>Installer Sebelum</ThemedText>
                                <ThemedText style={styles.driverName}>Lanjar Samadi</ThemedText>
                            </View>
                            <Image source={require('../../assets/images/extend.png')} style={styles.extendIcon} />
                        </TouchableOpacity>

                        {/* Swap Icon */}
                        <Image source={require('../../assets/images/swap.png')} style={styles.swapIcon} />

                        {/* Installer Sesudah */}
                        <TouchableOpacity style={styles.driverItem}>
                            <Image source={require('../../assets/images/avatar.png')} style={styles.avatarIcon} />
                            <View style={styles.driverDetails}>
                                <ThemedText style={styles.driverTitle}>Installer Sesudah</ThemedText>
                                <ThemedText style={styles.driverName}>Widi Dwi Astuti</ThemedText>
                            </View>
                            <Image source={require('../../assets/images/extend.png')} style={styles.extendIcon} />
                        </TouchableOpacity>

                        {/* Button Pilih Installer */}
                        <TouchableOpacity style={styles.confirmButton}>
                            <ThemedText style={styles.confirmButtonText}>Ubah Installer</ThemedText>
                        </TouchableOpacity>
                    </ScrollView>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topContainer: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    dropdownButton: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    },
    dropdownContent: {
        flex: 1,
    },
    pilihPesananText: {
        color: '#23ACE3',
        fontWeight: 'bold',
    },
    dropdownText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#414141',
        marginTop: 5, // Beri jarak antara Pilih Pesanan dan Judul Tugas
    },
    line: {
        height: 1,
        backgroundColor: '#7E7E7E',
        marginTop: 5, // Garis di bawah Judul Tugas
    },
    dropdownIcon: {
        width: 20,
        height: 20,
    },
    tabContentContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#E5E5E5',
    },
    tabButtonActive: {
        borderBottomWidth: 2,
        borderColor: '#23ACE3',
        paddingBottom: 5,
    },
    tabButtonInactive: {
        paddingBottom: 5,
    },
    tabTextActive: {
        color: '#23ACE3',
        fontWeight: 'bold',
    },
    tabTextInactive: {
        color: '#585858',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    driverItem: {
        backgroundColor: '#F8F9FD',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarIcon: {
        width: 40,
        height: 40,
        marginRight: 15,
    },
    driverDetails: {
        flex: 1,
    },
    driverTitle: {
        fontSize: 14,
        color: '#585858',
    },
    driverName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#414141',
    },
    extendIcon: {
        width: 24,
        height: 24,
    },
    swapIcon: {
        alignSelf: 'center',
        marginVertical: 10,
        width: 40,
        height: 40,
    },
    confirmButton: {
        marginTop:170,
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
