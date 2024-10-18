import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ScrollView, TextInput, Dimensions, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/ThemedText'; // Assuming ThemedText is imported
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function PilihInstaller() {
    const [selectedInstaller, setSelectedInstaller] = useState<number | null>(null); // State to track the selected installer

    const installers = [
        { id: 1, name: 'Lanjar Samadi', phone: '33710222100002002', photo: require('../../assets/images/fotod.png') },
        { id: 2, name: 'Lanjar Samadi', phone: '33710222100002002', photo: require('../../assets/images/fotod.png') },
        { id: 3, name: 'Lanjar Samadi', phone: '33710222100002002', photo: require('../../assets/images/fotod.png') },
    ];

    const handleInstallerSelect = (id: number) => {
        setSelectedInstaller(id); // Set the selected installer
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Gambar dan Header tetap statis */}
            <Image source={require('../../assets/images/latar_detail.png')} style={styles.backgroundImage} />

            {/* Custom Header */}
            

            {/* Konten yang dapat di-scroll */}
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
                {/* Search bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchInputContainer}>
                        <Image source={require('../../assets/images/search.png')} style={styles.searchIcon} />
                        <TextInput
                            placeholder="Search Installer Here..."
                            style={styles.searchInput}
                        />
                    </View>
                </View>

                {/* Daftar Installer */}
                <View style={styles.installerListContainer}>
                    {installers.map((installer) => (
                        <TouchableOpacity
                            key={installer.id}
                            style={styles.installerItem}
                            onPress={() => handleInstallerSelect(installer.id)}
                        >
                            <Image source={installer.photo} style={styles.installerImage} />
                            <View style={styles.installerDetails}>
                                <ThemedText style={styles.installerName}>{installer.name}</ThemedText>
                                <ThemedText style={styles.installerPhone}>{installer.phone}</ThemedText>
                            </View>
                            <View style={styles.radioContainer}>
                                {selectedInstaller === installer.id ? (
                                    <View style={styles.radioSelected} />
                                ) : (
                                    <View style={styles.radioUnselected} />
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Button Konfirmasi Pilih Installer */}
                <TouchableOpacity style={styles.confirmButton}>
                    <ThemedText style={styles.confirmButtonText}>Pilih Installer</ThemedText>
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
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -20,
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
        flex: 1,
        fontSize: 16,
    },
    installerListContainer: {
        marginBottom: 20,
    },
    installerItem: {
        backgroundColor: '#F5F5F5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    installerImage: {
        width: 50,
        height: 50,
        marginRight: 15,
        borderRadius: 5,
    },
    installerDetails: {
        flex: 1,
    },
    installerName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#414141',
    },
    installerPhone: {
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
