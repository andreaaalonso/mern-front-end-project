import './App.css';
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';

function App() {
  let baseUrl = "https://gogoanime.consumet.org/anime-movies";
  const [titleData, setTitleData] = useState([])
  const [releaseDate, setReleaseDate] = useState([])
  const [animeUrl, setAnimeUrl] = useState([])
  
  const getData = async () => {
    let response = await axios.get(baseUrl)
    const output = response.data;
    output.map((movie, index) => {
      setTitleData(oldArray => [...oldArray, movie.animeTitle]);
      setReleaseDate(oldArray => [...oldArray, movie.releasedDate]);
      setAnimeUrl(oldArray => [...oldArray, movie.animeUrl]);
    })
  }
  useEffect(() => {
    getData()
  }, []);
  
  return (
    <div>
      <p className="p-title">Welcome to Anime Flick Clicks!</p>
      <br/>
      <Accordion>
        {titleData.map((movie, index) => {
          const output = (
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>
                  {movie}
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p className="p-text">
                  Release Date: {releaseDate[index]}
                </p>
                <p className="url-title">
                Movie Url: <a href={animeUrl[index]}>{animeUrl[index]}</a>
                </p>
              </AccordionItemPanel>
            </AccordionItem>);
          return output;
        })}
      </Accordion>
    </div>
  );
}

export default App;
