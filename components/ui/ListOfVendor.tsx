import { Vendor } from "@/models/Vendor";
import { useContext } from "react";
import {
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { ThemeContext } from "../ThemeContext";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { ThemedText } from "../ThemedText";
import { Ionicons } from "@expo/vector-icons";
import formatDate from "@/helper/formatDate";

interface ListOfVendorProps {
  item: Vendor;
}

const screenWidth = Dimensions.get("window").width;
const isTablet = screenWidth >= 768;

const ListOfVendor = ({ item }: ListOfVendorProps) => {
  const { theme } = useContext(ThemeContext);
  const cardBackgroundColor =
    theme === "dark" ? Colors.dark.card : Colors.light.card;
  const outlineColor =
    theme === "dark" ? Colors.dark.outline : Colors.light.outline;
  const backgroundColor =
    theme === "dark" ? Colors.dark.background : Colors.light.background;
  return (
    <Link
      href={{
        pathname: "/admin/vendor-list/[id]",
        params: { id: item.vendorId, name: item.name },
      }}
      asChild
    >
      <TouchableOpacity>
        <View style={[styles.orderCard, { backgroundColor: backgroundColor }]}>
          <View
            style={[
              styles.statusIndicator,
              { backgroundColor: cardBackgroundColor },
            ]}
          >
            <Image
              className="w-20 h-20 md:w-28 md:h-28 rounded-lg"
              source={{
                uri: item.logo,
              }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.orderDetails}>
            <ThemedText className="font-omedium text-lg md:text-xl">
              {item.name}
            </ThemedText>
            <ThemedText
              className="font-oregular text-base md:text-lg"
              style={styles.description}
            >
              {item.location}
            </ThemedText>
            <View style={styles.statusContainer}>
              <View
                style={[{ backgroundColor: outlineColor }]}
                className="mt-2 rounded-md"
              >
                <Link
                  href={{
                    pathname: "/admin/form-vendor",
                    params: {
                      id: item.vendorId,
                      name: item.name,
                      location: item.location,
                      phone: item.phone,
                      personInCharge: item.personInCharge,
                      email: item.email,
                    },
                  }}
                  asChild
                >
                  <TouchableOpacity className="flex flex-row space-x-1 items-center p-1">
                    <ThemedText className="font-oregular text-xs md:text-base text-[#FAC441]">
                      Edit Vendor
                    </ThemedText>
                    <Ionicons
                      name="create-outline"
                      size={16}
                      color={"#FAC441"}
                    />
                  </TouchableOpacity>
                </Link>
              </View>
              <ThemedText
                className="font-olight text-xs md:text-base"
                style={styles.orderId}
              >
                Dibuat Pada {formatDate(item.createdAt)}
              </ThemedText>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
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
    alignItems: "center",
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: "600",
    marginBottom: 15,
    color: "#FAC441",
  },
  orderId: {
    marginTop: 10,
    color: "#999",
  },
});

export default ListOfVendor;
