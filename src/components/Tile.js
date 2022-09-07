import React from 'react'
import placeholder from '../placeholder.png';

const Tile = ({ char }) => {
  return (
    <div className="tileWrap">
      <img className="tileImage" src={placeholder} alt="placeholder"/>
      <div className="tileTextLayer">
        <div className="tileText">
            <p>Name: {char.name}</p>
            <p>Series: {char.series}</p>
            <p>Rank: {char.rank}</p>
            <p>Kakera: {char.kakera}</p>
        </div>
      </div>
    </div>
  )
}

export default Tile