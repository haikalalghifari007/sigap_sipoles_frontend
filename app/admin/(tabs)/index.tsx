import {
  View,
  Pressable,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Image, Platform } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { useColorScheme } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { images } from "@/constants/images";
import { Href, Link, LinkProps, useFocusEffect } from "expo-router";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/components/ThemeContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { LineGraph } from "@/components/LineGraph";
import { Admin, initAdmin } from "@/models/Admin";
import greet from "@/helper/greet";
import { profile } from "@/services/admin/info";

const screenWidth = Dimensions.get("window").width;

const isTablet = screenWidth >= 768;

const dataFeatures = [
  {
    text: "Account\nList",
    image: require("../../../assets/images/maccount.png"), // Update with actual path
    color: Colors.colorful.bluetr, // 15% Blue transparency
    link: "/admin/account-list",
  },
  {
    text: "Order\nList",
    image: require("../../../assets/images/morder.png"), // Update with actual path
    color: Colors.colorful.yellowtr,
    link: "/admin/order-list", // 15% Orange transparency
  },
  {
    text: "Vendor\nList",
    image: require("../../../assets/images/mpayment.png"), // Update with actual path
    color: Colors.colorful.redtr, // 15% Pink transparency
    link: "/admin/vendor-list",
  },
  {
    text: "Product\nList",
    image: require("../../../assets/images/mproduct.png"), // Update with actual path
    color: Colors.colorful.purpletr, // 15% Purple transparency
    link: "/admin/product-list",
  },
];

