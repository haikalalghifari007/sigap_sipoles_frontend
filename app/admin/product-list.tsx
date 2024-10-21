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
import { ThemedText } from "@/components/ThemedText";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Ionicons } from "@expo/vector-icons";
import {
  black,
  white,
} from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import SearchField from "@/components/SearchField";
import { ThemeContext } from "@/components/ThemeContext";
import AwesomeAlert from "react-native-awesome-alerts";
import { Product } from "@/models/Product";
import ListOfProduct from "@/components/ui/ListOfProduct";
import { getAllProducts } from "@/services/admin/product";
import ModalConfirmation from "@/components/ui/ModalConfirmation";

// Mock data for orders

const ProductListScreen = () => {
  const { theme } = useContext(ThemeContext);
  const backgroundColor =
    theme === "dark" ? Colors.dark.background : Colors.light.background;

  const [showAlert, setShowAlert] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number>(0);

  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  const fetchData = async () => {
    const res = await getAllProducts();
    if (res) {
      setData(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteProduct = (id: number) => {
    setSelectedProductId(id);
    setShowAlert(true);
  };

  const confirmDeleteProduct = () => {
    setShowAlert(false);
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size={"large"} color={Colors.colorful.blue} />
      </View>
    );
  }

  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      style={{ flex: 1, backgroundColor }}
    >
      <SearchField
        placeholder="Cari produk di sini..."
        value={search}
        onTextChange={setSearch}
      />
      {data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      ).length === 0 && (
        <View className="flex-1 items-center justify-center">
          <ThemedText className="font-oregular text-md md:text-base text-gray-600">
            Tidak ada produk ditemukan
          </ThemedText>
        </View>
      )}
      <FlatList
        data={data.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={(item) => item.productId.toString()}
        renderItem={({ item }) => (
          <ListOfProduct
            item={item}
            onDelete={() => {
              handleDeleteProduct(item.productId);
            }}
          />
        )}
      />
      {/* <Link
        href={{
          pathname: "/admin/add-edit",
          params: { type: "product", mode: "add" },
        }}
        asChild
      >
        <TouchableOpacity className="absolute bottom-10 right-5">
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
      </Link> */}
      <ModalConfirmation
        title="Hapus Produk"
        message="Apakah Anda yakin ingin menghapus produk ini?"
        onConfirm={confirmDeleteProduct}
        setShowAlert={setShowAlert}
        showAlert={showAlert}
      />
    </SafeAreaView>
  );
};

export default ProductListScreen;
