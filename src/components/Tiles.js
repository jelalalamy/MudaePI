import React from 'react'
import Tile from './Tile'

const Tiles = ({ chars }) => {
  return (
    <div className="tilesContainer">
        {chars.map((char) => (
            <Tile char={char}/>
        ))}
    </div>
  )
}

export default Tiles