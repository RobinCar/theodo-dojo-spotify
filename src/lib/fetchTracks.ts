import { SavedTrack } from 'spotify-types';

const apiToken =
  'BQAeZwNAXy3QEHBPkcKDtaO26SbhtbsNTlkQORiJdsqmqIYiEJMSuWw9_FXB2MTEOaGGORBD2ZjYiz5LfiZKnb-feu_qN_Kt7rxaIqXK0v4dtlegX13bcVq3dhd6u5WboBRVG6zNc6cLZ5OChKH4CAQm5zzDAlkXNQiglsSFkpHBIvUSmwlGScVlJ19HBLXNS6W92jY-p2PNiQjvznOdYtu9wgTqb09DsYxRWWm-AqfDWlj14Lz6A-5YMa94DfiBlbe9LG7-zFmIY_T3hPzJugS1xfuQ_dhxCk5zDJCFntAr5o_lTUrs_xwgQwGeJxc-29vzXi-FN6XIpkiTJQKBRXDA_OM';

export const fetchTracks = async (): Promise<SavedTrack[]> => {
  const response = await fetch('https://api.spotify.com/v1/me/tracks', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + apiToken,
    },
  });
  if (!response.ok) {
    throw new Error(`Fetching tracks failed with status ${response.status}`);
  }
  const data = (await response.json()) as { items: SavedTrack[] };

  return data.items;
};
