import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as DocumentPicker from "expo-document-picker";
import { Audio } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const EnterTicketDetails = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [targetName, setTargetName] = useState("");

  // Request audio permissions on component mount
  useEffect(() => {
    (async () => {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: false,
      });
    })();
  }, []);

  const pickAudio = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
        copyToCacheDirectory: true,
      });

      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setAudioFile(asset);
        try {
          const { sound: audioSound } = await Audio.Sound.createAsync(
            { uri: asset.uri },
            { shouldPlay: false }
          );
          setSound(audioSound);
        } catch (error) {
          console.log("Error loading audio:", error);
        }
      }
    } catch (error) {
      console.log("Error picking audio:", error);
    }
  };

  const handlePlayPause = async () => {
    if (sound) {
      try {
        if (isPlaying) {
          await sound.pauseAsync();
        } else {
          await sound.playAsync();
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.log("Error playing/pausing audio:", error);
      }
    }
  };

  const handleRemoveAudio = async () => {
    if (sound) {
      await sound.unloadAsync();
    }
    setSound(null);
    setAudioFile(null);
    setIsPlaying(false);
  };

  const router = useRouter();
  const handleSubmit = () => {
    router.back();
    console.log("Submitting:", { targetName, audioFile });
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <View style={styles.mainContainer}>
      {!audioFile ? (
        <TouchableOpacity style={styles.uploadContainer} onPress={pickAudio}>
          <LinearGradient
            colors={["#FFFFFF", "#FFFFFF"]}
            style={styles.uploadGradient}
          >
            <MaterialIcons name="upload-file" size={40} color="#000000" />
            <Text style={styles.uploadText}>Upload Audio File</Text>
            <View style={styles.dottedBorder} />
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <View style={styles.audioPlayerContainer}>
          <View style={styles.audioInfoContainer}>
            <Text style={styles.fileName} numberOfLines={1}>
              {audioFile.name}
            </Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={handleRemoveAudio}
            >
              <MaterialIcons name="close" size={24} color="#FF4444" />
            </TouchableOpacity>
          </View>

          <View style={styles.controlsContainer}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={handlePlayPause}
            >
              <LinearGradient
                colors={["#00ff88", "#00cc88"]}
                style={styles.playButtonGradient}
              >
                <MaterialIcons
                  name={isPlaying ? "pause" : "play-arrow"}
                  size={36}
                  color="#000000"
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Enter target name"
        value={targetName}
        onChangeText={setTargetName}
        placeholderTextColor="#666666"
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <LinearGradient
          colors={["#000000", "#000000"]}
          style={styles.submitGradient}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default EnterTicketDetails;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    gap: 24,
    alignSelf: "center",
    backgroundColor: "white",
    flex: 1,
    width: "100%",
    padding: 24,
    height: "100%",
  },
  uploadContainer: {
    borderRadius: 20,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    position: "relative",
  },
  uploadGradient: {
    padding: 80,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 16,
  },
  dottedBorder: {
    position: "absolute",
    top: 8,
    left: 8,
    right: 8,
    bottom: 8,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#CCCCCC",
    borderRadius: 16,
  },
  uploadText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000000",
    letterSpacing: 0.5,
    zIndex: 1,
  },
  audioPlayerContainer: {
    padding: 20,
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#333333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  audioInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  fileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    flex: 1,
    marginRight: 12,
  },
  removeButton: {
    padding: 10,
    backgroundColor: "rgba(255, 68, 68, 0.1)",
    borderRadius: 14,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: "hidden",
  },
  playButtonGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    fontSize: 17,
    backgroundColor: "#FFFFFF",
    color: "#333333",
    fontWeight: "500",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  submitButton: {
    width: "100%",
    alignSelf: "center",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  submitGradient: {
    paddingVertical: 18,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