const HomeScreen = () => {
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState<Admin>(initAdmin);

  useEffect(() => {
    profile().then((res) => {      
      if (res) {
        setData(res);
      }
    });
  }, []);

  const backgroundColor =
    theme === "dark" ? Colors.dark.background : Colors.light.background;
  const cardBackgroundColor =
    theme === "dark" ? Colors.dark.card : Colors.light.card; 
  const dropBackgroundColor =
    theme === "dark" ? Colors.dark.outline : Colors.light.outline; 
  const seperateColor = theme === "dark" ? "#FFFFFF" : "#000000"; 
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ScrollView style={{ minHeight: Dimensions.get("window").height }}>
        <View className="my-3  space-y-2">
          <View className="   px-5 md:px-12 justify-between items-start flex-row mb-6">
            <View>
              <ThemedText className="text-xl md:text-2xl font-olight">
                {greet},
              </ThemedText>
              <ThemedText className="text-2xl md:text-3xl font-osemibold">
                {data.name}
              </ThemedText>
            </View>
            <View className="mt-1.5">
              <Image
                source={images.personimage}
                className="w-12 h-12 md:w-16 md:h-16"
              />
            </View>
          </View>

          <View
            className="mx-5 md:mx-12 my-2 px-8 md:px-14 py-3 space-y-3"
            style={[
              {
                backgroundColor: cardBackgroundColor,
                borderRadius: 30,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 4,
              },
            ]}
          >
            <View className="space-x-2 flex-row items-center">
              <Image
                source={require("../../../assets/images/overview.png")}
                className="w-10 h-10 md:w-16 md:h-16"
                resizeMode="contain"
              />
              <ThemedText className="text-xl md:text-3xl font-osemibold">
                Overview
              </ThemedText>
            </View>

            <View className="space-x-2 flex-row">
              <View
                className="  p-1 "
                style={[
                  {
                    backgroundColor: dropBackgroundColor,
                    borderRadius: 10,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.07,
                    shadowRadius: 4,
                    elevation: 4,
                  },
                ]}
              >
                <ThemedText className="px-3 text-xs md:text-lg font-oregular text-originblue">
                  Monthly
                </ThemedText>
              </View>
              <View
                className="  p-1 "
                style={[
                  {
                    backgroundColor: dropBackgroundColor,
                    borderRadius: 10,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.07,
                    shadowRadius: 4,
                    elevation: 4,
                  },
                ]}
              >
                <ThemedText className="px-3 text-xs md:text-lg font-oregular text-originblue">
                  Download Report
                </ThemedText>
              </View>
            </View>

            <View className="flex-row justify-between">
              <View>
                <ThemedText className="text-xs md:text-lg font-oregular">
                  Total Order
                </ThemedText>
                <ThemedText className="text-lg md:text-2xl font-omedium text-center">
                  101
                </ThemedText>
              </View>

              <View
                className="rounded-full"
                style={[{ backgroundColor: seperateColor, width: 1 }]}
              />

              <View>
                <ThemedText className="text-xs md:text-lg font-oregular">
                  On-Going
                </ThemedText>
                <ThemedText className="text-lg md:text-2xl font-omedium text-center">
                  9
                </ThemedText>
              </View>

              <View
                className="rounded-full"
                style={[{ backgroundColor: seperateColor, width: 1 }]}
              />

              <View>
                <ThemedText className="text-xs md:text-lg font-oregular">
                  Complete
                </ThemedText>
                <ThemedText className="text-lg md:text-2xl font-omedium text-center">
                  91
                </ThemedText>
              </View>
            </View>
          </View>

          <ThemedText className="text-2xl md:text-3xl font-osemibold px-5 md:px-12">
            Income
          </ThemedText>

          <View className="mx-5 md:mx-12 flex-row justify-between">
            <View
              className=" my-2 py-4 space-y-2 items-center"
              style={[
                {
                  width: "48%",
                  backgroundColor: cardBackgroundColor,
                  borderRadius: 15,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.07,
                  shadowRadius: 4,
                  elevation: 4,
                },
              ]}
            >
              <View className="flex-row px-2">
                <Image
                  source={require("../../../assets/images/restimate.png")}
                  className="w-5 h-5 md:w-8 md:h-8"
                />
                <ThemedText className="px-2 text-sm md:text-lg font-oregular text-gray-400 ">
                  Estimated Revenue
                </ThemedText>
              </View>
              <ThemedText className="px-2 text-base md:text-xl text-center font-omedium ">
                Rp 1.024.490.000,-
              </ThemedText>
            </View>

            <Link href="/admin/documentrecap" asChild>
              <TouchableOpacity style={{ width: "48%" }}>
                <View
                  className="px-1 my-2 py-4 space-y-2 items-center"
                  style={[
                    {
                      backgroundColor: cardBackgroundColor,
                      borderRadius: 15,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.07,
                      shadowRadius: 4,
                      elevation: 4,
                    },
                  ]}
                >
                  <View className="flex-row px-2">
                    <Image
                      source={require("../../../assets/images/document.png")}
                      className="w-5 h-5 md:w-8 md:h-8"
                    />
                    <ThemedText className="px-1 text-sm md:text-lg font-omedium  ">
                      Dokumen Lampau
                    </ThemedText>
                  </View>
                  <ThemedText className="px-1 text-xs md:text-base font-oregular text-center text-gray-400 ">
                    Telusuri semua dokumen KR
                  </ThemedText>
                  <View
                    className="rounded-full mb-2 bg-gray-400"
                    style={[{ flex: 1, height: 1, width: "90%" }]}
                  />
                  <View className="flex-row item-center align-middle right-1 absolute bottom-1 ">
                    <ThemedText className=" text-xs md:text-base  font-oregular ">
                      Lihat Detail
                    </ThemedText>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={14}
                      color={seperateColor}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          </View>
          {/* end of income*/}

          <View className=" py-3 md:py-8 space-y-2 rounded-3xl shadow mx-5 md:mx-12 bg-redalert">
            <View className="flex-row px-7 md:px-20 items-center">
              <Image
                source={require("../../../assets/images/issues.png")}
                className="w-10 h-10 md:w-16 md:h-16"
              />
              <ThemedText className="px-2 md:px-4 text-xl md:text-3xl font-omedium text-white ">
                Order Issues
              </ThemedText>
            </View>
            <ThemedText className="px-1 text-center font-olight text-white text-xs md:text-lg">
              The latest monitoring shows that there are delays in 0 orders.
            </ThemedText>
          </View>

          <ThemedText className="text-2xl md:text-3xl font-osemibold px-5 md:px-12">
            Main Features
          </ThemedText>

          <GestureHandlerRootView>
            <FlatList
              horizontal={true}
              centerContent={true}
              style={{ paddingVertical: 5 }}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: isTablet ? 50 : 20,
                paddingHorizontal: 20,
              }}
              data={dataFeatures}
              keyExtractor={(item, idx) => item.text + idx}
              renderItem={({ item }) => (
                <View style={{ alignItems: "center" }}>
                  <Link href={item.link as Href} asChild>
                    <TouchableOpacity
                      className="w-20 h-20 md:w-32 md:h-32"
                      style={{
                        justifyContent: "center",
                        alignItems: "center",

                        backgroundColor: item.color,
                        borderRadius: 20,
                        padding: 10,
                      }}
                    >
                      <Image
                        className="w-10 h-10 md:w-20 md:h-20"
                        source={item.image}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </Link>
                  <ThemedText className="font-omedium text-center text-xs md:text-lg">
                    {item.text}
                  </ThemedText>
                </View>
              )}
            />
          </GestureHandlerRootView>
        </View>
        <View className="h-40" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
