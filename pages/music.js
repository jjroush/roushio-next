import AsyncSelect from 'react-select/async';
import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

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

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 714px) {
    flex-direction: column;
  }
`;

const RecommendFlexContainer = styled.div`
  padding-top: 21px;
  display: flex;
  @media only screen and (max-width: 714px) {
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
  grid-template-columns: 200px 200px;
  justify-content: right;
`;

const StyledButton = styled.button`
  background-color: #555555;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  height: 2.5rem;
`;

export default function music({ curatedPlaylists, topArtists }) {
  const [songData, setSongData] = useState();
  const [selectedOption, setSelectedOption] = useState([]);
  return (
    <>
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
        songData.map(
          (song) =>
            song.uri === selectedOption.value && (
              <RecommendFlexContainer>
                <img width={160} height={160} src={song.image} />
                <RecommendSongInfo>
                  <h2>{song.title}</h2>
                  <p>{arrayToString(song.artists)}</p>
                  <StyledButton onClick={() => {}}>{'recommend'}</StyledButton>
                </RecommendSongInfo>
              </RecommendFlexContainer>
            )
        )}

      <FlexContainer>
        <FlexItem>
          <h1>{'Playlists'}</h1>
          <h2>{'I have curated'}</h2>
          {curatedPlaylists.map((playlist) => (
            <div>
              <a target="_blank" href={playlist.url} rel="noopener noreferrer">
                <img src={playlist.image} />
              </a>
              <h2>{playlist.name}</h2>
              <p>{playlist.description}</p>
            </div>
          ))}
        </FlexItem>
        <FlexItem>
          <h1>{'Artists'}</h1>
          <h2>{`I've been listening to recently.`}</h2>
          <Grid>
            {topArtists.map((artist) => (
              <div>
                <a target="_blank" href={artist.url} rel="noopener noreferrer">
                  <img width={180} height={180} src={artist.image} />
                </a>
                <h2>{artist.name}</h2>
                {/* <p>{artist.genres.join(', ')}</p> */}
              </div>
            ))}
          </Grid>
        </FlexItem>
      </FlexContainer>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/spotify/data');
  const data = await res.json();

  return {
    props: {
      ...data,
    },
    revalidate: TWENTY_FOUR_HOURS_IN_SECONDS,
  };
}
