import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import SearchField from "@/components/SearchField";
import { ThemeContext } from "@/components/ThemeContext";
import { Vendor } from "@/models/Vendor";
import { getAllVendors } from "@/services/admin/vendor";
import ListOfVendor from "@/components/ui/ListOfVendor";
const screenWidth = Dimensions.get("window").width;
const isTablet = screenWidth >= 768;

const VendorListScreen = () => {
  const { theme } = useContext(ThemeContext);
  const cardBackgroundColor =
    theme === "dark" ? Colors.dark.card : Colors.light.card;
  const backgroundColor =
    theme === "dark" ? Colors.dark.background : Colors.light.background;
  const [data, setData] = useState<Vendor[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    const res = await getAllVendors();
    setLoading(false);
    if (res) {
      setData(res);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color={Colors.colorful.blue} />
      </View>
    );
  }

  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      style={{ flex: 1, backgroundColor }}
    >
      <SearchField
        placeholder="Cari nama vendor..."
        onTextChange={setSearch}
        value={search}
      />
      {data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      ).length === 0 && (
        <View className="flex-1 justify-center items-center bg-white">
          <Text className="text-lg font-oregular">Tidak ada vendor</Text>
        </View>
      )}
      <FlatList
        data={data.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={(item) => item.vendorId.toString()}
        renderItem={({ item }) => <ListOfVendor item={item} />}
      />
      <Link
        href={{
          pathname: "/admin/form-vendor",
        }}
        asChild
      >
        <TouchableOpacity className="absolute bottom-10 md:bottom-14 right-5 md:right-8">
          <View
            style={[
              {
                backgroundColor: cardBackgroundColor,
                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 4,
              },
            ]}
          >
            <Ionicons name="add" size={isTablet ? 80 : 50} color="#23ACE3" />
          </View>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
};

export default VendorListScreen;
