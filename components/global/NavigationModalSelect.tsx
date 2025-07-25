import { Href } from 'expo-router';
import { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Colors } from '@/constants/styles/colorTheme';
import { UnknownAction } from '@reduxjs/toolkit';

export type NavigationModalObj = {
  name: string;
  icon: ReactNode;
  iconBright: ReactNode;
  link: Href;
};

type NavigationModalSelectTypes = NavigationModalObj & {
  modalState: {
    showModal: boolean;
    link: Href;
  };
  handleSelect: (link: Href) => UnknownAction;
};

const NavigationModalSelect = ({
  name,
  icon,
  iconBright,
  link,
  modalState,
  handleSelect,
}: NavigationModalSelectTypes) => {
  return (
    <Pressable
      className="mt-2.5 flex-row items-center justify-center rounded-xl border-2"
      style={{
        width: 0.8 * 320,
        height: 47,
        borderColor: Colors.mainGray,
        backgroundColor:
          modalState.link === link ? Colors.mainBlue : "transparent",
      }}
      onPress={() => handleSelect(link)}
    >
      <View>{modalState.link === link ? iconBright : icon}</View>

      <Text
        className="mx-2"
        style={{
          color: modalState.link === link ? Colors.white : Colors.darkGray,
        }}
      >
        {name}
      </Text>
    </Pressable>
  );
};
export default NavigationModalSelect;
