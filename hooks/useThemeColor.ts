import { useContext } from 'react';
import { ThemeContext } from '@/components/ThemeContext'; // Assuming you use a ThemeContext
import { Colors } from '@/constants/Colors';

// Define types for props and colorName
type ThemeColorProps = {
  light?: string;
  dark?: string;
};

export function useThemeColor(
  props: ThemeColorProps,
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  // Get the theme from the ThemeContext instead of the system color scheme
  const { theme } = useContext(ThemeContext);
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName]; // Ensure theme is 'light' or 'dark'
  }
}
