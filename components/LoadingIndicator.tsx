import React from "react";
import { ActivityIndicator } from "react-native";
import Text from "./global/Text";

const LoadingIndicator = () => {
  return (
    <React.Fragment>
      <ActivityIndicator size="large" color="#4391BC" />
      <Text className="mt-3 text-lg">Loading </Text>
    </React.Fragment>
  );
};

export default LoadingIndicator;
