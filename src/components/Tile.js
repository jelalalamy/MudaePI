import React from 'react'

const Tile = ({ char }) => {
  return (
    <div className="tile">
        <p>Name: {char.name}</p>
        <p>Series: {char.series}</p>
        <p>Rank: {char.rank}</p>
        <p>Kakera: {char.kakera}</p>
    </div>
  )
}

export default Tile