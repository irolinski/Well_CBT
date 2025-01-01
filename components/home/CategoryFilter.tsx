import { Pressable, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  ToolList,
  toolNameList,
  ToolNames,
} from "@/constants/models/activity_log";
import { setFilterCategories } from "@/state/features/menus/activityLogSlice";
import { AppDispatch, RootState } from "@/state/store";
import Text from "../global/Text";
import RadioButton from "../RadioButton";

const CategoryFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activityLogState = useSelector((state: RootState) => state.activityLog);

  const toggleCategory = (categoryName: ToolNames) => {
    let newArr = activityLogState.filterCategories;
    // if the array includes the category, remove it
    if (activityLogState.filterCategories.includes(categoryName)) {
      newArr = newArr.filter((el) => el !== categoryName);
      dispatch(setFilterCategories(newArr));
      // if it doesn't, add it
    } else {
      newArr = [...newArr, categoryName];
      dispatch(setFilterCategories(newArr));
    }
  };

  return (
    <View className="my-4 w-full flex-row flex-wrap justify-between overflow-hidden">
      {toolNameList.map((categoryName: ToolNames, index: number) => (
        <Pressable
          className="mx-2 my-4"
          style={{ width: "40%" }}
          onPress={() => {
            toggleCategory(categoryName);
          }}
          key={index}
        >
          <View className="flex-row items-center">
            <RadioButton
              isActive={activityLogState.filterCategories.includes(
                categoryName,
              )}
              checkedColor={"rgba(242, 141, 78, 0.75)"}
            />
            <View className="items-center">
              <Text className="text-base" style={{ color: "#B8B8B8" }}>
                {ToolList[categoryName].name}
              </Text>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
};
export default CategoryFilter;
