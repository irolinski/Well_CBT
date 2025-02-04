import React from "react";
import { ActivityIndicator } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";
import Text from "./global/Text";

const LoadingIndicator = () => {
  return (
    <React.Fragment>
      <ActivityIndicator size="large" color={Colors.darkBlue} />
      <Text className="mt-3 text-lg">Loading </Text>
    </React.Fragment>
  );
};

export default LoadingIndicator;
