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
import { Account, ManageAccountRes } from "@/models/Account";
import {
  confirmRequest,
  deleteAccount,
  FormDeleteAcc,
  FormReqAcc,
  getAllAcounts,
  initFormDeleteAcc,
  initFormReqAcc,
} from "@/services/admin/manage";
import Toast from "react-native-toast-message";
import ModalConfirmation from "@/components/ui/ModalConfirmation";

const AccountListScreen = () => {
  const { theme } = useContext(ThemeContext);
  const backgroundColor =
    theme === "dark" ? Colors.dark.background : Colors.light.background;
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "All", title: "Semua" },
    { key: "Requests", title: "Permintaan Akun" },
    { key: "Admin", title: "Admin" },
    { key: "Employees", title: "Pegawai" },
    { key: "Vendor", title: "Vendor" },
    { key: "Drivers", title: "Pengemudi" },
    { key: "Installers", title: "Pemasang" },
  ]);

  const [data, setData] = useState<ManageAccountRes>();

  const TabRoutes = {
    All: () => <AccountList filter="ALL" data={data} refetch={fetchData} />,
    Requests: () => (
      <AccountList filter="REQUESTS" data={data} refetch={fetchData} />
    ),
    Admin: () => (
      <AccountList filter="ADMINS" data={data} refetch={fetchData} />
    ),
    Vendor: () => (
      <AccountList filter="VENDORS" data={data} refetch={fetchData} />
    ),
    Employees: () => (
      <AccountList filter="EMPLOYEES" data={data} refetch={fetchData} />
    ),
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
    const res = await getAllAcounts();
    setData(res);
    setLoading(false);
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
  data?: ManageAccountRes;
  refetch?: () => void;
}) => {
  const { theme } = useContext(ThemeContext);
  const outlineColor =
    theme === "dark" ? Colors.dark.outline : Colors.light.outline;
  const backgroundColor =
    theme === "dark" ? Colors.dark.background : Colors.light.background;
  const textColor = theme === "dark" ? Colors.dark.text : Colors.light.text;

  const [filteredAccounts, setFilteredAccounts] = useState<Account<any>[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    let filteredData: Account<any>[] = [];
    if (data) {
      if (filter === "ALL") {
        filteredData = data.data.alls.filter((account) =>
          account.name.toLowerCase().includes(search.toLowerCase())
        );
      } else if (filter === "REQUESTS") {
        filteredData = data.data.requests.filter((account) =>
          account.name.toLowerCase().includes(search.toLowerCase())
        );
      } else if (filter === "ADMINS") {
        filteredData = data.data.admins.filter((account) =>
          account.name.toLowerCase().includes(search.toLowerCase())
        );
      } else if (filter === "EMPLOYEES") {
        filteredData = data.data.employees.filter((account) =>
          account.name.toLowerCase().includes(search.toLowerCase())
        );
      } else if (filter === "DRIVERS") {
        filteredData = data.data.drivers.filter((account) =>
          account.name.toLowerCase().includes(search.toLowerCase())
        );
      } else if (filter === "INSTALLERS") {
        filteredData = data.data.installers.filter((account) =>
          account.name.toLowerCase().includes(search.toLowerCase())
        );
      } else if (filter === "VENDORS") {
        filteredData = data.data.vendors.filter((account) =>
          account.name.toLowerCase().includes(search.toLowerCase())
        );
      }
    }
    setFilteredAccounts(filteredData);
  }, [data, filter, search]);

  const [confirmDel, setConfirmDel] = useState(false);
  const [selectedDel, setSelectedDel] =
    useState<FormDeleteAcc>(initFormDeleteAcc);

  const [confirmReq, setConfirmReq] = useState(false);
  const [selectedReq, setSelectedReq] = useState<FormReqAcc>(initFormReqAcc);

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

  const handleReqAccount = (params: FormReqAcc) => {
    setSelectedReq(params);
    setConfirmReq(true);
  };

  const confirmReqAccount = async () => {
    try {
      setLoading(true);
      await confirmRequest(selectedReq);
      refetch && refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setConfirmReq(false);
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
        {filteredAccounts.length === 0 && (
          <View className="flex-1 items-center justify-center">
            <ThemedText className="font-oregular text-md md:text-base text-gray-600">
              Tidak ada akun ditemukan
            </ThemedText>
          </View>
        )}
        <FlatList
          data={filteredAccounts}
          keyExtractor={(item) => item.id.toString() + "#" + item.type}
          renderItem={({ item }) => (
            <ListOfAccount
              item={item}
              onDelete={(params) => handleDelAcc(params)}
              onApprove={(item) => {
                handleReqAccount(item);
              }}
              onReject={(item) => {
                handleReqAccount(item);
              }}
            />
          )}
        />

        <ModalConfirmation
          title="Hapus Akun"
          message="Apakah Anda yakin ingin menghapus akun ini?"
          onConfirm={() => {
            loading ? null : confirmDelAcc();
          }}
          setShowAlert={setConfirmDel}
          showAlert={confirmDel}
        />

        <ModalConfirmation
          title="Verifikasi Pembuatan Akun"
          message={` Apakah anda yakin ingin{" "}
                ${selectedReq.isConfirmed ? "menyetujui" : "menolak"} permintaan
                ini?`}
          onConfirm={() => {
            loading ? null : confirmReqAccount();
          }}
          setShowAlert={setConfirmReq}
          showAlert={confirmReq}
          confirmText={loading ? "Loading..." : "Ya"}
        />
      </SafeAreaView>
      <Toast />
    </>
  );
};

export default AccountListScreen;
