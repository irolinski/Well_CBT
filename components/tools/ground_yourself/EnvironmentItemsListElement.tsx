import React from "react";
import { Keyboard, TextInput, TouchableOpacity, View } from "react-native";
import {
  EnvironmentItemsListElementProps,
  GroundEnvironmentItemAdjectiveType,
} from "@/app/tools/relax/ground_yourself/environment/page_3";
import Text from "@/components/global/Text";
import { Colors } from "@/constants/styles/colorTheme";
import { Feather, FontAwesome } from "@expo/vector-icons";

const MAX_NAME_LENGTH = 15;

const EnvironmentItemsListElement = ({
  itemName = "",
  itemAdjectives = [],
  isAvailable = false,
  isCurrentlyEdited = false,
  onChangeText,
  onPressAdd,
  onConfirm,
}: EnvironmentItemsListElementProps) => {
  return (
    <View className="my-2 flex-row items-center justify-center">
      <View className="w-4/5 justify-center">
        <TextInput
          className="mr-8 justify-center pb-1 text-xl font-semibold"
          editable={isCurrentlyEdited}
          style={{
            borderColor: Colors.mainGray,
            color: !itemName ? Colors.mainGray : Colors.offBlack,
            borderBottomWidth: isCurrentlyEdited ? 1 : 0,
          }}
          value={itemName}
          onChangeText={(val) => onChangeText(val)}
          placeholder={
            !itemName && !isCurrentlyEdited
              ? "Add a new item"
              : !itemName && isCurrentlyEdited
                ? "Tap here to type"
                : ""
          }
          multiline={false}
          maxLength={MAX_NAME_LENGTH}
          autoFocus={isCurrentlyEdited}
          returnKeyType="done"
          onKeyPress={(evt) => {
            if (evt.nativeEvent.key == "Enter") {
              Keyboard.dismiss();
            }
          }}
          clearButtonMode="never"
          onBlur={() => {
            Keyboard.dismiss();
          }}
        />
        {itemAdjectives.length > 0 && (
          <Text className="text-base">
            {itemAdjectives.map(
              (
                adjective: GroundEnvironmentItemAdjectiveType,
                indexNum: number,
              ) => (
                <Text style={{ color: adjective.color }}>
                  {adjective.name}
                  {indexNum !== itemAdjectives.length - 1 ? "," : null}
                </Text>
              ),
            )}
          </Text>
        )}
      </View>
      <View className="h-10 w-1/5 items-center justify-center">
        {itemName && isCurrentlyEdited ? (
          <TouchableOpacity
            className="h-10 w-10 items-center justify-center rounded-full"
            style={{
              backgroundColor: Colors.mainBlue,
            }}
            onPress={() => {
              onConfirm();
            }}
          >
            <Feather name="check" size={22} color={Colors.white} />
          </TouchableOpacity>
        ) : null}
        {itemName && !isCurrentlyEdited ? (
          <TouchableOpacity
            className="h-10 w-10 items-center justify-center rounded-full"
            onPress={() => {
              console.log();
            }}
          >
            <TouchableOpacity
              className="h-10 w-10 items-center justify-center rounded-full"
              style={{
                backgroundColor: "#FF997C",
              }}
              onPress={() => {}}
            >
              <FontAwesome name="paint-brush" size={20} color={Colors.white} />
            </TouchableOpacity>
          </TouchableOpacity>
        ) : null}
        {!itemName && !isCurrentlyEdited ? (
          <TouchableOpacity
            className="h-10 w-10 items-center justify-center rounded-full"
            disabled={!isAvailable}
            style={{
              backgroundColor: isAvailable ? Colors.mainBlue : Colors.darkGray,
            }}
            onPress={() => {
              onPressAdd();
            }}
          >
            <Text
              className="h-full w-full rounded-full text-center text-3xl"
              style={{ color: Colors.white }}
            >
              +
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default EnvironmentItemsListElement;
