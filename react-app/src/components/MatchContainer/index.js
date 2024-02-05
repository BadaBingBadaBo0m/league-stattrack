import React from 'react';
import { useSelector } from 'react-redux'
import queues from '../../gameData/queues.json';
import './MatchContainer.css';

const MatchContainer = ({ matchData }) => {
  const userInfo = useSelector((state) => state.riot.userProfile);
  const match = matchData.info;
  const playerList = match.participants;
  let playerCount = 0;

  const printPlayerList = () => {
    console.log(playerList)
  }

  const printMatch = () => {
    console.log(match)
  }

  const determineMatchOutcome = () => {
    const currentUserPuuid = userInfo.puuid
    const playerInfo = match.participants.find(particpant => currentUserPuuid === particpant.puuid)

    return playerInfo.win
  }

  const determineTimeSinceMatch = () => {
    const currentTimeStamp = Date.now();
    const timeDifference = currentTimeStamp - match.gameEndTimestamp
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

  const determineQueueType = () => {
    const matchingQueue = queues.find(queue => match.queueId === queue.queueId);
    return matchingQueue ? matchingQueue.description : 'Queue not found';
  }

  return (
    <div>
      <h1>match</h1>
      <div className='match-type-and-length'>
        <div className='match-type'>{determineQueueType()}</div>
        <div className='time-since-match'>{determineTimeSinceMatch()}</div>
      </div>

      <div className='match-outcome-and-length'>
        <div className='match-outcome'>{determineMatchOutcome() ? "Victory" : "Defeat"}</div>
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
    </div>
  )
};

export default MatchContainer;
