import { Dimensions } from "react-native";
import Text from "./global/Text";
import { HTMLAttributes } from "react";

interface ToolHeaderProps extends HTMLAttributes<HTMLDivElement> {
  bright?: boolean;
  noIndent?: boolean;
}

const marginSize = Dimensions.get("window").width / 10;

const ToolHeader = ({ bright, noIndent, ...props }: ToolHeaderProps) => {
  return (
    <Text
      {...props}
      className={`text-left text-2xl ${props.className}`}
      style={{
        fontFamily: "KodchasanMedium",
        color: bright ? "#F5F5F5" : "#1E1E1E",
        paddingRight: !noIndent ? marginSize : 0,
        ...props.style,
      }}
    />
  );
};

export default ToolHeader;
