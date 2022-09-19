import React from 'react'
import Header from './Header'

export const About = () => {
  return (
    <div>
      <Header/>
      <div className="aboutWrapper">
        <h1 className="aboutHeader">About</h1>
        <p className="aboutBody">MudaePI (a play on the words Mudae and API) is an unofficial web app based on the popular Discord bot/game Mudae.
        Here, you can view the top ranked characters for the day, view snapshots of past days, and compare different snapshots to find the hottest
        characters at the moment. Where does the API come in? You'll find out soon.</p>
      </div>
    </div>
  )
}

export default About
