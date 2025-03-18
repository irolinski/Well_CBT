export type GroundYourselfSlideProps = {
  exerciseName: string;
  objKey: number;
  onButtonPress: () => void;
  exerciseLength: number;
};

export type GroundYourselfSlidePageComponent = ({
  exerciseName,
  objKey,
  onButtonPress,
  exerciseLength,
}: GroundYourselfSlideProps) => React.JSX.Element;
