import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions, Text } from 'react-native';
import { useRouter} from 'expo-router'; // Import useRouter to navigate back
import { ThemedText } from '@/components/ThemedText'; // Assuming ThemedText is imported
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '@/components/ThemeContext';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

// Data provinsi, kota, kecamatan, kode pos yang lebih lengkap
const data = {
    provinsi: [
        'Bali', 'Banten', 'DI Yogyakarta', 'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur',
        'Kalimantan Barat', 'Kalimantan Selatan', 'Kalimantan Tengah', 'Lampung', 'Sumatera Barat',
        'Sumatera Selatan', 'Sumatera Utara', 'Sulawesi Selatan'
    ].sort(),

    kota: {
        'Bali': ['Badung', 'Bangli', 'Denpasar', 'Gianyar', 'Jembrana', 'Karangasem', 'Tabanan', 'Buleleng'].sort(),
        'Banten': ['Cilegon', 'Lebak', 'Pandeglang', 'Serang', 'Tangerang', 'Tangerang Selatan'].sort(),
        'DI Yogyakarta': ['Bantul', 'Gunungkidul', 'Kulon Progo', 'Sleman', 'Yogyakarta'].sort(),
        'DKI Jakarta': ['Jakarta Barat', 'Jakarta Pusat', 'Jakarta Selatan', 'Jakarta Timur', 'Jakarta Utara'].sort(),
        'Jawa Barat': ['Bandung', 'Bekasi', 'Bogor', 'Cimahi', 'Cirebon', 'Depok', 'Sukabumi', 'Tasikmalaya'].sort(),
        'Jawa Tengah': ['Banyumas', 'Banjarnegara', 'Cilacap', 'Magelang', 'Purbalingga', 'Surakarta', 'Semarang', 'Tegal'].sort(),
        'Jawa Timur': ['Banyuwangi', 'Blitar', 'Gresik', 'Malang', 'Surabaya', 'Sidoarjo', 'Madiun', 'Kediri'].sort(),
        'Kalimantan Barat': ['Kubu Raya', 'Mempawah', 'Pontianak', 'Singkawang', 'Sintang', 'Kapuas Hulu'].sort(),
        'Kalimantan Selatan': ['Banjarbaru', 'Banjarmasin', 'Barito Kuala', 'Hulu Sungai Selatan', 'Tapin', 'Tanah Laut'].sort(),
        'Kalimantan Tengah': ['Palangkaraya', 'Katingan', 'Kotawaringin Barat', 'Lamandau', 'Seruyan', 'Kapuas'].sort(),
        'Lampung': ['Bandar Lampung', 'Lampung Barat', 'Lampung Selatan', 'Lampung Tengah', 'Metro', 'Pesawaran'].sort(),
        'Sumatera Barat': ['Bukittinggi', 'Padang', 'Padang Panjang', 'Payakumbuh', 'Solok', 'Pariaman'].sort(),
        'Sumatera Selatan': ['Banyuasin', 'Lubuklinggau', 'Musi Banyuasin', 'Palembang', 'Prabumulih', 'Pagaralam'].sort(),
        'Sumatera Utara': ['Binjai', 'Medan', 'Pematangsiantar', 'Sibolga', 'Tanjungbalai', 'Tebing Tinggi'].sort(),
        'Sulawesi Selatan': ['Makassar', 'Maros', 'Palopo', 'Parepare', 'Soppeng', 'Gowa', 'Sinjai'].sort()
    },

    kecamatan: {
        'Badung': ['Kuta', 'Mengwi', 'Petang', 'Abiansemal'].sort(),
        'Bangli': ['Bangli', 'Kintamani', 'Susut', 'Tembuku'].sort(),
        'Denpasar': ['Denpasar Barat', 'Denpasar Selatan', 'Denpasar Timur', 'Denpasar Utara'].sort(),
        'Gianyar': ['Blahbatuh', 'Sukawati', 'Tampaksiring', 'Ubud'].sort(),
        'Cilegon': ['Cibeber', 'Ciwandan', 'Grogol', 'Purwakarta'].sort(),
        'Pandeglang': ['Labuan', 'Mandalawangi', 'Menes', 'Pandeglang'].sort(),
        'Jakarta Pusat': ['Cempaka Putih', 'Gambir', 'Menteng', 'Tanah Abang', 'Senen'].sort(),
        'Jakarta Selatan': ['Cilandak', 'Kebayoran Baru', 'Tebet', 'Pasar Minggu', 'Jagakarsa'].sort(),
        'Bandung': ['Antapani', 'Coblong', 'Lengkong', 'Ujungberung', 'Cidadap'].sort(),
        'Bekasi': ['Bekasi Barat', 'Bekasi Selatan', 'Bekasi Timur', 'Bekasi Utara'].sort(),
        'Bogor': ['Bogor Barat', 'Bogor Selatan', 'Bogor Utara', 'Tanah Sareal'].sort(),
        'Magelang': ['Borobudur', 'Candimulyo', 'Mertoyudan', 'Muntilan'].sort(),
        'Surabaya': ['Benowo', 'Bulak', 'Genteng', 'Rungkut', 'Tambaksari'].sort(),
        'Palangkaraya': ['Bukit Batu', 'Jekan Raya', 'Pahandut', 'Sebangau'].sort(),
        'Palembang': ['Alang-alang Lebar', 'Bukit Kecil', 'Gandus', 'Ilir Barat', 'Ilir Timur'].sort(),
        'Makassar': ['Biringkanaya', 'Makassar', 'Tamalanrea', 'Panakkukang', 'Rappocini'].sort(),
    },

    kodePos: {
        'Kuta': ['80361', '80362', '80363'],
        'Mengwi': ['80351', '80352', '80353'],
        'Petang': ['80331', '80332', '80333'],
        'Abiansemal': ['80352', '80353', '80354'],
        'Bangli': ['80611', '80612', '80613'],
        'Denpasar Barat': ['80111', '80112', '80113'],
        'Denpasar Selatan': ['80221', '80222', '80223'],
        'Blahbatuh': ['80511', '80512', '80513'],
        'Cibeber': ['42411', '42412', '42413'],
        'Gambir': ['10110', '10120', '10130'],
        'Menteng': ['10310', '10320', '10330'],
        'Cilandak': ['12430', '12440', '12450'],
        'Antapani': ['40291', '40292', '40293'],
        'Bogor Barat': ['16111', '16112', '16113'],
        'Borobudur': ['56511', '56512', '56513'],
        'Benowo': ['60191', '60192', '60193'],
        'Biringkanaya': ['90241', '90242', '90243'],
        'Pahandut': ['73111', '73112', '73113'],
        'Panakkukang': ['90231', '90232', '90233'],
        'Tanah Sareal': ['16161', '16162', '16163'],
        'Tambaksari': ['60135', '60136', '60137'],
        'Jagakarsa': ['12620', '12630', '12640'],
    }
};

