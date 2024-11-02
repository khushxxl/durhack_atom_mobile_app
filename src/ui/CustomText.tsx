import { Text as RNText } from "react-native";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";

const CustomText = ({
  className = "text-black ",
  style = {} as any,
  ...props
}) => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_800ExtraBold,
    Poppins_700Bold,
    Poppins_400Regular_Italic,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  if (!fontsLoaded) {
    return null; // Or a loading indicator
  }
  let fontFamily = "Poppins_400Regular";
  if (className.includes("font-poppins-extrabold")) {
    fontFamily = "Poppins_800ExtraBold";
  } else if (className.includes("font-poppins-bold")) {
    fontFamily = "Poppins_700Bold";
  } else if (className.includes("font-poppins-semibold")) {
    fontFamily = "Poppins_600SemiBold";
  } else if (className.includes("font-poppins-italic")) {
    fontFamily = "Poppins_400Regular_Italic";
  } else if (className.includes("font-poppins-bold-italic")) {
    fontFamily = "Poppins_700Bold_Italic";
  } else if (className.includes("font-poppins-black")) {
    fontFamily = "Poppins_900Black";
  }

  //   const fontFamily = props.bold ? "Poppins_800ExtraBold" : "Poppins_400Regular";

  return (
    <RNText
      className={`${className}`}
      style={[
        {
          fontFamily,
          //   paddingTop: 10, // Add a small padding to the top
        },
        style,
      ]}
      {...props}
    />
  );
};

export default CustomText;
