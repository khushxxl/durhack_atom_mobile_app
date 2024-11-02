import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import CustomText from "@/ui/CustomText";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CustomButton from "@/ui/CustomButton";
import { sampleTickets } from "utils/constants";

const ViewTickers = () => {
  const router = useRouter();

  const TicketComponent = ({ name, description }) => {
    return (
      <View className="p-4 border border-gray-400 mx-3 rounded-xl mt-10">
        <CustomText className="font-poppins-semibold text-lg">
          <View className="h-5 w-5 bg-blue-200 rounded-full mr-2" /> {name}
        </CustomText>
        <CustomText className="text-lg mt-3">{description}</CustomText>
        <CustomButton
          onPress={() => {}}
          buttonText="View Report"
          additionalClassName="max-w-[200px] text-sm rounded-lg p-3"
        />
      </View>
    );
  };

  return (
    <SafeAreaView className="flex flex-1">
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

      <ScrollView className="mt-5 gap-y-5">
        {sampleTickets.map((ticket) => (
          <TicketComponent
            key={ticket.id}
            name={ticket.name}
            description={ticket.description}
          />
        ))}
      </ScrollView>

      <StatusBar />
    </SafeAreaView>
  );
};

export default ViewTickers;

const styles = StyleSheet.create({});
