import React from "react";
import { useTranslation } from "react-i18next";
import { Keyboard, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import {
  EnvironmentItemsListElementProps,
  GroundEnvironmentItemAdjectiveType,
} from "@/app/tools/relax/ground_yourself/environment/page_3";
import Text from "@/components/global/Text";
import { Colors } from "@/constants/styles/colorTheme";
import {
  setEnvironmentAdjectiveModalIsOpen,
  setEnvironmentItemsModalSelectedIndex,
} from "@/state/features/tools/groundYourselfSlice";
import { AppDispatch } from "@/state/store";
import { Feather, FontAwesome } from "@expo/vector-icons";

const MAX_NAME_LENGTH = 20;

const EnvironmentItemsListElement = ({
  itemName = "",
  itemAdjectives = [],
  isAvailable = false,
  isCurrentlyEdited = false,
  onChangeText,
  onPressAdd,
  onConfirm,
  indexNum,
}: EnvironmentItemsListElementProps) => {
  const { t } = useTranslation(["tools", "common"]);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <View className="my-2 flex-row items-center justify-center">
      <View className="w-4/5 justify-center">
        {!itemName && !isCurrentlyEdited && (
          <TouchableOpacity
            className="absolute z-20 h-12 w-full"
            onPress={() => onPressAdd()}
          />
        )}
        <TextInput
          className="mr-8 justify-center pb-1 text-lg font-semibold"
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
              ? t("tools.ground_yourself.environment.page_3.add_a_new_item", {})
              : !itemName && isCurrentlyEdited
                ? "(" +
                  t("instructions.tap_here_to_type", {
                    ns: "common",
                  }) +
                  ")"
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
          autoCorrect={false} //important! enabling autocorrect bugs out the whole component for some reason
          autoCapitalize="sentences"
        />
        {itemAdjectives.length > 0 && itemAdjectives[0].name && (
          <Text className="mr-8 text-lg" style={{ color: Colors.mainGray }}>
            {"("}
            {itemAdjectives.map(
              (
                adjective: GroundEnvironmentItemAdjectiveType,
                indexNum: number,
              ) => (
                <React.Fragment key={indexNum}>
                  {indexNum !== 0 && indexNum !== itemAdjectives.length && ", "}
                  <Text className="text-lg" style={{ color: adjective.color }}>
                    {adjective.name}
                  </Text>
                </React.Fragment>
              ),
            )}
            {")"}
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
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full">
            <TouchableOpacity
              className="h-10 w-10 items-center justify-center rounded-full"
              style={{
                backgroundColor: Colors.salmonOrange,
              }}
              onPress={() => {
                dispatch(setEnvironmentItemsModalSelectedIndex(indexNum));
                dispatch(setEnvironmentAdjectiveModalIsOpen(true));
              }}
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
