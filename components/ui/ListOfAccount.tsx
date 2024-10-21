import { useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { ThemeContext } from "../ThemeContext";
import { Colors } from "@/constants/Colors";
import { Account, ManageAccountRes } from "@/models/Account";
import { ThemedText } from "../ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { FormDeleteAcc, FormReqAcc } from "@/services/admin/manage";
import { Text } from "react-native-paper";
import formatDate from "@/helper/formatDate";

const isTablet = Dimensions.get("window").width >= 768;

interface Props {
  item: Account<"">;
  onDelete?: (params: FormDeleteAcc) => void;
  onReject?: (params: FormReqAcc) => void;
  onApprove?: (params: FormReqAcc) => void;
}

const ListOfAccount = ({ item, onDelete, onReject, onApprove }: Props) => {
  const { theme } = useContext(ThemeContext);
  const outlineColor =
    theme === "dark" ? Colors.dark.outline : Colors.light.outline;
  const backgroundColor =
    theme === "dark" ? Colors.dark.background : Colors.light.background;

  const isRequest = item.type.includes("REQUEST");

  const accountType = (type: string) => {
    switch (type) {
      case "ADMIN":
        return "Admin";
      case "DRIVER":
        return "Pengemudi";
      case "INSTALLER":
        return "Pemasang";
      case "VENDOR":
        return "Vendor";
      case "EMPLOYEE":
        return "Pegawai";
      case "REQUEST_DRIVER":
        return "Permintaan Akun Pengemudi";
      case "REQUEST_INSTALLER":
        return "Permintaan Akun Pemasang";
      case "REQUEST_EMPLOYEE":
        return "Permintaan Akun Pegawai";
      default:
        return "User";
    }
  };

  return (
    <View style={[styles.orderCard, { backgroundColor: backgroundColor }]}>
      <View style={styles.statusIndicator}>
        <Image
          className="w-20 h-20 md:w-28 md:h-28 rounded-lg"
          source={
            item.picture
              ? { uri: item.picture }
              : require("../../assets/images/avatar.png")
          }
          resizeMode="contain"
        />
      </View>
      <View style={styles.orderDetails}>
        <ThemedText
          className="font-omedium text-xl md:text-2xl"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.name}
        </ThemedText>
        <ThemedText
          className="font-oregular text-md md:text-xl"
          style={styles.description}
        >
          {accountType(item.type)}
        </ThemedText>
        <View style={styles.statusContainer}>
          {isRequest ? (
            <>
              <View className="flex-row w-full">
                <Text
                  className="font-olight text-xs md:text-base"
                  style={styles.orderId}
                >
                  Dibuat pada {formatDate(item.createdAt)}
                </Text>
                <View className="flex-row flex-1 space-x-2 md:space-x-11 justify-end">
                  <TouchableOpacity
                    onPress={() =>
                      onReject &&
                      onReject({
                        id: item.id,
                        type: item.type,
                        isConfirmed: false,
                      })
                    }
                  >
                    <View className="bg-redalert rounded-lg p-1">
                      <Ionicons
                        name="close"
                        size={isTablet ? 35 : 24}
                        color={"#FFFFFF"}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      onApprove &&
                      onApprove({
                        id: item.id,
                        type: item.type,
                        isConfirmed: true,
                      })
                    }
                  >
                    <View className="bg-[#21D475] rounded-lg p-1">
                      <Ionicons
                        name="checkmark"
                        size={isTablet ? 35 : 24}
                        color={"#FFFFFF"}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <>
              {item.type !== "ADMIN" ? (
                <TouchableOpacity
                  style={[{ backgroundColor: outlineColor }]}
                  className="flex flex-row space-x-1 items-center py-1 px-2 rounded-md"
                  onPress={() =>
                    onDelete && onDelete({ id: item.id, type: item.type })
                  }
                >
                  <ThemedText className="font-oregular text-xs md:text-base text-redalert">
                    Hapus Akun
                  </ThemedText>
                  <Ionicons name="trash" color="#ef4444" />
                </TouchableOpacity>
              ) : (
                <Text> </Text>
              )}
              <ThemedText
                className="font-olight text-xs md:text-base"
                style={styles.orderId}
              >
                Terdaftar {formatDate(item.createdAt)}
              </ThemedText>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    marginHorizontal: isTablet ? 40 : 15,
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.light.background,
  },
  orderCard: {
    flexDirection: "row",
    marginHorizontal: isTablet ? 40 : 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
  },
  statusIndicator: {
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 10,
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
    paddingTop: 10,
    borderRadius: 10,
  },
  statusText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: "600",
    marginBottom: 15,
    color: "#FC366B",
    borderRadius: 10,
  },
  orderId: {
    marginTop: 10,
    color: "#999",
  },
});

export default ListOfAccount;
