import React from 'react';
import queues from '../../gameData/queues.json';
import './MatchContainer.css';

const MatchContainer = ({ match }) => {
  let playerCount = 0;
  const playerList = match.info.participants;

  const printPlayerList = () => {
    console.log(playerList)
  }

  const printMatch = () => {
    console.log(match)
  }

  const printQueue = () => {
    console.log(queues)
  }

  const determinTimeSinceMatch = () => {
    const currentTimeStamp = Date.now();
    const timeDifference = currentTimeStamp - match.info.gameEndTimestamp
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));

    if (hoursAgo < 1) {
      return "Less than an hour ago";
    } else if (hoursAgo < 24) {
      return `${hoursAgo} hours ago`;
    } else {
      const daysAgo = Math.floor(hoursAgo / 24);
      return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
    }
  }

  const determinQueueType = () => {
    const matchingQueue = queues.find(queue => match.info.queueId === queue.queueId);
    return matchingQueue ? matchingQueue.description : 'Queue not found';
  }

  return (
    <div>
      <h1>match</h1>
      <div className='match-type-and-length'>
        <div className='match-type'>{determinQueueType()}</div>
        <div className='time-since-match'>{determinTimeSinceMatch()}</div>
      </div>

      <ul className='match-player-list-container' >
        {playerList.map(player => {
          playerCount++;
          return (
            <li className={`lane_${playerCount} player-list-player`}>
              <img className='match-champ-portrait' src={`/dragontail-14.2.1/14.2.1/img/champion/${player.championName}.png`} />
              <span className='match-player-name'>{player.riotIdGameName}</span>
            </li>
          )
        })}
      </ul>

      <button onClick={printPlayerList}>Print player list</button>
      <button onClick={printMatch}>Print Match</button>
      <button onClick={printQueue}>Print Queues</button>
    </div>
  )
};

export default MatchContainer;
