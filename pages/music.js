import AsyncSelect from 'react-select/async';
import { useState } from 'react';
import styled from 'styled-components';

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
`;

const FlexItem = styled.div`
  flex-grow: 1;
  flex-basis: 0;
`;

export default function music({ topArtists }) {
  const [songData, setSongData] = useState();
  const [selectedOption, setSelectedOption] = useState([]);
  return (
    <>
      <h1>{'Recommend a song'}</h1>
      <p>
        {
          'Good music is good. If you know of any good music send if my way. Some ge'
        }
      </p>
      <div>{'music'}</div>
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
              <div>
                <img src={song.image} />
                <h2>{song.title}</h2>
                <p>{arrayToString(song.artists)}</p>
                <button onClick={() => {}} />
                {song.uri}
              </div>
            )
        )}

      <FlexContainer>
        <div>
          <h1>{'Playlists'}</h1>
          <h2>{'I have curated'}</h2>
        </div>
        <div>
          <h1>{'Artists'}</h1>
          <h2>{'I have been listening to recently.'}</h2>
          {topArtists.map((artist) => (
            <div>
              <img src={artist.image} />
              <h2>{artist.name}</h2>
              <p>{artist.genres.join(', ')}</p>
            </div>
          ))}
        </div>
      </FlexContainer>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/spotify/data');
  const data = await res.json();
  console.log(data);
  return {
    props: {
      ...data,
    },
    revalidate: TWENTY_FOUR_HOURS_IN_SECONDS,
  };
}
