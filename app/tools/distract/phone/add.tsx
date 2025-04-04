import * as Contacts from "expo-contacts";
import { Image } from "expo-image";
import { Href, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Keyboard,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { logoImages } from "@/assets/images/global/logo/logo";
import { phoneFacePlaceholder } from "@/assets/images/tools/phone/phoneFaces";
import BackButton from "@/components/BackButton";
import Text from "@/components/global/Text";
import ToolHeader from "@/components/tools/ToolHeader";
import { phoneAFriend_tool } from "@/constants/models/tools/tools";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import { setContact, setContactWithPicture } from "@/db/tools";
import { RootState } from "@/state/store";
import formatPhoneNumber from "@/utils/formatPhoneNumber";
import { isValidName } from "@/utils/inputValidations";
import { MaterialIcons } from "@expo/vector-icons";

const TOOL_NAME = phoneAFriend_tool.name;

interface PhoneNumberObj {
  countryCode: string;
  digits: string;
  id: string;
  label: string;
  number: string;
}

const Add = () => {
  const { t } = useTranslation(["tools", "common"]);
  const phoneState = useSelector((state: RootState) => state.phone);

  // search feature state
  const [contactData, setContactData] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === "granted") {
          let { data } = await Contacts.getContactsAsync();

          if (data.length > 0) {
            setContactData(data);
          }
        }
      } catch (err) {
        throw err;
      }
    })();
  }, []);

  const search = (query: string) => {
    if (query) {
      const filteredContacts = contactData.filter((contact) =>
        `${contact.firstName} ${contact.lastName}`
          .toLowerCase()
          .includes(query),
      );
      setFilteredData(filteredContacts);
    } else if (!query) {
      setFilteredData([]);
    }
  };

  const handleSetContact = (
    name: string,
    phone: string,
    pictureURI?: string,
  ) => {
    Alert.alert(
      t(`tools.${TOOL_NAME}.change_contact.alert_header`),
      t(`tools.${TOOL_NAME}.change_contact.alert_body`),

      [
        {
          text: t(`tools.${TOOL_NAME}.change_contact.alert_no`),
        },
        {
          text: t(`tools.${TOOL_NAME}.change_contact.alert_yes`),

          onPress: () => {
            try {
              if (!pictureURI) {
                setContact(name, phone);
              } else {
                setContactWithPicture(name, phone, pictureURI);
              }
              router.replace("tools/distract/phone" as Href);
            } catch (err) {
              console.error(err);
              Alert.alert(t("alerts.error_db_fetching"));
            }
          },
          style: "cancel",
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <React.Fragment>
      <View
        className={`z-10 mx-6 ${SCREEN_HEIGHT > 750 ? "top-20" : "top-12"} flex-row justify-start`}
      >
        <BackButton />
      </View>
      <View
        className={`mx-6 ${SCREEN_HEIGHT > 750 ? "top-24" : "top-16"}`}
        style={{
          height: SCREEN_HEIGHT - SCREEN_HEIGHT / 5,
        }}
      >
        <View className="mb-8">
          <ToolHeader>
            {!phoneState.supportContact
              ? t(`tools.${TOOL_NAME}.change_contact.title_add`)
              : t(`tools.${TOOL_NAME}.change_contact.title_change`)}
          </ToolHeader>
        </View>
        <View>
          <View
            className="h-12 w-full flex-row rounded-lg border bg-gray-100"
            style={{ borderColor: Colors.mainGray }}
          >
            <View className="mx-3 justify-center" style={{ width: "10%" }}>
              <MaterialIcons
                name="search"
                size={32}
                color={Colors.blackPearl}
              />
            </View>
            <TextInput
              className="h-12 w-full rounded-lg text-lg"
              style={{ borderColor: Colors.mainGray, width: "80%" }}
              onChangeText={(value) => {
                if (isValidName(value)) {
                  setSearchValue(value);
                  search(value.toLowerCase());
                }
              }}
              value={searchValue}
              editable
              returnKeyType="done"
              onKeyPress={(evt) =>
                evt.nativeEvent.key == "Enter" && Keyboard.dismiss()
              }
              clearButtonMode="while-editing"
            />
          </View>
          <View
            className="mt-8 items-center justify-center rounded-xl border"
            style={{
              borderColor: Colors.mainGray,
              height: SCREEN_HEIGHT * 0.5,
            }}
          >
            <ScrollView className="w-full">
              {filteredData.length > 0 ? (
                filteredData.map((contact, i: number) => (
                  <React.Fragment key={i}>
                    {contact.phoneNumbers && (
                      <React.Fragment key={i}>
                        {contact.phoneNumbers.map(
                          (obj: PhoneNumberObj, i: number) => (
                            <View
                              className="items-center justify-center"
                              key={i}
                            >
                              <Pressable
                                className="w-full flex-row justify-center"
                                onPress={() => {
                                  !contact.image
                                    ? handleSetContact(
                                        `${contact.firstName} ${contact.lastName ? contact.lastName : ""}`,
                                        obj.number,
                                      )
                                    : handleSetContact(
                                        `${contact.firstName} ${contact.lastName ? contact.lastName : ""}`,
                                        obj.number,
                                        contact.image.uri,
                                      );
                                }}
                              >
                                <View
                                  className="mt-2 border-b px-2"
                                  style={{
                                    width: "90%",
                                    borderColor: Colors.mainGray,
                                  }}
                                  key={i}
                                >
                                  <View className="flex-row justify-between py-4">
                                    <View className="">
                                      {contact.image ? (
                                        <Image
                                          className="h-12 w-12 rounded-full"
                                          source={contact.image.uri}
                                        />
                                      ) : (
                                        <Image
                                          className="h-12 w-12"
                                          source={phoneFacePlaceholder}
                                        />
                                      )}
                                    </View>
                                    <View
                                      className="items-start"
                                      style={{ width: "70%" }}
                                    >
                                      <View className="w-full">
                                        <Text className="text-left text-lg">
                                          <Text className="text-left font-bold">
                                            {contact.firstName}
                                          </Text>{" "}
                                          {contact.lastName
                                            ? contact.lastName
                                            : ""}
                                        </Text>
                                      </View>
                                      <Text className="mt-2 text-left text-sm">
                                        {formatPhoneNumber(obj.number)}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              </Pressable>
                            </View>
                          ),
                        )}
                      </React.Fragment>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <View>
                  <Text
                    className="top-16 p-12 text-center align-middle text-2xl"
                    style={{ color: Colors.mainGray }}
                  >
                    {searchValue
                      ? t(`tools.${TOOL_NAME}.change_contact.no_results`)
                      : t(
                          `tools.${TOOL_NAME}.change_contact.search_placeholder`,
                        )}
                  </Text>
                  <Image
                    className="absolute bottom-0 left-1/3 h-4 w-1/3 translate-y-16"
                    source={logoImages.logo_braid_vertical}
                  />
                </View>
              )}
            </ScrollView>
          </View>
          <View className="mx-2 mt-2.5">
            <Text className="text-right">
              {t("lists_and_tables.showing_current_of_total", {
                ns: "common",
                current: filteredData.length,
                total: contactData.length,
              })}
            </Text>
          </View>
        </View>
      </View>
    </React.Fragment>
  );
};

export default Add;
