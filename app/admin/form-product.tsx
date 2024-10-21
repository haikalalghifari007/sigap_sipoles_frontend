import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, Image, Text } from "react-native";
import { TextInput } from "react-native-paper"; // Import TextInput from react-native-paper
import { ThemedText } from "@/components/ThemedText";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { ThemeContext } from "@/components/ThemeContext";
import { Colors } from "@/constants/Colors";
import { FormVendor } from "@/services/admin/vendor";
import { FormProduct } from "@/services/admin/product";
import FormInput from "@/components/ui/FormInput";
import Toast from "react-native-toast-message";

const AddEditScreen = () => {
  const { theme } = useContext(ThemeContext);
  const backgroundColor =
    theme === "dark" ? Colors.dark.background : Colors.light.background;
  const textSearchColor =
    theme === "dark" ? Colors.dark.text : Colors.light.text;

  const {
    id = "0",
    name,
    type,
    diameter,
    height,
  } = useLocalSearchParams() as {
    id: string;
    name: string;
    type: string;
    diameter: string;
    height: string;
  };

  const [form, setForm] = useState<FormProduct>({
    id,
    name,
    type,
    diameter,
    height,
  });

  const handleSubmit = () => {
    router.back();
  };

  useNavigation().setOptions({
    title: id === "0" ? "Tambah Produk" : "Edit Produk",
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
          Produk{id === "0" ? "Baru" : ""} disini!
        </ThemedText>

        <View className="flex flex-col space-y-2 mt-4">
          <FormInput
            label="Nama Produk"
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
          />

          <FormInput
            label="Jenis Produk"
            value={form.type}
            onChangeText={(text) => setForm({ ...form, type: text })}
          />
          <View className="flex flex-row w-full justify-between space-x-2 items-center">
            <FormInput
              label="Diameter (cm)"
              value={form.diameter}
              onChangeText={(text) => setForm({ ...form, diameter: text })}
              keyboardType="numeric"
              isHalf
            />

            <FormInput
              label="Tinggi (cm)"
              value={form.height}
              onChangeText={(text) => setForm({ ...form, height: text })}
              keyboardType="numeric"
              isHalf
            />
          </View>

          <View className="flex-col space-y-2">
            <ThemedText className="mb-1 text-gray-500 font-olight text-sm">
              Foto Produk
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
      <Toast />
    </ScrollView>
  );
};

export default AddEditScreen;
