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
import GraphView from "@/components/GraphView";

const ViewTickers = () => {
  const router = useRouter();

  const { allTickets, setallTickets } = useAppContext();

  const [activeTab, setActiveTab] = React.useState("tickets");

  const TicketComponent = ({ data }) => {
    console.log(data);
    const passPercentage = data?.data?.pass_percentage || 0;
    const isPassed = passPercentage >= 70;
    const createdDate = data?.createdAt
      ? new Date(data.createdAt).toLocaleDateString()
      : "Date not available";

    return (
      <View className="p-4 border border-gray-400 mx-3 rounded-xl mt-10">
        <View className="flex-row justify-between items-center">
          <CustomText className="font-poppins-semibold text-lg">
            <View className="h-5 w-5 bg-blue-200 rounded-full mr-2" />{" "}
            {data?.ticketName}
          </CustomText>
          <CustomText className="text-sm text-gray-500">
            {createdDate}
          </CustomText>
        </View>
        <CustomText className="text-lg mt-3">
          {data?.ticketDescription}
        </CustomText>
        <View className="flex-row justify-between items-center mt-4">
          <CustomButton
            onPress={() =>
              router.push({
                pathname: "/screens/view-report",
                params: {
                  ticketName: data?.ticketName,
                  ticketDescription: data?.ticketDescription,
                  ticketSummary: JSON.stringify(data?.data?.summary),
                  ticketTranscript: JSON.stringify(data?.data?.transcript),
                  ticketPassPercentage: data?.data?.pass_percentage,
                },
              })
            }
            buttonText={"View Report"}
            additionalClassName="max-w-[150px] flex-1"
          />
          <CustomText
            className={`mt-10 font-poppins-semibold ${
              isPassed ? "text-green-500" : "text-red-500"
            }`}
          >
            Pass Percentage: {data?.data?.pass_percentage}
          </CustomText>
        </View>
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

      <View
        style={{
          flexDirection: "row",
          padding: 8,
          backgroundColor: "#e0e0e0",
          borderRadius: 50,
          marginHorizontal: 20,
          marginTop: 16,
          marginBottom: 16,
        }}
      >
        <TouchableOpacity
          className="p-2"
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
            backgroundColor: activeTab === "tickets" ? "white" : "transparent",
          }}
          onPress={() => setActiveTab("tickets")}
        >
          <CustomText
            style={{
              textAlign: "center",
              fontSize: 16,
              fontFamily: "Poppins-Bold",
              color: activeTab === "tickets" ? "black" : "#666666",
            }}
          >
            Your Tickets
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
            backgroundColor: activeTab === "graph" ? "white" : "transparent",
          }}
          onPress={() => setActiveTab("graph")}
        >
          <CustomText
            style={{
              textAlign: "center",
              fontSize: 16,
              fontFamily: "Poppins-Bold",
              color: activeTab === "graph" ? "black" : "#666666",
            }}
          >
            Graph
          </CustomText>
        </TouchableOpacity>
      </View>

      {activeTab === "tickets" ? (
        <ScrollView className="mt-5 gap-y-5">
          {allTickets.map((ticket: any) => (
            <TicketComponent key={ticket} data={ticket} />
          ))}
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <GraphView data={allTickets} />
        </View>
      )}

      <StatusBar />
    </SafeAreaView>
  );
};

export default ViewTickers;

const styles = StyleSheet.create({});
