import React from 'react'
import './TitleCards.css'
// import cards_data from '../../assets/cards/Cards_data'
import { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';



const TitleCards = ({ title, category }) => {

  const [ apiData, setApiData ] = useState([]);
const cardsRef = useRef();

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZjQ2NGVhOTcyNmI1ZjQ1MTg4Njg1MjUzZDQ3ODVmOCIsIm5iZiI6MTc0MTYyMjI0MS4xMTEsInN1YiI6IjY3Y2YwYmUxZDk1ZTQxMWRkMDJhODgzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MkgRyu5Jp0uOS0VF8qizjjnTbEbZ0OScX_ogMLrkz44'
  }
};


const handleWheel = (e) => {
  cardsRef.current.scrollLeft += e.deltaY
  e.preventDefault();
}

useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));


  cardsRef.current.addEventListener('wheel', handleWheel)
},[])

  return (
    <div className='titlecards'>
      <h2>{title?title:'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
