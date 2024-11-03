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
import { Link, useRouter } from "expo-router";
import CustomButton from "@/ui/CustomButton";
import { sampleTickets } from "utils/constants";
import { useAppContext } from "context/AppContext";

const ViewTickers = () => {
  const router = useRouter();

  const { allTickets, setallTickets } = useAppContext();

  const TicketComponent = ({ data }) => {
    console.log(data);
    return (
      <View className="p-4 border border-gray-400 mx-3 rounded-xl mt-10">
        <CustomText className="font-poppins-semibold text-lg">
          <View className="h-5 w-5 bg-blue-200 rounded-full mr-2" />{" "}
          {data?.ticketName}
        </CustomText>
        <CustomText className="text-lg mt-3">
          {data?.ticketDescription}
        </CustomText>
        <Link
          href={{
            pathname: "/screens/view-report",
            params: {
              ticketName: data?.ticketName,
              ticketDescription: data?.ticketDescription,
              ticketSummary: JSON.stringify(data?.data?.summary),
              ticketTranscript: JSON.stringify(data?.data?.transcript),
              ticketPassPercentage: data?.data?.pass_percentage,
            },
          }}
          className={` bg-black mt-10   max-w-[200px] text-sm rounded-lg p-3`}
        >
          <CustomText className="text-white text-center  font-poppins-semibold">
            View Report
          </CustomText>
        </Link>
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
        {allTickets.map((ticket: any) => (
          <TicketComponent key={ticket} data={ticket} />
        ))}
      </ScrollView>

      <StatusBar />
    </SafeAreaView>
  );
};

export default ViewTickers;

const styles = StyleSheet.create({});
