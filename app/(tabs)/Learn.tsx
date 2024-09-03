import React from 'react';
import { ScrollView, Text } from 'react-native';
import Frame from '@/components/Frame';
import LearnCard from '@/components/LearnCard';
import { cbtIMG } from '../../constants/models/images';

const Learn = () => {
  return (
    <Frame>
      <Text className="mb-8 font-bold text-4xl text-center ">Learn</Text>
      <ScrollView className="px-6 mb-4">
        <Text className="my-6 ml-2 font-bold italic text-3xl text-left">
          Category 1
        </Text>
        <LearnCard
          name={"Cognitive-Behavioral Therapy"}
          link={""}
          image={cbtIMG}
        />
        <LearnCard
          name={"Cognitive-Behavioral Therapy"}
          link={""}
          image={cbtIMG}
        />
        <Text className="my-6 ml-2 font-bold italic text-3xl text-left">
          Category 2
        </Text>
        <LearnCard
          name={"Cognitive-Behavioral Therapy"}
          link={""}
          image={cbtIMG}
        />
      </ScrollView>
    </Frame>
  );
};

export default Learn;
