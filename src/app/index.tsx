import CustomText from "@/ui/CustomText";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View, Animated, TouchableOpacity } from "react-native";

export default function Page() {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const router = useRouter();

  return (
    <View className="flex flex-1 justify-center items-center">
      <Animated.View style={{ opacity: fadeAnim }}>
        <CustomText className="font-poppins-bold text-3xl text-center">
          be a part of finance{"\n"}revolutionary
        </CustomText>
        <TouchableOpacity
          onPress={() => router.push("screens/view-tickets")}
          className="p-4 rounded-full bg-black mt-10 "
        >
          <CustomText className="text-white text-center text-xl font-poppins-semibold">
            Get Started
          </CustomText>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
