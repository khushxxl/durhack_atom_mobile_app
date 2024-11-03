import CustomButton from "@/ui/CustomButton";
import CustomText from "@/ui/CustomText";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Animated,
  TouchableOpacity,
  StatusBar,
} from "react-native";

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
        <CustomText className="font-poppins-extrabold text-4xl text-center">
          fin-wise
        </CustomText>
        <CustomText className="font-poppins-bold text-3xl mt-5 text-center">
          be a part of finance{"\n"}revolutionary
        </CustomText>
        <CustomButton
          onPress={() => router.push("screens/view-tickets")}
          buttonText="Get Started"
        />
        <StatusBar barStyle="dark-content" />
      </Animated.View>
      <StatusBar barStyle="dark-content" />
    </View>
  );
}
