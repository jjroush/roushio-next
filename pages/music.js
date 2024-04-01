/* eslint-disable react-hooks/rules-of-hooks */
import AsyncSelect from 'react-select/async';
import { useState } from 'react';
import Image from "next/legacy/image";
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

import styles from '../styles/music.module.css'
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

const addSong = (songURI, songTitle, note, email, setRecommendedHook) => {
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
              <div className={styles.FlexContainer}>
                <img
                  alt={`${song.title} album cover`}
                  height={300}
                  src={song.image}
                  width={300}
                />
                <div className={styles.RecommendSongInfo}>
                  <h2 className={styles.PlaylistH2}>{song.title}</h2>
                  <p className={styles.RecommendDesc}>{arrayToString(song.artists)}</p>
                  {!isNoteEnabled ? (
                    <a className={styles.AddNote} onClick={() => setNoteEnabled(true)}>
                      {'Add Note'}
                    </a>
                  ) : (
                    <>
                      <input
                        className={`${styles.Input} ${styles.NoteInput}`}
                        maxLength={100}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder={'Note - Optional'}
                        styles={{ width: 300 }}
                      />
                      <input
                        className={`${styles.Input}`}
                        maxLength={30}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={'Email - Optional'}
                        type="email"
                      />
                    </>
                  )}

                  <button
                    className={styles.StyledButton}
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
                  </button>
                </div>
              </div>
            )
        )}

      {isRecommended && (
        <>
          <h1>{'Thanks for the song 🎵'}</h1>
          <button
            className={styles.StyledButton}
            onClick={() => {
              setIsRecommended(false);
              setSelectedOption([]);
            }}
          >
            {'Clear'}
          </button>
        </>
      )}

      <div className={styles.FlexContainer}>
        <div className={styles.FlexItem}>
          <h1>{'Curated Playlists'}</h1>
          {curatedPlaylists.map((playlist) => (
            <div
              className={styles.PlaylistContainer}
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
              <h2 className={styles.PlaylistH2}>{playlist.name}</h2>
              <p className={styles.PlaylistDesc}>{playlist.description}</p>
            </div>
          ))}
        </div>
        <div className={styles.FlexItem}>
          <h1>{'Artists on Repeat'}</h1>
          <div className={styles.Grid}>
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
                <h2 className={styles.ArtistH2}>{artist.name}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
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
