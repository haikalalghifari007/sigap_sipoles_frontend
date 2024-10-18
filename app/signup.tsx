import React, { useState } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Dimensions, Text, Platform } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { TextInput } from 'react-native-paper';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007AFF',
  },
};

export default function SignUp() {
  const { width: screenWidth } = useWindowDimensions();
  const { height: screenHeight } = useWindowDimensions();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');

  const dynamicStyles = StyleSheet.create({
    input: {
      width: screenWidth >= 500 && screenWidth < 1200 ? '90%' : '100%',
      fontSize: screenWidth >= 500 && screenWidth < 1200 ? 24 : 14,
      marginBottom: 15,

    },
    pickerContainer: {
      borderColor: '#23ACE3',
      borderWidth: 1,
      borderRadius: 4,
      width: screenWidth >= 500 && screenWidth < 1200 ? '90%' : '100%',
      height: Platform.OS === 'ios' ? 50 : screenHeight >= 500 && screenHeight < 1200 ? '14%' : '8%',
      marginBottom: 15,
    },
    picker: {
      fontSize: screenWidth >= 500 && screenWidth < 1200 ? 24 : 14,
      color: '#585858',
      // Remove or adjust the height for iOS
      height: Platform.OS === 'ios' ? undefined : '100%',
    },
    button: {
      backgroundColor: '#23ACE3',
      padding: 15,
      borderRadius: 10,
      width: screenWidth >= 500 && screenWidth < 1200 ? '90%' : '100%',
      alignItems: 'center',
      marginVertical: 15,
    },
    buttonText: {
      color: '#fff',
      fontSize: screenWidth >= 500 && screenWidth < 1200 ? 24 : 16,
      fontWeight: '600',
    },
    reviewMessageContainer: {
      alignItems: 'center',
      padding: 20,
    },
    reviewMessageText: {
      fontSize: screenWidth >= 500 && screenWidth < 1200 ? 24 : 16,
      textAlign: 'center',
      color: '#585858',
      marginVertical: 10,
    },
    returnButton: {
      backgroundColor: '#23ACE3',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
      width: screenWidth >= 500 && screenWidth < 1200 ? '90%' : '100%',
    },
    returnButtonText: {
      color: '#fff',
      fontSize: screenWidth >= 500 && screenWidth < 1200 ? 24 : 16,
      fontWeight: '600',
    },
  });

  const handleContinue = () => {
    setStep(2);
  };

  const handleSendRequest = () => {
    setStep(3);
  };

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
              Sign up now and be a part of {'\n'}something amazing.
            </ThemedText>
          </View>

          {step === 1 && (
            <Image
              source={require('../assets/images/signup.png')}
              style={{ width: width * 1.4, height: height / 1.4 }}
              className='absolute inset-y-0-right-10'
              resizeMode="contain"
            />
          )}

          {step === 2 && (
            <Image
              source={require('../assets/images/signup2.png')}
              style={{ width: width * 1.4, height: height / 1.4 }}
              className='absolute inset-y-0-right-10'
              resizeMode="contain"
            />
          )}

          {step === 3 && (
            <Image
              source={require('../assets/images/signup2.png')}
              style={{ width: width * 1.4, height: height / 1.4 }}
              className='absolute inset-y-0-right-10'
              resizeMode="contain"
            />
          )}
        </View>

        <View style={styles.formSection}>
          {step !== 3 && (
            <ThemedText className='text-3xl md:text-3xl lg:text-5xl' style={styles.signUpText}>SIGN UP</ThemedText>
          )}

          {step === 1 ? (
            <>
              <TextInput
                className='font-oregular'
                label="Full Name"
                mode="outlined"
                style={dynamicStyles.input}
                outlineColor="#23ACE3"
                activeOutlineColor="#23ACE3"
              />
              <TextInput
                label="NIK"
                mode="outlined"
                style={dynamicStyles.input}
                keyboardType="numeric"
                outlineColor="#23ACE3"
                activeOutlineColor="#23ACE3"
              />
              <TextInput
                label="Phone Number"
                mode="outlined"
                style={dynamicStyles.input}
                keyboardType="phone-pad"
                outlineColor="#23ACE3"
                activeOutlineColor="#23ACE3"
              />

              <TouchableOpacity style={dynamicStyles.button} onPress={handleContinue}>
                <ThemedText style={dynamicStyles.buttonText}>Continue</ThemedText>
              </TouchableOpacity>
            </>
          ) : step === 2 ? (
            <>
              <TextInput
                className='font-oregular'
                label="Email"
                mode="outlined"
                style={dynamicStyles.input}
                outlineColor="#23ACE3"
                activeOutlineColor="#23ACE3"
              />

              <View style={dynamicStyles.pickerContainer}>
                <RNPickerSelect
                  placeholder={{ label: 'Choose Role', value: '', color: '#C7C7CD', }}
                  onValueChange={(value) => setRole(value)}
                  items={[
                    { label: 'Driver', value: 'Driver' },
                    { label: 'Employee', value: 'Employee' },
                    { label: 'Super Admin', value: 'Super Admin' },
                  ]}
                  style={{
                    inputIOS: {
                      fontSize: screenWidth >= 500 && screenWidth < 1200 ? 24 : 14,
                      paddingVertical: 15,
                      paddingHorizontal: 10,
                      color: '#000000',
                       // to ensure the text is not overlapping
                    },
                    inputAndroid: {
                      fontSize: screenWidth >= 500 && screenWidth < 1200 ? 24 : 14,
                      color: '#000000',
                    },
                    placeholder: {
                      color: '#000000', // Set the placeholder text color
                      fontSize: screenWidth >= 500 && screenWidth < 1200 ? 24 : 14,
                    },
                  }}
                  
                />
                
                
              </View>

              <TextInput
                label="Password"
                mode="outlined"
                style={dynamicStyles.input}
                secureTextEntry={true}
                outlineColor="#23ACE3"
                activeOutlineColor="#23ACE3"
              />

              <TouchableOpacity style={dynamicStyles.button} onPress={handleSendRequest}>
                <ThemedText style={dynamicStyles.buttonText}>Send Request</ThemedText>
              </TouchableOpacity>
            </>
          ) : (
            <View style={dynamicStyles.reviewMessageContainer}>
              <Image
                source={require('../assets/images/sendr.png')}
                style={{ width: 100, height: 100, marginBottom: 20 }}
              />
              <ThemedText style={dynamicStyles.reviewMessageText}>Your Account is Under Review by admin</ThemedText>
              <ThemedText style={dynamicStyles.reviewMessageText}>
                Please stay tuned and check your email regularly for updates.
              </ThemedText>
              <Link href="/signin" asChild>
                <TouchableOpacity style={dynamicStyles.returnButton}>
                  <Text style={dynamicStyles.returnButtonText}>Return to the Login Page</Text>
                </TouchableOpacity>
              </Link>
            </View>
          )}

          <ThemedText className='text-sm  lg:text-2xl' style={styles.signInText}>
            Already have an account?{' '}
            <Link href="/signin" style={styles.signInLink}>
              Sign in
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
  topSection: {
    position: 'absolute',
    top: 0,
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  imageStyle: {
    position: 'absolute',
    right: 0,
    width: '50%',
    height: '100%',
    resizeMode: 'contain',
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: height * 0.1,
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
  formSection: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
    marginTop: height * 0.2,
  },
  signUpText: {
    color: '#585858',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    width: '100%',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#23ACE3',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginVertical: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signInText: {
    color: '#585858',
  },
  signInLink: {
    color: '#23ACE3',
    fontWeight: '600',
  },
});
