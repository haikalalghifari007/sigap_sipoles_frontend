import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import { TextInput } from 'react-native-paper';  // Import TextInput from react-native-paper
import { ThemedText } from '@/components/ThemedText';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ThemeContext } from '@/components/ThemeContext';
import { Colors } from '@/constants/Colors';

const AddEditScreen = () => {
  const { theme } = useContext(ThemeContext);
  const { type, mode, item, name, adress, personInCharge, phoneNum, price, typeP, size } = useLocalSearchParams();
  const navigation = useNavigation();
  const backgroundColor = theme === 'dark' ? Colors.dark.background : Colors.light.background;
  const textSearchColor = theme === 'dark' ? Colors.dark.text : Colors.light.text; // Text color for dark mode

  const [formData, setFormData] = useState({
    name: name || item?.name || '',
    address: adress || item?.address || '',
    authority: personInCharge || '',
    phone: phoneNum || '',
    price: price || '',
    type: typeP || '',
    size: size || ''
  });

  useEffect(() => {
    const title = mode === 'edit' ? `Edit ${type.charAt(0).toUpperCase() + type.slice(1)}` : `Add ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    navigation.setOptions({ title });
  }, [navigation, mode, type]);

  const handleSubmit = () => {
    if (mode === 'edit') {
      // Update logic
    } else {
      // Add logic
    }
    navigation.goBack();
  };

  return (
    <ScrollView className="px-5 flex-1" style={{ backgroundColor }}>
  <View>
    <View className="flex-row mt-4">
      <ThemedText className="text-3xl font-obold">Yuk, </ThemedText>
      <ThemedText className="text-3xl font-obold text-originblue">{mode === 'edit' ? `ganti detail` : `isi detail`}</ThemedText>
    </View>
    <ThemedText className="text-3xl font-obold">{type} baru disini!</ThemedText>

    {/* Product or Vendor Name */}
    <View className="my-4">
      <TextInput
        label={<Text style={{fontFamily: "Outfit-Regular"}}>{`Nama ${type}`}</Text>}
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
        mode="outlined"
        style={{
          backgroundColor: 'transparent',
          fontFamily: 'Outfit-Regular',
          fontSize: 16,
        }}
        contentStyle={{ fontFamily: "Outfit-Regular", color: textSearchColor }}
        theme={{
          colors: {
            placeholder: '#aaa',
            primary: '#23ACE3',
            background: backgroundColor,
          },
          roundness: 10,
          fonts: {
            regular: {
              fontFamily: 'Outfit-Regular',
            },
          },
        }}
      />
    </View>

    {/* Vendor-specific fields */}
    {type === 'vendor' && (
      <>
        <View className="mb-4">
          <TextInput
            label={<Text style={{fontFamily: "Outfit-Regular"}}>Alamat Vendor</Text>}
            value={formData.address}
            onChangeText={(text) => setFormData({ ...formData, address: text })}
            mode="outlined"
            style={{
              backgroundColor: 'transparent',
              fontFamily: 'Outfit-Regular',
              fontSize: 16,
            }}
            contentStyle={{ fontFamily: "Outfit-Regular", color: textSearchColor }}
            theme={{
              colors: {
                placeholder: '#aaa',
                primary: '#23ACE3',
                background: backgroundColor,
              },
              roundness: 10,
              fonts: {
                regular: {
                  fontFamily: 'Outfit-Regular',
                },
              },
            }}
          />
        </View>

        <View className="mb-4">
          <TextInput
            label={<Text style={{fontFamily: "Outfit-Regular"}}>Penanggung Jawab</Text>}
            value={formData.authority}
            onChangeText={(text) => setFormData({ ...formData, authority: text })}
            mode="outlined"
            style={{
              backgroundColor: 'transparent',
              fontFamily: 'Outfit-Regular',
              fontSize: 16,
            }}
            contentStyle={{ fontFamily: "Outfit-Regular", color: textSearchColor }}
            theme={{
              colors: {
                placeholder: '#aaa',
                primary: '#23ACE3',
                background: backgroundColor,
              },
              roundness: 10,
              fonts: {
                regular: {
                  fontFamily: 'Outfit-Regular',
                },
              },
            }}
          />
        </View>

        <View className="mb-4">
          <TextInput
            label={<Text style={{fontFamily: "Outfit-Regular"}}>Nomor Telepon</Text>}
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            mode="outlined"
            keyboardType="numeric"
            style={{
              backgroundColor: 'transparent',
              fontFamily: 'Outfit-Regular',
              fontSize: 16,
            }}
            contentStyle={{ fontFamily: "Outfit-Regular", color: textSearchColor }}
            theme={{
              colors: {
                placeholder: '#aaa',
                primary: '#23ACE3',
                background: backgroundColor,
              },
              roundness: 10,
              fonts: {
                regular: {
                  fontFamily: 'Outfit-Regular',
                },
              },
            }}
          />
        </View>
      </>
    )}

    {/* Product-specific fields */}
    {type === 'product' && (
      <>
        <View className="mb-4">
          <TextInput
            label={<Text style={{fontFamily: "Outfit-Regular"}}>Tipe Produk</Text>}
            value={formData.type}
            onChangeText={(text) => setFormData({ ...formData, type: text })}
            mode="outlined"
            style={{
              backgroundColor: 'transparent',
              fontFamily: 'Outfit-Regular',
              fontSize: 16,
            }}
            contentStyle={{ fontFamily: "Outfit-Regular", color: textSearchColor }}
            theme={{
              colors: {
                placeholder: '#aaa',
                primary: '#23ACE3',
                background: backgroundColor,
              },
              roundness: 10,
              fonts: {
                regular: {
                  fontFamily: 'Outfit-Regular',
                },
              },
            }}
          />
        </View>

        <View className="mb-4">
          <TextInput
            label={<Text style={{fontFamily: "Outfit-Regular"}}>Ukuran Produk</Text>}
            value={formData.size}
            onChangeText={(text) => setFormData({ ...formData, size: text })}
            mode="outlined"
            style={{
              backgroundColor: 'transparent',
              fontFamily: 'Outfit-Regular',
              fontSize: 16,
            }}
            contentStyle={{ fontFamily: "Outfit-Regular", color: textSearchColor }}
            theme={{
              colors: {
                placeholder: '#aaa',
                primary: '#23ACE3',
                background: backgroundColor,
              },
              roundness: 10,
              fonts: {
                regular: {
                  fontFamily: 'Outfit-Regular',
                },
              },
            }}
          />
        </View>

        <View className="mb-4">
          <TextInput
            label={<Text style={{fontFamily: "Outfit-Regular"}}>Harga Produk</Text>}
            value={formData.price}
            onChangeText={(text) => setFormData({ ...formData, price: text })}
            mode="outlined"
            keyboardType="numeric"
            style={{
              backgroundColor: 'transparent',
              fontFamily: 'Outfit-Regular',
              fontSize: 16,
            }}
            contentStyle={{ fontFamily: "Outfit-Regular", color: textSearchColor }}
            theme={{
              colors: {
                placeholder: '#aaa',
                primary: '#23ACE3',
                background: backgroundColor,
              },
              roundness: 10,
              fonts: {
                regular: {
                  fontFamily: 'Outfit-Regular',
                },
              },
            }}
          />
        </View>
      </>
    )}

        {/* Photo Upload Section */}
        <View className="mb-4">
          <ThemedText className="mb-1 text-gray-500 font-olight text-sm">Foto {type}</ThemedText>
          <TouchableOpacity>
            <View className="border rounded-xl px-14 py-8 items-center border-gray-400">
              <Image source={require('../../assets/images/addgallery.png')} className="w-14 h-14" />
              <ThemedText className="text-gray-500 font-olight text-xs text-center">Upload a profile photo with a maximum size of 5MB in PNG or JPEG format</ThemedText>
            </View>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity onPress={handleSubmit}>
          <View className="mb-4 p-2 rounded-lg items-center bg-originblue">
            <ThemedText className="mb-1 text-white font-oregular text-lg">{mode === 'edit' ? 'Simpan' : 'Tambahkan'}</ThemedText>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddEditScreen;
