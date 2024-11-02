import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as DocumentPicker from "expo-document-picker";
import { Audio } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const EnterTicketDetails = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [sound, setSound] = useState(null);
  const [targetName, setTargetName] = useState("");
  const [description, setDescription] = useState(""); // Added description state

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

  const handleRemoveAudio = async () => {
    if (sound) {
      await sound.unloadAsync();
    }
    setSound(null);
    setAudioFile(null);
  };

  const [error, setError] = useState(null);

  

  const router = useRouter();
  const handleSubmit = () => {
    if(!targetName || !description){
      return;
    }
    router.back();
    console.log("Submitting:", { targetName, description, audioFile });
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
        <View style={styles.uploadContainer}>
          <LinearGradient
            colors={["#FFFFFF", "#FFFFFF"]}
            style={styles.uploadGradient}
          >
            <View style={styles.dottedBorder} />
            <View style={styles.audioInfoContainer}>
              <MaterialIcons
                name="audiotrack"
                size={24}
                color="#4a90e2"
                style={styles.audioIcon}
              />
              <View style={styles.fileInfoWrapper}>
                <Text style={styles.fileName} numberOfLines={1}>
                  {audioFile.name}
                </Text>
                <Text style={styles.fileSize}>
                  {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                </Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={handleRemoveAudio}
              >
                <MaterialIcons
                  name="delete-outline"
                  size={24}
                  color="#dc3545"
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Enter Ticket name"
        value={targetName}
        onChangeText={setTargetName}
        placeholderTextColor="#666666"
      />

      <TextInput // Added description input
        style={styles.input}
        placeholder="Enter Description"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#666666"
        multiline={true}
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


    shadowOpacity: 0.2,
    shadowRadius: 5,
    position: "relative",
  },
  uploadGradient: {
    height: 200,
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
  audioInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    width: "100%",
    paddingHorizontal: 20,
  },
  audioIcon: {
    marginRight: 8,
  },
  fileInfoWrapper: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: "600",
  },
  fileSize: {
    fontSize: 12,
    color: "#666666",
    marginTop: 2,
  },
  removeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#ffebee",
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
