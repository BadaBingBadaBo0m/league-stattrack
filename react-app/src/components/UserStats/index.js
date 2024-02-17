import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getMatches, getSummonerInfo } from '../../store/riot';
import { useParams } from 'react-router-dom'
import MatchList from '../MatchList';
import './userStats.css'

const UserStats = () => {
  const userInfo = useSelector((state) => state.riot.userProfile);
  const matchIds = useSelector((state) => state.riot.match_ids);
  const matchData = useSelector((state) => state.riot.match_data);
  const userRankArr = useSelector((state) => state.riot.userRank);
  let userRank = null;
  const [errors, setErrors] = useState({});
  const { gameName } = useParams();
  const { tagLine } = useParams();
  const dispatch = useDispatch();

  if (userRankArr && userRankArr.length > 0) userRank = userRankArr.find(rank => rank.queueType === "RANKED_SOLO_5x5");

  useEffect(() => {
    const fetchSummonerInfo = async () => {
      await dispatch(getSummonerInfo(gameName, tagLine));
    };

    if (!userInfo) {
      console.log("fetching match data")
      fetchSummonerInfo();
    }

    const getSummonerMatches = async () => {
      const res = await dispatch(getMatches(matchIds));
      if (res.error) {
        setErrors(res)
      }
    };

    getSummonerMatches();

    // console.log("asfkjhaskljfhlsdfafsdl", res)

  }, [userInfo])

  const correctRankCaps = (rank) => {
    return rank.slice(0, 1) + rank.slice(1).toLowerCase()
  }

  // if (errors) return <div>{errors.error}</div>
  if (!userInfo) return <div>Loading userInfo</div>
  if (!matchIds) return <div>Loading matchIds</div>
  // if (!matchData || !matchData.length) return <div>Loading matchData</div>

  return (
    <section>
      <div id='user-stats-banner'>
        <div id='user-stats-username-pfp-lvl'>
          <div id='user-stats-pfp-lvl-container'>
            <img id='user-stats-pfp' alt='user-pfp' src={`/dragontail-14.2.1/14.2.1/img/profileicon/${userInfo.profileIconId}.png`} />
            <div id='user-stats-lvl'>{userInfo.summonerLevel}</div>
          </div>
          <h1 id='user-stats-username'>{userInfo.name}</h1>
          <span id='user-stats-username-tagline'>#{tagLine.toUpperCase()}</span>
        </div>

        <div id='user-stats-rank-info-container'>
          <div>
            <img id='player-rank-emblem' alt={`player-rank-${userRank.tier}`} src={`/Ranked-Emblems-Latest/Rank=${correctRankCaps(userRank.tier)}.png`} />
            <button onClick={e => console.log(userRank)}>rank</button>
          </div>
        </div>
      </div>

      {/* <button onClick={e => console.log(gameName)}>test</button> */}

      <div id='match-list-container'>
        <MatchList matchData={matchData} errors={errors} />
      </div>

    </section>
  )
};

export default UserStats;
