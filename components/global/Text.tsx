import * as React from "react";
import { Text } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";

export default (props: any) => {
  const defaultStyle = { fontFamily: "Inter", color: Colors.offBlack };
  const incomingStyle = Array.isArray(props.style)
    ? props.style
    : [props.style];
  return <Text {...props} style={[defaultStyle, ...incomingStyle]} />;
};
