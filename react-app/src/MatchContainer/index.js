import React from 'react';
import './MatchContainer.css';

const MatchContainer = ({ match }) => {
  let playerCount = 0;
  const playerList = match.info.participants;

  const printPlayerList = () => {
    console.log(playerList)
  }

  return (
    <div>
      <h1>match</h1>

      <ul id='match-player-list-container' >
        {playerList.map(player => {
          playerCount++;
          return (
            <li className={`lane_${playerCount} player-list-player`}>
              <img className='match-champ-portrait' src={`/dragontail-14.2.1/14.2.1/img/champion/${player.championName}.png`} />
              <span>{player.riotIdGameName}</span>
            </li>
          )
        })}
      </ul>

      <button onClick={printPlayerList}>Print player list</button>
    </div>
  )
};

export default MatchContainer;
