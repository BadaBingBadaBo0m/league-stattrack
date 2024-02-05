import React from 'react';
import { useSelector } from 'react-redux'
import queues from '../../gameData/queues.json';
import summoner from '../../gameData/summoner.json'
import './MatchContainer.css';

const MatchContainer = ({ matchData }) => {
  const userInfo = useSelector((state) => state.riot.userProfile);
  const match = matchData.info;
  const playerInfo = match.participants.find(particpant => userInfo.puuid === particpant.puuid);
  const playerList = match.participants;
  let playerCount = 0;

  const printPlayerList = () => {
    console.log(playerList)
  }

  const printMatch = () => {
    console.log(match)
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

  const determineMatchLength = () => {
    const seconds = match.gameDuration
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const matchLength = `${hours ? `${hours}hr` : ""} ${minutes < 10 ? '0' : ''}${minutes}m ${secs < 10 ? '0' : ''}${secs}s`;
    return matchLength;
  }

  const determineQueueType = () => {
    const matchingQueue = queues.find(queue => match.queueId === queue.queueId);
    return matchingQueue ? matchingQueue.description : 'Queue not found';
  }

  const determineSummonerSpell = (summonerId) => {
    const summonerSpellObj = Object.entries(summoner.data).find(spell => spell[1].key === `${summonerId}`)
    return summonerSpellObj[0]
  }

  return (
    <div key={match.gameCreation}>
      <h1>match</h1>
      <button onClick={e => console.log(playerInfo)}>PlayerInfo</button>
      <div className='match-type-and-length'>
        <div className='match-type'>{determineQueueType()}</div>
        <div className='time-since-match'>{determineTimeSinceMatch()}</div>
      </div>

      <div className='match-outcome-and-length'>
        <div className='match-outcome'>{playerInfo.win ? "Victory" : "Defeat"}</div>
        <div>{determineMatchLength()}</div>
      </div>

      <div className='match-player-stats'>
        <div className='kda-container'>
          <img className='match-kda-champ-portrait' src={`/dragontail-14.2.1/14.2.1/img/champion/${playerInfo.championName}.png`} />
          <img className='match-kda-summoner-spell' src={`/dragontail-14.2.1/14.2.1/img/spell/${determineSummonerSpell(playerInfo.summoner1Id)}.png`} />
          <img className='match-kda-summoner-spell' src={`/dragontail-14.2.1/14.2.1/img/spell/${determineSummonerSpell(playerInfo.summoner2Id)}.png`} />
        </div>
      </div>

      <ul className='match-player-list-container' >
        {playerList.map(player => {
          playerCount++;
          return (
            <li key={`${player.puuid} ${player.champExperience}`} className={`lane_${playerCount} player-list-player`}>
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
