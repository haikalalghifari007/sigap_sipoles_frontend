import React, { useEffect, useState } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { ThemedText } from "@/components/ThemedText";
import { refresh } from "@/services/auth";

export default function Index() {
  const [showHomeScreen, setShowHomeScreen] = useState(false);
  const opacity = useSharedValue(0);
  const [loading, setLoading] = useState(true);

  const handleRefresh = async () => {
    setLoading(true);
    await refresh();
    setLoading(false);
  };

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 2000 });
    const timer = setTimeout(() => {
      setShowHomeScreen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    if (showHomeScreen && loading) {
      handleRefresh();
    }
  }, [showHomeScreen, loading]);

  if (!showHomeScreen) {
    return (
      <View className="flex-1 justify-center items-center bg-originblue">
        <Animated.Image
          source={require("../assets/images/splashwika.png")}
          style={[animatedStyle]}
          className="w-60 h-60"
          resizeMode="contain"
        />
        <View className="flex-row mx-5 space-x-3 absolute bottom-10">
          <Image
            source={require("../assets/images/wikalogowhite.png")}
            className="w-12 h-12"
            resizeMode="contain"
          />
          <ThemedText className="text-white font-oregular text-xs flex-1">
            PT Wijaya Karya Tbk (WIKA) berizin dan diawasi oleh Kementerian PUPR
            serta mengikuti regulasi yang ditetapkan oleh BUMN untuk memastikan
            standar kualitas dan kepatuhan.
          </ThemedText>
        </View>
      </View>
    );
  } else if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-originblue">
        <ActivityIndicator color={"white"} size={"large"} />
      </View>
    );
  }
}
