import React from 'react';
import { useSelector } from 'react-redux'
import queues from '../../gameData/queues.json';
import summoner from '../../gameData/summoner.json';
import runes from '../../gameData/runesReforged.json';
import './MatchContainer.css';

const MatchContainer = ({ matchData }) => {
  // const dragonVersion = process.env.REACT_APP_DATADRAGON_VERSION
  const userInfo = useSelector((state) => state.riot.userProfile);
  const match = matchData.info;
  const playerInfo = match.participants.find(particpant => userInfo.puuid === particpant.puuid);
  const playerList = match.participants;
  const primaryRunePage = runes.find(page => playerInfo.perks.styles[0].style === page.id)
  const primaryRune = primaryRunePage.slots[0].runes.find(currentRune => playerInfo.perks.styles[0].selections[0].perk === currentRune.id)
  const secondaryRunePage = runes.find(page => playerInfo.perks.styles[1].style === page.id)
  let playerCount = 0;

  if (!match) return <div>Loading</div>

  // const printPlayerList = () => {
  //   console.log(playerList)
  // }

  // const printMatch = () => {
  //   console.log(match)
  // }

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

  const getItemImageIfExists = (item) => {
    if (item === 0) {
      return <div className='empty-item-slot'></div>
    }

    return <img className='item-img' src={`/dragontail-14.2.1/14.2.1/img/item/${item}.png`} />
  }

  const getKillParticipation = () => {
    const teamId = playerInfo.teamId;
    const team = match.teams[teamId === 100 ? 0 : 1]

    return `${Math.floor(((playerInfo.kills + playerInfo.assists) / team.objectives.champion.kills) * 100)}%`
  }

  const determineKDA = () => {
    if (playerInfo.deaths === 0) return "Perfect"
    return `${playerInfo.kills && playerInfo.deaths && playerInfo.assists ? ((playerInfo.kills + playerInfo.assists) / playerInfo.deaths).toFixed(2) : '0.00'} KDA`
  }

  // The reason for this seamingly useless function is because Riot decided that LethalTempo's name should forever be LethalTempoTemp in DataDragon.
  // The only rune in the game that follows this naming convention
  const determineIfLethalTempo = () => {
    if (primaryRune.key === "LethalTempoTemp") {
      return `https://raw.communitydragon.org/latest/game/assets/perks/styles/${primaryRunePage.key.toLowerCase()}/lethaltempo/${primaryRune.key.toLowerCase()}.png`
    }

    return `https://raw.communitydragon.org/latest/game/assets/perks/styles/${primaryRunePage.key.toLowerCase()}/${primaryRune.key.toLowerCase()}/${primaryRune.key.toLowerCase()}.png`
  }

  return (
    <div key={match.gameCreation} className='match-container' style={{ backgroundColor: playerInfo.win ? "#4d97e2" : "#E84057" }}>
      <div className='match-game-stats'>
        <div className='match-type-and-length'>
          <div className='match-type'>{determineQueueType()}</div>
          <div className='time-since-match'>{determineTimeSinceMatch()}</div>
        </div>

        <div className='match-outcome-and-length'>
          <div className='match-outcome'>{playerInfo.win ? "Victory" : "Defeat"}</div>
          <div>{determineMatchLength()}</div>
        </div>
      </div>

      <div className='match-player-stats'>
        <div className='kda-container'>
          <div className='match-kda-champ-portrait-container'>
            <img alt='champ-portrait' className='match-kda-champ-portrait' src={`/dragontail-14.2.1/14.2.1/img/champion/${playerInfo.championName}.png`} />
          </div>
          <div className='match-summoner-spells-runes'>
            <img alt='summoner-spell-1' className='match-kda-summoner-spell-1' src={`/dragontail-14.2.1/14.2.1/img/spell/${determineSummonerSpell(playerInfo.summoner1Id)}.png`} />
            <img alt='summoner-spell-2' className='match-kda-summoner-spell-2' src={`/dragontail-14.2.1/14.2.1/img/spell/${determineSummonerSpell(playerInfo.summoner2Id)}.png`} />

            <div className='match-kda-rune-container'>
              <img alt='rune-1' className='match-kda-rune-primary' src={determineIfLethalTempo()} />
            </div>
            <div className='match-kda-rune-container'>
              <img alt='run-2' className='match-kda-rune-secondary' src={`https://raw.communitydragon.org/latest/game/assets/perks/${secondaryRunePage.icon.toLowerCase()}`} />
            </div>
          </div>

          <div className='match-player-kda'>
            <div>{`${playerInfo.kills} / ${playerInfo.deaths} / ${playerInfo.assists}`}</div>
            <div>{determineKDA()}</div>
            <div>{`P/Kill ${getKillParticipation()}`}</div>
            <div>{`CS ${playerInfo.totalMinionsKilled}`}</div>
          </div>
        </div>

        <div className='match-player-items'>
          {getItemImageIfExists(playerInfo.item0)}
          {getItemImageIfExists(playerInfo.item1)}
          {getItemImageIfExists(playerInfo.item2)}
          {getItemImageIfExists(playerInfo.item3)}
          {getItemImageIfExists(playerInfo.item4)}
          {getItemImageIfExists(playerInfo.item5)}
          {getItemImageIfExists(playerInfo.item6)}
        </div>
      </div>

      <ul className='match-player-list-container' >
        {playerList.map(player => {
          playerCount++;
          return (
            <li key={`${player.puuid} ${player.champExperience}`} className={`lane_${playerCount} player-list-player`}>
              {/* The reason for the Fiddlesticks acception is because Riot hates us all. */}
              <img alt='champ=portrait-player-list' className='match-champ-portrait' src={`/dragontail-14.2.1/14.2.1/img/champion/${player.championName === 'FiddleSticks' ? 'Fiddlesticks' : player.championName}.png`} />
              <span className='match-player-name'>{player.riotIdGameName}</span>
            </li>
          )
        })}
      </ul>

      {/* <button onClick={e => console.log(playerInfo)}>PlayerInfo</button> */}
      {/* <button onClick={e => console.log(process.env)}>dataDragon</button> */}
      {/* <button onClick={printPlayerList}>Print player list</button> */}
      {/* <button onClick={printMatch}>Print Match</button>
      <button onClick={getKillParticipation}>KILL</button> */}
    </div>
  )
};

export default MatchContainer;
