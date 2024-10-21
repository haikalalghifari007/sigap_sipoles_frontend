import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, Image, Text } from "react-native";
import { TextInput } from "react-native-paper"; // Import TextInput from react-native-paper
import { ThemedText } from "@/components/ThemedText";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { ThemeContext } from "@/components/ThemeContext";
import { Colors } from "@/constants/Colors";
import { FormVendor } from "@/services/admin/vendor";

const AddEditScreen = () => {
  const { theme } = useContext(ThemeContext);
  const backgroundColor =
    theme === "dark" ? Colors.dark.background : Colors.light.background;
  const textSearchColor =
    theme === "dark" ? Colors.dark.text : Colors.light.text;

  const {
    id = "0",
    name,
    location,
    phone,
    personInCharge,
    email,
  } = useLocalSearchParams() as {
    id: string;
    name: string;
    location: string;
    phone: string;
    personInCharge: string;
    email: string;
  };

  const [form, setForm] = useState<FormVendor>({
    id,
    name,
    location,
    phone,
    personInCharge,
    email,
  });

  const handleSubmit = () => {
    router.back();
  };

  useNavigation().setOptions({
    title: id === "0" ? "Tambah Vendor" : "Edit Vendor",
  });

  return (
    <ScrollView className="px-5 flex-1" style={{ backgroundColor }}>
      <View>
        <View className="flex-row mt-4">
          <ThemedText className="text-3xl font-obold">Yuk, </ThemedText>
          <ThemedText className="text-3xl font-obold text-originblue">
            {id === "0" ? "Tambah" : "Edit"}
          </ThemedText>
        </View>
        <ThemedText className="text-3xl font-obold">
          Vendor baru disini!
        </ThemedText>

        <View className="flex flex-col gap-4 mt-4">
          <TextInput
            label={
              <Text style={{ fontFamily: "Outfit-Regular" }}>Nama vendor</Text>
            }
            value={name}
            onChangeText={(text) => setForm({ ...form, name: text })}
            mode="outlined"
            style={{
              backgroundColor: "transparent",
              fontFamily: "Outfit-Regular",
              fontSize: 16,
            }}
            contentStyle={{
              fontFamily: "Outfit-Regular",
              color: textSearchColor,
            }}
            theme={{
              colors: {
                placeholder: "#aaa",
                primary: "#23ACE3",
                background: backgroundColor,
              },
              roundness: 10,
              fonts: {
                regular: {
                  fontFamily: "Outfit-Regular",
                },
              },
            }}
          />

          <TextInput
            label={
              <Text style={{ fontFamily: "Outfit-Regular" }}>Email vendor</Text>
            }
            value={email}
            onChangeText={(text) => setForm({ ...form, email: text })}
            mode="outlined"
            style={{
              backgroundColor: "transparent",
              fontFamily: "Outfit-Regular",
              fontSize: 16,
            }}
            contentStyle={{
              fontFamily: "Outfit-Regular",
              color: textSearchColor,
            }}
            theme={{
              colors: {
                placeholder: "#aaa",
                primary: "#23ACE3",
                background: backgroundColor,
              },
              roundness: 10,
              fonts: {
                regular: {
                  fontFamily: "Outfit-Regular",
                },
              },
            }}
          />

          <TextInput
            label={
              <Text style={{ fontFamily: "Outfit-Regular" }}>
                Alamat Vendor
              </Text>
            }
            value={form.location}
            onChangeText={(text) => setForm({ ...form, location: text })}
            mode="outlined"
            style={{
              backgroundColor: "transparent",
              fontFamily: "Outfit-Regular",
              fontSize: 16,
            }}
            contentStyle={{
              fontFamily: "Outfit-Regular",
              color: textSearchColor,
            }}
            theme={{
              colors: {
                placeholder: "#aaa",
                primary: "#23ACE3",
                background: backgroundColor,
              },
              roundness: 10,
              fonts: {
                regular: {
                  fontFamily: "Outfit-Regular",
                },
              },
            }}
          />

          <TextInput
            label={
              <Text style={{ fontFamily: "Outfit-Regular" }}>
                Penanggung Jawab
              </Text>
            }
            value={form.personInCharge}
            onChangeText={(text) => setForm({ ...form, personInCharge: text })}
            mode="outlined"
            style={{
              backgroundColor: "transparent",
              fontFamily: "Outfit-Regular",
              fontSize: 16,
            }}
            contentStyle={{
              fontFamily: "Outfit-Regular",
              color: textSearchColor,
            }}
            theme={{
              colors: {
                placeholder: "#aaa",
                primary: "#23ACE3",
                background: backgroundColor,
              },
              roundness: 10,
              fonts: {
                regular: {
                  fontFamily: "Outfit-Regular",
                },
              },
            }}
          />

          <TextInput
            label={
              <Text style={{ fontFamily: "Outfit-Regular" }}>
                Nomor Telepon
              </Text>
            }
            value={form.phone}
            onChangeText={(text) => setForm({ ...form, phone: text })}
            mode="outlined"
            keyboardType="numeric"
            style={{
              backgroundColor: "transparent",
              fontFamily: "Outfit-Regular",
              fontSize: 16,
            }}
            contentStyle={{
              fontFamily: "Outfit-Regular",
              color: textSearchColor,
            }}
            theme={{
              colors: {
                placeholder: "#aaa",
                primary: "#23ACE3",
                background: backgroundColor,
              },
              roundness: 10,
              fonts: {
                regular: {
                  fontFamily: "Outfit-Regular",
                },
              },
            }}
          />

          <View className="flex-col space-y-2">
            <ThemedText className="mb-1 text-gray-500 font-olight text-sm">
              Logo Vendor
            </ThemedText>
            <TouchableOpacity>
              <View className="border rounded-xl px-14 py-8 items-center border-gray-400">
                <Image
                  source={require("../../assets/images/addgallery.png")}
                  className="w-14 h-14"
                />
                <ThemedText className="text-gray-500 font-olight text-xs text-center">
                  Upload a profile photo with a maximum size of 5MB in PNG or
                  JPEG format
                </ThemedText>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleSubmit}>
            <View className="mb-4 p-2 rounded-lg items-center bg-originblue">
              <ThemedText className="mb-1 text-white font-oregular text-lg">
                {id === "0" ? "Tambahkan" : "Simpan"}
              </ThemedText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddEditScreen;
