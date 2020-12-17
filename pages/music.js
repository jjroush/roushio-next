import AsyncSelect from 'react-select/async';
import { useState } from 'react';
import styled from 'styled-components';

const selectMap = (songs) =>
  songs.map((song) => ({
    value: song.uri,
    label: `${song.title} - ${arrayToString(song.artists)}`,
  }));

const arrayToString = (array) => array.join(', ');

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

export default function music() {
  const [songData, setSongData] = useState();
  const [selectedOption, setSelectedOption] = useState([]);
  return (
    <FlexContainer>
      <FlexItem>
        <h1>{'Recommend a song'}</h1>
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
        )
      </FlexItem>
    </FlexContainer>
  );
}
