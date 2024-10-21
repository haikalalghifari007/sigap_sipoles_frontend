import React, { useContext, useState } from "react";
import { View, TextInput, Dimensions, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "./ThemeContext";

const screenWidth = Dimensions.get("window").width;

const isTablet = screenWidth >= 768;

const isIOS = Platform.OS === "ios";

interface SearchFieldProps {
  placeholder?: string;
  value?: string;
  onTextChange?: (text: string) => void;
}
const SearchField = ({
  placeholder,
  value,
  onTextChange,
}: SearchFieldProps) => {
  const { theme } = useContext(ThemeContext);
  const textSearchColor =
    theme === "dark" ? Colors.dark.text : Colors.light.text;
  const outlineColor =
    theme === "dark" ? Colors.dark.outline : Colors.light.outline;
  const placeholderColor = "#838383FF";
  return (
    <View
      className="flex-row items-center border space-x-1 rounded-lg m-3 md:mx-10 px-3 md:px-5 py-1 md:py-2"
      style={{ borderColor: outlineColor }}
    >
      <Ionicons name="search-outline" size={24} color={placeholderColor} />
      <TextInput
        style={{ flex: 1, marginTop: isIOS ? -4 : 0, color: textSearchColor }}
        className="text-base md:text-lg py-2 font-olight"
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        value={value}
        onChangeText={onTextChange}
      />
    </View>
  );
};

export default SearchField;
