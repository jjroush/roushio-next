/* eslint-disable react-hooks/rules-of-hooks */
import AsyncSelect from 'react-select/async';
import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

import { getMusicPageData } from '../server/service/spotify-data';

const PageConfetti = dynamic(() => import('../components/PageConfetti'), {
  ssr: false,
});

const arrayToString = (array) => array.join(', ');

const selectMap = (songs) =>
  songs.map((song) => ({
    value: song.uri,
    label: `${song.title} - ${arrayToString(song.artists)}`,
  }));

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
  width: 600px;
  @media only screen and (max-width: 899px) {
    flex-direction: column;
  }
`;

const RecommendSongInfo = styled.div`
  @media only screen and (min-width: 899px) {
    padding-left: 21px;
    padding-right: 21px;
  }
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

const RecommendDesc = styled.p`
  margin-top: 0px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  border-radius: 4px;
  border-style: solid;
  border-color: hsl(0, 0%, 80%);
  min-height: 30px;
  border-width: 1px;
  display: block;
  :focus {
    outline: none;
    box-shadow: 0 0 0 1px #2684ff;
    border-color: #2684ff;
  }
  margin-bottom: 10px;
`;

const NoteInput = styled(Input)`
  width: 300px;
`;

const AddNote = styled.a`
  display: block;
  margin-bottom: 10px;
`;

const addSong = (songURI, songTitle, note, email, setRecommendedHook) => {
  console.log(note);
  fetch(`/api/spotify/recommend?uri=${songURI}`, {
    method: 'POST',
    body: JSON.stringify({
      songTitle,
      songURI,
      note,
      email,
    }),
  });
  setRecommendedHook(true);
};

export default function music({ curatedPlaylists, topArtists }) {
  const [songData, setSongData] = useState();
  const [selectedOption, setSelectedOption] = useState([]);
  const [isRecommended, setIsRecommended] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [isNoteEnabled, setNoteEnabled] = useState(false);
  const [note, setNote] = useState('');
  const [email, setEmail] = useState('');

  return (
    <>
      <NextSeo
        description="Fullstack Developer. Slinging Javascript in the land of corn (Iowa)."
        title="Jacob Roush - Fullstack Developer"
      />
      <PageConfetti
        numberOfPieces={confetti ? 1000 : 0}
        onConfettiComplete={(confetti) => {
          setConfetti(false);
          confetti.reset();
        }}
        recycle={false}
        style={{ pointerEvents: 'none' }}
      />
      <h1>{'Recommend a song'}</h1>
      <p>{'Find and add a song to my spotify playlist.'}</p>
      <AsyncSelect
        cache
        id="chord-type-selector"
        instanceId="chord-type-selector"
        isDisabled={isRecommended}
        loadOptions={(input) => optionsPromise(input, setSongData)}
        onChange={(input) => setSelectedOption(input)}
        placeholder="Search for a Song"
        value={selectedOption}
      />

      {selectedOption.value &&
        !isRecommended &&
        songData.map(
          (song) =>
            song.uri === selectedOption.value && (
              <RecommendFlexContainer>
                <img
                  alt={`${song.title} album cover`}
                  height={300}
                  src={song.image}
                  width={300}
                />
                <RecommendSongInfo>
                  <PlaylistH2>{song.title}</PlaylistH2>
                  <RecommendDesc>{arrayToString(song.artists)}</RecommendDesc>
                  {!isNoteEnabled ? (
                    <AddNote onClick={() => setNoteEnabled(true)}>
                      {'Add Note'}
                    </AddNote>
                  ) : (
                    <>
                      <NoteInput
                        maxLength={100}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder={'Note - Optional'}
                        styles={{ width: 300 }}
                      />
                      <Input
                        maxLength={30}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={'Email - Optional'}
                        type="email"
                      />
                    </>
                  )}

                  <StyledButton
                    onClick={() => {
                      addSong(
                        song.uri,
                        song.title,
                        note,
                        email,
                        setIsRecommended
                      );
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
                href={playlist.url}
                onClick={() => {
                  window.fathom.trackGoal('J8OISZIM', 0);
                }}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Image
                  height={415}
                  layout="intrinsic"
                  quality={100}
                  src={playlist.image}
                  width={415}
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
                  href={artist.url}
                  onClick={() => {
                    window.fathom.trackGoal('YT0R7FKR', 0);
                  }}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Image
                    height={300}
                    quality={85}
                    src={artist.image}
                    width={300}
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
