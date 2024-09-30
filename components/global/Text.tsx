import * as React from "react";
import { Text } from "react-native";

export default (props: any) => {
  const defaultStyle = { fontFamily: "Inter", color: "#00000" };
  const incomingStyle = Array.isArray(props.style)
    ? props.style
    : [props.style];
  return <Text {...props} style={[defaultStyle, ...incomingStyle]} />;
};
