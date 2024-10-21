import React, { useContext, useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchField from "@/components/SearchField";
import { ThemeContext } from "@/components/ThemeContext";
import AwesomeAlert from "react-native-awesome-alerts";
import ListOfAccount from "@/components/ui/ListOfAccount";
import {
  deleteAccount,
  FormDeleteAcc,
  initFormDeleteAcc,
} from "@/services/admin/manage";
import Toast from "react-native-toast-message";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { DetailVendorRes } from "@/models/Vendor";
import { getDetailVendor } from "@/services/admin/vendor";
import { DetailUser } from "@/models/User";

const AccountListVendorScreen = () => {
  const { theme } = useContext(ThemeContext);
  const backgroundColor =
    theme === "dark" ? Colors.dark.background : Colors.light.background;
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "All", title: "Semua" },
    { key: "Drivers", title: "Pengemudi" },
    { key: "Installers", title: "Pemasang" },
  ]);

  const [data, setData] = useState<DetailVendorRes>();

  const { id, name } = useLocalSearchParams() as { id: string; name: string };

  useNavigation().setOptions({
    headerTitle: "Daftar Akun " + name || "Semua Akun",
  });

  const TabRoutes = {
    All: () => <AccountList filter="ALL" data={data} refetch={fetchData} />,
    Drivers: () => (
      <AccountList filter="DRIVERS" data={data} refetch={fetchData} />
    ),
    Installers: () => (
      <AccountList filter="INSTALLERS" data={data} refetch={fetchData} />
    ),
  };
  const renderScene = SceneMap(TabRoutes);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await getDetailVendor(id);
      setData(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator color={Colors.colorful.blue} size={"large"} />
      </View>
    );

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: 400 }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            scrollEnabled
            indicatorStyle={{ backgroundColor: Colors.colorful.blue }}
            style={{ backgroundColor }}
            tabStyle={{
              width: Math.min(Dimensions.get("window").width / 4.5),
              justifyContent: "center",
            }}
            labelStyle={{
              fontFamily: "Outfit-Semibold",
            }}
            renderLabel={({ route, focused }) => (
              <Text
                className={` flex-1 w-full font-osemibold text-sm md:text-base ${
                  focused ? "text-originblue" : "text-gray-500"
                }`}
              >
                {route.title}
              </Text>
            )}
          />
        )}
        sceneContainerStyle={{ backgroundColor }}
        style={{ marginTop: 0 }}
      />
    </View>
  );
};

const AccountList = ({
  filter,
  data,
  refetch,
}: {
  filter: string;
  data?: DetailVendorRes;
  refetch?: () => void;
}) => {
  const { theme } = useContext(ThemeContext);
  const outlineColor =
    theme === "dark" ? Colors.dark.outline : Colors.light.outline;
  const backgroundColor =
    theme === "dark" ? Colors.dark.background : Colors.light.background;
  const textColor = theme === "dark" ? Colors.dark.text : Colors.light.text;

  const [filteredData, setFilteredAccounts] = useState<DetailUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    let filteredData: DetailUser[] = [];
    if (data) {
      if (filter === "ALL") {
        filteredData = data.data.users.alls.filter((account) =>
          account.name.toLowerCase().includes(search.toLowerCase())
        );
      } else if (filter === "DRIVERS") {
        filteredData = data.data.users.drivers.filter((account) =>
          account.name.toLowerCase().includes(search.toLowerCase())
        );
      } else if (filter === "INSTALLERS") {
        filteredData = data.data.users.installers.filter((account) =>
          account.name.toLowerCase().includes(search.toLowerCase())
        );
      }
    }
    setFilteredAccounts(filteredData);
  }, [data, filter, search]);

  const [confirmDel, setConfirmDel] = useState(false);
  const [selectedDel, setSelectedDel] =
    useState<FormDeleteAcc>(initFormDeleteAcc);

  const handleDelAcc = (params: FormDeleteAcc) => {
    setSelectedDel(params);
    setConfirmDel(true);
  };

  const confirmDelAcc = async () => {
    try {
      setLoading(true);
      await deleteAccount(selectedDel);
      refetch && refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setConfirmDel(false);
      setLoading(false);
    }
  };  

  return (
    <>
      <SafeAreaView
        edges={["bottom", "left", "right"]}
        style={{ flex: 1, backgroundColor }}
      >
        <SearchField
          placeholder="Cari akun disini..."
          value={search}
          onTextChange={(text) => setSearch(text)}
        />
        {filteredData.length === 0 && (
          <View className="flex-1 items-center justify-center">
            <ThemedText className="font-oregular text-md md:text-base text-gray-600">
              Tidak ada akun ditemukan
            </ThemedText>
          </View>
        )}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.userId.toString()}
          renderItem={({ item }) => (
            <ListOfAccount
              item={{ ...item, type: item.role, id: item.userId }}
              onDelete={(params) => handleDelAcc(params)}
            />
          )}
        />

        <AwesomeAlert
          show={confirmDel}
          showProgress={false}
          contentContainerStyle={[
            { backgroundColor: backgroundColor, borderRadius: 20 },
          ]}
          customView={
            <View className="items-center">
              <View
                className="p-3 rounded-full"
                style={{ backgroundColor: Colors.colorful.redtr }}
              >
                <Image
                  source={require("@/assets/images/cautions.png")}
                  className="w-6 h-6"
                  resizeMode="contain"
                />
              </View>
              <ThemedText className="font-omedium text-lg md:text-xl my-2">
                Hapus Akun
              </ThemedText>
              <ThemedText className="font-oregular text-sm md:text-base text-gray-600">
                Apakah anda yakin ingin menghapus akun ini?
              </ThemedText>
              <ThemedText className="font-oregular text-sm md:text-base text-gray-600">
                Aksi ini tidak dapat dikembalikan
              </ThemedText>
            </View>
          }
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Tutup"
          cancelButtonTextStyle={{
            color: textColor,
            fontFamily: "Outfit-Regular",
            paddingHorizontal: 30,
            paddingVertical: 10,
          }}
          cancelButtonStyle={{
            backgroundColor: outlineColor,
            borderRadius: 10,
          }}
          confirmText={loading ? "Loading..." : "Hapus"}
          confirmButtonTextStyle={{
            fontFamily: "Outfit-Regular",
            paddingHorizontal: 30,
            paddingVertical: 10,
          }}
          confirmButtonStyle={{
            backgroundColor: Colors.colorful.red,
            borderRadius: 10,
          }}
          onCancelPressed={() => setConfirmDel(false)}
          onConfirmPressed={() => (loading ? null : confirmDelAcc())}
        />
      </SafeAreaView>
      <Toast />
    </>
  );
};

export default AccountListVendorScreen;
