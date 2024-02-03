import React from 'react';

const MatchContainer = ({ match }) => {
  let playerCount = 0;

  return (
    <div>
      <h1>match</h1>

      <ul>
        {
          match.info.participants.map(player => (
            <li>
              <img src={`/dragontail-14.2.1/14.2.1/img/champion/${player.championName}.png`} />
              <span>{player.riotIdGameName}</span>
            </li>
          ))
        }
      </ul>
    </div>
  )
};

export default MatchContainer;
