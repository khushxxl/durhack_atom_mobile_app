import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import CustomText from "@/ui/CustomText";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ViewTickers = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="">
      <View className="mx-5 flex justify-between items-center flex-row">
        <CustomText className="font-poppins-semibold text-xl">
          Your Tickets
        </CustomText>
        <TouchableOpacity
          onPress={() => router.push("/screens/enter-ticket-details")}
        >
          <FontAwesome name="plus-circle" size={28} />
        </TouchableOpacity>
      </View>
      <StatusBar />
    </SafeAreaView>
  );
};

export default ViewTickers;

const styles = StyleSheet.create({});
