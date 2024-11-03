import React from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { PieChart, BarChart, LineChart } from "react-native-chart-kit";
import CustomText from "@/ui/CustomText";

const screenWidth = Dimensions.get("window").width;

const GraphView = ({ data }) => {
  // Extract tone data from first ticket's tone analysis
  const toneAnalysis = data[0]?.data?.summary?.tone_analysis || "";
  const toneData = [
    { label: "Anxiety", value: toneAnalysis.includes("anxiety") ? 8 : 3 },
    { label: "Optimism", value: toneAnalysis.includes("optimism") ? 7 : 4 },
    { label: "Empathy", value: toneAnalysis.includes("empathy") ? 9 : 5 },
  ];

  const radarData = {
    labels: ["Reassurance", "Concerns", "Decision-Making", "Market Guidance"],
    datasets: [
      {
        data: [8, 6, 7, 5], // Adviser scores for each label
      },
      {
        data: [6, 8, 5, 7], // Customer scores for each label
      },
    ],
  };

  // Extract voice biometrics data
  const voiceBiometricsData = [
    {
      x: "Start",
      y: data[0]?.data?.summary?.voice_biometrics?.stress_detected ? 8 : 3,
    },
    { x: "Middle", y: 5 },
    { x: "End", y: 4 },
  ];

  // Calculate bias data dynamically based on the provided data array
  const biasDetectorData = data.map((item) => item.data.summary.bias_detector);
  const biasCounts = biasDetectorData.reduce((acc, bias) => {
    const biasName = bias?.customer_bias || "Other Biases";
    acc[biasName] = (acc[biasName] || 0) + 1;
    return acc;
  }, {});

  const biasData = Object.entries(biasCounts).map(([name, count], index) => ({
    name,
    population: count,
    color: index % 2 === 0 ? "blue" : "green", // Alternate colors for clarity
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
  }));

  // Calculate winning data based on provided data
  const advisorWins = data.filter(
    (item) => item.data.summary.favorable_to === "advisor"
  ).length;
  const customerWins = data.length - advisorWins;
  const winningData = [
    {
      name: "Advisor Won",
      population: advisorWins,
      color: "#FF9933",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Customer Won",
      population: customerWins,
      color: "#4B0082",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
  ];

  // Check if advisor passed
  const isPassed = data[0]?.data?.pass_fail_rating;

  return (
    <ScrollView className="flex-1 p-2.5">
      {/* Customer vs Advisor Winning Chart */}
      <CustomText className="text-lg mb-2.5">Conversation Outcome</CustomText>
      <View className="mb-5">
        <PieChart
          data={winningData}
          width={screenWidth - 20}
          height={220}
          chartConfig={{
            backgroundColor: "#e0e0e0",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          style={{ marginVertical: 8 }}
        />
      </View>

      {/* Tone Analysis Bar Chart */}
      <CustomText className="text-lg mb-2.5">Tone Analysis</CustomText>
      <View className="mb-5">
        <BarChart
          data={{
            labels: toneData.map((item) => item.label),
            datasets: [{ data: toneData.map((item) => item.value) }],
          }}
          yAxisLabel=""
          yAxisSuffix=""
          width={screenWidth - 20}
          height={220}
          chartConfig={{
            backgroundColor: "#e0e0e0",
            backgroundGradientFrom: "#e0e0e0",
            backgroundGradientTo: "#ffffff",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={{ marginVertical: 8 }}
        />
      </View>

      {/* Voice Biometrics Line Chart */}
      <CustomText className="text-lg mb-2.5">Voice Biometrics</CustomText>
      <View className="mb-5">
        <LineChart
          data={{
            labels: voiceBiometricsData.map((item) => item.x),
            datasets: [{ data: voiceBiometricsData.map((item) => item.y) }],
          }}
          width={screenWidth - 20}
          height={220}
          chartConfig={{
            backgroundColor: "#e0e0e0",
            backgroundGradientFrom: "#e0e0e0",
            backgroundGradientTo: "#ffffff",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={{ marginVertical: 8 }}
        />
      </View>

      {/* Bias Detection Pie Chart */}
      <CustomText className="text-lg mb-2.5">Bias Detection</CustomText>
      <View className="mb-5">
        <PieChart
          data={biasData}
          width={screenWidth - 20}
          height={220}
          chartConfig={{
            backgroundColor: "#e0e0e0",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          style={{ marginVertical: 8 }}
        />
      </View>
    </ScrollView>
  );
};

export default GraphView;
