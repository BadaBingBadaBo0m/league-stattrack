import React from 'react';
import './MatchContainer.css';

const MatchContainer = ({ match }) => {

  return (
    <div>
      <h1>match</h1>

      <ul id='match-player-list-container'>
        {
          // Split into two different lists check which side the team was on to choose what side they go on
          match.info.participants.map(player => (
            <li>
              <img id='match-champ-portrait' src={`/dragontail-14.2.1/14.2.1/img/champion/${player.championName}.png`} />
              <span>{player.riotIdGameName}</span>
            </li>
          ))
        }
      </ul>
    </div>
  )
};

export default MatchContainer;
