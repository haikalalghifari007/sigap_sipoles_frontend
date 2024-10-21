import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { View, Image } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

interface Props {
  onConfirm: () => void;
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  message?: string;
  confirmText?: string;
}

const ModalConfirmation = ({
  onConfirm,
  showAlert,
  setShowAlert,
  title = "Konfirmasi Aksi",
  message = "Apakah anda yakin ingin melanjutkan?",
  confirmText = "Ya",
}: Props) => {
  const { theme } = useContext(ThemeContext);
  const textSearchBackgroundColor =
    theme === "dark" ? Colors.dark.text : Colors.light.text;
  const outlineColor =
    theme === "dark" ? Colors.dark.outline : Colors.light.outline;
  const backgroundColor =
    theme === "dark" ? Colors.dark.background : Colors.light.background;
  return (
    <AwesomeAlert
      show={showAlert}
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
              source={require("../../assets/images/cautions.png")}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
          <ThemedText className="font-omedium text-lg md:text-xl my-2">
            {title}
          </ThemedText>
          <ThemedText className="font-oregular text-sm md:text-base text-gray-600">
            {message}
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
      cancelText="Batal"
      cancelButtonTextStyle={{
        color: textSearchBackgroundColor,
        fontFamily: "Outfit-Regular",
        paddingHorizontal: 30,
        paddingVertical: 10,
      }}
      cancelButtonStyle={{ backgroundColor: outlineColor, borderRadius: 10 }}
      confirmText={confirmText}
      confirmButtonTextStyle={{
        fontFamily: "Outfit-Regular",
        paddingHorizontal: 30,
        paddingVertical: 10,
      }}
      confirmButtonStyle={{
        backgroundColor: Colors.colorful.red,
        borderRadius: 10,
      }}
      onCancelPressed={() => setShowAlert(false)}
      onConfirmPressed={() => onConfirm()}
    />
  );
};

export default ModalConfirmation;
