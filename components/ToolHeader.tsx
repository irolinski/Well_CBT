import Text from "./global/Text";

const ToolHeader = (props: any, bright?: boolean) => {
  return (
    <Text
      {...props}
      className="pr-[10%] text-left text-2xl"
      style={{
        fontFamily: "KodchasanMedium",
        color: bright ? "#F5F5F5" : "#1E1E1E",
      }}
    />
  );
};
export default ToolHeader;
