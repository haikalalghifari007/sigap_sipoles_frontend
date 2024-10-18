import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Dimensions, } from 'react-native';
import {  Link, router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { TextInput } from 'react-native-paper'; // Import TextInput dari react-native-paper
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native'; // Import useWindowDimensions

const { width, height } = Dimensions.get('window');

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007AFF', // Mengatur warna utama menjadi #007AFF
  },
};

export default function SignIn() {
  const { width: screenWidth } = useWindowDimensions();

  // Membuat style dinamis dengan menggunakan StyleSheet.create
  const dynamicStyles = StyleSheet.create({
    input: {
      width: screenWidth >= 500 && screenWidth < 1200 ? '90%' : '100%', // Menggunakan string persentase
      fontSize: screenWidth >= 500 && screenWidth < 1200 ? 24 : 14, // Sesuaikan ukuran font
      marginBottom: 15,
    },
    button: {
      backgroundColor: '#23ACE3',
      padding: 15,
      borderRadius: 10,
      width: screenWidth >= 500 && screenWidth < 1200 ? '90%' : '100%', // Responsif pada lebar tombol
      alignItems: 'center',
      marginVertical: 15,
    },
    buttonText: {
      color: '#fff',
      fontSize: screenWidth >= 500 && screenWidth < 1200 ? 24 : 16, // Perbesar teks jika layar medium
      fontWeight: '600',
    },
  });

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <View className='flex flex-row justify-between'>
          <View className=' px-5 mt-32'>
            <ThemedText className='font-oregular text-3xl md:text-4xl lg:text-8xl' style={styles.welcomeText}>
              Welcome to
            </ThemedText>
            <ThemedText className='font-oregular text-2xl md:text-4xl lg:text-7xl' style={styles.appName}>
              SIGAP SIPOLES!
            </ThemedText>
            <ThemedText className="font-oregular text-sm md:text-3xl lg:text-3xl" style={styles.descriptionText}>
              Sign in to start exploring further.
            </ThemedText>
          </View>

          {/* Gambar yang sama seperti di index.tsx */}
          <Image
            source={require('../assets/images/signin.png')}
            style={{ width: width * 1.4, height: height / 1.4 }}
            className='absolute inset-y-0-right-10'
            resizeMode="contain"
          />
        </View>

        <View style={styles.formSection}>
          <ThemedText type='title' className='text-3xl md:text-3xl lg:text-5xl' style={styles.signUpText}>
            SIGN IN
          </ThemedText>

          {/* Form untuk Sign In */}
          <TextInput
            className='font-oregular'
            label="Email"
            mode="outlined"
            style={dynamicStyles.input}
            outlineColor="#23ACE3"
            activeOutlineColor="#23ACE3"
          />
          <TextInput
            label="Password"
            mode="outlined"
            style={dynamicStyles.input}
            secureTextEntry={true}
            outlineColor="#23ACE3"
            activeOutlineColor="#23ACE3"
          />

          <TouchableOpacity style={dynamicStyles.button} onPress={() => router.push("/homepage")}>
            <ThemedText style={dynamicStyles.buttonText}>Sign In</ThemedText>
          </TouchableOpacity>

          {/* Tautan untuk kembali ke halaman sign up */}
          <ThemedText className='text-sm  lg:text-2xl' style={styles.signUpText}>
            Already have an account?{' '}
            <Link href="/" style={styles.signUpLinkText}>
              Sign Up
            </Link>
          </ThemedText>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formSection: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
    marginTop: height * 0.23,
  },
  welcomeText: {
    color: '#585858',
    fontWeight: 'bold',
  },
  appName: {
    fontWeight: '900',
    color: '#23ACE3',
  },
  descriptionText: {
    marginTop: 0,
    color: '#585858',
  },
  signUpText: {
    color: '#585858',
    marginVertical: 10,
  },
  signUpLink: {
    fontSize: 14,
    color: '#585858',
  },
  signUpLinkText: {
    color: '#23ACE3',
    fontWeight: '600',
  },
}); 