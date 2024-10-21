import { StyleSheet, useWindowDimensions } from "react-native";
import { TextInput } from "react-native-paper";

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

const CustomInput = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
}: Props) => {
  const { width: screenWidth } = useWindowDimensions();

  const dynamicStyles = StyleSheet.create({
    input: {
      width: screenWidth >= 500 && screenWidth < 1200 ? "90%" : "100%",
      fontSize: screenWidth >= 500 && screenWidth < 1200 ? 24 : 14,
      marginBottom: 15,
    },
    button: {
      backgroundColor: "#23ACE3",
      padding: 15,
      borderRadius: 10,
      width: screenWidth >= 500 && screenWidth < 1200 ? "90%" : "100%",
      alignItems: "center",
      marginVertical: 15,
    },
    buttonText: {
      color: "#fff",
      fontSize: screenWidth >= 500 && screenWidth < 1200 ? 24 : 16,
      fontWeight: "600",
    },
  });

  return (
    <TextInput
      className="font-oregular"
      label={label}
      mode="outlined"
      style={dynamicStyles.input}
      outlineColor="#23ACE3"
      activeOutlineColor="#23ACE3"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default CustomInput;
