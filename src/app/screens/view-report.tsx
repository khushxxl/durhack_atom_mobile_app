import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import CustomText from "@/ui/CustomText";
import { useLocalSearchParams } from "expo-router";
import { Audio } from "expo-av";

const ViewReport = () => {
  const params = useLocalSearchParams();
  const ticketData = {
    ticketDescription: params.ticketDescription,
    ticketSummary: JSON.parse(params.ticketSummary as string),
    ticketTranscript: JSON.parse(params.ticketTranscript as string),
    ticketPassPercentage: params.ticketPassPercentage,
    audio:
      "https://drive.google.com/uc?export=download&id=1Z5XwKQ3G78kPND6Lw4vF9LOc1SRudFwQ",
  };

  const [activeTab, setActiveTab] = useState("summary");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasAudio, setHasAudio] = useState<boolean>(
    ticketData?.audio ? true : false
  );
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (ticketData.audio) {
      initializeAudio();
    }
    return () => {
      cleanupAudio();
    };
  }, []);

  useEffect(() => {
    const playAudio = async () => {
      if (sound) {
        if (isPlaying) {
          await sound.playAsync();
        } else {
          await sound.pauseAsync();
        }
      }
    };
    playAudio();
  }, [isPlaying, sound]);

  const initializeAudio = async () => {
    try {
      setIsLoading(true);
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
      });

      const { sound: audioSound, status } = await Audio.Sound.createAsync(
        { uri: ticketData.audio },
        { shouldPlay: false, progressUpdateIntervalMillis: 100 },
        onPlaybackStatusUpdate
      );

      setSound(audioSound);
      setHasAudio(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setCurrentTime(status.positionMillis / 1000);
      setDuration(status.durationMillis / 1000);
      if (status.didJustFinish) {
        setIsPlaying(false);
        sound?.setPositionAsync(0);
      }
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = async (event: any) => {
    if (sound) {
      const { locationX, width } = event.nativeEvent;
      const position = (locationX / width) * duration;
      await sound.setPositionAsync(position * 1000);
      setCurrentTime(position);
    }
  };

  const togglePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const cleanupAudio = async () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }
  };

  const renderAudioPlayer = () => {
    if (!hasAudio) {
      return (
        <View
          style={{
            backgroundColor: "#f8f9fa",
            borderRadius: 12,
            padding: 16,
            marginHorizontal: 20,
            marginTop: 16,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CustomText
            style={{
              fontSize: 16,
              fontFamily: "Poppins-Medium",
              color: "#636e72",
            }}
          >
            No audio recording available
          </CustomText>
        </View>
      );
    }

    return (
      <View
        style={{
          backgroundColor: "#f8f9fa",
          borderRadius: 12,
          padding: 16,
          marginHorizontal: 8,
          marginTop: 20,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <CustomText
            style={{
              fontSize: 16,
              fontFamily: "Poppins-Medium",
              color: "#2d3436",
            }}
          >
            Call Recording
          </CustomText>
          <Text
            style={{
              fontSize: 12,
              color: "#636e72",
            }}
          >
            {formatTime(currentTime)} / {formatTime(duration)}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleSeek}
          style={{
            height: 3,
            backgroundColor: "#e2e8f0",
            borderRadius: 4,
            marginBottom: 12,
          }}
        >
          <View
            style={{
              width: `${(currentTime / duration) * 100}%`,
              height: "100%",
              backgroundColor: "#6c5ce7",
              borderRadius: 4,
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={togglePlayPause}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#6c5ce7",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              {isPlaying ? "⏸" : "▶"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
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
            backgroundColor: activeTab === "summary" ? "white" : "transparent",
          }}
          onPress={() => setActiveTab("summary")}
        >
          <CustomText
            style={{
              textAlign: "center",
              fontSize: 16,
              fontFamily: "Poppins-Bold",
              color: activeTab === "summary" ? "black" : "#666666",
            }}
          >
            Summary
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
            backgroundColor:
              activeTab === "transcript" ? "white" : "transparent",
          }}
          onPress={() => setActiveTab("transcript")}
        >
          <CustomText
            style={{
              textAlign: "center",
              fontSize: 16,
              fontFamily: "Poppins-Bold",
              color: activeTab === "transcript" ? "black" : "#666666",
            }}
          >
            Transcript
          </CustomText>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, padding: 20 }}>
        {activeTab === "summary" ? (
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              padding: 16,
              shadowOpacity: 0.1,
              shadowRadius: 5,
            }}
          >
            <CustomText style={{ fontSize: 18, marginBottom: 12 }}>
              Adviser Main Points:
            </CustomText>
            <Text style={{ color: "black", fontSize: 16, marginBottom: 16 }}>
              {ticketData.ticketSummary.adviser_main_points}
            </Text>

            <CustomText style={{ fontSize: 18, marginBottom: 12 }}>
              Customer Main Points:
            </CustomText>
            <Text style={{ color: "black", fontSize: 16, marginBottom: 16 }}>
              {ticketData.ticketSummary.customer_main_points}
            </Text>

            <CustomText style={{ fontSize: 18, marginBottom: 12 }}>
              Tone Analysis:
            </CustomText>
            <Text style={{ color: "black", fontSize: 16 }}>
              {ticketData.ticketSummary.tone_analysis}
            </Text>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 8,
              flex: 1,
            }}
          >
            <ScrollView
              style={{
                padding: 16,
              }}
            >
              {ticketData.ticketTranscript.map((item, index) => (
                <View key={index} style={{ marginBottom: 16 }}>
                  <CustomText
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      marginBottom: 4,
                      color: item.role === "Customer" ? "orange" : "#2196F3",
                    }}
                    className="font-poppins-bold"
                  >
                    {item.role}:
                  </CustomText>
                  <CustomText style={{ color: "black", fontSize: 16 }}>
                    {item.text}
                  </CustomText>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
        {renderAudioPlayer()}
      </View>
    </SafeAreaView>
  );
};

export default ViewReport;
