import { Track } from 'spotify-types';

export const AlbumCover = ({ track }: { track: Track }) => {
  const src = track.album.images?.[0]?.url || '';
  return <img src={src} style={{ width: 400, height: 400 }} />;
};
