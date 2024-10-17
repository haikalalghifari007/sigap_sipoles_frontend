import React, { useContext, useState } from 'react';
import { View, TextInput, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { ThemeContext } from './ThemeContext';

const screenWidth = Dimensions.get('window').width;

// Define threshold for tablet size (768px as an example)
const isTablet = screenWidth >= 768;

const isIOS = Platform.OS === 'ios';

const SearchField = ({
  placeholder = '',
}) => {
  const [searchText, setSearchText] = useState('');
  const { theme } = useContext(ThemeContext); // Get theme from context
  const textSearchColor = theme === 'dark' ? Colors.dark.text : Colors.light.text; // Text color based on theme
  const outlineColor = theme === 'dark' ? Colors.dark.outline : Colors.light.outline; // Border color based on theme
  const placeholderColor = "#838383FF";
  return (
    <View 
      className="flex-row items-center border space-x-1 rounded-lg m-3 md:mx-10 px-3 md:px-5 py-1 md:py-2" 
      style={{ borderColor: outlineColor }}>
      
      {/* Search Icon */}
      <Ionicons name="search-outline" size={24} color={placeholderColor} />

      {/* Text Input */}
      <TextInput
        style={{ flex: 1, marginTop: isIOS ? -4 : 0, color: textSearchColor }}
        className="text-base md:text-lg py-2 font-olight"
        placeholder={placeholder}
        placeholderTextColor={placeholderColor} // Set placeholder color dynamically
        value={searchText}
        onChangeText={setSearchText}
      />
    </View>
  );
};

export default SearchField;
