import CustomText from "@/ui/CustomText";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View, Animated } from "react-native";

export default function Page() {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View className="flex flex-1 justify-center items-center">
      <Animated.View style={{ opacity: fadeAnim }}>
        <CustomText className="font-poppins-bold text-3xl text-center">
          be a part of finance{"\n"}revolutionary
        </CustomText>
      </Animated.View>
    </View>
  );
}
