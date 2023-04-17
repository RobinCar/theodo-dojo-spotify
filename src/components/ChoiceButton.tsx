import { Track } from 'spotify-types';

export const ChoiceButton = ({
  track,
  onClick,
}: {
  track: Track;
  onClick: () => void;
}) => {
  return (
    <>
      <button onClick={onClick}>{track.name}</button>
    </>
  );
};
