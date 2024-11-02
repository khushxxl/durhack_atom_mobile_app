import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomText from "./CustomText";

const CustomButton = ({ onPress, buttonText, additionalClassName = "" }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`p-4 rounded-full bg-black mt-10  text-xl ${additionalClassName}`}
    >
      <CustomText className="text-white text-center  font-poppins-semibold">
        {buttonText}
      </CustomText>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
