import { useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  Modal,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProfilePic from "@/components/about/ProfilePic";
import DividerLine from "@/components/DividerLine";
import Text from "@/components/global/Text";
import NavigationModalButton from "@/components/NavigationModalButton";
import { fetchUserData, UserType } from "@/db/user";
import {
  setName,
  setNameInputIsActive,
  setShowEditProfileModal,
} from "@/state/features/menus/editProfileModalSlice";
import { AppDispatch, RootState } from "@/state/store";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const EditProfileModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const editProfileModalState = useSelector(
    (state: RootState) => state.editProfileModal,
  );
  const [isLoading, setIsLoading] = useState(false);

  //UI STATE
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    setIsLoading(true);
    try {
      fetchUserData().then((res) => {
        let fetchedData = res as UserType;
        // dispatch(setUserData(fetchedData));
        dispatch(setName("anna"));
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={editProfileModalState.showModal}
      className="flex-1"
    >
      <ScrollView
        onScroll={(evt) => {
          evt.nativeEvent.contentOffset.y < -175 &&
            dispatch(setShowEditProfileModal(false));
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          className={`px-4 ${windowHeight > 850 ? "py-20" : "py-12"}`}
          style={{
            top: 0,
            width: windowWidth,
            // height: windowHeight, //remove if more height needed
            backgroundColor: "#FBFBFB",
          }}
        >
          <Pressable
            onPress={() => {
              dispatch(setShowEditProfileModal(false));
            }}
          >
            <View className="items-center pb-6">
              <View>
                <Feather name="chevron-down" size={24} color="black" />
              </View>
            </View>
          </Pressable>
          <View className="items-center">
            <Text className="text-xl" style={{ color: "#B8B8B8" }}>
              Edit Profile
            </Text>
          </View>
          <View className="mt-8">
            <View>
              <Text className="mb-2 text-lg" style={{ color: "#B8B8B8" }}>
                Your profile
              </Text>
              <View className="justify-around">
                <ProfilePic pictureURI="" />
                <View className="my-3 flex-row justify-center pt-4">
                  <View className="relative h-16 flex-row items-center px-12">
                    <TouchableOpacity
                      className="absolute right-8 top-0 z-10 pb-8 pl-8"
                      onPress={() => {
                        dispatch(setNameInputIsActive(true));
                      }}
                    >
                      <MaterialCommunityIcons
                        name="pencil-outline"
                        size={38}
                        color={
                          editProfileModalState.nameInputIsActive
                            ? "#B8B8B8"
                            : "#212529"
                        }
                      />
                    </TouchableOpacity>
                    <TextInput
                      className="w-64 text-center text-3xl"
                      value={editProfileModalState.name}
                      style={{
                        color: editProfileModalState.nameInputIsActive
                          ? "black"
                          : "#616161",
                        borderColor: "#d9d9d9",
                        backgroundColor: "#FBFBFB",
                        textAlignVertical: "center",
                      }}
                      selectTextOnFocus={true}
                      onChangeText={(evt) => dispatch(setName(evt))}
                      editable={editProfileModalState.nameInputIsActive}
                      multiline={false}
                      maxLength={13}
                      autoFocus={editProfileModalState.nameInputIsActive}
                      returnKeyType="done"
                      onKeyPress={(evt) =>
                        evt.nativeEvent.key == "Enter" && Keyboard.dismiss()
                      }
                      clearButtonMode="never"
                      onBlur={() => {
                        dispatch(setNameInputIsActive(false));
                        Keyboard.dismiss();
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View className="my-4">
            <DividerLine width={windowWidth * 0.5} />
          </View>
          <View className="mb-8 mt-4" style={{ height: 200 }}>
            <View>
              <Text className="text-lg" style={{ color: "#B8B8B8" }}>
                Select profile picture
              </Text>
              <View
                className="my-2 border"
                id="2"
                style={{ borderColor: "#B8B8B8", height: "100%" }}
              ></View>
            </View>
          </View>
          <View className="flex-row justify-center pb-8 pt-24">
            <NavigationModalButton
              title={"Save changes"}
              disabled={editProfileModalState.nameInputIsActive}
              onPress={() => {}}
              icon={<Feather name="save" size={24} color="#ffffff" />}
            />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default EditProfileModal;
