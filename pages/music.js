import AsyncSelect from 'react-select/async';
import { useState } from 'react';
import styled from 'styled-components';
import { getMusicPageData } from '../server/service/spotify-data';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const PageConfetti = dynamic(() => import('../components/PageConfetti'), {
  ssr: false,
});

const selectMap = (songs) =>
  songs.map((song) => ({
    value: song.uri,
    label: `${song.title} - ${arrayToString(song.artists)}`,
  }));

const arrayToString = (array) => array.join(', ');

const TWENTY_FOUR_HOURS_IN_SECONDS = 86400;

const optionsPromise = (input, setSongData) =>
  fetch(`/api/spotify/search?q=${input}`)
    .then((res) => res.json())
    .then((json) => {
      setSongData(json);

      return selectMap(json);
    });

const PlaylistContainer = styled.div`
width: 100%;

@media only screen and (min-width: 500px) {
  flex-direction: width: 100%;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 899px) {
    flex-direction: column;
  }
`;

const RecommendFlexContainer = styled.div`
  padding-top: 21px;
  display: flex;
  @media only screen and (max-width: 899px) {
    flex-direction: column;
  }
`;

const RecommendSongInfo = styled.div`
  padding-left: 21px;
  padding-right: 21px;
`;

const FlexItem = styled.div`
  flex: 1 1 0px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: right;
  grid-gap: 40px;
`;

const StyledButton = styled.button`
  background-color: #fffdd0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  height: 2.5rem;
  color: #377e56;
  border: 3px solid #377e56;
  font-weight: 600;
  font-size 13px
  transition-duration: 0.4s;
  :hover {
    transition-duration: 0.4s;
    background-color: #377e56;
    color: white;
  }

  :active {
    background-color: #2a5e41;
  }
`;

const PlaylistH2 = styled.h2`
  margin-top: 6px;
  margin-bottom: 8px;
`;

const ArtistH2 = styled.h2`
  margin-top: 6px;
  margin-bottom: 50px;
  inline-block; 
`;

const PlaylistDesc = styled.p`
  margin-top: 0px;
  margin-bottom: 50px;
`;

export default function music({ curatedPlaylists, topArtists }) {
  const [songData, setSongData] = useState();
  const [selectedOption, setSelectedOption] = useState([]);
  const [isRecommended, setIsRecommended] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const addSong = (song) => {
    fetch(`/api/spotify/recommend?uri=${song}`);
    setIsRecommended(true);
  };

  return (
    <>
      <PageConfetti
        style={{ pointerEvents: 'none' }}
        numberOfPieces={confetti ? 500 : 0}
        recycle={false}
        onConfettiComplete={(confetti) => {
          setConfetti(false);
          confetti.reset();
        }}
      />
      <h1>{'Recommend a song'}</h1>
      <p>{'Good music is good. If you know of any, send if my way.'}</p>
      <AsyncSelect
        cache
        placeholder="Search for a Song"
        loadOptions={(input) => optionsPromise(input, setSongData)}
        id="chord-type-selector"
        instanceId="chord-type-selector"
        value={selectedOption}
        onChange={(input) => setSelectedOption(input)}
      />

      {selectedOption.value &&
        !isRecommended &&
        songData.map(
          (song) =>
            song.uri === selectedOption.value && (
              <RecommendFlexContainer>
                <img width={160} height={160} src={song.image} />
                <RecommendSongInfo>
                  <h2>{song.title}</h2>
                  <p>{arrayToString(song.artists)}</p>
                  <StyledButton
                    onClick={() => {
                      addSong(song.uri);
                      setConfetti(true);
                      window.fathom.trackGoal('THSAWPR2', 0);
                    }}
                  >
                    {'Recommend'}
                  </StyledButton>
                </RecommendSongInfo>
              </RecommendFlexContainer>
            )
        )}

      {isRecommended && (
        <>
          <h1>{'Thanks for the song 🎵'}</h1>
          <StyledButton
            onClick={() => {
              setIsRecommended(false);
              setSelectedOption([]);
            }}
          >
            {'Clear'}
          </StyledButton>
        </>
      )}

      <FlexContainer>
        <FlexItem>
          <h1>{'Curated Playlists'}</h1>
          {curatedPlaylists.map((playlist) => (
            <PlaylistContainer
              key={playlist.url}
              onClick={() => window.fathom.trackGoal(playlist.fathomId, 0)}
            >
              <a
                target="_blank"
                href={playlist.url}
                rel="noopener noreferrer"
                onClick={() => {
                  window.fathom.trackGoal('J8OISZIM', 0);
                }}
              >
                <Image
                  width={415}
                  height={415}
                  src={playlist.image}
                  layout="intrinsic"
                  quality={100}
                />
              </a>
              <PlaylistH2>{playlist.name}</PlaylistH2>
              <PlaylistDesc>{playlist.description}</PlaylistDesc>
            </PlaylistContainer>
          ))}
        </FlexItem>
        <FlexItem>
          <h1>{'Artists on Repeat'}</h1>
          <Grid>
            {topArtists.map((artist) => (
              <div key={artist.url}>
                <a
                  target="_blank"
                  href={artist.url}
                  rel="noopener noreferrer"
                  onClick={() => {
                    window.fathom.trackGoal('YT0R7FKR', 0);
                  }}
                >
                  <Image
                    width={300}
                    height={300}
                    src={artist.image}
                    quality={85}
                  />
                </a>
                <ArtistH2>{artist.name}</ArtistH2>
              </div>
            ))}
          </Grid>
        </FlexItem>
      </FlexContainer>
    </>
  );
}

export async function getStaticProps() {
  const data = await getMusicPageData();
  return {
    props: {
      ...data,
    },
    revalidate: TWENTY_FOUR_HOURS_IN_SECONDS,
  };
}