export default function DetailAlamat() {
    const { theme } = useContext(ThemeContext); // Get theme from context
    const backgroundColor = theme === 'dark' ? Colors.dark.background : Colors.light.background;
    const router = useRouter();

    const handleSaveAddress = () => {
        router.back(); // Go back to the previous screen
    };

    const [step, setStep] = useState(0);
    const [selectedLocation, setSelectedLocation] = useState({
        provinsi: '',
        kota: '',
        kecamatan: '',
        kodePos: '',
        titikLokasi: ''
    });

 // Initialize router for navigation

    const handleNextStep = (selection: string) => {
        if (step === 0) {
            setSelectedLocation({ ...selectedLocation, provinsi: selection });
            setStep(1);
        } else if (step === 1) {
            const cities = data.kota[selectedLocation.provinsi as keyof typeof data.kota]; // Use keyof assertion
            if (cities) {
                setSelectedLocation({ ...selectedLocation, kota: selection });
                setStep(2);
            }
        } else if (step === 2) {
            const kecamatan = data.kecamatan[selectedLocation.kota as keyof typeof data.kecamatan]; // Use keyof assertion
            if (kecamatan) {
                setSelectedLocation({ ...selectedLocation, kecamatan: selection });
                setStep(3);
            }
        } else if (step === 3) {
            const kodePos = data.kodePos[selectedLocation.kecamatan as keyof typeof data.kodePos]; // Use keyof assertion
            if (kodePos) {
                setSelectedLocation({ ...selectedLocation, kodePos: selection });
                setStep(4);
            }
        }
    };

    const handleReset = () => {
        setSelectedLocation({
            provinsi: '',
            kota: '',
            kecamatan: '',
            kodePos: '',
            titikLokasi: ''
        });
        setStep(0); // Reset to step 0 (Pilih Provinsi)
    };

    const steps = [
        { label: 'Pilih Provinsi', value: selectedLocation.provinsi || 'Pilih Provinsi' },
        { label: 'Pilih Kota', value: selectedLocation.kota || 'Pilih Kota' },
        { label: 'Pilih Kecamatan', value: selectedLocation.kecamatan || 'Pilih Kecamatan' },
        { label: 'Pilih Kode Pos', value: selectedLocation.kodePos || 'Pilih Kode Pos' },
        { label: 'Pilih Titik Lokasi', value: 'Pilih Titik Lokasi' }
    ];

    const renderStepContent = () => {
        if (step === 0) {
            let previousLetter = ''; // Track the last letter to show only the first occurrence of each letter
            return (
                <View style={styles.condimentContainer}>
                    <ThemedText className='font-semibold' style={styles.title}>Provinsi</ThemedText>
                    {data.provinsi.map((provinsi, index) => {
                        const firstLetter = provinsi[0].toUpperCase();
                        const showLetter = firstLetter !== previousLetter;
                        previousLetter = firstLetter;

                        return (
                            <View key={provinsi}>
                                {showLetter && (
                                    <ThemedText className='font-oregular' style={styles.letterIndicator}>{firstLetter}</ThemedText>
                                )}
                                <View style={[styles.itemContainer, index !== data.provinsi.length - 1 && styles.itemSeparator]}>
                                    <TouchableOpacity onPress={() => handleNextStep(provinsi)}>
                                        <ThemedText className='font-oregular' >{provinsi}</ThemedText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}
                </View>
            );
        } else if (step === 1) {
            let previousLetter = '';
            return (
                <View style={styles.condimentContainer}>
                    <ThemedText style={styles.title}>Kota</ThemedText>
                    {data.kota[selectedLocation.provinsi as keyof typeof data.kota]?.map((kota, index) => {
                        const firstLetter = kota[0].toUpperCase();
                        const showLetter = firstLetter !== previousLetter;
                        previousLetter = firstLetter;

                        return (
                            <View key={kota}>
                                {showLetter && (
                                    <ThemedText style={styles.letterIndicator}>{firstLetter}</ThemedText>
                                )}
                                <View style={[styles.itemContainer, index !== data.kota[selectedLocation.provinsi as keyof typeof data.kota].length - 1 && styles.itemSeparator]}>
                                    <TouchableOpacity onPress={() => handleNextStep(kota)}>
                                        <ThemedText>{kota}</ThemedText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}
                </View>
            );
        } else if (step === 2) {
            let previousLetter = '';
            return (
                <View style={styles.condimentContainer}>
                    <ThemedText style={styles.title}>Kecamatan</ThemedText>
                    {data.kecamatan[selectedLocation.kota as keyof typeof data.kecamatan]?.map((kecamatan, index) => {
                        const firstLetter = kecamatan[0].toUpperCase();
                        const showLetter = firstLetter !== previousLetter;
                        previousLetter = firstLetter;

                        return (
                            <View key={kecamatan}>
                                {showLetter && (
                                    <ThemedText style={styles.letterIndicator}>{firstLetter}</ThemedText>
                                )}
                                <View style={[styles.itemContainer, index !== data.kecamatan[selectedLocation.kota as keyof typeof data.kecamatan].length - 1 && styles.itemSeparator]}>
                                    <TouchableOpacity onPress={() => handleNextStep(kecamatan)}>
                                        <ThemedText>{kecamatan}</ThemedText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}
                </View>
            );
        } else if (step === 3) {
            let previousLetter = '';
            return (
                <View style={styles.condimentContainer}>
                    <ThemedText style={styles.title}>Kode Pos</ThemedText>
                    {data.kodePos[selectedLocation.kecamatan as keyof typeof data.kodePos]?.map((kodePos, index) => {
                        const firstLetter = kodePos[0]; // Postal codes are numerical
                        const showLetter = firstLetter !== previousLetter;
                        previousLetter = firstLetter;

                        return (
                            <View key={kodePos}>
                                {showLetter && (
                                    <ThemedText style={styles.letterIndicator}>{firstLetter}</ThemedText>
                                )}
                                <View style={[styles.itemContainer, index !== data.kodePos[selectedLocation.kecamatan as keyof typeof data.kodePos].length - 1 && styles.itemSeparator]}>
                                    <TouchableOpacity onPress={() => handleNextStep(kodePos)}>
                                        <ThemedText>{kodePos}</ThemedText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}
                </View>
            );
        } else if (step === 4) {
            // Pilih Titik Lokasi
            return (
                <View style={styles.titikLokasiContainer}>
                    <ThemedText style={styles.title}>Titik Lokasi</ThemedText>
                    <View style={styles.alamatContainer}>
                        <ThemedText style={styles.alamatTitle}>Alamat:</ThemedText>
                        <ThemedText style={styles.alamatDetail}>
                            7°44'36.3"S 110°23'02.8"E Jawa Tengah, Kota Magelang, Kec. Mertoyudan, 56172
                        </ThemedText>
                    </View>
                    {/* Gambar map simulasi */}
                    <View style={styles.mapContainer}>
                        <Image
                            source={require('../../assets/images/map.png')} 
                            style={styles.mapImage}
                        />
                    </View>
                    {/* Tombol simpan */}
                    <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
                        <ThemedText style={styles.saveButtonText}>Simpan</ThemedText>
                    </TouchableOpacity>
                </View>
            );
        }
    };

    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={[{flex: 1, backgroundColor: backgroundColor}]}>
            

            <View style={styles.locationInfoContainer}>
                <ThemedText className='font-oregular' style={styles.locationText}>Lokasi Terpilih</ThemedText>
                <TouchableOpacity onPress={handleReset}>
                    <ThemedText className='font-oregular' style={styles.resetText}>Atur Ulang</ThemedText>
                </TouchableOpacity>
            </View>

            {/* Container for Indikator Bertahap */}
            <View style={styles.indikatorContainer}>
                <View style={styles.selectedLocationContainer}>
                    {steps.map((stepData, index) => (
                        <View key={index} style={styles.stepContainer}>
                            {index !== 0 && index <= step && <View style={styles.verticalLineAbove} />}
                            {index <= step && (
                                <View style={styles.circle}>
                                    {index < step && <View style={styles.filledCircle} />}
                                </View>
                            )}
                            {index !== steps.length - 1 && index <= step && <View style={styles.verticalLineBelow} />}
                            {index <= step && <ThemedText className='font-oregular'>{index < step ? stepData.value : stepData.label}</ThemedText>}
                        </View>
                    ))}
                </View>
            </View>

            {/* ScrollView for Daftar Pilihan */}
            <View style={styles.scrollWrapper}>
                <ScrollView style={styles.scrollContainer}>
                    <View  style={styles.stepContent}>
                        {renderStepContent()}
                    </View>
                </ScrollView>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    locationInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    locationText: {
        color: '#A0A0A0',
        fontSize: 16,
    },
    resetText: {
        color: '#23ACE3',
        fontSize: 14,
    },
    indikatorContainer: {
        paddingHorizontal: 16,
        marginTop: 10,
        flexDirection: 'column',
        width: '100%',
        flexShrink: 0,
    },
    scrollWrapper: {
        flex: 1,  // Takes remaining space, but keeps container static
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#23ACE3',  // Keep the border for the container
        borderRadius: 25,
    },
    scrollContainer: {
        paddingHorizontal: 16,
        flex: 1,  // Ensure scrolling only happens in this container
    },
    selectedLocationContainer: {
        marginTop: 20,
    },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        position: 'relative',
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#23ACE3',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        position: 'relative',
    },
    filledCircle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#23ACE3',
    },
    verticalLineAbove: {
        position: 'absolute',
        top: -20,
        left: 9,
        height: 20,
        width: 2,
        backgroundColor: '#23ACE3',
    },
    verticalLineBelow: {
        position: 'absolute',
        bottom: -20,
        left: 9,
        height: 20,
        width: 2,
        backgroundColor: '#23ACE3',
    },
    condimentContainer: {
        //   borderWidth: 0,
        //   borderColor: '#23ACE3',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    itemContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    itemSeparator: {
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    stepContent: {
        marginBottom: 20,
    },
    letterIndicator: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#23ACE3',
        marginVertical: 10,
    },
    titikLokasiContainer: {
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    alamatContainer: {
        marginBottom: 10,
    },
    alamatTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    alamatDetail: {
        fontSize: 14,
        color: '#414141',
    },
    mapContainer: {
        marginVertical: 15,
        borderRadius: 10,
        overflow: 'hidden',
    },
    mapImage: {
        width: '100%',
        height: 200, // Sesuaikan ukuran peta
        borderRadius: 30,
    },
    saveButton: {
        backgroundColor: '#23ACE3',
        borderRadius: 10,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
