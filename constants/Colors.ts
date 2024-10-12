/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { blue } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

const tintColorLight = '#23ACE3';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    detail: '#F8F9FD',
    outline: '#f0f0f0',
    card: '#FFFFFF',
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    detail: '#1C1C1E',
    outline: '#2b2b2b',
    card: '#121213FF',
    text: '#ECEDEE',
    background: '#080808FF',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  colorful: {
    blue: tintColorLight,
    red: '#FC366B',
    yellow: '#FAC441',
    purple: '#8153BC',
  },
};
