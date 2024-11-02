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
        copyToCacheDirectory: true, // This ensures the file is accessible
      });

      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setAudioFile(asset);
        // Load the audio file
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
    // Add submit logic here
    router.back();
    console.log("Submitting:", { targetName, audioFile });
  };

  // Cleanup sound when component unmounts
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <View style={styles.container}>
      <View style={styles.popupContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter target name"
          value={targetName}
          onChangeText={setTargetName}
          placeholderTextColor="#667085"
        />

        {!audioFile ? (
          <TouchableOpacity style={styles.uploadContainer} onPress={pickAudio}>
            <MaterialIcons name="upload-file" size={24} color="#007AFF" />
            <Text style={styles.uploadText}>Upload Audio</Text>
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
                <MaterialIcons name="close" size={20} color="#FF3B30" />
              </TouchableOpacity>
            </View>

            <View style={styles.controlsContainer}>
              <TouchableOpacity
                style={styles.playButton}
                onPress={handlePlayPause}
              >
                <MaterialIcons
                  name={isPlaying ? "pause" : "play-arrow"}
                  size={24}
                  color="#007AFF"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EnterTicketDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  popupContainer: {
    width: width * 0.8, // 80% of screen width
    maxWidth: 300, // Maximum width
    backgroundColor: "white",
    borderRadius: 8, // Changed to square corners
    padding: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  input: {
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  uploadContainer: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 8,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
  },
  audioPlayerContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 8,
  },
  audioInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  fileName: {
    fontSize: 14,
    color: "#333",
    flex: 1,
    marginRight: 10,
  },
  removeButton: {
    padding: 4,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 8, // Changed to square corners
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
});
