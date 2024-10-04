import Text from "./global/Text";
import { HTMLAttributes } from "react";

interface ToolHeaderProps extends HTMLAttributes<HTMLDivElement> {
  bright?: boolean;
}

const ToolHeader = ({ bright, ...props }: ToolHeaderProps) => {
  return (
    <Text
      {...props}
      className={`pr-[10%] text-left text-2xl ${props.className}`}
      style={{
        fontFamily: "KodchasanMedium",
        color: bright ? "#F5F5F5" : "#1E1E1E",
        ...props.style,
      }}
    />
  );
};

export default ToolHeader;
