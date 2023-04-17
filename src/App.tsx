import logo from './assets/logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTracks } from './lib/fetchTracks';
import { SavedTrack } from 'spotify-types';
import { ChoiceButton } from './components/ChoiceButton';
import swal from 'sweetalert';

const pickRandomTrack = (tracks: SavedTrack[]) => {
  return tracks[Math.floor(Math.random() * tracks.length)]!;
};

const shuffleArray = (tracks: SavedTrack[]) => {
  return tracks.sort(() => Math.random() - 0.5);
};

const App = () => {
  const {
    data: tracks,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['tracks'],
    queryFn: fetchTracks,
  });

  const [currentTrack, setCurrentTrack] = useState<SavedTrack | undefined>(
    undefined,
  );
  const [trackChoices, setTrackChoices] = useState<SavedTrack[]>([]);

  const selectNewTrack = () => {
    if (!tracks) {
      return;
    }
    const rightTrack = pickRandomTrack(tracks);
    setCurrentTrack(rightTrack);

    const wrongTracks = [pickRandomTrack(tracks), pickRandomTrack(tracks)];
    const choices = shuffleArray([rightTrack, ...wrongTracks]);
    setTrackChoices(choices);
  };

  useEffect(() => {
    selectNewTrack();
  }, [tracks]);

  const checkAnswer = (track: SavedTrack) => {
    if (track.track?.id == currentTrack?.track?.id) {
      swal('Bravo !', "C'est la bonne réponse", 'success').then(selectNewTrack);
    } else {
      swal('Dommage !', "Ce n'est pas la bonne réponse", 'error');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Bienvenue sur le blind test de Robin</h1>
      </header>
      <div className="App-images">
        {isLoading || !isSuccess ? (
          'Loading...'
        ) : (
          <div>
            <div>
              <audio
                src={currentTrack?.track?.preview_url ?? ''}
                controls
                autoPlay
              />
            </div>
          </div>
        )}
      </div>
      <div className="App-buttons">
        {trackChoices.map(track => (
          <ChoiceButton
            track={track.track}
            onClick={() => checkAnswer(track)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
