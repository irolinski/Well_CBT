import { ScrollView, View, ViewStyle } from 'react-native';
import { Colors } from '@/constants/styles/colorTheme';
import Text from '../../global/Text';

type CDATextBoxProps = {
  textContent: string;
  customStyle?: ViewStyle;
  scrollHeight?: number;
};

const CDATextBox: React.FC<CDATextBoxProps> = ({
  textContent,
  customStyle,
  scrollHeight = 200,
}) => {
  return (
    <View
      className="mt-4 h-32 rounded-lg border bg-gray-200"
      style={[customStyle, { borderColor: Colors.darkBlue, overflow: "hidden" }]}
    >
      <ScrollView
        style={{ height: scrollHeight }}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
        scrollEventThrottle={16}
        nestedScrollEnabled={true}
      >
      <Text className="p-4 text-left text-sm">{textContent}</Text>
      </ScrollView>
    </View>
  );
};
export default CDATextBox;
