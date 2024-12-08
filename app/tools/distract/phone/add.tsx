import * as Contacts from "expo-contacts";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import BackButton from "@/components/BackButton";
import Frame from "@/components/Frame";
import { Href, router } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setContact, setContactWithPicture } from "@/db/tools";
import { Image } from "expo-image";

interface PhoneNumberObj {
  countryCode: string;
  digits: string;
  id: string;
  label: string;
  number: string;
}

const Add = () => {
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

  const search = (q: string) => {
    if (q) {
      const queryString = q.toLowerCase();
      const filteredContacts = contactData.filter((contact) =>
        `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(q),
      );
      setFilteredData(filteredContacts);
    } else if (!q) {
      setFilteredData([]);
    }
  };

  const handleSetContact = (
    name: string,
    phone: string,
    pictureURI?: string,
  ) => {
    Alert.alert(
      "Do you want to set this person as your emotional support contact?",
      "\nYou'll be able to change it anytime, later.",
      [
        {
          text: "No, I want to make a different choice",
        },
        {
          text: "Yes, continue",
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
      <BackButton />
      <Frame>
        <View className="py-8">
          {!phoneState.supportContact ? (
            <Text className="text-center text-3xl">
              Add emotional support contact
            </Text>
          ) : (
            <Text className="text-center text-3xl">Change support contact</Text>
          )}
          <View className="m-4">
            <Text className="text-center text-lg">
              Search in your contact book{" "}
            </Text>
            <TextInput
              className="m-2 h-12 border bg-gray-100 p-4 text-lg"
              onChangeText={(value) => {
                setSearchValue(value);
                search(value);
              }}
              value={searchValue}
              editable
              returnKeyType="done"
              onKeyPress={(evt) =>
                evt.nativeEvent.key == "Enter" && Keyboard.dismiss()
              }
              clearButtonMode="while-editing"
            />
            <View className="my-8 bg-white">
              <View className="h-72 items-center justify-center">
                <ScrollView className="w-full">
                  {filteredData.length > 0 ? (
                    filteredData.map((contact, i: number) => (
                      <React.Fragment key={i}>
                        {contact.phoneNumbers && (
                          <React.Fragment key={i}>
                            {contact.phoneNumbers
                              // .slice(0, 1)
                              .map((obj: PhoneNumberObj, i: number) => (
                                <React.Fragment key={i}>
                                  <Pressable
                                    onPress={() => {
                                      !contact.image
                                        ? handleSetContact(
                                            `${contact.firstName} ${contact.lastName}`,
                                            obj.number,
                                          )
                                        : handleSetContact(
                                            `${contact.firstName} ${contact.lastName}`,
                                            obj.number,
                                            contact.image.uri,
                                          );
                                    }}
                                  >
                                    <View
                                      className="w-full border-b px-4 py-4"
                                      key={i}
                                    >
                                      <View className="flex-row">
                                        <View>
                                          {contact.image ? (
                                            <Image
                                              className="h-12 w-12"
                                              source={contact.image.uri}
                                            />
                                          ) : (
                                            <Text>No image</Text>
                                          )}
                                        </View>
                                        <View>
                                          <Text className="text-center">
                                            {contact.firstName}{" "}
                                            {contact.lastName}
                                          </Text>
                                          <Text className="text-center">
                                            {obj.number}
                                          </Text>
                                        </View>
                                      </View>
                                    </View>
                                  </Pressable>
                                </React.Fragment>
                              ))}
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <Text className="top-16 p-12 text-center align-middle">
                      {searchValue
                        ? "No results."
                        : "Start typing the name of a person you want to add to see results..."}
                    </Text>
                  )}
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </Frame>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Add;
