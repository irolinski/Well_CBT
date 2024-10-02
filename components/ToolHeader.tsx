import Text from "./global/Text";

const ToolHeader = (props: any) => {
  return (
    <Text
      {...props}
      className="text-2xl text-left pr-[10%]"
      style={{ fontFamily: "KodchasanMedium", color: "#1E1E1E" }}
    />
  );
};
export default ToolHeader;
