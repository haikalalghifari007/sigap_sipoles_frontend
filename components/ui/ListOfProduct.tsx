import React, { useContext } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";

import { Link, router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/components/ThemeContext";
import { Product } from "@/models/Product";

const screenWidth = Dimensions.get("window").width;
const isTablet = screenWidth >= 768;

interface Props {
  item: Product;
  onDelete: () => void;
}

const ListOfProduct = ({ item, onDelete }: Props) => {
  const { theme } = useContext(ThemeContext);
  const cardBackgroundColor =
    theme === "dark" ? Colors.dark.card : Colors.light.card;
  const outlineColor =
    theme === "dark" ? Colors.dark.outline : Colors.light.outline;
  const backgroundColor =
    theme === "dark" ? Colors.dark.background : Colors.light.background;

  return (
    <View style={[styles.orderCard, { backgroundColor: backgroundColor }]}>
      <View
        style={[
          styles.statusIndicator,
          { backgroundColor: cardBackgroundColor },
        ]}
      >
        <Image
          className="w-20 h-20 md:w-28 md:h-28 rounded-lg"
          source={
            item.image
              ? { uri: item.image }
              : require("../../assets/images/placeholder.jpg")
          }
          resizeMode="contain"
        />
      </View>
      <View style={styles.orderDetails}>
        <ThemedText className="font-omedium text-lg md:text-2xl">
          {item.name}
        </ThemedText>
        <ThemedText
          className="font-oregular text-base md:text-xl"
          style={styles.description}
        >
          Type {item.type}
        </ThemedText>
        <View style={styles.statusContainer}>
          <View
            style={[{ backgroundColor: outlineColor }]}
            className="rounded-md"
          >
            <TouchableOpacity
              className="flex flex-row space-x-1 items-center py-1 px-2"
              onPress={() => {
                router.push({
                  pathname: "/admin/form-product",
                  params: {
                    id: item.productId,
                    name: item.name,
                    type: item.type,
                    diameter: item.diameter,
                    height: item.height,
                    image: item.image,
                  },
                });
              }}
            >
              <ThemedText className="font-oregular text-xs md:text-base text-[#FAC441]">
                Edit Produk
              </ThemedText>
              <Ionicons name="create-outline" size={16} color={"#FAC441"} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[{ backgroundColor: outlineColor }]}
            className="flex flex-row space-x-1 ml-2 items-center py-1 px-2 rounded-md"
            onPress={onDelete}
          >
            <ThemedText className="font-oregular text-xs md:text-base text-redalert">
              Hapus Produk
            </ThemedText>
            <Ionicons name="trash-outline" size={16} color={"#Fc366b"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  orderCard: {
    flexDirection: "row",
    marginHorizontal: isTablet ? 40 : 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
  },
  statusIndicator: {
    justifyContent: "center",

    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderDetails: {
    marginLeft: 10,
    flex: 1,
  },
  description: {
    color: "#666",
  },
  statusContainer: {
    flexDirection: "row",
    borderRadius: 10,
    marginTop: 10,
  },
  editText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: "600",
    marginBottom: 15,
    color: "#FAC441",
  },

  deleteText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: "600",
    marginBottom: 15,
    color: "#FC366B",
  },

  orderId: {
    marginTop: 10,
    color: "#999",
  },
});

export default ListOfProduct;
