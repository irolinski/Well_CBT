export type GroundYourselfSlideProps = {
  exerciseName: string;
  objKey: number;
  onButtonPress: () => void;
};

export type GroundYourselfSlidePageComponent = ({
  exerciseName,
  objKey,
  onButtonPress,
}: GroundYourselfSlideProps) => React.JSX.Element;
