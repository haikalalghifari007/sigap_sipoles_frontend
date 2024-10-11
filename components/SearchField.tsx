import React, { useState } from 'react';
import { View, TextInput, useColorScheme, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWindowDimensions } from 'react-native';
import { Colors } from '@/constants/Colors';


const screenWidth = Dimensions.get('window').width;

// Define threshold for tablet size (768px as an example)
const isTablet = screenWidth >= 768;

const SearchField = ({
  placeholder = '',
}) => {
    const [searchText, setSearchText] = useState('');
  const colorScheme = useColorScheme(); // Get the current color scheme
    const textSearchBackgroundColor = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;// You can use this to detect screen size for conditional styles
    const outlineColor = colorScheme === 'dark' ? Colors.dark.outline : Colors.light.outline; // Card background color for dark mode 

  return (
    <View className={`flex-row items-center border space-x-1 rounded-lg m-3 md:mx-10 px-3 md:px-5 py-1 md:py-2`} style={{ borderColor: outlineColor }}>
            <Ionicons name="search-outline" size={24} color='#D1D1D1FF' />
                <TextInput
                    style={{ flex: 1, marginTop: isTablet? 0 : -4, color: textSearchBackgroundColor }}
                    className="text-base md:text-lg py-2 font-olight"
                    placeholder={placeholder}
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>
  );
};

export default SearchField;
