import { ThemeContext } from "../ThemeContext";
import { Colors } from "react-native/Libraries/NewAppScreen";
import React, { useContext } from "react";
import { KeyboardTypeOptions, Text } from "react-native";
import { TextInput } from "react-native-paper";
interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  rows?: number;
  isHalf?: boolean;
}

const FormInput = ({
  label,
  value,
  onChangeText,
  keyboardType = "default",
  secureTextEntry = false,
  rows = 1,
  isHalf,
}: Props) => {
  const { theme } = useContext(ThemeContext);
  const backgroundColor =
    theme === "dark" ? Colors.dark.background : Colors.light.background;
  const textSearchColor =
    theme === "dark" ? Colors.dark.text : Colors.light.text;

  return (
    <TextInput
      className={isHalf ? "w-[48%]" : "w-full"}
      label={<Text style={{ fontFamily: "Outfit-Regular" }}>{label}</Text>}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      mode="outlined"
      secureTextEntry={secureTextEntry}
      multiline={rows > 1}
      numberOfLines={rows}
      style={{
        backgroundColor: "transparent",
        fontFamily: "Outfit-Regular",
        fontSize: 16,
        marginVertical: 10,
      }}
      contentStyle={{
        fontFamily: "Outfit-Regular",
        color: textSearchColor,
      }}
      theme={{
        colors: {
          placeholder: "#aaa",
          primary: "#23ACE3",
          background: backgroundColor,
        },
        roundness: 10,
        fonts: {
          regular: {
            fontFamily: "Outfit-Regular",
          },
        },
      }}
    />
  );
};

export default FormInput;
